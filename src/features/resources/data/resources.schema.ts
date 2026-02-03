import { z } from "zod";
import { publicEnv } from "@/core/env.public";
import { title } from "process";

/* ============================================================================
   HELPERS
============================================================================ */

const urlNormalizer = (url: string) => {
  if (!url) return url;

  const abs =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `${publicEnv.NEXT_PUBLIC_STRAPI_URL}${url.startsWith("/") ? "" : "/"}${url}`;

  return encodeURI(abs);
};

/* ============================================================================
   STRAPI ENVELOPES
============================================================================ */

const StrapiMetaSchema = z.unknown();

export const StrapiResponse = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    meta: StrapiMetaSchema.optional(),
  });

export const StrapiCollection = <T extends z.ZodTypeAny>(itemSchema: T) =>
  StrapiResponse(z.array(itemSchema));

/* ============================================================================
   MEDIA (RAW -> DOMAIN)
============================================================================ */

// RAW: как приходит (если media есть — url должен быть строкой)
export const MediaRawSchema = z.looseObject({
  url: z.string(),
  alternativeText: z.string().nullable(),
  width: z.number(),
  height: z.number(),
});

// DOMAIN: как удобно в UI
export const MediaDomainSchema = z.object({
  url: z.string(),
  alt: z.union([z.string(), z.undefined()]),
  width: z.number(),
  height: z.number(),
});

// RAW -> DOMAIN
export const MediaSchema = MediaRawSchema.transform((m) => ({
  url: urlNormalizer(m.url),
  alt: m.alternativeText ?? undefined,
  width: m.width,
  height: m.height,
})).pipe(MediaDomainSchema);

/* ============================================================================
    SEO
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

// DOMAIN: удобно для С/Next
export const SeoDomainSchema = z.object({
  title: z.union([z.string(), z.undefined()]),
  description: z.union([z.string(), z.undefined()]),
  keywords: z.union([z.string(), z.undefined()]),
  robots: z.union([z.string(), z.undefined()]),
  canonical: z.union([z.string(), z.undefined()]),
  structuredData: z.union([z.string(), z.undefined()]),
  image: z.union([MediaDomainSchema, z.undefined()]),
});

export const SeoSchema = SeoRawSchema.transform((s) => ({
  title: s.meta_title ?? undefined,
  description: s.meta_description ?? undefined,
  keywords: s.keywords ?? undefined,
  robots: s.meta_robots ?? undefined,
  canonical: s.canonical_URL ?? undefined,
  structuredData: s.structured_data ?? undefined,
  image: s.meta_image ? MediaSchema.parse(s.meta_image) : undefined,
})).pipe(SeoDomainSchema);

// Поле media, которое может быть null/undefined и должно стать undefined в домене
// export const MediaOptionalSchema = nullishToUndefined(MediaRawSchema)
//   .transform((m) => (m ? MediaSchema.parse(m) : undefined))
//   .pipe(MediaDomainSchema.optional());

/* ============================================================================
   TAGS
============================================================================ */

export const TagSchema = z.looseObject({
  tag: z.string(),
});

