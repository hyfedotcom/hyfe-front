import StrapiFetch from "@/core/strapi/strapiFetch";
import { ListSchema, parseOrThrow } from "@/features/resources";
import { resourceList } from "@/features/resources";
import { resolveResourceItemsType } from "./resourceType";

export async function getResourcesBySlugs({
  type,
  slugs,
}: {
  type: string;
  slugs: string[];
}) {
  if (!slugs.length) return [];

  const itemsType = resolveResourceItemsType(type);
  const listData = await StrapiFetch<unknown>({
    path: `/api/${itemsType}`,
    query: {
      ...resourceList,
      filters: { slug: { $in: slugs } },
      pagination: { pageSize: slugs.length },
    },
    tags: [`resource:${itemsType}-slugs`],
  });

  const list = parseOrThrow(ListSchema, listData);
  const order = new Map(slugs.map((slug, index) => [slug, index] as const));
  return list.sort((a, b) => {
    const aOrder = order.get(a.slug) ?? 0;
    const bOrder = order.get(b.slug) ?? 0;
    return aOrder - bOrder;
  });
}
