import StrapiFetch from "@/core/strapi/strapiFetch";
import { privacyTermBySlugQuery } from "./privacyTerms.query";
import {
  parseOrThrow,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import { PrivacyTermPagesSchema } from "../schema/privacyTerms.schema";

export async function getPrivacyTermPage(slug: string) {
  const raw = await StrapiFetch<unknown>({
    path: "/api/privacy-term-items",
    query: privacyTermBySlugQuery(slug),
    tags: [`privacy-term:${slug}`, "privacy-term:all"],
  });

  const pages = parseOrThrow(StrapiCollectionSchema(PrivacyTermPagesSchema), raw);
  return pages[0] ?? null;
}
