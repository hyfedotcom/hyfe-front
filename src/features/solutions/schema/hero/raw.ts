import { z } from "zod";
import {
  CardSchema,
  CtaSchema,
} from "@/features/page-builder/data/schema/shared";
import { MediaRawSchema } from "@/features/resources";

/* ----------------------------- RAW (from Strapi) ----------------------------- */

export const SolutionsHeroRawSchema = z.looseObject({
  __component: z.literal("shared.hero-simple"),
  title: z.string(),
  paragraph: z.string().nullable(),
  ctas: z.array(CtaSchema).optional(),
});

export const SolutionsAccordionRawSchema = z.looseObject({
  __component: z.literal("shared.accordion"),
  title: z.string(),
  paragraph: z.string().nullable(),
  ctas: z.array(CtaSchema).optional(),
  cards: z.array(CardSchema),
});

export const ProblemInsightSolutionRawSchema = z.looseObject({
  __component: z.literal("shared.problem-insight-solution"),
  title: z.string(),
  paragraph: z.string().nullable(),
  problem: z.array(
    z.looseObject({
      value: z.string(),
      description: z.string(),
    }),
  ),
  insight: z.array(
    z.looseObject({
      value: z.string(),
    }),
  ),
  solution: z.looseObject({
    value: z.string(),
    cta: z.looseObject({
      label: z.string(),
      url: z.string(),
    }),
  }),
});

export const SolutionMapRawSchema = z.looseObject({
  __component: z.literal("shared.map"),
  title: z.string().nullable(),
  paragraph: z.string().nullable(),
  ctas: z.array(CtaSchema).optional(),
});

export const CardProductStepsRawSchema = z.looseObject({
  __component: z.literal("shared.card-product-steps"),
  title: z.string(),
  paragraph: z.string().nullable(),
  ctas: z.array(CtaSchema).optional(),
  cards: z.array(CardSchema),
});

export const ContentImageSplitEnum = z.enum(["left", "right"]);

export const ContentImageSplitRawSchema = z.looseObject({
  __component: z.literal("shared.content-image-split"),
  title: z.string(),
  content: z
    .array(
      z.object({
        paragraph: z.string(),
      }),
    )
    .nullable(),
  ctas: z.array(CtaSchema).optional().nullable(),
  image: MediaRawSchema,
  variant: ContentImageSplitEnum,
});

export const TestimonialsFeedRawSchema = z.looseObject({
  __component: z.literal("shared.testimonials-feed"),
  title: z.string(),
  paragraph: z.string().nullable(),
  testimonials: z
    .array(
      z.looseObject({
        paragraph: z.string(),
        name: z.string(),
        role: z.string(),
      }),
    )
    .optional(),
});

export const InputTypeRawSchema = z.enum([
  "text",
  "email",
  "tel",
  "textarea",
]);

export const InputRawSchema = z.looseObject({
  hb_name: z.string().optional().nullable(),
  label: z.string(),
  type: InputTypeRawSchema,
  required: z.boolean(),
});

export const ConsentRawShema = z.looseObject({
  label: z.string(),
  required: z.boolean(),
  privacy_link: z.boolean(),
});

export const FormRawSchema = z.looseObject({
  formId: z.string().optional().nullable(),
  inputs: z.array(InputRawSchema),
  consent: z.array(ConsentRawShema),
  cta_label: z.string(),
  cough_news_subscription: z.boolean(),
});

export const FormContainerRawSchema = z.looseObject({
  __component: z.literal("form.form-container"),
  title: z.string(),
  paragraph: z.string().nullable(),
  list: z
    .array(
      z.looseObject({
        label: z.string(),
      }),
    )
    .nullable(),
  form: FormRawSchema,
});



export type FormType = z.infer<typeof FormRawSchema>;
export type InputType = z.infer<typeof InputRawSchema>;
export type ConsentType = z.infer<typeof ConsentRawShema>;
