import StrapiFetch from "@/core/strapi/strapiFetch";
import { vacancyQuery } from "./careers.query";
import {
  parseOrThrow,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import { VacanciesSchema } from "../schema/careers.schema";

export default async function getVacancy(slug: string) {
  const vacancyRaw = await StrapiFetch({
    path: "/api/vacancies-items",
    query: vacancyQuery(slug),
    tags: [`vacancy:${slug}`, "careers:vacancies:all"],
  });
  console.log(vacancyRaw);
  const vacancy = parseOrThrow(
    StrapiCollectionSchema(VacanciesSchema),
    vacancyRaw,
  );

  return vacancy[0] ?? null;
}
