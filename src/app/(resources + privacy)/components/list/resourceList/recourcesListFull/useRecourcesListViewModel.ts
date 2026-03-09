"use client";

import type { ResourceCardType } from "@/features/resources/data/resources.types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const PAGE_SIZE = 20;

function parsePageParam(value: string | null): number | undefined {
  if (value === null) return undefined;

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;

  return Math.floor(parsed);
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/-/g, " ")
    .trim();
}

type UseRecourcesListViewModelArgs = {
  data: ResourceCardType[];
  tags: string[];
  type: string;
  initialPage: number;
};

export function useRecourcesListViewModel({
  data,
  tags,
  type,
  initialPage,
}: UseRecourcesListViewModelArgs) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramsString = searchParams.toString();

  const search = useMemo(
    () => (searchParams.get("search") ?? "").trim(),
    [searchParams],
  );

  const activeTags = useMemo(() => {
    const uniqueTags = new Set<string>();

    for (const tag of searchParams.getAll("tag")) {
      const normalizedTag = tag.trim();
      if (normalizedTag) uniqueTags.add(normalizedTag);
    }

    return Array.from(uniqueTags);
  }, [searchParams]);

  const uniqueTags = useMemo(
    () => Array.from(new Set(tags.map((tag) => tag.trim()).filter(Boolean))),
    [tags],
  );

  const hasSearch = search.length > 0;
  const hasFilters = activeTags.length > 0 || hasSearch;

  const activeTagsSet = useMemo(() => new Set(activeTags), [activeTags]);

  const searchTokens = useMemo(() => {
    if (!hasSearch) return [];
    return normalizeText(search).split(" ").filter(Boolean);
  }, [hasSearch, search]);

  const filteredList = useMemo(() => {
    let nextList = data;

    if (activeTagsSet.size > 0) {
      nextList = nextList.filter((card) =>
        (card.tags ?? []).some((cardTag) => activeTagsSet.has(cardTag.tag)),
      );
    }

    if (searchTokens.length === 0 || nextList.length === 0) {
      return nextList;
    }

    return nextList.filter((card) => {
      const normalizedTitle = normalizeText(card.title);
      return searchTokens.every((token) => normalizedTitle.includes(token));
    });
  }, [activeTagsSet, data, searchTokens]);

  const safeInitialPage = Number.isFinite(initialPage)
    ? Math.max(1, Math.floor(initialPage))
    : 1;
  const pageFromUrl = parsePageParam(searchParams.get("page"));
  const currentPage = pageFromUrl ?? safeInitialPage;

  const total = filteredList.length;
  const maxPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const activePage = hasFilters ? 1 : Math.min(currentPage, maxPage);
  const shown = hasFilters ? total : Math.min(activePage * PAGE_SIZE, total);
  const visibleList = filteredList.slice(0, shown);
  const hasNextPage = !hasFilters && activePage < maxPage;
  const nextPage = activePage + 1;

  const pageHref = useCallback(
    (page: number) => {
      const params = new URLSearchParams(paramsString);

      params.delete("page");
      if (page > 1) {
        params.set("page", String(page));
      }

      const query = params.toString();
      return query ? `/${type}?${query}` : `/${type}`;
    },
    [paramsString, type],
  );

  const detailHref = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(paramsString);

      if (hasFilters) {
        params.delete("page");
      } else if (activePage > 1) {
        params.set("page", String(activePage));
      } else {
        params.delete("page");
      }

      const query = params.toString();
      const base = `/${type}/${slug}`;
      return query ? `${base}?${query}` : base;
    },
    [activePage, hasFilters, paramsString, type],
  );

  const clearAllFiltersInUrl = useCallback(() => {
    const params = new URLSearchParams(paramsString);

    params.delete("search");
    params.delete("tag");
    params.delete("page");

    const query = params.toString();
    const nextUrl = query ? `/${type}?${query}` : `/${type}`;
    const currentUrl = paramsString ? `/${type}?${paramsString}` : `/${type}`;

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [paramsString, router, type]);

  return {
    activePage,
    activeTags,
    clearAllFiltersInUrl,
    detailHref,
    hasFilters,
    hasNextPage,
    nextPage,
    pageHref,
    pageSize: PAGE_SIZE,
    shown,
    total,
    uniqueTags,
    visibleList,
  };
}
