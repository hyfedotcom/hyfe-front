import StrapiFetch from "@/core/strapi/strapiFetch";
import { teamItemQuery, teamyLandingQuer } from "./team.query";
import {
  parseOrThrow,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import {
  CareersLandingForBuildSchema,
  MemberForBuidSchema,
} from "../schema/team.schema";
import { buildSections } from "../utils/buildSections";

export async function getTeam() {
  const [landingRaw, membersRaw] = await Promise.all([
    StrapiFetch({
      path: "/api/team-landing",
      query: teamyLandingQuer,
      tags: ["page:team-landing"],
    }),
    StrapiFetch({
      path: "/api/teams",
      query: teamItemQuery,
      tags: ["item:team"],
    }),
  ]);

  const landing = parseOrThrow(
    StrapiCollectionSchema(CareersLandingForBuildSchema),
    landingRaw,
  );

  const members = parseOrThrow(
    StrapiCollectionSchema(MemberForBuidSchema),
    membersRaw,
  );
  if (!members || !landing || !landing.groupOrder) {
    return null;
  }

  const sections = buildSections({
    groupOrder: landing.groupOrder,
    items: members,
  });

  return {
    title: landing.title,
    paragraph: landing.paragraph,
    seo: landing.seo,
    sections,
  };
}
