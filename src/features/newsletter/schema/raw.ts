import { z } from "zod";

export const NewsletterBenefitRawSchema = z.union([
  z.string(),
  z.looseObject({
    text: z.string().nullish(),
    label: z.string().nullish(),
    value: z.string().nullish(),
    title: z.string().nullish(),
    item: z.string().nullish(),
    benefit: z.string().nullish(),
    name: z.string().nullish(),
  }),
]);

export const NewsletterFormRawSchema = z.looseObject({
  newsletter_form: z
    .looseObject({
      title: z.string().nullish(),
      cta_label: z.string().nullish(),
      consent_label: z.string().nullish(),
      benefits_list: z.array(NewsletterBenefitRawSchema).nullish(),
    })
    .nullish(),
});
