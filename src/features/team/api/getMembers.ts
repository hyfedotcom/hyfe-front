import StrapiFetch from "@/core/strapi/strapiFetch";
import { memberBySlugQuery } from "./team.query";
import { StrapiCollectionSchema } from "@/features/shared/schema/strapi.schema";
import { parseOrThrow } from "@/features/resources";
import { MembersSchema } from "../schema/team.schema";

export async function getMember(slug: string) {
  const raw = await StrapiFetch({
    path: "/api/teams",
    query: memberBySlugQuery(slug),
    tags: [`member:${slug}`, "team:members:all"],
  });

  const list = parseOrThrow(StrapiCollectionSchema(MembersSchema), raw);

  return list[0] ?? null;
}
