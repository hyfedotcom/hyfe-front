import { MediaSchema, SeoSchema } from "@/features/resources";
import { MembersRawSchema, TeamLandingRawSchema } from "./raw";

/* ----------------------- Derived (for building sections) --------------------- */

export const TeamLandingForBuildSchema = TeamLandingRawSchema.transform(
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

export const MemberForBuildSchema = MembersRawSchema.transform((res) =>
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

/* ---------------------- Helper exports for build/use ---------------------- */
