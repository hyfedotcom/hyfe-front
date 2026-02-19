import StrapiFetch from "@/core/strapi/strapiFetch";
import { pageSolutionSkeleton, SolutionQueryBuild } from "./query";
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

type solutionSkeleton = {
  data: {
    sections: {
      __component: string;
    }[];
  }[];
};

export default async function getSolutionPage({ slug }: { slug: string }) {
  const solutionSkeletonRaw = await StrapiFetch({
    path: `/api/solutions`,
    query: pageSolutionSkeleton(slug),
    tags: [`solution:${slug}`],
  });

  const secrionsOrder = (
    solutionSkeletonRaw as solutionSkeleton
  ).data[0].sections.map((e) => e.__component);

  const solutionRaw = await StrapiFetch({
    path: `/api/solutions`,
    query: SolutionQueryBuild(slug, secrionsOrder),
    tags: [`solution:${slug}`],
  });

  const solutionFirst = parseOrThrow(SolutionCollectionSchema, solutionRaw);

  const sections: PageBuilderSection[] = solutionFirst[0].sections ?? [];

  const feedSections = sections.filter(isResourceFeed);

  if (!feedSections.length)
    return { seo: solutionFirst[0].seo, sections: sections };

  const built = await FeedBuilder({ sections: feedSections });
  const byKey = new Map(built.map((s) => [getResourceFeedKey(s), s] as const));

  const nextSections: PageBuilderSection[] = sections.map((s) =>
    isResourceFeed(s) ? (byKey.get(getResourceFeedKey(s)) ?? s) : s,
  );

  return { seo: solutionFirst[0].seo, sections: nextSections };
}
