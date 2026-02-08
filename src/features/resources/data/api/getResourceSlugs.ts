import StrapiFetch from "@/core/strapi/strapiFetch";
import { SlugsQuery } from "@/features/shared/api/query";
import {
  parseOrThrow,
  SlugsSchema,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import { resolveResourceItemsType } from "./resourceType";

export async function getResourceSlugs(type: string) {
  const itemsType = resolveResourceItemsType(type);
  const raw = await StrapiFetch({
    path: `/api/${itemsType}`,
    query: SlugsQuery,
    tags: [`resource:${itemsType}-slugs`],
  });

  const items = parseOrThrow(StrapiCollectionSchema(SlugsSchema), raw);
  return items.map((item) => item.slug);
}
