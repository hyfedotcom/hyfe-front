import { MediaSchema, SeoSchema } from "@/features/resources";
import { AdvisorMembersRawSchema, AdvisorsLandingRawSchema } from "./raw";

/* ----------------------- Derived (for building sections) --------------------- */

export const AdvisorsLandingForBuildSchema = AdvisorsLandingRawSchema.transform(
  (res) => ({
    title: res.title,
    paragraph: res.paragraph ?? undefined,
    seo: SeoSchema.parse(res.seo),
  }),
);

export const AdvisorMemberForBuildSchema = AdvisorMembersRawSchema.transform(
  (res) =>
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
