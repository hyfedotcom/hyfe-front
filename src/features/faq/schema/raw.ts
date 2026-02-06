import { z } from "zod";
import { ResourceBlockContentSchema, SeoRawSchema } from "@/features/resources";

/* ----------------------------- RAW (from Strapi) ----------------------------- */

export const FaqGroupRawSchema = z.object({
  group_name: z.string(),
});

export const FaqItemRawSchema = z.object({
  question: z.string(),
  answer: ResourceBlockContentSchema,
  faq_group: FaqGroupRawSchema.nullish(), // важное: не ломаемся, если null
});

export const FaqLandingRawSchema = z.object({
  title: z.string(),
  paragraph: z.string().nullish(),
  seo: SeoRawSchema,
  faq_groups: z.array(FaqGroupRawSchema).nullish(), // landing может быть пустым/не заданным
});
