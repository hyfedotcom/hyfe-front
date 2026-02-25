import StrapiFetch from "@/core/strapi/strapiFetch";
import { serverEnv } from "@/core/env.server";

const solutionsFormIdsQuery = {
  fields: ["slug"],
  pagination: { pageSize: 1000 },
  populate: {
    sections: {
      on: {
        "form.form-container": {
          populate: {
            form: {
              fields: ["formId"],
            },
          },
        },
      },
    },
  },
};

function collectFormIdsFromUnknown(input: unknown, out: Set<string>) {
  if (!input) return;

  if (Array.isArray(input)) {
    for (const item of input) {
      collectFormIdsFromUnknown(item, out);
    }
    return;
  }

  if (typeof input !== "object") return;

  for (const [key, value] of Object.entries(input)) {
    if (key === "formId" && typeof value === "string") {
      const formId = value.trim();
      if (formId) out.add(formId);
    }

    collectFormIdsFromUnknown(value, out);
  }
}

function parseEnvAllowlist() {
  return new Set(
    [serverEnv.NEWS_FORM_ID, ...(serverEnv.HUBSPOT_ALLOWED_FORM_IDS ?? "").split(",")]
      .map((formId) => formId.trim())
      .filter(Boolean),
  );
}

export async function getAllowedHubspotFormIds() {
  const allowed = parseEnvAllowlist();

  try {
    const raw = await StrapiFetch<unknown>({
      path: "/api/solutions",
      query: solutionsFormIdsQuery,
      tags: ["solution:forms"],
    });

    collectFormIdsFromUnknown(raw, allowed);
  } catch (error) {
    console.error("Failed to load solution form ids from Strapi:", error);
  }

  return allowed;
}
