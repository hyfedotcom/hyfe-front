import StrapiFetch from "@/core/strapi/strapiFetch";
import {
  parseOrThrow,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import { z } from "zod";
import { privacyTermIndexableSlugsQuery } from "./privacyTerms.query";

const PrivacyTermSitemapItemSchema = z.looseObject({
  slug: z.string(),
  seo: z
    .looseObject({
      meta_robots: z.string().nullish(),
    })
    .nullish(),
});

const PrivacyTermSitemapItemsSchema = z.array(PrivacyTermSitemapItemSchema);

const hasNoIndex = (metaRobots?: string | null) =>
  /\bnoindex\b/i.test(metaRobots ?? "");

export async function getIndexablePrivacyTermSlugs() {
  const raw = await StrapiFetch<unknown>({
    path: "/api/privacy-term-items",
    query: privacyTermIndexableSlugsQuery,
    tags: ["privacy-term:all", "slugs:privacy-term-items"],
  });

  const items = parseOrThrow(
    StrapiCollectionSchema(PrivacyTermSitemapItemsSchema),
    raw,
  );

  return items
    .filter((item) => !hasNoIndex(item.seo?.meta_robots?.toLocaleLowerCase()))
    .map((item) => item.slug);
}
