import { z } from "zod";
import { MediaSchema, SeoSchema } from "@/features/resources";
import { CareersPageRawSchema, VacancyRawSchema } from "./raw";

/* ----------------------------- DOMAIN (for UI) ----------------------------- */

export const VacancySchema = VacancyRawSchema.transform((res) => ({
  title: res.title,
  slug: res.slug,
  excerpt: res.excerpt ?? undefined,
  location_type: res.location_type,
  employment_type: res.employment_type,
  time_zone: res.time_zone,
  apply_link: res.apply_link,
  rich_text: res.rich_text,
  seo: SeoSchema.parse(res.seo),
}));

export const CareersPageSchema = CareersPageRawSchema.transform((res) => ({
  title: res.title,
  paragraph: res.paragraph ?? undefined,
  images: res.images ? res.images.map((i) => MediaSchema.parse(i)) : undefined,
  seo: SeoSchema.parse(res.seo),
  // vacancies: res.vacancies,
}));

export const VacanciesSchema = z.array(VacancySchema);

export type CareersType = z.infer<typeof CareersPageSchema>;
export type VacancyType = z.infer<typeof VacancySchema>;
