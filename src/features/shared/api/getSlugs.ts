import StrapiFetch from "@/core/strapi/strapiFetch";
import { SlugsQuery } from "@/features/shared/api/query";
import {
  SlugsSchema,
  StrapiCollectionSchema,
  parseOrThrow,
} from "@/features/shared/schema/strapi.schema";

export async function getSlugs(slug: string) {
  const raw = await StrapiFetch({
    path: `/api/${slug}`,
    query: SlugsQuery,
    // keep legacy broad tag + add per-collection tag for precise invalidation
    tags: ["team:slugs", `slugs:${slug}`],
  });

  const items = parseOrThrow(StrapiCollectionSchema(SlugsSchema), raw);
  return items.map((m) => m.slug);
}
