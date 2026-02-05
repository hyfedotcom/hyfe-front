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
  team_group: TeamGroupSchema.nullable(),
});

const CareersLandingRawSchema = z.looseObject({
  title: z.string(),
  paragraph: z.string().nullable(),
  sections: z.array(SectionsRawCshema),
  seo: SeoRawSchema,
});

const BiographyRawSchema = z.looseObject({
  content: ResourceBlockContentSchema,
});

const MemberRawSchema = z.looseObject({
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

const MembersRawSchema = z.array(MemberRawSchema);

/* ----------------------- Derived (for building sections) --------------------- */

export const MemberSchema = z.object({
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

export const MembersSchema = z.array(MemberSchema);

export const TeamSectionSchema = z.object({
  titie: z.string(),
  members: z.array(MemberSchema),
});

export const TeamPageSchema = z.object({
  title: z.string(),
  paragraph: z.string().optional(),
  seo: SeoSchema,
  sections: z.array(TeamSectionSchema),
});

/* ----------------------- Derived (for building sections) --------------------- */

export const TeamLandingForBuildSchema = CareersLandingRawSchema.transform(
  (res) => ({
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    seo: SeoSchema.parse(res.seo),
    groupOrder: res.sections
      ? res.sections.map((item) =>
          item.team_group ? item.team_group.name_group : "",
        )
      : undefined,
  }),
);

export const MemberForBuidSchema = MembersRawSchema.transform((res) =>
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



export type MemberType = z.infer<typeof MemberSchema>;
