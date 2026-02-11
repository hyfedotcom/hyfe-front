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

export async function getHeaderStats(): Promise<HeaderStatsType | null> {
  try {
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
      { value: parsed.data.datapoints, label: "Datapoints Processed" },
      { value: parsed.data.coughs, label: "Coughs Detected" },
      { value: parsed.data.user_countries, label: "Countries" },
    ];

    return HeaderStatsSchema.parse(normalized);
  } catch (error) {
    console.error("Header stats error:", error);
    return null;
  }
}
