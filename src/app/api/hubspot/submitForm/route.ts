import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { serverEnv } from "@/core/env.server";
import { getClientIp } from "@/core/http/getClientIp";
import { consumeRateLimit } from "@/core/security/rateLimit";
import {
  captureHubspotSubmission,
  isHubspotCaptureOnlyEnabled,
} from "@/core/hubspot/captureHubspotSubmission";
import { getAllowedHubspotFormIds } from "@/core/hubspot/getAllowedHubspotFormIds";
import { submitNewsletterToHubspot } from "@/core/hubspot/submitNewsletterToHubspot";

const HUBSPOT_DRY_RUN = process.env.HUBSPOT_DRY_RUN === "true";
const HUBSPOT_CAPTURE_ONLY = isHubspotCaptureOnlyEnabled();
const SUBMIT_FORM_MAX_REQUESTS = 20;
const SUBMIT_FORM_WINDOW_MS = 60_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SubmitFormSchema = z.object({
  formId: z.string().min(1),
  consent: z.boolean().optional(),
  subscribeToNewsletter: z.boolean().optional(),
  newsletterEmail: z.string().optional(),
  website: z.string().optional(),
  fields: z
    .array(
      z.object({
        name: z.string().min(1),
        value: z.string().min(1),
      }),
    )
    .min(1),
});

function resolveNewsletterEmail({
  payloadEmail,
  fields,
}: {
  payloadEmail?: string;
  fields: Array<{ name: string; value: string }>;
}) {
  const explicitEmail = payloadEmail?.trim();
  if (explicitEmail && EMAIL_RE.test(explicitEmail)) return explicitEmail;

  const emailByFieldName = fields.find(
    (field) => /email/i.test(field.name) && EMAIL_RE.test(field.value.trim()),
  )?.value;
  if (emailByFieldName) return emailByFieldName.trim();

  const emailByValue = fields.find((field) =>
    EMAIL_RE.test(field.value.trim()),
  )?.value;

  return emailByValue?.trim();
}

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const userAgent = req.headers.get("user-agent") ?? "unknown";
    const rateLimitKey =
      clientIp === "unknown"
        ? `hubspot:submitForm:${clientIp}:${userAgent}`
        : `hubspot:submitForm:${clientIp}`;
    const rateLimit = consumeRateLimit({
      key: rateLimitKey,
      max: SUBMIT_FORM_MAX_REQUESTS,
      windowMs: SUBMIT_FORM_WINDOW_MS,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }

    const payload = SubmitFormSchema.parse(await req.json());
    const formId = payload.formId.trim();
    const allowedFormIds = await getAllowedHubspotFormIds();
    const isAllowedFormId = Boolean(formId) && allowedFormIds.has(formId);

    if (!formId || (!isAllowedFormId && !HUBSPOT_CAPTURE_ONLY)) {
      return NextResponse.json({ error: "Unsupported formId" }, { status: 403 });
    }

    const honey = payload.website?.trim();
    if (honey) return NextResponse.json({ ok: true });

    const fields = payload.fields
      .map((field) => ({
        name: field.name.trim(),
        value: field.value.trim(),
      }))
      .filter((field) => field.name && field.value);

    if (!fields.length) {
      return NextResponse.json({ error: "No form fields provided" }, { status: 400 });
    }

    const ip = clientIp === "unknown" ? undefined : clientIp;
    const pageUri = req.headers.get("referer") ?? undefined;
    const hutk = req.cookies.get("hubspotutk")?.value;
    const newsletterEmail = resolveNewsletterEmail({
      payloadEmail: payload.newsletterEmail,
      fields,
    });
    const primaryEndpoint = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${serverEnv.HUB_ID}/${formId}`;
    const primaryPayload = {
      fields,
      context: {
        ...(hutk ? { hutk } : {}),
        ...(ip ? { ipAddress: ip } : {}),
        ...(pageUri ? { pageUri } : {}),
      },
      ...(typeof payload.consent === "boolean"
        ? {
            legalConsentOptions: {
              consent: {
                consentToProcess: payload.consent,
                text: "I agree to allow processing of my data.",
              },
            },
          }
        : {}),
    };

    if (HUBSPOT_CAPTURE_ONLY) {
      const primaryCapturedTo = await captureHubspotSubmission({
        source: "submitForm:primary",
        endpoint: primaryEndpoint,
        payload: primaryPayload,
      });

      if (!payload.subscribeToNewsletter) {
        return NextResponse.json({
          ok: true,
          captureOnly: true,
          capturedTo: [primaryCapturedTo],
        });
      }

      if (!newsletterEmail) {
        return NextResponse.json({
          ok: true,
          captureOnly: true,
          capturedTo: [primaryCapturedTo],
          newsletter: {
            attempted: false,
            ok: false,
            reason: "newsletter email is missing",
          },
        });
      }

      const newsletterCapture = await submitNewsletterToHubspot({
        email: newsletterEmail,
        consent: true,
        ip,
        pageUri,
        hutk,
        captureOnly: true,
        captureSource: "submitForm:newsletter",
      });

      return NextResponse.json({
        ok: true,
        captureOnly: true,
        capturedTo: [primaryCapturedTo, newsletterCapture.capturedTo].filter(
          Boolean,
        ),
        newsletter: { attempted: true, ok: true, captureOnly: true },
      });
    }

    if (HUBSPOT_DRY_RUN) {
      if (!payload.subscribeToNewsletter) {
        return NextResponse.json({ ok: true, dryRun: true });
      }

      if (!newsletterEmail) {
        return NextResponse.json({
          ok: true,
          dryRun: true,
          newsletter: {
            attempted: false,
            ok: false,
            reason: "newsletter email is missing",
          },
        });
      }

      return NextResponse.json({
        ok: true,
        dryRun: true,
        newsletter: {
          attempted: true,
          ok: true,
          dryRun: true,
        },
      });
    }

    const hsRes = await fetch(primaryEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serverEnv.NEWS_FORM_TOKEN}`,
      },
      body: JSON.stringify(primaryPayload),
    });

    const data = await hsRes.json().catch(() => ({}));

    if (!hsRes.ok) {
      return NextResponse.json(
        { error: "HubSpot rejected submission", details: data },
        { status: hsRes.status },
      );
    }

    if (!payload.subscribeToNewsletter) {
      return NextResponse.json({ ok: true });
    }

    if (!newsletterEmail) {
      return NextResponse.json({
        ok: true,
        newsletter: {
          attempted: false,
          ok: false,
          reason: "newsletter email is missing",
        },
      });
    }

    const newsletterSubmit = await submitNewsletterToHubspot({
      email: newsletterEmail,
      consent: true,
      ip,
      pageUri,
      hutk,
    });

    if (!newsletterSubmit.ok) {
      return NextResponse.json({
        ok: true,
        newsletter: {
          attempted: true,
          ok: false,
          details: newsletterSubmit.data,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      newsletter: { attempted: true, ok: true },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form payload", details: error.flatten() },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: "submit failed" }, { status: 500 });
  }
}
