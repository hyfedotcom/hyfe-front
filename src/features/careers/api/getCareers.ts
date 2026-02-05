import StrapiFetch from "@/core/strapi/strapiFetch";

import {
  parseOrThrow,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import {
  CareersPageRawSchema,
  VacanciesSchema,
} from "../schema/careers.schema";
import { careersQuery, vacanciesQuery } from "./careers.query";

export default async function getCareers() {
  const [landingRaw, vacanciesRaw] = await Promise.all([
    StrapiFetch({
      path: "/api/careers-landing",
      query: careersQuery,
      tags: ["careers:landing"],
    }),
    StrapiFetch({
      path: "/api/vacancies-items",
      query: vacanciesQuery,
      tags: ["careers:vacancies:list"],
    }),
  ]);

  const landing = parseOrThrow(
    StrapiCollectionSchema(CareersPageRawSchema),
    landingRaw,
  );

  const vacancies = parseOrThrow(
    StrapiCollectionSchema(VacanciesSchema),
    vacanciesRaw,
  );

  return {
    title: landing.title,
    paragraph: landing.paragraph,
    images: landing.images,
    seo: landing.seo,
    vacancies: vacancies,
  };
}
