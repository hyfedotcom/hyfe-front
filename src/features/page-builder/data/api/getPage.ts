import StrapiFetch from "@/core/strapi/strapiFetch";
import { pageBuilder, pageBuilderResourceRelation } from "../query";
import { parseOrThrow } from "@/features/page-builder/data/schema/parseOrThrow";
import { StrapiCollectionSchema } from "../schema/pageBuilder";

export async function getPage({ type, slug }: { type?: string; slug: string }) {
  const url = type ? `${type}/${slug}` : slug;
  const data = await StrapiFetch<unknown>({
    path: `/api/${url}`,
    query: pageBuilder,
    tags: [`page:${slug}`],
  });
  // console.log(data);
  const page = parseOrThrow(StrapiCollectionSchema, data);
  return page;
}

export async function getPageResource({
  type,
  slug,
}: {
  type?: string;
  slug: string;
}) {
  const url = type ? `${type}/${slug}` : slug;
  const data = await StrapiFetch<unknown>({
    path: `/api/${url}`,
    query: pageBuilderResourceRelation,
    tags: [`page:${slug}`],
  });
  // console.log(data);
  const page = parseOrThrow(StrapiCollectionSchema, data);
  return page;
}
