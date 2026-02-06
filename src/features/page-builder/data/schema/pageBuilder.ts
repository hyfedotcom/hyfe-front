import { z } from "zod";
import {
  CardCtaSchema,
  CardLinkSchema,
  CardSchema,
  CardsFeedMaybeListSchema,
  CtaSchema,
  StatSchema,
} from "./shared";
import {
  MediaSchema,
  SeoRawSchema,
  SeoSchema,
  ResourceFeedSectionSchema,
} from "@/features/resources";

export const SectionHeroStatsSchema = z
  .looseObject({
    __component: z.literal("shared.hero-stats"),
    title: z.string(),
    paragraph: z.string().nullable(),
    ctas: z.array(CtaSchema).nullable(),
    stats: z.array(StatSchema),
  })
  .transform((res) => ({
    type: "hero-stats" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    ctas: res.ctas ?? undefined,
    stats: res.stats,
  }));

export const SectionCardsGridSchema = z
  .looseObject({
    __component: z.literal("shared.cards-grid"),
    title: z.string(),
    paragraph: z.string().nullable(),
    ctas: z.array(CtaSchema).nullable(),
    cards: z.array(CardSchema),
  })
  .transform((res) => ({
    type: "cards-grid" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    ctas: res.ctas ? res.ctas : undefined,
    cards: res.cards,
  }));

export const PartnersSectionSchema = z
  .looseObject({
    __component: z.literal("shared.partners"),
    title: z.string(),
    paragraph: z.string().nullable(),
    logos: z.array(MediaSchema),
  })
  .transform((res) => ({
    type: "partners" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    logos: res.logos,
  }));

export const ProductsCardsSchema = z
  .looseObject({
    __component: z.literal("shared.products-cards"),
    title: z.string(),
    paragraph: z.string().optional(),
    cards: z.array(CardCtaSchema),
  })
  .transform((res) => ({
    type: "products-cards" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    cards: res.cards,
  }));

export const ResourceLinksSchema = z
  .looseObject({
    __component: z.literal("shared.resource-links"),
    title: z.string(),
    paragraph: z.string().nullable(),
    links: z.array(CardLinkSchema),
  })
  .transform((res) => ({
    type: "resource-links" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    links: res.links,
  }));

export const FeatureCardsRightSectionSchema = z
  .looseObject({
    __component: z.literal("shared.feature-cards-right"),
    title: z.string(),
    paragraph: z.string().nullable(),
    cta: CtaSchema,
    cards: z.array(CardSchema),
  })
  .transform((res) => ({
    type: "feature-cards-right" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    ctas: [res.cta],
    cards: res.cards,
  }));

export const CTASectionSchema = z
  .looseObject({
    __component: z.literal("shared.cta"),
    title: z.string(),
    paragraph: z.string().optional(),
    ctas: z.array(CtaSchema),
  })
  .transform((res) => ({
    type: "cta" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    ctas: res.ctas ?? undefined,
  }));

export const TabbedResourceFeedSectionSchema = z
  .looseObject({
    __component: z.literal("resource.tabbed-resource-feed"),
    title: z.string(),
    paragraph: z.string().nullable(),
    cards: CardsFeedMaybeListSchema,
  })
  .transform((res) => ({
    type: "tabbed-resource-feed" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    cards: res.cards,
  }));

export const PageSectionsSchema = z.array(
  z.discriminatedUnion("__component", [
    SectionHeroStatsSchema,
    SectionCardsGridSchema,
    PartnersSectionSchema,
    ProductsCardsSchema,
    ResourceLinksSchema,
    FeatureCardsRightSectionSchema,
    CTASectionSchema,
    TabbedResourceFeedSectionSchema,
    ResourceFeedSectionSchema,
  ]),
);

export const PageRawSchema = z
  .looseObject({
    title: z.string().nullable().optional(),
    paragraph: z.string().nullable().optional(),
    slug: z.string().optional(),
    seo: SeoRawSchema.optional(),
    sections: PageSectionsSchema.optional(),
  })
  .transform((res) => ({
    title: res.title ?? undefined,
    paragraph: res.paragraph ?? undefined,
    slug: res.slug ?? undefined,
    seo: res.seo ? SeoSchema.parse(res.seo) : undefined,
    sections: res.sections ?? undefined,
  }));

export const PageCollectionSchema = z
  .object({
    title: z.string().nullable().optional(),
    paragraph: z.string().nullable().optional(),
    data: PageRawSchema.nullable(),
  })
  .transform((res) => res.data);

export type PageSectionsType = z.infer<typeof PageSectionsSchema>;
export type HeroStatsSectionType = z.infer<typeof SectionHeroStatsSchema>;
export type CardsGridSectionType = z.infer<typeof SectionCardsGridSchema>;
export type PartnersSectionType = z.infer<typeof PartnersSectionSchema>;
export type ProductsCardsSectionType = z.infer<typeof ProductsCardsSchema>;
export type ResourceLinksSectionType = z.infer<typeof ResourceLinksSchema>;
export type FeatureCardsRightSectionType = z.infer<
  typeof FeatureCardsRightSectionSchema
>;
export type CTASectionSchemaType = z.infer<typeof CTASectionSchema>;
export type TabbedResourceFeedSectionType = z.infer<
  typeof TabbedResourceFeedSectionSchema
>;
