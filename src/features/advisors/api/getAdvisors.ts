import StrapiFetch from "@/core/strapi/strapiFetch";
import { advisorsItemQuery, advisorsLandingQuer } from "./advisors.query";
import {
  parseOrThrow,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import {
  AdvisorMemberForBuidSchema,
  AdvisorsLandingForBuildSchema,
} from "../schema/advisors.schema";

export async function getAdvisors() {
  const [landingRaw, membersRaw] = await Promise.all([
    StrapiFetch({
      path: "/api/advisors-landing",
      query: advisorsLandingQuer,
      tags: ["team:landing"],
    }),
    StrapiFetch({
      path: "/api/advisors",
      query: advisorsItemQuery,
      tags: ["team:members:list"],
    }),
  ]);

  const landing = parseOrThrow(
    StrapiCollectionSchema(AdvisorsLandingForBuildSchema),
    landingRaw,
  );
  console.log(membersRaw);
  const advisors = parseOrThrow(
    StrapiCollectionSchema(AdvisorMemberForBuidSchema),
    membersRaw,
  );
  console.log(membersRaw);
  if (!advisors || !landing) {
    return null;
  }

  return {
    title: landing.title,
    paragraph: landing.paragraph,
    seo: landing.seo,
    advisors,
  };
}
