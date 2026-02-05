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
    tags: ["team:slugs"],
  });

  const items = parseOrThrow(StrapiCollectionSchema(SlugsSchema), raw);
  return items.map((m) => m.slug);
}
