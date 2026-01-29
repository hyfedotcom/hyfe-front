import {
  CTASectionSchema,
  PartnersSectionSchema,
  SectionCardsGridSchema,
} from "@/features/page-builder/data/schema/pageBuilder";
import {
  CardSchema,
  CtaSchema,
} from "@/features/page-builder/data/schema/shared";
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

export const SolutionsAccordion = z
  .looseObject({
    __component: z.literal("shared.accordion"),
    title: z.string(),
    paragraph: z.string().nullable(),
    ctas: z.array(CtaSchema).optional(),
    cards: z.array(CardSchema),
  })
  .transform((res) => ({
    _type: "shared.accordion",
    title: res.title,
    paragraph: res.paragraph,
    ctas: res.ctas ?? undefined,
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
    }),
  })
  .transform((res) => ({
    type: "shared.problem-insight-solution" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    problem: res.problem,
    insight: res.insight,
    solution: res.solution,
  }));

export const SectionsSchema = z.array(
  z.discriminatedUnion("__component", [
    PartnersSectionSchema,
    SectionCardsGridSchema,
    SolutionsAccordion,
    CTASectionSchema,
    ProblemInsightSolutionSchema,
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
