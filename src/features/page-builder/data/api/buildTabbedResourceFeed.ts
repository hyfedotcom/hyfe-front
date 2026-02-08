import type { TabbedResourceFeedSectionType } from "../schema/pageBuilder";
import type { TabbedResourceFeedSectionRenderable } from "../components/pageBuilder.types";
import type { ResourceCardListType } from "@/features/resources";

export function buildTabbedResourceFeedSections(
  sections: TabbedResourceFeedSectionType[],
): TabbedResourceFeedSectionRenderable[] {
  return sections.map((section) => ({
    ...section,
    resources: section.cards.map((card) => card.cards as ResourceCardListType),
  }));
}
