import { getResourcesList, type ResourceCardListType } from "@/features/resources";
import type { ResourceFeedManySectionType } from "../schema/pageBuilder";
import type { ResourceFeedManySectionRenderable } from "../components/pageBuilder.types";

export async function buildResourceFeedManySections(
  sections: ResourceFeedManySectionType[],
): Promise<ResourceFeedManySectionRenderable[]> {
  if (!sections.length) return [];

  const uniqueTypes = Array.from(
    new Set(
      sections.flatMap((section) =>
        section.resourceList.map((item) => item.typeResource),
      ),
    ),
  );

  const entries = await Promise.all(
    uniqueTypes.map(async (type) => {
      const res = await getResourcesList({ type });
      return [type, res?.list ?? []] as const;
    }),
  );

  const byType = new Map(entries);

  return sections.map((section) => {
    const resources = section.resourceList.map((item) => {
      const list = byType.get(item.typeResource) ?? [];
      const filtered = item.tag
        ? list.filter((entry) => entry.tags?.some((t) => t.tag === item.tag))
        : list;
      return filtered.slice(0, 4) as ResourceCardListType;
    });

    return {
      ...section,
      resources,
    };
  });
}
