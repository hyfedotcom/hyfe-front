import StrapiFetch from "@/core/strapi/strapiFetch";
import { pageSolution } from "./query";
import { parseOrThrow } from "@/features/shared/schema/strapi.schema";
import { SolutionCollectionSchema } from "../schema/hero/strapi.schema";
import {
  FeedBuilder,
  getResourceFeedKey,
} from "@/features/resources/utils/FeedBuilder";
import type { PageBuilderSection } from "@/features/page-builder/data/components/pageBuilder.types";
import type { ResourceFeedSectionType } from "@/features/resources";

const isResourceFeed = (s: PageBuilderSection): s is ResourceFeedSectionType =>
  s.type === "resource-feed";

export default async function getSolutionPage({ slug }: { slug: string }) {
  const pageData = await StrapiFetch({
    path: `/api/solutions`,
    query: pageSolution(slug),
    tags: [`solution:${slug}`],
  });

  const page = parseOrThrow(SolutionCollectionSchema, pageData);
  const page0 = page[0];

  const sections: PageBuilderSection[] = page0.sections ?? [];

  const feedSections = sections.filter(isResourceFeed);
  if (!feedSections.length) return page0;

  const built = await FeedBuilder({ sections: feedSections });
  const byKey = new Map(built.map((s) => [getResourceFeedKey(s), s] as const));

  const nextSections: PageBuilderSection[] = sections.map((s) =>
    isResourceFeed(s) ? byKey.get(getResourceFeedKey(s)) ?? s : s,
  );

  return { ...page0, sections: nextSections };
}
