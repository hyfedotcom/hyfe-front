import type {
  ResourceBlockType,
  ResourceBlockRenderable,
  ResourceCardType,
  ResourceType,
} from "@/features/resources/data/resources.types";
import { getResourcesList } from "@/features/resources/data/api/getResourcesList";
import { getResourcesBySlugs } from "@/features/resources/data/api/getResourcesBySlugs";

type RelatedBlock = Extract<
  ResourceBlockType,
  { type: "resource.related-resources" }
>;

const isRelatedBlock = (block: ResourceBlockType): block is RelatedBlock =>
  block.type === "resource.related-resources";

export async function buildResourceDetailsBlocks({
  blocks,
  resourceType,
}: {
  blocks: ResourceBlockType[];
  resourceType: ResourceType;
}): Promise<ResourceBlockRenderable[]> {
  const relatedBlocks = blocks.filter(isRelatedBlock);
  if (!relatedBlocks.length) return blocks as ResourceBlockRenderable[];

  const needsAutoList = relatedBlocks.some((block) => {
    const picked = (block.cards ?? []).filter((card) => card.slug);
    return block.auto_mode || picked.length === 0;
  });

  const autoList = needsAutoList
    ? (await getResourcesList({ type: resourceType }))?.list ?? []
    : [];

  const manualSlugsByType = new Map<ResourceType, Set<string>>();

  relatedBlocks.forEach((block) => {
    const picked = (block.cards ?? []).filter((card) => card.slug);
    if (block.auto_mode || picked.length === 0) return;

    picked.forEach((card) => {
      const key = card.resource_type as ResourceType;
      const set = manualSlugsByType.get(key) ?? new Set<string>();
      set.add(card.slug!);
      manualSlugsByType.set(key, set);
    });
  });

  const manualEntries = await Promise.all(
    [...manualSlugsByType.entries()].map(async ([type, slugsSet]) => {
      const slugs = [...slugsSet];
      const list = await getResourcesBySlugs({ type, slugs });
      return [type, list] as const;
    }),
  );

  const cardsByTypeSlug = new Map<ResourceType, Map<string, ResourceCardType>>(
    manualEntries.map(([type, list]) => [
      type,
      new Map(list.map((item) => [item.slug, item])),
    ]),
  );

  return blocks.map((block) => {
    if (!isRelatedBlock(block)) return block;

    const picked = (block.cards ?? []).filter((card) => card.slug);
    const shouldAuto = block.auto_mode || picked.length === 0;

    const resolvedCards = shouldAuto
      ? autoList
      : (picked
          .map((card) =>
            cardsByTypeSlug
              .get(card.resource_type as ResourceType)
              ?.get(card.slug!),
          )
          .filter(Boolean) as ResourceCardType[]);

    return {
      ...block,
      resolvedCards: resolvedCards.slice(0, 4),
    };
  });
}
