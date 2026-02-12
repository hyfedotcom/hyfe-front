import { z } from "zod";

/* ============================================================================
   MEDIA (RAW)
============================================================================ */

// RAW: как приходит (если media есть — url должен быть строкой)
export const MediaRawSchema = z.looseObject({
  url: z.string(),
  alternativeText: z.string().nullable(),
  width: z.number(),
  height: z.number(),
});

/* ============================================================================
   SEO (RAW)
============================================================================ */

export const SeoRawSchema = z.looseObject({
  meta_title: z.string().nullish(),
  meta_description: z.string().nullish(),
  keywords: z.string().nullish(),
  meta_robots: z.string().nullish(),
  canonical_URL: z.string().nullish(),
  structured_data: z.string().nullish(), // обычно textarea с JSON-LD
  meta_image: MediaRawSchema.nullish(), // если это media
});

/* ============================================================================
   TAGS / TYPES
============================================================================ */

export const TagSchema = z.looseObject({
  tag: z.string(),
});

export const ResourceRelatedTypeSchema = z.enum([
  "insights",
  "publications",
  "news",
  "white-papers",
  "cough-news",
]);

/* ============================================================================
   BLOCKS (RAW)
============================================================================ */

// Контент rich-text (оставляем как есть, но проверяем структуру)
export const ResourceBlockContentSchema = z.array(
  z.looseObject({
    children: z.array(
      z.looseObject({
        text: z.string().optional(),
        type: z.string().optional(),
        url: z.string().optional(),
        bold: z.boolean().optional(),
        children: z
          .array(
            z.looseObject({
              type: z.string().optional(),
              url: z.string().optional(),
              text: z.string().optional(),
              bold: z.boolean().optional(),
            }),
          )
          .optional(),
      }),
    ),
    type: z.string().optional(),
    format: z.string().optional(),
    level: z.number().optional(),
  }),
);

export const ResourceBlockCtaSchema = z.array(
  z.looseObject({
    url: z.string(),
    label: z.string(),
  }),
);

export const ResourceBlockRelatedCardsSchema = z.array(
  z.looseObject({
    publication: z
      .looseObject({
        slug: z.string(),
      })
      .nullable()
      .optional(),
    resource_type: z.string(),
    insight: z
      .looseObject({
        slug: z.string(),
      })
      .nullable()
      .optional(),
    cough_news: z
      .looseObject({
        slug: z.string(),
      })
      .nullable()
      .optional(),
    news: z.looseObject({ slug: z.string() }).nullable().optional(),
    white_papers: z.looseObject({ slug: z.string() }).nullable().optional(),
  }),
);

export const ResourceRelatedCardRawSchema = z.looseObject({
  resource_type: ResourceRelatedTypeSchema,

  // Strapi populate (может быть null/undefined если не популятся или связь не выбрана)
  publication: z.looseObject({ slug: z.string() }).nullable().optional(),
  insight: z.looseObject({ slug: z.string() }).nullable().optional(),
  cough_news: z.looseObject({ slug: z.string() }).nullable().optional(),
  news: z.looseObject({ slug: z.string() }).nullable().optional(),
  white_papers: z.looseObject({ slug: z.string() }).nullable().optional(),
  // если объект уже нормализован (после transform где-то выше)
  slug: z.string().optional(),
});

export const ResourceRelatedCardsRawSchema = z.array(
  ResourceRelatedCardRawSchema,
);

export const ResourceQuoteRawSchema = z.looseObject({
  job: z.string().nullable(),
  name: z.string().nullable(),
  paragraph: z.string(),
});

export const ResourceAdditionalBlockRawSchema = z.object({
  info_links: z.array(
    z.looseObject({
      url: z.string(),
      label: z.string(),
    }),
  ),
});

export const ResourceImageRawSchema = MediaRawSchema;

// RAW block: как приходит из Strapi Dynamic Zone (обязательно __component)
export const ResourceBlockRawSchema = z.looseObject({
  __component: z.string(),
  title: z.string().nullable().optional(),
  content: ResourceBlockContentSchema.optional(),
  image: ResourceImageRawSchema.optional(),
  cta: ResourceBlockCtaSchema.optional(),
  cards: ResourceRelatedCardsRawSchema.optional(),
  paragraph: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  job: z.string().nullable().optional(),
  quote: ResourceQuoteRawSchema.optional(),
  auto_mode: z.boolean().nullable().optional(),
  description: z.string().nullable().optional(),
  info_links: ResourceAdditionalBlockRawSchema.shape.info_links.optional(),
  additiona_info: ResourceAdditionalBlockRawSchema.optional(),
  url: z.string().optional(),
});

/* ============================================================================
   LANDING / LIST / SLUG (RAW)
============================================================================ */

export const ResourceLandingRawSchema = z.looseObject({
  title: z.string(),
  paragraph: z.string().nullable(),
  seo: SeoRawSchema,
});

export const ResourceListRawSchema = z.looseObject({
  cover: MediaRawSchema,
  title: z.string(),
  date: z.string(),
  excerpt: z.string().nullable(),
  slug: z.string(),
  tags: z.array(TagSchema).optional(),
  type: ResourceRelatedTypeSchema,
});

export const ResourceSlugRawSchema = z.looseObject({
  cover: MediaRawSchema,
  title: z.string(),
  date: z.string(),
  excerpt: z.string().nullable().optional(),
  slug: z.string(),
  tags: z.array(TagSchema).optional(),
  blocks: z.array(ResourceBlockRawSchema).optional(),
  seo: SeoRawSchema,
  type: ResourceRelatedTypeSchema,
  citation: z.string().nullable().optional(),
});

/* ============================================================================
   CTA (RAW)
============================================================================ */

export const ResourceCtaRawSchema = z.looseObject({
  url: z.string(),
  label: z.string(),
});
