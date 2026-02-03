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

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${serverEnv.STRAPI_TOKEN}` },
    next: { tags, revalidate: 86400 },
    cache: isDraft ? "no-store" : "force-cache",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const msg = `Strapi error ${res.status}: ${text}`;

    // ✅ в dev всегда показываем ошибку
    if (process.env.NODE_ENV === "development") {
      throw new Error(msg);
    }

    // ✅ в prod/build мягко пропускаем только ожидаемое отсутствие
    if (res.status === 404) {
      return null as T;
    }

    // ❌ всё остальное — реальная проблема
    throw new Error(msg);
  }

  return (await res.json()) as T;
}
