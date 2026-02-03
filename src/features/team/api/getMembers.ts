import StrapiFetch from "@/core/strapi/strapiFetch";
import { teamItemQuery } from "./team.query";
import { parseOrThrow } from "@/features/resources";
import { StrapiCollectionSchema } from "@/features/shared/schema/strapi.schema";
import { MemberForBuidSchema } from "../schema/team.schema";
import { toSlug } from "@/shared/utils/toSlug";

export async function getMember(slug: string) {
  const membersRaw = await StrapiFetch({
    path: "/api/teams",
    query: teamItemQuery,
    tags: ["item:team"],
  });

  const members = parseOrThrow(
    StrapiCollectionSchema(MemberForBuidSchema),
    membersRaw,
  );

  return members.find((m) => toSlug(m.name) === slug);
}
