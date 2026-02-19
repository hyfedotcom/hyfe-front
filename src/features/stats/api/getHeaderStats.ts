import { PageBuilderSection } from "@/features/page-builder/data/components/pageBuilder.types";
import { HeroStatsSectionType } from "@/features/page-builder/data/schema/pageBuilder";
import { z } from "zod";

const HEADER_STATS_URL = "https://hyfe-stats-5qct553gfq-uc.a.run.app/";

const HeaderStatsRawSchema = z.object({
  clinical_trials: z.string().optional(),
  coughs: z.string(),
  datapoints: z.string(),
  user_countries: z.string(),
  users: z.string().optional(),
});

const HeaderStatsItemSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const HeaderStatsSchema = z.array(HeaderStatsItemSchema);

export type HeaderStatsType = z.infer<typeof HeaderStatsSchema>;

export async function getHeaderStats({
  section,
}: {
  section: HeroStatsSectionType;
}): Promise<HeaderStatsType | null> {
  try {
    const heroSection = section;
    const res = await fetch(HEADER_STATS_URL, {
      next: { revalidate: 3600, tags: ["header:stats"] },
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error(`Header stats fetch failed: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const parsed = HeaderStatsRawSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Header stats parse failed", parsed.error.flatten());
      return null;
    }

    // Keep API values, but enforce product-required order and labels.
    const normalized = [
      { value: parsed.data.datapoints, label: heroSection.datapoints },
      { value: parsed.data.coughs, label: heroSection.coughs },
      { value: parsed.data.user_countries, label: heroSection.countries },
      {
        value: heroSection.clinicalTrials.value,
        label: heroSection.clinicalTrials.label,
      },
    ];

    return HeaderStatsSchema.parse(normalized);
  } catch (error) {
    console.error("Header stats error:", error);
    return null;
  }
}
