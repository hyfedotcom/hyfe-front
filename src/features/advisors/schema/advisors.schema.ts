import {
  MediaRawSchema,
  MediaSchema,
  ResourceBlockContentSchema,
  SeoRawSchema,
  SeoSchema,
} from "@/features/resources";
import { z } from "zod";

/* ----------------------------- RAW (from Strapi) ----------------------------- */

const TeamGroupSchema = z.looseObject({
  name_group: z.string(),
});

const SectionsRawCshema = z.looseObject({
  __component: z.literal("shared.team-order"),
  
});

const AdvisorsLandingRawSchema = z.looseObject({
  title: z.string(),
  paragraph: z.string().nullable(),
  
  seo: SeoRawSchema,
});

const BiographyRawSchema = z.looseObject({
  content: ResourceBlockContentSchema,
});

const AdvisorMemberRawSchema = z.looseObject({
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

const AdvisorMembersRawSchema = z.array(AdvisorMemberRawSchema);

/* ----------------------- Derived (for building sections) --------------------- */

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
  titie: z.string(),
  members: z.array(AdvisorSchema),
});

export const AdvisorPageSchema = z.object({
  title: z.string(),
  paragraph: z.string().optional(),
  seo: SeoSchema,
  sections: z.array(AdvisorSectionSchema),
});

/* ----------------------- Derived (for building sections) --------------------- */

export const AdvisorsLandingForBuildSchema = AdvisorsLandingRawSchema.transform(
  (res) => ({
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    seo: SeoSchema.parse(res.seo),
  }),
);

export const AdvisorMemberForBuidSchema = AdvisorMembersRawSchema.transform((res) =>
  res.map((item) => ({
    name: item.name,
    job: item.job,
    slug: item.slug,
    linkedin: item.linkedin ?? undefined,
    twitter: item.twitter ?? undefined,
    location: item.location ?? undefined,
    image: MediaSchema.parse(item.image),
    biography: item.biography,
    seo: SeoSchema.parse(item.seo),
    team_group: item.team_group,
  })),
);

export type AdvisorType = z.infer<typeof AdvisorSchema>;
