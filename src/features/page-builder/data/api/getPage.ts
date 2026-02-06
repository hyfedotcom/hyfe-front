import StrapiFetch from "@/core/strapi/strapiFetch";
import { pageBuilder } from "../query";
import { parseOrThrow } from "@/features/shared/schema/strapi.schema";
import { PageCollectionSchema } from "../schema/pageBuilder";
import {
  FeedBuilder,
  getResourceFeedKey,
} from "@/features/resources/utils/FeedBuilder";
import type { ResourceFeedSectionType } from "@/features/resources";

const isResourceFeed = (section: {
  type?: string;
}): section is ResourceFeedSectionType => section.type === "resource-feed";

export async function getPage({ type, slug }: { type?: string; slug: string }) {
  const url = type ? `${type}/${slug}` : slug;
  const data = await StrapiFetch<unknown>({
    path: `/api/${url}`,
    query: pageBuilder,
    tags: [`page:${slug}`],
  });
  const page = parseOrThrow(PageCollectionSchema, data);
  if (!page?.sections?.length) return page;

  const feedSections = page.sections.filter(isResourceFeed);
  if (!feedSections.length) return page;

  const built = await FeedBuilder({ sections: feedSections });
  const byKey = new Map(built.map((s) => [getResourceFeedKey(s), s] as const));

  const nextSections = page.sections.map((s) =>
    isResourceFeed(s) ? byKey.get(getResourceFeedKey(s)) ?? s : s,
  );

  return { ...page, sections: nextSections };
}
