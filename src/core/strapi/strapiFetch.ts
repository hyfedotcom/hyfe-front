import { serverEnv } from "@/core/env.server";

type StrapiFetchOptions = {
  path: string;
  query?: Record<string, string[] | unknown>;
  tags: string[];
  isDraft?: boolean;
};

export default async function StrapiFetch<T>({
  path,
  query,
  tags,
  isDraft,
}: StrapiFetchOptions): Promise<T> {
  const url = new URL(`${serverEnv.STRAPI_URL}${path}`);
  if (query) {
    const qs = await import("@/core/strapi/qs");

    const toQuery = qs.toStrapiQuery(query);

    if (toQuery) url.search = toQuery;
  }

  console.log("FETCH URL:", url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${serverEnv.STRAPI_TOKEN}`,
    },
    next: { tags },
    cache: isDraft ? "no-store" : "force-cache",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Strapi error ${res.status} for ${url.toString()}: ${text}`,
    );
  }

  return (await res.json()) as T;
}
