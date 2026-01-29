import { NextRequest, NextResponse } from "next/server";
import { serverEnv } from "@/core/env.server";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const email = String(form.get("email") ?? "").trim();
    const consent = form.get("consent") === "on"; // чекбокс без value => "on"
    const honey = String(form.get("website") ?? "").trim();

    // honeypot: если заполнен — бот
    if (honey) return NextResponse.json({ ok: true });

    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      undefined;

    const pageUri = req.headers.get("referer") ?? undefined;
    const hutk = req.cookies.get("hubspotutk")?.value; // полезно для атрибуции

    const hsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/secure/submit/${serverEnv.HUB_ID}/${serverEnv.NEWS_FORM_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serverEnv.NEWS_FORM_TOKEN}`,
        },
        body: JSON.stringify({
          fields: [{ name: "email", value: email }],
          context: {
            ...(hutk ? { hutk } : {}),
            ...(ip ? { ipAddress: ip } : {}),
            ...(pageUri ? { pageUri } : {}),
          },
          legalConsentOptions: {
            consent: {
              consentToProcess: consent,
              text: "I agree to allow processing of my data.",
            },
          },
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

    return NextResponse.redirect(new URL("/thanks", req.url), 303);
  } catch (e) {
    return NextResponse.json({ error: "submit failed" }, { status: 500 });
  }
}
