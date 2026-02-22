import StrapiFetch from "@/core/strapi/strapiFetch";
import {
  parseOrThrow,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import { pageBuilderResourceRelation } from "../resources.query";
import { ResourceFeedSchema } from "../resources.schema";
import { FeedBuilder } from "../../utils/FeedBuilder";

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

  const page = parseOrThrow(StrapiCollectionSchema(ResourceFeedSchema), data);
  const sectionsNew = await FeedBuilder({ sections: page.sections });

  return {
    title: page.title,
    paragraph: page.paragraph,
    sections: sectionsNew,
    seo: page.seo
  };
}
