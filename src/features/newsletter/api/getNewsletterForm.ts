import StrapiFetch from "@/core/strapi/strapiFetch";
import { newsletterFormQuery } from "./newsletter.query";
import {
  parseOrThrow,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import {
  DefaultNewsletterForm,
  NewsletterFormSchema,
} from "../schema/newsletter.schema";

export async function getNewsletterForm() {
  try {
    const raw = await StrapiFetch<unknown>({
      path: "/api/general",
      query: newsletterFormQuery,
      tags: ["general:newsletter"],
    });

    return parseOrThrow(StrapiCollectionSchema(NewsletterFormSchema), raw);
  } catch (error) {
    console.error("Failed to load newsletter form data:", error);
    return {
      title: DefaultNewsletterForm.title,
      benefits: [...DefaultNewsletterForm.benefits],
      ctaLabel: DefaultNewsletterForm.ctaLabel,
      consentLabel: DefaultNewsletterForm.consentLabel,
    };
  }
}
