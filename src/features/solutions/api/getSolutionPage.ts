import StrapiFetch from "@/core/strapi/strapiFetch";
import { pageSolution } from "../query";
import { parseOrThrow } from "@/features/resources";
import { StrapiCollectionSchema } from "../schema/hero/strapi.schema";

export default async function getSolutionPage({ slug }: { slug: string }) {
  const pageData = await StrapiFetch({
    path: `/api/solutions`,
    query: pageSolution(slug),
    tags: [`page-solution:${slug}`],
  });
  // console.log(pageData);
  const page = parseOrThrow(StrapiCollectionSchema, pageData);
  
  // console.log(page);
  return page
}
