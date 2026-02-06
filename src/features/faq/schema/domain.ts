import { z } from "zod";
import {
  ResourceBlockContentSchema,
  SeoDomainSchema,
} from "@/features/resources";

/* --------------------------- UI (final page contract) ------------------------ */

export const FaqQaSchema = z.object({
  question: z.string(),
  answer: ResourceBlockContentSchema,
});

export const FaqSectionSchema = z.object({
  title: z.string(),
  faqs: z.array(FaqQaSchema),
});

export const FaqPageSchema = z.object({
  title: z.string(),
  paragraph: z.string().optional(),
  seo: SeoDomainSchema,
  sections: z.array(FaqSectionSchema),
});

/* ---------------------------------- Types ---------------------------------- */

export type FaqPageType = z.infer<typeof FaqPageSchema>;
export type FaqSectionType = z.infer<typeof FaqSectionSchema>;
export type FaqQaType = z.infer<typeof FaqQaSchema>;
