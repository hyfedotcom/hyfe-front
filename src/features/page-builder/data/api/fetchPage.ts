import StrapiFetch from "@/core/strapi/strapiFetch";
import { pageBuilder } from "../query";
import { parseOrThrow } from "@/features/shared/schema/strapi.schema";
import { PageCollectionSchema } from "../schema/pageBuilder";

export async function fetchPage({
  type,
  slug,
}: {
  type?: string;
  slug: string;
}) {
  const url = type ? `${type}/${slug}` : slug;
  const data = await StrapiFetch<unknown>({
    path: `/api/${url}`,
    query: pageBuilder,
    tags: [`page:${slug}`],
  });

  return parseOrThrow(PageCollectionSchema, data);
}
