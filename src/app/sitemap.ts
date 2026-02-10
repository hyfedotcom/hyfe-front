import type { MetadataRoute } from "next";
import { publicEnv } from "@/core/env.public";
import { getSlugs } from "@/features/shared/api/getSlugs";
import { getResourceSlugs } from "@/features/resources/data/api/getResourceSlugs";
import { RESOURCE_TYPES } from "@/features/resources/data/api/resourceType";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "",
    "/science-resources",
    "/company-resources",
    "/faq",
    "/team",
    "/advisors",
    "/careers",
    "/solutions",
  ];

  const resourceTypePaths = RESOURCE_TYPES.map((type) => `/${type}`);

  const [
    resourceSlugGroups,
    teamSlugs,
    advisorSlugs,
    careerSlugs,
    solutionSlugs,
    privacyTermSlugs,
  ] = await Promise.all([
    Promise.all(
      RESOURCE_TYPES.map(async (type) => ({
        type,
        slugs: await getResourceSlugs(type),
      })),
    ),
    getSlugs("teams"),
    getSlugs("advisors"),
    getSlugs("vacancies-items"),
    getSlugs("solutions"),
    getSlugs("privacy-term-items"),
  ]);

  const resourceDetailPaths = resourceSlugGroups.flatMap(({ type, slugs }) =>
    slugs.map((slug) => `/${type}/${slug}`),
  );

  const dynamicPaths = [
    ...teamSlugs.map((slug) => `/team/${slug}`),
    ...advisorSlugs.map((slug) => `/advisors/${slug}`),
    ...careerSlugs.map((slug) => `/careers/${slug}`),
    ...solutionSlugs.map((slug) => `/solutions/${slug}`),
    ...privacyTermSlugs.map((slug) => `/${slug}`),
  ];

  const allPaths = [
    ...staticPaths,
    ...resourceTypePaths,
    ...resourceDetailPaths,
    ...dynamicPaths,
  ];

  const uniquePaths = Array.from(new Set(allPaths));

  return uniquePaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));
}
