import { resourceLanding, resourceList } from "@/features/resources";
import StrapiFetch from "@/strapi/strapiFetch";
import { LandingSchema, ListSchema, parseOrThrow } from "@/features/resources";

export async function getResourcesList({ type }: { type: string }) {
  try {
    const landingData = await StrapiFetch<unknown>({
      path: `/api/${type}-landing`,
      query: resourceLanding,
      tags: [`page:${type}-landing`],
    });

    if (type === "news") type = "news-items";
    if (type === "cough-news") type = "cough-news-items";
    const listData = await StrapiFetch<unknown>({
      path: `/api/${type}`,
      query: resourceList,
      tags: [`resource:${type}-list`],
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
