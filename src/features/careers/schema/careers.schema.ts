import { MediaSchema, ResourceBlockContentSchema } from "@/features/resources";
import { z } from "zod";

export const VacancySchema = z
  .looseObject({
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
  })
  .transform((res) => ({
    title: res.title,
    slug: res.slug,
    excerpt: res.excerpt ?? undefined,
    location_type: res.location_type,
    employment_type: res.employment_type,
    time_zone: res.time_zone,
    apply_link: res.apply_link,
    rich_text: res.rich_text,
  }));

export const CareersPageRawSchema = z
  .looseObject({
    title: z.string(),
    paragraph: z.string().nullable(),
    images: z.array(MediaSchema).optional(),
    vacancies: z.array(VacancySchema),
  })
  .transform((res) => ({
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    images: res.images ?? undefined,
    vacancies: res.vacancies,
  }));

export type   CareersType = z.infer<typeof CareersPageRawSchema>;
export type VacancyType = z.infer<typeof VacancySchema>;