/* ============================================================================
   BLOCKS (RAW -> DOMAIN)
   Принцип: RAW отражает Strapi, DOMAIN удобен для рендера.
   В домене: __component -> type, media нормализуем, null -> undefined.
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

export const ResourceRelatedBlockInsight = z.object({
  resource_type: z.literal("insights"),
  slug: z.union([z.string(), z.undefined()]),
});

export const ResourceRelatedBlockPublication = z.object({
  resource_type: z.literal("publications"),
  slug: z.union([z.string(), z.undefined()]),
});

export const ResourceRelatedBlockNews = z.object({
  resource_type: z.literal("news"),
  slug: z.union([z.string(), z.undefined()]),
});

export const ResourceRelatedBlockCoughNews = z.object({
  resource_type: z.literal("cough-news"),
  slug: z.union([z.string(), z.undefined()]),
});

export const ResourceRelatedBlockWhitePapers = z.object({
  resource_type: z.literal("white-papers"),
  slug: z.union([z.string(), z.undefined()]),
});

export const ResourceRelatedTypeSchema = z.enum([
  "insights",
  "publications",
  "news",
  "white-papers",
  "cough-news",
]);

export const ResourceRelatedDomainBlock = z.discriminatedUnion(
  "resource_type",
  [
    ResourceRelatedBlockInsight,
    ResourceRelatedBlockPublication,
    ResourceRelatedBlockNews,
    ResourceRelatedBlockCoughNews,
    ResourceRelatedBlockWhitePapers,
  ],
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

export const ResourceRelatedCardDomainSchema = z.discriminatedUnion(
  "resource_type",
  [
    z.object({
      resource_type: z.literal("insights"),
      slug: z.union([z.string(), z.undefined()]),
    }),
    z.object({
      resource_type: z.literal("publications"),
      slug: z.union([z.string(), z.undefined()]),
    }),
    z.object({
      resource_type: z.literal("news"),
      slug: z.union([z.string(), z.undefined()]),
    }),
    z.object({
      resource_type: z.literal("white-papers"),
      slug: z.union([z.string(), z.undefined()]),
    }),
    z.object({
      resource_type: z.literal("cough-news"),
      slug: z.union([z.string(), z.undefined()]),
    }),
  ],
);

export const ResourceRelatedCardSchema = ResourceRelatedCardRawSchema.transform(
  (r) => {
    switch (r.resource_type) {
      case "publications":
        return {
          resource_type: r.resource_type,
          slug: r.publication?.slug,
        };
        break;
      case "insights":
        return {
          resource_type: r.resource_type,
          slug: r.insight?.slug,
        };
        break;
      case "news":
        return {
          resource_type: r.resource_type,
          slug: r.news?.slug,
        };
        break;
      case "cough-news":
        return {
          resource_type: r.resource_type,
          slug: r.cough_news?.slug,
        };
        break;
      case "white-papers":
        return {
          resource_type: r.resource_type,
          slug: r.white_papers?.slug,
        };
        break;

      default:
        throw new Error(`Unknown block component: ${r.resource_type}`);
    }
  },
).pipe(ResourceRelatedCardDomainSchema);

export const ResourceRelatedCardsRawSchema = z.array(
  ResourceRelatedCardRawSchema,
);
export const ResourceRelatedCardsSchema = z.array(ResourceRelatedCardSchema);

// Если тебе нужно “строго”: не рендерить карточки без slug — просто используй это
export const ResourceRelatedCardsSchemaNonEmpty =
  ResourceRelatedCardsSchema.transform((cards) =>
    cards.filter((c) => Boolean(c.slug)),
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

// DOMAIN blocks = строгие варианты
const ResourceRichTextBlockDomainSchema = z.object({
  type: z.literal("resource.rich-text"),
  title: z.string().optional(),
  content: ResourceBlockContentSchema,
});

export const ResourceImageBlockDomainSchema = z.object({
  title: z.union([z.string(), z.undefined()]),
  description: z.union([z.string(), z.undefined()]),
  type: z.literal("resource.image"),
  image: MediaDomainSchema,
});

export const ResourceCtaBlockDomainSchema = z.object({
  type: z.literal("resource.cta"),
  title: z.string().optional(),
  paragraph: z.string().optional(),
  cta: ResourceBlockCtaSchema, // обязателен
});

export const ResourceRelatedCardsBlockDomainSchema = z.object({
  type: z.literal("resource.related-resources"),
  title: z.string().optional(),
  paragraph: z.string().optional(),
  cards: z.array(ResourceRelatedCardDomainSchema),
  auto_mode: z.boolean().nullable().optional(),
});

export const ResourceQuoteBlockDomainSchema = z.object({
  type: z.literal("resource.quote"),
  job: z.union([z.string(), z.undefined()]),
  name: z.union([z.string(), z.undefined()]),
  paragraph: z.union([z.string(), z.undefined()]),
});

export const ResourceVideoBlockDomainSchema = z.object({
  type: z.literal("resource.video"),
  title: z.union([z.string(), z.undefined()]),
  description: z.union([z.string(), z.undefined()]),
  url: z.string().optional(),
});

export const ResourceAdditionalBlockDomainSchema = z.object({
  type: z.literal("resource.additional-info"),
  title: z.string().optional(),
  info_links: z.array(
    z.looseObject({
      url: z.string(),
      label: z.string(),
    }),
  ),
});

// общий union
export const ResourceBlockDomainSchema = z.discriminatedUnion("type", [
  ResourceRichTextBlockDomainSchema,
  ResourceImageBlockDomainSchema,
  ResourceCtaBlockDomainSchema,
  ResourceRelatedCardsBlockDomainSchema,
  ResourceQuoteBlockDomainSchema,
  ResourceVideoBlockDomainSchema,
  ResourceAdditionalBlockDomainSchema,
]);

export type ResourceBlockDomain = z.infer<typeof ResourceBlockDomainSchema>;

// RAW -> DOMAIN (rename + normalize)
export const ResourceBlockSchema = ResourceBlockRawSchema.transform((b) => {
  let normalized: ResourceBlockDomain;

  switch (b.__component) {
    case "resource.rich-text":
      normalized = {
        type: "resource.rich-text" as const,
        title: b.title ?? undefined,
        content: b.content ?? [], // если бывает пусто
      };
      break;

    case "resource.image":
      if (!b.image) throw new Error("resource.image requires image");
      normalized = {
        title: b.title ?? undefined,
        description: b.description ?? undefined,
        type: "resource.image" as const,
        image: MediaSchema.parse(b.image),
      };
      break;

    case "resource.cta":
      normalized = {
        type: "resource.cta" as const,
        title: b.title ?? undefined,
        paragraph: b.paragraph ?? undefined,
        cta: b.cta ?? [], // или сделай required и throw, см ниже
      };
      break;

    case "resource.related-resources":
      normalized = {
        type: "resource.related-resources" as const,
        title: b.title ?? undefined,
        paragraph: b.paragraph ?? undefined,
        cards: ResourceRelatedCardsSchema.parse(b.cards ?? []),
        auto_mode: b.auto_mode ?? undefined,
      };
      break;
    case "resource.quote":
      normalized = {
        type: "resource.quote" as const,
        name: b.name ?? undefined,
        job: b.job ?? undefined,
        paragraph: b.paragraph ?? undefined,
      };
      break;
    case "resource.video":
      normalized = {
        type: "resource.video" as const,
        title: b.title ?? undefined,
        description: b.description ?? undefined,
        url: b.url,
      };
      break;
    case "resource.additional-info":
      normalized = {
        type: "resource.additional-info" as const,
        title: b.title ?? undefined,
        info_links: b.info_links ?? [],
      };
      break;

    default:
      throw new Error(`Unknown block component: ${b.__component}`);
  }

  return ResourceBlockDomainSchema.parse(normalized);
});

export const ResourceBlocksSchema = z.array(ResourceBlockSchema);

/* ============================================================================
   LANDING
============================================================================ */

