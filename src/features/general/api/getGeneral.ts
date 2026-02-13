import StrapiFetch from "@/core/strapi/strapiFetch";
import { GeneralQuery } from "./general.query";
import {
  parseOrThrow,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import { HeaderSchema } from "../schema/domain";

export default async function getGeneral() {
  const generalRaw = await StrapiFetch({
    path: "/api/general",
    query: GeneralQuery,
    tags: ["general"],
  });

  const general = parseOrThrow(StrapiCollectionSchema(HeaderSchema), generalRaw);

  return general;
}
