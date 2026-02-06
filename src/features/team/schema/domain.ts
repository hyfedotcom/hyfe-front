import { z } from "zod";
import { MediaSchema, SeoSchema } from "@/features/resources";
import { BiographyRawSchema, MembersRawSchema, TeamGroupSchema } from "./raw";

/* ----------------------------- DOMAIN (for UI) ----------------------------- */

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
  title: z.string(),
  members: z.array(MemberSchema),
});

export const TeamPageSchema = z.object({
  title: z.string(),
  paragraph: z.string().optional(),
  seo: SeoSchema,
  sections: z.array(TeamSectionSchema),
});

export type MemberType = z.infer<typeof MemberSchema>;

/* ---------------------- Helper exports for build/use ---------------------- */

export { MembersRawSchema };
