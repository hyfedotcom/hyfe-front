import {
  FeedBuilder,
  getResourceFeedKey,
} from "@/features/resources/utils/FeedBuilder";
import type {
  PageSectionsType,
  ResourceFeedManySectionType,
  TabbedResourceFeedSectionType,
} from "../schema/pageBuilder";
import type { PageBuilderSection } from "../components/pageBuilder.types";
import { buildResourceFeedManySections } from "./buildResourceFeedMany";
import { buildTabbedResourceFeedSections } from "./buildTabbedResourceFeed";
import {
  isResourceFeed,
  isResourceFeedMany,
  isTabbedResourceFeed,
} from "./pageGuards";

export async function hydratePageSections(
  sections: PageSectionsType,
): Promise<PageBuilderSection[]> {
  const feedSections = sections.filter(isResourceFeed);
  const feedManyEntries = sections
    .map((section, index) =>
      isResourceFeedMany(section) ? { index, section } : null,
    )
    .filter(
      (
        entry,
      ): entry is { index: number; section: ResourceFeedManySectionType } =>
        Boolean(entry),
    );
  const tabbedEntries = sections
    .map((section, index) =>
      isTabbedResourceFeed(section) ? { index, section } : null,
    )
    .filter(
      (
        entry,
      ): entry is { index: number; section: TabbedResourceFeedSectionType } =>
        Boolean(entry),
    );

  if (!feedSections.length && !feedManyEntries.length && !tabbedEntries.length) {
    return sections;
  }

  let nextSections = sections as PageBuilderSection[];

  if (feedSections.length) {
    const built = await FeedBuilder({ sections: feedSections });
    const byKey = new Map(
      built.map((section) => [getResourceFeedKey(section), section] as const),
    );
    nextSections = nextSections.map((section) =>
      isResourceFeed(section)
        ? byKey.get(getResourceFeedKey(section)) ?? section
        : section,
    );
  }

  if (feedManyEntries.length) {
    const feedManySections = feedManyEntries.map((entry) => entry.section);
    const builtMany = await buildResourceFeedManySections(feedManySections);
    const byIndex = new Map(
      feedManyEntries.map((entry, i) => [entry.index, builtMany[i]] as const),
    );
    nextSections = nextSections.map((section, index) =>
      byIndex.get(index) ?? section,
    );
  }

  if (tabbedEntries.length) {
    const tabbedSections = tabbedEntries.map((entry) => entry.section);
    const builtTabbed = buildTabbedResourceFeedSections(tabbedSections);
    const byIndex = new Map(
      tabbedEntries.map((entry, i) => [entry.index, builtTabbed[i]] as const),
    );
    nextSections = nextSections.map((section, index) =>
      byIndex.get(index) ?? section,
    );
  }

  return nextSections;
}
