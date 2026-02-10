import { z } from "zod";
import {
  NewsletterBenefitRawSchema,
  NewsletterFormRawSchema,
} from "./raw";

export const DefaultNewsletterForm = {
  title: "Get the Cough Science Research Roundup",
  benefits: [
    "Vetted publications, key takeaways",
    "1 emails/month",
    "Join researchers hyfe team",
  ],
  ctaLabel: "Get the Roundup",
  consentLabel: "I agree to receive the Cough Science Research Roundup from Hyfe",
} as const;

export const NewsletterFormDomainSchema = z.object({
  title: z.string(),
  benefits: z.array(z.string()),
  ctaLabel: z.string(),
  consentLabel: z.string(),
});

function readBenefit(item: z.infer<typeof NewsletterBenefitRawSchema>) {
  if (typeof item === "string") {
    const text = item.trim();
    return text.length > 0 ? text : undefined;
  }

  const candidates = [
    item.text,
    item.label,
    item.value,
    item.title,
    item.item,
    item.benefit,
    item.name,
  ];

  for (const candidate of candidates) {
    const text = candidate?.trim();
    if (text) return text;
  }

  return undefined;
}

export const NewsletterFormSchema = NewsletterFormRawSchema.transform((raw) => {
  const form = raw.newsletter_form;
  const benefits = (form?.benefits_list ?? [])
    .map((item) => readBenefit(item))
    .filter((item): item is string => Boolean(item));

  return NewsletterFormDomainSchema.parse({
    title: form?.title?.trim() || DefaultNewsletterForm.title,
    benefits: benefits.length ? benefits : [...DefaultNewsletterForm.benefits],
    ctaLabel: form?.cta_label?.trim() || DefaultNewsletterForm.ctaLabel,
    consentLabel:
      form?.consent_label?.trim() || DefaultNewsletterForm.consentLabel,
  });
});

export type NewsletterFormType = z.infer<typeof NewsletterFormDomainSchema>;
