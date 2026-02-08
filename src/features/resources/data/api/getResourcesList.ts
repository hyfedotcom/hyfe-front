import { resourceLanding, resourceList } from "@/features/resources";
import StrapiFetch from "@/core/strapi/strapiFetch";
import { LandingSchema, ListSchema, parseOrThrow } from "@/features/resources";
import { resolveResourceItemsType } from "./resourceType";

export async function getResourcesList({ type }: { type: string }) {
  try {
    const itemsType = resolveResourceItemsType(type);
    const landingData = await StrapiFetch<unknown>({
      path: `/api/${type}-landing`,
      query: resourceLanding,
      tags: [`resource:${type}-landing`],
    });

    const listData = await StrapiFetch<unknown>({
      path: `/api/${itemsType}`,
      query: resourceList,
      tags: [`resource:${itemsType}-list`],
    });

    const landing = parseOrThrow(LandingSchema, landingData);
    const list = parseOrThrow(ListSchema, listData);
    if (!landingData || !listData) return undefined;
    return { landing, list };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
