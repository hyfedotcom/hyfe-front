import StrapiFetch from "@/core/strapi/strapiFetch";
import { careersQuery } from "../query/careers.query";
import {
  parseOrThrow,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import { CareersPageRawSchema, CareersType } from "../schema/careers.schema";

export default async function getCareers(): Promise<CareersType> {
  const careersData = await StrapiFetch({
    path: "/api/careers-landing",
    query: careersQuery,
    tags: ["page:careers"],
  });
  console.log(careersData);
  const careers = parseOrThrow(
    StrapiCollectionSchema(CareersPageRawSchema),
    careersData,
  );
  console.log(careers);
  return careers as CareersType;
}
