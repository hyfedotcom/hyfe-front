import { z } from "zod";
import { ResourceBlockContentSchema, SeoRawSchema } from "@/features/resources";

export const textOrientation = z.enum(["left", "right"]);

export const PrivacyTermRichTextRawSchema = z.looseObject({
  content: ResourceBlockContentSchema,
});

export const PrivacyTermItemRawSchema = z.looseObject({
  name: z.string(),
  slug: z.string(),
  date: z.string().nullish(),
  rich_text: PrivacyTermRichTextRawSchema,
  seo: SeoRawSchema.nullish(),
  content_only: z.boolean().optional(),
  text_orientation: textOrientation.nullable(),
});
