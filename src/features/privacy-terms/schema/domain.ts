import { z } from "zod";
import {
  ResourceBlockContentSchema,
  SeoDomainSchema,
  SeoSchema,
} from "@/features/resources";
import { PrivacyTermItemRawSchema } from "./raw";

export const PrivacyTermPageDomainSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string().optional(),
  content: ResourceBlockContentSchema,
  seo: SeoDomainSchema.optional(),
  content_only: z.boolean(),
});

export const PrivacyTermPageSchema = PrivacyTermItemRawSchema.transform(
  (item) =>
    PrivacyTermPageDomainSchema.parse({
      title: item.name,
      slug: item.slug,
      date: item.date ?? undefined,
      content: item.rich_text.content,
      seo: item.seo ? SeoSchema.parse(item.seo) : undefined,
      content_only: item.content_only ?? false,
    }),
);

export const PrivacyTermPagesSchema = z.array(PrivacyTermPageSchema);

export type PrivacyTermPageType = z.infer<typeof PrivacyTermPageSchema>;
