import { SeoSchema } from "@/features/resources";
import { z } from "zod";
import { HeroContentRawSchema, TimelineRawSchema } from "./raw";
import { ContentImageSplitSchema } from "@/features/solutions/schema/hero/domain";

export const HeroContentSchema = HeroContentRawSchema.transform((res) => ({
  type: "hero-content" as const,
  title: res.title,
  content: res.content,
}));

export const TimelineSchema = TimelineRawSchema.transform((res) => ({
  type: "timeline" as const,
  column: res.column,
}));

export const AboutSectonsRawSchema = z.array(
  z.discriminatedUnion("__component", [
    HeroContentSchema,
    ContentImageSplitSchema,
    TimelineSchema,
  ]),
);

export const AboutRawSchema = z.looseObject({
  seo: SeoSchema,
  sections: AboutSectonsRawSchema,
});

export type AboutType = z.infer<typeof AboutRawSchema>;
export type HeroContentType = z.infer<typeof HeroContentSchema>;
export type TimelineType = z.infer<typeof TimelineSchema>;
export type TimelineColumnType = TimelineType["column"][number];
export type TimelineItem = TimelineColumnType["item"][number];
