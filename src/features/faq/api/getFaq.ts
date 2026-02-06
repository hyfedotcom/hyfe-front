// src/features/faq/api/getFaqPage.ts
import { z } from "zod";
import StrapiFetch from "@/core/strapi/strapiFetch";
import { faqItemQuery, faqLandingQuery } from "./faq.query";
import {
  StrapiCollectionSchema,
  parseOrThrow,
} from "@/features/shared/schema/strapi.schema";
import {
  FaqItemForBuildSchema,
  FaqLandingForBuildSchema,
  FaqPageSchema,
} from "../schema/faq.schema";
import { buildSections } from "../utils/buildSections";

export async function getFaqPage() {
  const [landingRaw, itemsRaw] = await Promise.all([
    StrapiFetch({
      path: `/api/faq-landing`,
      query: faqLandingQuery,
      tags: ["faq:faq-landing"],
    }),
    StrapiFetch({
      path: "/api/faqs",
      query: faqItemQuery,
      tags: ["faq:faq-list"],
    }),
  ]);

  const landing = parseOrThrow(
    StrapiCollectionSchema(FaqLandingForBuildSchema),
    landingRaw,
  );
  const items = parseOrThrow(
    StrapiCollectionSchema(z.array(FaqItemForBuildSchema)),
    itemsRaw,
  );

  if (!landing.groupOrder) return null;

  const sections = buildSections({
    groupOrder: landing.groupOrder,
    items,
  });
  return FaqPageSchema.parse({
    title: landing.title,
    paragraph: landing.paragraph,
    seo: landing.seo,
    sections,
  });
}
