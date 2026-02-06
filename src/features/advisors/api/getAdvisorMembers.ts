import StrapiFetch from "@/core/strapi/strapiFetch";
import { advisorBySlugQuery } from "./advisors.query";
import {
  StrapiCollectionSchema,
  parseOrThrow,
} from "@/features/shared/schema/strapi.schema";
import { AdvisorsSchema } from "../schema/advisors.schema";

export async function getAdvisorMember(slug: string) {
  const raw = await StrapiFetch({
    path: "/api/advisors",
    query: advisorBySlugQuery(slug),
    tags: [`member:${slug}`, "team:members:all"],
  });

  const list = parseOrThrow(StrapiCollectionSchema(AdvisorsSchema), raw);

  return list[0] ?? null;
}
