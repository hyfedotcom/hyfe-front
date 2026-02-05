// src/features/faq/schema/faq.schema.ts
import { z } from "zod";
import {
  ResourceBlockContentSchema,
  SeoDomainSchema,
  SeoRawSchema,
  SeoSchema,
} from "@/features/resources";

/* ----------------------------- RAW (from Strapi) ----------------------------- */

export const FaqGroupRawSchema = z.object({
  group_name: z.string(),
});

export const FaqItemRawSchema = z.object({
  question: z.string(),
  answer: ResourceBlockContentSchema,
  faq_group: FaqGroupRawSchema.nullish(), // важное: не ломаемся, если null
});

export const FaqLandingRawSchema = z.object({
  title: z.string(),
  paragraph: z.string().nullish(),
  seo: SeoRawSchema,
  faq_groups: z.array(FaqGroupRawSchema).nullish(), // landing может быть пустым/не заданным
});

/* --------------------------- UI (final page contract) ------------------------ */

export const FaqQaSchema = z.object({
  question: z.string(),
  answer: ResourceBlockContentSchema,
});

export const FaqSectionSchema = z.object({
  title: z.string(),
  faqs: z.array(FaqQaSchema),
});

export const FaqPageSchema = z.object({
  title: z.string(),
  paragraph: z.string().optional(),
  seo: SeoDomainSchema,
  sections: z.array(FaqSectionSchema),
});

/* ----------------------- Derived (for building sections) --------------------- */

// Что реально нужно для buildSections: group title + Q/A
export const FaqItemForBuildSchema = FaqItemRawSchema.transform((item) => ({
  groupTitle: item.faq_group?.group_name ?? "Other",
  qa: {
    question: item.question,
    answer: item.answer,
  },
}));

export const FaqLandingForBuildSchema = FaqLandingRawSchema.transform(
  (landing) => ({
    title: landing.title,
    paragraph: landing.paragraph ?? undefined,
    seo: SeoSchema.parse(landing.seo),
    groupOrder: landing.faq_groups
      ? landing.faq_groups.map((g) => g.group_name)
      : undefined,
  }),
);

/* ---------------------------------- Types ---------------------------------- */

export type FaqPageType = z.infer<typeof FaqPageSchema>;
export type FaqSectionType = z.infer<typeof FaqSectionSchema>;
export type FaqQaType = z.infer<typeof FaqQaSchema>;

export type FaqItemForBuildType = z.infer<typeof FaqItemForBuildSchema>;
export type FaqLandingForBuildType = z.infer<typeof FaqLandingForBuildSchema>;
