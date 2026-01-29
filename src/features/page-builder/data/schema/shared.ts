import { MediaRawSchema, MediaSchema, TagSchema } from "@/features/resources";
import { z } from "zod";

const ResourceRelatedTypeSchema = z.enum([
  "insights",
  "publications",
  "news",
  "white-papers",
  "cough-news",
]);

export const CtaSchema = z.looseObject({
  label: z.string(),
  url: z.string(),
});

export const StatSchema = z.looseObject({
  value: z.string(),
  label: z.string(),
});

export const CardSchema = z.looseObject({
  image: MediaSchema,
  title: z.string(),
  description: z.string().nullable(),
});

export const CardCtaSchema = z.looseObject({
  title: z.string(),
  description: z.string().nullable(),
  cta: z.array(CtaSchema),
  image: MediaSchema,
});

export const CardLinkSchema = z.looseObject({
  title: z.string(),
  description: z.string().nullable(),
  type: ResourceRelatedTypeSchema,
});

const SlugRefSchema = z.looseObject({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().nullable(),
  date: z.string(),
  cover: MediaRawSchema,
  tags: z.array(TagSchema),
  type: z.enum([
    "publications",
    "insights",
    "news",
    "cough-news",
    "white-papers",
  ]),
});

const CardsFeedDomainBase = z
  .object({
    type: z.enum([
      "publications",
      "insights",
      "news",
      "cough-news",
      "white-papers",
    ]),
    cards: z.array(SlugRefSchema),
  })
  .transform((res) => ({
    type: res.type,
    cards: res.cards.map((c) => ({
      slug: c.slug,
      title: c.title,
      excerpt: c.excerpt ?? undefined,
      date: c.date,
      cover: MediaSchema.parse(c.cover),
      tags: c.tags,
      type: c.type
    })),
  }));

export const CardsFeedPublications = z
  .looseObject({
    type: z.literal("publications"),
    publications: z.array(SlugRefSchema),
  })
  .transform((res) =>
    CardsFeedDomainBase.parse({
      type: res.type,
      cards: res.publications,
    }),
  );

export const CardsFeedInsights = z
  .looseObject({
    type: z.literal("insights"),
    insights: z.array(SlugRefSchema),
  })
  .transform((res) =>
    CardsFeedDomainBase.parse({
      type: res.type,
      cards: res.insights,
    }),
  );

export const CardsFeedNews = z
  .looseObject({
    type: z.literal("news"),
    news: z.array(SlugRefSchema),
  })
  .transform((res) =>
    CardsFeedDomainBase.parse({
      type: res.type,
      cards: res.news,
    }),
  );

export const CardsFeedCoughNews = z
  .looseObject({
    type: z.literal("cough-news"),
    cough_news: z.array(SlugRefSchema),
  })
  .transform((res) =>
    CardsFeedDomainBase.parse({
      type: res.type,
      cards: res.cough_news,
    }),
  );

export const CardsFeedWhitePapers = z
  .looseObject({
    type: z.literal("white-papers"),
    white_papers: z.array(SlugRefSchema),
  })
  .transform((res) =>
    CardsFeedDomainBase.parse({
      type: res.type,
      cards: res.white_papers,
    }),
  );

export const CardsFeedItemSchema = z.discriminatedUnion("type", [
  CardsFeedPublications,
  CardsFeedInsights,
  CardsFeedNews,
  CardsFeedCoughNews,
  CardsFeedWhitePapers,
]);

export const CardsFeedListSchema = z.array(CardsFeedItemSchema);

// принимает object | array, отдаёт всегда array
export const CardsFeedMaybeListSchema = z
  .union([CardsFeedItemSchema, CardsFeedListSchema])
  .transform((v) => (Array.isArray(v) ? v : [v]));

export type CardType = z.infer<typeof CardSchema>;
export type CardCtaType = z.infer<typeof CardCtaSchema>;
export type CardLinkType = z.infer<typeof CardLinkSchema>;
export type CardsFeedType = z.infer<typeof CardsFeedItemSchema>;
export type ResourcesTypes = z.infer<typeof ResourceRelatedTypeSchema>;