export const ResourceLandingRawSchema = z.looseObject({
  title: z.string(),
  paragraph: z.string().nullable(),
  seo: SeoSchema,
});

export const ResourceLandingDomainSchema = z.object({
  title: z.string(),
  paragraph: z.union([z.string(), z.undefined()]),
  seo: SeoDomainSchema,
});

export const LandingSchema = StrapiResponse(ResourceLandingRawSchema)
  .transform((res) => ({
    title: res.data.title,
    paragraph: res.data.paragraph ?? undefined, // null -> undefined
    seo: res.data.seo,
  }))
  .pipe(ResourceLandingDomainSchema);

/* ============================================================================
   LIST
============================================================================ */

export const ResourceListRawSchema = z.looseObject({
  cover: MediaRawSchema,
  title: z.string(),
  date: z.string(),
  excerpt: z.string().nullable(),
  slug: z.string(),
  tags: z.array(TagSchema).optional(),
  type: ResourceRelatedTypeSchema,
});

export const ResourceListDomainItemSchema = z.object({
  cover: MediaDomainSchema,
  title: z.string(),
  date: z.string(),
  excerpt: z.union([z.string(), z.undefined()]),
  slug: z.string(),
  tags: z.array(TagSchema),
  type: ResourceRelatedTypeSchema,
});

export const ListSchema = StrapiCollection(ResourceListRawSchema)
  .transform((res) =>
    res.data.map((r) => ({
      cover: MediaSchema.parse(r.cover),
      title: r.title,
      date: r.date,
      excerpt: r.excerpt ?? undefined,
      slug: r.slug,
      tags: r.tags ?? [],
      type: r.type,
    })),
  )
  .pipe(z.array(ResourceListDomainItemSchema));

/* ============================================================================
   SLUG (DETAIL)
   Важно: ожидаем непустой массив и берём первый элемент.
============================================================================ */

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
});

// ответ: data: ResourceSlugRawSchema[]
export const ResourceSlugResponseRawSchema = StrapiResponse(
  z.array(ResourceSlugRawSchema).min(1),
);

// DOMAIN slug
export const ResourceSlugDomainSchema = z.object({
  cover: MediaDomainSchema,
  title: z.string(),
  date: z.string(),
  excerpt: z.union([z.string(), z.undefined()]), // null -> undefined
  slug: z.string(),
  tags: z.array(TagSchema),
  blocks: z.array(ResourceBlockDomainSchema),
  seo: SeoSchema,
  type: ResourceRelatedTypeSchema,
});

export const SlugSchema = ResourceSlugResponseRawSchema.transform(
  (res) => res.data[0],
)
  .transform((data) => ({
    cover: data.cover ? MediaSchema.parse(data.cover) : undefined,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt ?? undefined,
    slug: data.slug,
    tags: data.tags ?? [],
    blocks: (data.blocks ?? []).map((b) => ResourceBlockSchema.parse(b)),
    seo: data.seo,
    type: data.type,
  }))
  .pipe(ResourceSlugDomainSchema);

/* ============================================================================
   CTA
============================================================================ */

export const ResourceCtaRawSchema = z.looseObject({
  url: z.string(),
  label: z.string(),
});

export const ResourceCtaDomainSchema = z.object({
  url: z.string(),
  label: z.string(),
});

export const CtaSchema = StrapiCollection(ResourceCtaRawSchema)
  .transform((res) => res.data)
  .pipe(z.array(ResourceCtaDomainSchema));

/* ============================================================================
   QUOTE RESOURCES
============================================================================ */

/* ============================================================================
   VALIDATION HELPER
============================================================================ */

export function parseOrThrow<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
): z.infer<T> {
  const r = schema.safeParse(data);
  if (!r.success) {
    // дерево удобно, когда вложенные структуры
    console.error(z.treeifyError(r.error));
    throw new Error("Invalid API response");
  }
  return r.data;
}
