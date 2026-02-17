import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { serverEnv } from "@/core/env.server";

const HUBSPOT_DRY_RUN = process.env.HUBSPOT_DRY_RUN === "true";

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

export async function POST(req: NextRequest) {
  try {
    const payload = SubmitFormSchema.parse(await req.json());

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

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      undefined;
    const pageUri = req.headers.get("referer") ?? undefined;
    const hutk = req.cookies.get("hubspotutk")?.value;
    const emailFromFields = fields.find(
      (field) => field.name.toLowerCase() === "email",
    )?.value;
    const newsletterEmail = payload.newsletterEmail?.trim() || emailFromFields;

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

    const hsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/secure/submit/${serverEnv.HUB_ID}/${payload.formId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serverEnv.NEWS_FORM_TOKEN}`,
        },
        body: JSON.stringify({
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
        }),
      },
    );

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

    const newsletterHsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/secure/submit/${serverEnv.HUB_ID}/${serverEnv.NEWS_FORM_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serverEnv.NEWS_FORM_TOKEN}`,
        },
        body: JSON.stringify({
          fields: [{ name: "email", value: newsletterEmail }],
          context: {
            ...(hutk ? { hutk } : {}),
            ...(ip ? { ipAddress: ip } : {}),
            ...(pageUri ? { pageUri } : {}),
          },
          legalConsentOptions: {
            consent: {
              consentToProcess: true,
              text: "I agree to allow processing of my data.",
            },
          },
        }),
      },
    );

    const newsletterData = await newsletterHsRes.json().catch(() => ({}));

    if (!newsletterHsRes.ok) {
      return NextResponse.json({
        ok: true,
        newsletter: {
          attempted: true,
          ok: false,
          details: newsletterData,
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
