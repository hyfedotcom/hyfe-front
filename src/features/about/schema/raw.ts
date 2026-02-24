import { z } from "zod";

export const HeroContentRawSchema = z.looseObject({
  __component: z.literal("shared.hero-content"),
  title: z.string(),
  content: z.array(
    z.looseObject({
      paragraph: z.string(),
      id: z.number(),
    }),
  ),
});

export const TimelineRawSchema = z.looseObject({
  __component: z.literal("shared.timeline"),
  column: z.array(
    z.looseObject({
      id: z.number(),
      year: z.string(),
      item: z.array(
        z.looseObject({
          id: z.number(),
          month_day: z.string(),
          paragraph: z.string(),
        }),
      ),
    }),
  ),
});
