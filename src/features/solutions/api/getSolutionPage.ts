import StrapiFetch from "@/core/strapi/strapiFetch";
import { pageSolution } from "./query";
import { parseOrThrow } from "@/features/resources";
import { StrapiCollectionSchema } from "../schema/hero/strapi.schema";

export default async function getSolutionPage({ slug }: { slug: string }) {
  const pageData = await StrapiFetch({
    path: `/api/solutions`,
    query: pageSolution(slug),
    tags: [`solution:${slug}`],
  });

  const page = parseOrThrow(StrapiCollectionSchema, pageData);

  return page[0];
}
