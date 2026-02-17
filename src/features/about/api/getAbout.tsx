import StrapiFetch from "@/core/strapi/strapiFetch";
import { parseOrThrow } from "@/features/resources";
import { StrapiCollectionSchema } from "@/features/shared/schema/strapi.schema";
import { AboutRawSchema } from "../schema/domain";
import { AboutQuery } from "./about.query";

export default async function getAbout() {
  const aboutRaw = await StrapiFetch({
    path: "/api/about",
    query: AboutQuery,
    tags: ["about:page"],
  });

  const about = parseOrThrow(StrapiCollectionSchema(AboutRawSchema), aboutRaw);

  return about;
}
