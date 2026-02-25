import { serverEnv } from "@/core/env.server";
import { getIndexablePrivacyTermSlugs } from "@/features/privacy-terms";
import { getResourceSlugs } from "@/features/resources/data/api/getResourceSlugs";
import { RESOURCE_TYPES } from "@/features/resources/data/api/resourceType";
import { getSlugs } from "@/features/shared/api/getSlugs";
import type { MetadataRoute } from "next";

export const revalidate = 86400;

const STATIC_ROUTES = [
  "/",
  "/about",
  "/faq",
  "/science-resources",
  "/company-resources",
  "/careers",
  "/team",
  "/advisors",
];

function normalizeSiteUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function toAbsoluteUrl(siteUrl: string, path: string) {
  return `${siteUrl}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = normalizeSiteUrl(serverEnv.NEXT_PUBLIC_SITE_URL);
  const now = new Date();
  const urls = new Set<string>();

  for (const path of STATIC_ROUTES) {
    urls.add(toAbsoluteUrl(siteUrl, path));
  }

  const [resourceSlugsByType, solutionSlugs, careerSlugs, teamSlugs, advisorSlugs, legalSlugs] =
    await Promise.all([
      Promise.all(RESOURCE_TYPES.map((type) => getResourceSlugs(type))),
      getSlugs("solutions"),
      getSlugs("vacancies-items"),
      getSlugs("teams"),
      getSlugs("advisors"),
      getIndexablePrivacyTermSlugs(),
    ]);

  for (const type of RESOURCE_TYPES) {
    urls.add(toAbsoluteUrl(siteUrl, `/${type}`));
  }

  for (const legalSlug of legalSlugs) {
    urls.add(toAbsoluteUrl(siteUrl, `/${legalSlug}`));
  }

  for (const slug of solutionSlugs) {
    urls.add(toAbsoluteUrl(siteUrl, `/solutions/${slug}`));
  }

  for (const slug of careerSlugs) {
    urls.add(toAbsoluteUrl(siteUrl, `/careers/${slug}`));
  }

  for (const slug of teamSlugs) {
    urls.add(toAbsoluteUrl(siteUrl, `/team/${slug}`));
  }

  for (const slug of advisorSlugs) {
    urls.add(toAbsoluteUrl(siteUrl, `/advisors/${slug}`));
  }

  RESOURCE_TYPES.forEach((type, typeIndex) => {
    for (const slug of resourceSlugsByType[typeIndex] ?? []) {
      urls.add(toAbsoluteUrl(siteUrl, `/${type}/${slug}`));
    }
  });

  return [...urls]
    .sort((a, b) => a.localeCompare(b))
    .map((url) => ({
      url,
      lastModified: now,
    }));
}
