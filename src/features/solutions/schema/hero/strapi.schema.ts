import {
  CTASectionSchema,
  PartnersSectionSchema,
  SectionCardsGridSchema,
} from "@/features/page-builder/data/schema/pageBuilder";
import {
  CardSchema,
  CtaSchema,
} from "@/features/page-builder/data/schema/shared";
import { MediaSchema } from "@/features/resources";
import { z } from "zod";

// export const SolutionsHeroSchema = z
//   .looseObject({
//     __component: z.literal("shared-hero"),
//     title: z.string(),
//     paragraph: z.string().nullable(),
//     ctas: CtaSchema.optional(),
//   })
//   .transform((res) => ({
//     _type: "shared-hero",
//     title: res.title,
//     paragraph: res.paragraph,
//     ctas: res.ctas ?? undefined,
//   }));

export const SolutionsHero = z
  .looseObject({
    __component: z.literal("shared.hero-simple"),
    title: z.string(),
    paragraph: z.string().nullable(),
    ctas: z.array(CtaSchema).optional(),
  })
  .transform((res) => ({
    type: "hero" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    ctas: res.ctas ?? undefined,
  }));

export const SolutionsAccordion = z
  .looseObject({
    __component: z.literal("shared.accordion"),
    title: z.string(),
    paragraph: z.string().nullable(),
    ctas: z.array(CtaSchema).optional(),
    cards: z.array(CardSchema),
  })
  .transform((res) => ({
    type: "accordion" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    ctas: res.ctas ?? undefined,
    cards: res.cards ?? undefined,
  }));

export const ProblemInsightSolutionSchema = z
  .looseObject({
    __component: z.literal("shared.problem-insight-solution"),
    title: z.string(),
    paragraph: z.string().nullable(),
    problem: z.array(
      z.looseObject({
        value: z.string(),
        description: z.string(),
      }),
    ),
    insight: z.array(
      z.looseObject({
        value: z.string(),
      }),
    ),
    solution: z.looseObject({
      value: z.string(),
      cta: z.looseObject({
        label: z.string(),
        url: z.string(),
      }),
    }),
  })
  .transform((res) => ({
    type: "problem-insight-solution" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    problem: res.problem,
    insight: res.insight,
    solution: res.solution,
  }));

export const SolutionMap = z
  .looseObject({
    __component: z.literal("shared.map"),
    title: z.string().nullable(),
    paragraph: z.string().nullable(),
    ctas: z.array(CtaSchema).optional(),
  })
  .transform((res) => ({
    type: "map" as const,
    title: res.title ?? undefined,
    paragraph: res.paragraph ?? undefined,
    ctas: res.ctas ?? undefined,
  }));

export const ResourceFeed = z
  .looseObject({
    __component: z.literal("resource.resource-feed"),
    title: z.string(),
    paragraph: z.string().nullable(),
    type: z.string(),
    tag: z
      .looseObject({
        tag: z.string(),
      })
      .optional(),
  })
  .transform((res) => ({
    type: "resource-feed" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    typeResource: res.type,
    tag: res.tag?.tag ?? undefined,
  }));

export const CardProductStepsSchema = z
  .looseObject({
    __component: z.literal("shared.card-product-steps"),
    title: z.string(),
    paragraph: z.string().nullable(),
    ctas: z.array(CtaSchema).optional(),
    cards: z.array(CardSchema),
  })
  .transform((res) => ({
    type: "card-product-steps" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    ctas: res.ctas ?? undefined,
    cards: res.cards ?? undefined,
  }));

export const ContentImageSplitSchema = z
  .looseObject({
    __component: z.literal("shared.content-image-split"),
    title: z.string(),
    content: z
      .array(
        z.object({
          paragraph: z.string(),
        }),
      )
      .nullable(),
    ctas: z.array(CtaSchema).optional().nullable(),
    image: MediaSchema,
  })
  .transform((res) => ({
    type: "content-image-split" as const,
    title: res.title,
    content: res.content ?? undefined,
    ctas: res.ctas ?? undefined,
    image: res.image,
  }));

export const TestimonialsFeedSchema = z
  .looseObject({
    __component: z.literal("shared.testimonials-feed"),
    title: z.string(),
    paragraph: z.string().nullable(),
    testimonials: z
      .array(
        z.looseObject({
          paragraph: z.string(),
          name: z.string(),
          role: z.string(),
        }),
      )
      .optional(),
  })
  .transform((res) => ({
    type: "testimonials-feed" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    testimonials: res.testimonials ?? undefined,
  }));

export const SectionsSchema = z.array(
  z.discriminatedUnion("__component", [
    PartnersSectionSchema,
    SectionCardsGridSchema,
    SolutionsAccordion,
    CTASectionSchema,
    ProblemInsightSolutionSchema,
    SolutionsHero,
    SolutionMap,
    ResourceFeed,
    CardProductStepsSchema,
    ContentImageSplitSchema,
    TestimonialsFeedSchema,
  ]),
);

export const SolutionRawSchema = z.looseObject({
  name: z.string(),
  slug: z.string(),
  sections: SectionsSchema,
});

export const StrapiCollectionSchema = z
  .looseObject({
    data: z.array(SolutionRawSchema), // ✅ collection => array
    meta: z.unknown(),
  })
  .transform((res) => res.data);

export type AccordionType = z.infer<typeof SolutionsAccordion>;
export type ProblemInsightSolutionType = z.infer<
  typeof ProblemInsightSolutionSchema
>;
export type SolutionsHeroType = z.infer<typeof SolutionsHero>;
export type SolutionMapType = z.infer<typeof SolutionMap>;
export type ResourceFeedType = z.infer<typeof ResourceFeed>;
export type CardProductStepsType = z.infer<typeof CardProductStepsSchema>;
export type ContentImageSplitType = z.infer<typeof ContentImageSplitSchema>;
export type TestimonialsFeedType = z.infer<typeof TestimonialsFeedSchema>;
export type SectionsType= z.infer<typeof SectionsSchema>;
