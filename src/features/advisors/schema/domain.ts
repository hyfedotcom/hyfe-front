import { z } from "zod";
import { MediaSchema, SeoSchema } from "@/features/resources";
import {
  AdvisorMembersRawSchema,
  BiographyRawSchema,
  TeamGroupSchema,
} from "./raw";

/* ----------------------------- DOMAIN (for UI) ----------------------------- */

export const AdvisorSchema = z.object({
  name: z.string(),
  linkedin: z.union([z.string(), z.undefined()]).nullable(),
  twitter: z.union([z.string(), z.undefined()]).nullable(),
  location: z.union([z.string(), z.undefined()]).nullable(),
  slug: z.string(),
  job: z.string(),
  image: MediaSchema,
  biography: BiographyRawSchema,
  seo: SeoSchema,
  team_group: TeamGroupSchema.nullable().optional(),
});

export const AdvisorsSchema = z.array(AdvisorSchema);

export const AdvisorSectionSchema = z.object({
  title: z.string(),
  members: z.array(AdvisorSchema),
});

export const AdvisorPageSchema = z.object({
  title: z.string(),
  paragraph: z.string().optional(),
  seo: SeoSchema,
  sections: z.array(AdvisorSectionSchema),
});

export type AdvisorType = z.infer<typeof AdvisorSchema>;

/* ---------------------- Helper exports for build/use ---------------------- */

export { AdvisorMembersRawSchema };
