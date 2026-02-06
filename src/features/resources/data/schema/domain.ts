import { z } from "zod";
import { publicEnv } from "@/core/env.public";
import {
  StrapiCollection,
  StrapiResponse,
} from "@/features/shared/schema/strapi.schema";
import {
  MediaRawSchema,
  SeoRawSchema,
  TagSchema,
  ResourceBlockContentSchema,
  ResourceBlockCtaSchema,
  ResourceRelatedTypeSchema,
  ResourceRelatedCardRawSchema,
  ResourceBlockRawSchema,
  ResourceLandingRawSchema,
  ResourceListRawSchema,
  ResourceSlugRawSchema,
  ResourceCtaRawSchema,
} from "./raw";

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
   MEDIA (DOMAIN)
============================================================================ */

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
   SEO (DOMAIN)
============================================================================ */

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

/* ============================================================================
   RELATED TYPES (DOMAIN)
============================================================================ */

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
      case "insights":
        return {
          resource_type: r.resource_type,
          slug: r.insight?.slug,
        };
      case "news":
        return {
          resource_type: r.resource_type,
          slug: r.news?.slug,
        };
      case "cough-news":
        return {
          resource_type: r.resource_type,
          slug: r.cough_news?.slug,
        };
      case "white-papers":
        return {
          resource_type: r.resource_type,
          slug: r.white_papers?.slug,
        };

      default:
        throw new Error(`Unknown block component: ${r.resource_type}`);
    }
  },
).pipe(ResourceRelatedCardDomainSchema);

export const ResourceRelatedCardsSchema = z.array(ResourceRelatedCardSchema);

// Если тебе нужно “строго”: не рендерить карточки без slug — просто используй это
export const ResourceRelatedCardsSchemaNonEmpty =
  ResourceRelatedCardsSchema.transform((cards) =>
    cards.filter((c) => Boolean(c.slug)),
  );

/* ============================================================================
   BLOCKS (DOMAIN)
============================================================================ */

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
  z.object({
    type: z.literal("resource.rich-text"),
    title: z.string().optional(),
    content: ResourceBlockContentSchema,
  }),
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

export const ResourceLandingDomainSchema = z.object({
  title: z.string(),
  paragraph: z.union([z.string(), z.undefined()]),
  seo: SeoDomainSchema,
});

export const LandingSchema = StrapiResponse(ResourceLandingRawSchema)
  .transform((res) => ({
    title: res.data.title,
    paragraph: res.data.paragraph ?? undefined, // null -> undefined
    seo: SeoSchema.parse(res.data.seo),
  }))
  .pipe(ResourceLandingDomainSchema);

/* ============================================================================
   LIST
============================================================================ */

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
  seo: SeoDomainSchema,
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
    seo: SeoSchema.parse(data.seo),
    type: data.type,
  }))
  .pipe(ResourceSlugDomainSchema);

/* ============================================================================
   CTA
============================================================================ */

export const ResourceCtaDomainSchema = z.object({
  url: z.string(),
  label: z.string(),
});

export const CtaSchema = StrapiCollection(ResourceCtaRawSchema)
  .transform((res) => res.data)
  .pipe(z.array(ResourceCtaDomainSchema));

/* ============================================================================
   RESOURCES FEED
============================================================================ */

export const ResourceFeedTypeSchema = ResourceRelatedTypeSchema;

export const ResourceFeed = z
  .looseObject({
    __component: z.literal("resource.resource-feed"),
    title: z.string(),
    paragraph: z.string().nullable(),
    type: ResourceFeedTypeSchema,
    tag: TagSchema.nullish(),
  })
  .transform((res) => ({
    type: "resource-feed" as const,
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    typeResource: res.type,
    tag: res.tag?.tag ?? undefined,
  }));

export const ResourceFeedSectionSchema = ResourceFeed;

export const ResourceFeedSchema = z
  .looseObject({
    title: z.string(),
    paragraph: z.string().nullable(),
    sections: z.array(ResourceFeedSectionSchema),
  })
  .transform((res) => ({
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    sections: res.sections,
  }));

export type ResourceFeedType = z.infer<typeof ResourceFeedTypeSchema>;
export type ResourceFeedSectionType = z.infer<typeof ResourceFeedSectionSchema>;
