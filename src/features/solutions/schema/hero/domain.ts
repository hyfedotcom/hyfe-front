import { z } from "zod";
import {
  CTASectionSchema,
  PartnersSectionSchema,
  SectionCardsGridSchema,
} from "@/features/page-builder/data/schema/pageBuilder";
import {
  MediaSchema,
  ResourceFeedSectionSchema,
  SeoSchema,
} from "@/features/resources";
import { StrapiCollectionSchema } from "@/features/shared/schema/strapi.schema";
import {
  CardProductStepsRawSchema,
  ContentImageSplitRawSchema,
  ProblemInsightSolutionRawSchema,
  SolutionMapRawSchema,
  SolutionsAccordionRawSchema,
  SolutionsHeroRawSchema,
  TestimonialsFeedRawSchema,
} from "./raw";

/* ----------------------------- DOMAIN (for UI) ----------------------------- */

export const SolutionsHero = SolutionsHeroRawSchema.transform((res) => ({
  type: "hero" as const,
  title: res.title,
  paragraph: res.paragraph ?? undefined,
  ctas: res.ctas ?? undefined,
}));

export const SolutionsAccordion = SolutionsAccordionRawSchema.transform(
  (res) => ({
    type: "accordion" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    ctas: res.ctas ?? undefined,
    cards: res.cards ?? undefined,
  }),
);

export const ProblemInsightSolutionSchema = ProblemInsightSolutionRawSchema.transform(
  (res) => ({
    type: "problem-insight-solution" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    problem: res.problem,
    insight: res.insight,
    solution: res.solution,
  }),
);

export const SolutionMap = SolutionMapRawSchema.transform((res) => ({
  type: "map" as const,
  title: res.title ?? undefined,
  paragraph: res.paragraph ?? undefined,
  ctas: res.ctas ?? undefined,
}));

export const CardProductStepsSchema = CardProductStepsRawSchema.transform(
  (res) => ({
    type: "card-product-steps" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    ctas: res.ctas ?? undefined,
    cards: res.cards ?? undefined,
  }),
);

export const ContentImageSplitSchema = ContentImageSplitRawSchema.transform(
  (res) => ({
    type: "content-image-split" as const,
    title: res.title,
    content: res.content ?? undefined,
    ctas: res.ctas ?? undefined,
    image: MediaSchema.parse(res.image),
  }),
);

export const TestimonialsFeedSchema = TestimonialsFeedRawSchema.transform(
  (res) => ({
    type: "testimonials-feed" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    testimonials: res.testimonials ?? undefined,
  }),
);

export const SectionsSchema = z.array(
  z.discriminatedUnion("__component", [
    PartnersSectionSchema,
    SectionCardsGridSchema,
    SolutionsAccordion,
    CTASectionSchema,
    ProblemInsightSolutionSchema,
    SolutionsHero,
    SolutionMap,
    ResourceFeedSectionSchema,
    CardProductStepsSchema,
    ContentImageSplitSchema,
    TestimonialsFeedSchema,
  ]),
);

export const SolutionRawSchema = z.looseObject({
  name: z.string(),
  slug: z.string(),
  sections: SectionsSchema,
  seo: SeoSchema,
});

export const SolutionCollectionSchema = StrapiCollectionSchema(
  z.array(SolutionRawSchema),
);

export type AccordionType = z.infer<typeof SolutionsAccordion>;
export type ProblemInsightSolutionType = z.infer<
  typeof ProblemInsightSolutionSchema
>;
export type SolutionsHeroType = z.infer<typeof SolutionsHero>;
export type SolutionMapType = z.infer<typeof SolutionMap>;
export type CardProductStepsType = z.infer<typeof CardProductStepsSchema>;
export type ContentImageSplitType = z.infer<typeof ContentImageSplitSchema>;
export type TestimonialsFeedType = z.infer<typeof TestimonialsFeedSchema>;
export type SectionsType = z.infer<typeof SectionsSchema>;
