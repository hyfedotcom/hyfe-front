import StrapiFetch from "@/strapi/strapiFetch";
import { resourceBySlug } from "../resources.query";
import { parseOrThrow, SlugSchema } from "../resources.schema";

export async function getResource({
  type,
  slug,
  isDraft = false,
}: {
  type: string;
  slug: string;
  isDraft?: boolean;
}) {
  if (type === "news") type = "news-items";
  if (type === "cough-news") type = "cough-news-items";
  const resourceData = await StrapiFetch<unknown>({
    path: `/api/${type}`,
    query: resourceBySlug(slug, isDraft),
    tags: [`resource:${type}-${slug}`],
    isDraft: isDraft ?? undefined,
  });
  console.log(resourceData);
  const resource = parseOrThrow(SlugSchema, resourceData);
  console.log(resource);
  return resource;
}
