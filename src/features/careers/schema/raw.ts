import { z } from "zod";
import {
  MediaRawSchema,
  ResourceBlockContentSchema,
  SeoRawSchema,
} from "@/features/resources";

/* ----------------------------- RAW (from Strapi) ----------------------------- */

export const VacancyRawSchema = z.looseObject({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  location_type: z.string(),
  employment_type: z.string(),
  time_zone: z.string(),
  apply_link: z.string(),
  rich_text: z.looseObject({
    content: ResourceBlockContentSchema,
  }),
  seo: SeoRawSchema,
});

export const CareersPageRawSchema = z.looseObject({
  title: z.string(),
  paragraph: z.string().nullable(),
  images: z.array(MediaRawSchema).optional(),
  seo: SeoRawSchema,
  // vacancies: z.array(VacancyRawSchema),
});
