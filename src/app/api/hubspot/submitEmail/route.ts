import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/core/http/getClientIp";
import { consumeRateLimit } from "@/core/security/rateLimit";
import { submitNewsletterToHubspot } from "@/core/hubspot/submitNewsletterToHubspot";
import { isHubspotCaptureOnlyEnabled } from "@/core/hubspot/captureHubspotSubmission";

const HUBSPOT_DRY_RUN = process.env.HUBSPOT_DRY_RUN === "true";
const HUBSPOT_CAPTURE_ONLY = isHubspotCaptureOnlyEnabled();
const SUBMIT_EMAIL_MAX_REQUESTS = 10;
const SUBMIT_EMAIL_WINDOW_MS = 60_000;

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);
    const userAgent = req.headers.get("user-agent") ?? "unknown";
    const rateLimit = consumeRateLimit({
      key: `hubspot:submitEmail:${clientIp}:${userAgent}`,
      max: SUBMIT_EMAIL_MAX_REQUESTS,
      windowMs: SUBMIT_EMAIL_WINDOW_MS,
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

    const form = await req.formData();

    const email = String(form.get("email") ?? "").trim();
    const consent = form.get("consent") === "on"; // чекбокс без value => "on"
    const honey = String(form.get("website") ?? "").trim();

    // honeypot: если заполнен — бот
    if (honey) return NextResponse.json({ ok: true });

    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const ip = clientIp === "unknown" ? undefined : clientIp;

    const pageUri = req.headers.get("referer") ?? undefined;
    const hutk = req.cookies.get("hubspotutk")?.value; // полезно для атрибуции

    if (HUBSPOT_CAPTURE_ONLY) {
      const capture = await submitNewsletterToHubspot({
        email,
        consent,
        ip,
        pageUri,
        hutk,
        captureOnly: true,
        captureSource: "submitEmail:newsletter",
      });

      return NextResponse.json({
        ok: true,
        captureOnly: true,
        capturedTo: capture.capturedTo,
      });
    }

    if (HUBSPOT_DRY_RUN) {
      return NextResponse.json({ ok: true, dryRun: true });
    }

    const newsletterSubmit = await submitNewsletterToHubspot({
      email,
      consent,
      ip,
      pageUri,
      hutk,
    });

    if (!newsletterSubmit.ok) {
      return NextResponse.json(
        { error: "HubSpot rejected submission", details: newsletterSubmit.data },
        { status: newsletterSubmit.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "submit failed" }, { status: 500 });
  }
}
