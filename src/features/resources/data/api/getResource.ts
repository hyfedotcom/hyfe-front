import StrapiFetch from "@/core/strapi/strapiFetch";
import { isValidCmsPathSegment } from "@/shared/utils/isValidCmsPathSegment";
import { resourceBySlug } from "../resources.query";
import { parseOrThrow, SlugSchema } from "../resources.schema";
import { resolveResourceItemsType } from "./resourceType";

function hasEmptyDataArray(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const data = (value as { data?: unknown }).data;
  return Array.isArray(data) && data.length === 0;
}

export async function getResource({
  type,
  slug,
  isDraft = false,
}: {
  type: string;
  slug: string;
  isDraft?: boolean;
}) {
  if (!isValidCmsPathSegment(type) || !isValidCmsPathSegment(slug)) {
    return null;
  }

  const itemsType = resolveResourceItemsType(type);
  const isPublication = itemsType === "publications";
  const resourceData = await StrapiFetch<unknown>({
    path: `/api/${itemsType}`,
    query: resourceBySlug(slug, isDraft, isPublication),
    tags: [`resource:${itemsType}-${slug}`],
    isDraft: isDraft ?? undefined,
  });

  if (hasEmptyDataArray(resourceData)) {
    return null;
  }

  const resource = parseOrThrow(SlugSchema, resourceData);

  return resource;
}
