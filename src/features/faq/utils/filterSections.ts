import { normalize } from "@/shared/lib/search";
import { FaqSectionType } from "../schema/faq.schema";

export function filterFaqSections(
  sections: FaqSectionType[],
  search?: string | null,
): FaqSectionType[] {
  const tokens = search != null ? normalize(search).split(/\s+/).filter(Boolean) : [];

  if (tokens.length === 0) return sections;

  return sections
    .map((section) => ({
      ...section,
      faqs: section.faqs.filter((faq) =>
        tokens.every((token) => normalize(faq.question).includes(token)),
      ),
    }))
    .filter((section) => section.faqs.length > 0);
}
