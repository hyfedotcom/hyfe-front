import { ResourceBlockContentSchema } from "@/features/resources";
import { z } from "zod";

export const FaqSchema = z.looseObject({
  question: z.string(),
  answer: ResourceBlockContentSchema,
});

export const FaqSectionsSchema = z
  .looseObject({
    __component: z.literal("shared.faq-section"),
    faqs: z.array(FaqSchema),
    title: z.string(),
  })
  .transform((res) => ({
    type: "faq-section" as const,
    faqs: res.faqs,
    title: res.title,
  }));

export const FaqPageRawSchema = z.looseObject({
  title: z.string(),
  paragraph: z.string(),
  sections: z.array(FaqSectionsSchema),
});

export type FaqSectionsType = z.infer<typeof FaqSectionsSchema>;
