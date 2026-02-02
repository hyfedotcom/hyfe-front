import StrapiFetch from "@/core/strapi/strapiFetch";
import { faqQuery } from "../faq.query";
import { parseOrThrow } from "@/features/resources";
import { StrapiCollectionSchema } from "@/features/shared/schema/strapi.schema";
import { FaqPageRawSchema } from "../schema/faq.schema";


export async function getFaq() {
  const faqData = await StrapiFetch({
    path: `/api/faq-landing`,
    query: faqQuery,
    tags: ["page:faq"],
  });
  console.log(faqData);

  const faq = parseOrThrow(StrapiCollectionSchema(FaqPageRawSchema), faqData);

  return faq;
}
