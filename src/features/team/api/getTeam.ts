import StrapiFetch from "@/core/strapi/strapiFetch";
import { teamItemQuery, teamyLandingQuer } from "./team.query";
import {
  parseOrThrow,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import {
  MemberForBuidSchema,
  TeamLandingForBuildSchema,
} from "../schema/team.schema";
import { buildSections } from "../utils/buildSections";

export async function getTeam() {
  const [landingRaw, membersRaw] = await Promise.all([
    StrapiFetch({
      path: "/api/team-landing",
      query: teamyLandingQuer,
      tags: ["team:landing"],
    }),
    StrapiFetch({
      path: "/api/teams",
      query: teamItemQuery,
      tags: ["team:members:list"],
    }),
  ]);

  console.log(landingRaw);
  const landing = parseOrThrow(
    StrapiCollectionSchema(TeamLandingForBuildSchema),
    landingRaw,
  );
  console.log(landing);
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
