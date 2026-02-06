import { z } from "zod";
import { SeoSchema } from "@/features/resources";
import { FaqItemRawSchema, FaqLandingRawSchema } from "./raw";

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

export type FaqItemForBuildType = z.infer<typeof FaqItemForBuildSchema>;
export type FaqLandingForBuildType = z.infer<typeof FaqLandingForBuildSchema>;
