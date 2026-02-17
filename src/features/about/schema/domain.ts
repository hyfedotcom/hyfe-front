import { SeoSchema } from "@/features/resources";
import { z } from "zod";
import { HeroContentRawSchema } from "./raw";
import { ContentImageSplitSchema } from "@/features/solutions/schema/hero/domain";

export const HeroContentSchema = HeroContentRawSchema.transform((res) => ({
  type: "hero-content" as const,
  title: res.title,
  content: res.content,
}));

export const AboutSectonsRawSchema = z.array(
  z.discriminatedUnion("__component", [
    HeroContentSchema,
    ContentImageSplitSchema,
  ]),
);

export const AboutRawSchema = z.looseObject({
  seo: SeoSchema,
  sections: AboutSectonsRawSchema,
});

export type AboutType = z.infer<typeof AboutRawSchema>;
export type HeroContentType = z.infer<typeof HeroContentSchema>;
