import StrapiFetch from "@/core/strapi/strapiFetch";
import { isValidCmsPathSegment } from "@/shared/utils/isValidCmsPathSegment";
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
  if (!isValidCmsPathSegment(slug)) {
    return null;
  }

  const solutionSkeletonRaw = await StrapiFetch({
    path: `/api/solutions`,
    query: pageSolutionSkeleton(slug),
    tags: [`solution:${slug}`],
  });

  const skeletonItems = (solutionSkeletonRaw as solutionSkeleton | null)?.data;
  const firstSkeleton = Array.isArray(skeletonItems) ? skeletonItems[0] : undefined;

  if (!firstSkeleton || !Array.isArray(firstSkeleton.sections)) {
    return null;
  }

  const sectionsOrder = firstSkeleton.sections.map((e) => e.__component);

  const solutionRaw = await StrapiFetch({
    path: `/api/solutions`,
    query: SolutionQueryBuild(slug, sectionsOrder),
    tags: [`solution:${slug}`],
  });

  if (!solutionRaw) {
    return null;
  }

  const solutionFirst = parseOrThrow(SolutionCollectionSchema, solutionRaw);
  if (!Array.isArray(solutionFirst) || solutionFirst.length === 0) {
    return null;
  }

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
