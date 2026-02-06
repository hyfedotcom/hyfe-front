import { getResourcesList } from "../data/api/getResourcesList";
import { ResourceFeedSectionType } from "../data/resources.schema";

import { ResourceFeedType } from "../data/resources.schema"; // enum infer
import type { ResourceCardType } from "@/features/resources";

export type ResourceFeedSectionWithItems = ResourceFeedSectionType & {
  cards: ResourceCardType[];
};

type FeedKey = `${ResourceFeedType}:${string}`;

const getFeedKey = (section: ResourceFeedSectionType): FeedKey =>
  `${section.typeResource}:${section.tag ?? ""}`;

export function getResourceFeedKey(section: ResourceFeedSectionType) {
  return getFeedKey(section);
}

export async function FeedBuilder({
  sections,
}: {
  sections: ResourceFeedSectionType[];
}): Promise<ResourceFeedSectionWithItems[]> {
  const uniqueTypes = Array.from(
    new Set(sections.map((section) => section.typeResource)),
  );

  const entries = await Promise.all(
    uniqueTypes.map(async (type) => {
      const resourceData = await getResourcesList({ type });
      return [type, resourceData?.list ?? []] as const;
    }),
  );

  const byType = new Map<ResourceFeedType, ResourceCardType[]>(entries);

  return sections.map((section) => {
    const list = byType.get(section.typeResource) ?? [];
    const cards = section.tag
      ? list.filter((item) =>
          item.tags?.some((t) => t.tag === section.tag),
        )
      : list;

    return {
      ...section,
      cards,
    };
  });
}
