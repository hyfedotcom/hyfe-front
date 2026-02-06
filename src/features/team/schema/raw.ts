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

const SectionsRawSchema = z.looseObject({
  __component: z.literal("shared.team-order"),
  team_group: TeamGroupSchema.nullable(),
});

export const TeamLandingRawSchema = z.looseObject({
  title: z.string(),
  paragraph: z.string().nullable(),
  sections: z.array(SectionsRawSchema),
  seo: SeoRawSchema,
});

export const BiographyRawSchema = z.looseObject({
  content: ResourceBlockContentSchema,
});

export const MemberRawSchema = z.looseObject({
  name: z.string(),
  linkedin: z.string().nullable(),
  twitter: z.string().nullable(),
  location: z.string().nullable(),
  slug: z.string(),
  job: z.string(),
  image: MediaRawSchema,
  biography: BiographyRawSchema,
  seo: SeoRawSchema,
  team_group: TeamGroupSchema.nullable(),
});

export const MembersRawSchema = z.array(MemberRawSchema);
