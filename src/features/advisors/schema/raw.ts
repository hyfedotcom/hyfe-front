import { z } from "zod";
import {
  MediaRawSchema,
  ResourceBlockContentSchema,
  SeoRawSchema,
} from "@/features/resources";

/* ----------------------------- RAW (from Strapi) ----------------------------- */

export const TeamGroupSchema = z.looseObject({
  name_group: z.string(),
});

export const AdvisorsLandingRawSchema = z.looseObject({
  title: z.string(),
  paragraph: z.string().nullable(),
  seo: SeoRawSchema,
});

export const BiographyRawSchema = z.looseObject({
  content: ResourceBlockContentSchema,
});

export const AdvisorMemberRawSchema = z.looseObject({
  name: z.string(),
  linkedin: z.string().nullable(),
  twitter: z.string().nullable(),
  location: z.string().nullable(),
  slug: z.string(),
  job: z.string(),
  image: MediaRawSchema,
  biography: BiographyRawSchema,
  seo: SeoRawSchema,
  team_group: TeamGroupSchema.nullable().optional(),
});

export const AdvisorMembersRawSchema = z.array(AdvisorMemberRawSchema);
