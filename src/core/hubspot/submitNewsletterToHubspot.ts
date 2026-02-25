import { serverEnv } from "@/core/env.server";
import { captureHubspotSubmission } from "@/core/hubspot/captureHubspotSubmission";

type SubmitNewsletterInput = {
  email: string;
  consent: boolean;
  ip?: string;
  pageUri?: string;
  hutk?: string;
  captureOnly?: boolean;
  captureSource?: string;
};

type SubmitNewsletterResult = {
  ok: boolean;
  status: number;
  data: unknown;
  capturedTo?: string;
};

export async function submitNewsletterToHubspot({
  email,
  consent,
  ip,
  pageUri,
  hutk,
  captureOnly = false,
  captureSource = "newsletter",
}: SubmitNewsletterInput): Promise<SubmitNewsletterResult> {
  const endpoint = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${serverEnv.HUB_ID}/${serverEnv.NEWS_FORM_ID}`;
  const payload = {
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
  };

  if (captureOnly) {
    const capturedTo = await captureHubspotSubmission({
      source: captureSource,
      endpoint,
      payload,
    });

    return {
      ok: true,
      status: 200,
      data: { ok: true, captureOnly: true },
      capturedTo,
    };
  }

  const hsRes = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serverEnv.NEWS_FORM_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await hsRes.json().catch(() => ({}));

  return {
    ok: hsRes.ok,
    status: hsRes.status,
    data,
  };
}
