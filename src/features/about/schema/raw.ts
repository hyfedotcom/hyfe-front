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

