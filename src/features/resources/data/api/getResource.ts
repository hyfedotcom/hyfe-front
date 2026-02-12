import StrapiFetch from "@/core/strapi/strapiFetch";
import { resourceBySlug } from "../resources.query";
import { parseOrThrow, SlugSchema } from "../resources.schema";
import { resolveResourceItemsType } from "./resourceType";

export async function getResource({
  type,
  slug,
  isDraft = false,
}: {
  type: string;
  slug: string;
  isDraft?: boolean;
}) {
  const itemsType = resolveResourceItemsType(type);
  const isPublication = itemsType === "publications";
  const resourceData = await StrapiFetch<unknown>({
    path: `/api/${itemsType}`,
    query: resourceBySlug(slug, isDraft, isPublication),
    tags: [`resource:${itemsType}-${slug}`],
    isDraft: isDraft ?? undefined,
  });

  const resource = parseOrThrow(SlugSchema, resourceData);

  return resource;
}
