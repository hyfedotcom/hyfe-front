"use client";

import { ResourceCard } from "@/features/resources/client";
import type { ResourceCardType } from "@/features/resources/data/resources.types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useIsScrollingDown } from "@/hooks/useIsScrollingDown";
import { ResourcesFiltersBar } from "./ResourcesFiltersBar";

const SEARCH_DEBOUNCE_MS = 300;

function parsePageParam(value: string | null) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

export function RecourcesList({
  data,
  type,
  tags,
  initialPage = 1,
}: {
  data: ResourceCardType[];
  type: string;
  tags: string[];
  initialPage?: number;
}) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const searchParams = useSearchParams();
  const width = useWindowSize();
  const isMobile = (width ?? 0) <= 768;
  const isDown = useIsScrollingDown(10);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const cardsStartRef = useRef<HTMLDivElement | null>(null);
  const searchValueRef = useRef("");
  const [isPinned, setIsPinned] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.scrollY > 0 : false,
  );

  const scrollToCardsStart = useCallback(() => {
    requestAnimationFrame(() => {
      const cardsStart = cardsStartRef.current;
      if (!cardsStart) return;

      const targetTop =
        window.scrollY +
        cardsStart.getBoundingClientRect().top -
        (isMobile ? 250 : 250);

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: "smooth",
      });
    });
  }, [isMobile]);

  const uniqueTags = useMemo(() => {
    return Array.from(new Set(tags)).filter(Boolean);
  }, [tags]);

  const toggleTag = useCallback(
    (tag: string) => {
      setActiveTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      );
      scrollToCardsStart();
    },
    [scrollToCardsStart],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      const prev = searchValueRef.current.trim();
      const next = value.trim();
      if (prev.length === 0 && next.length > 0) {
        scrollToCardsStart();
      }
      searchValueRef.current = value;
      setSearch(value);
    },
    [scrollToCardsStart],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [search]);

  const filteredList = useMemo(() => {
    if (activeTags.length === 0 && debouncedSearch.length === 0) return data;

    const tagsData =
      activeTags.length > 0
        ? data.filter((card) =>
            (card.tags ?? []).some((c) => activeTags.includes(c.tag)),
          )
        : data;

    const searchData = () => {
      if (debouncedSearch !== "" && tagsData.length > 0) {
        const searchTokens = debouncedSearch
          .toLowerCase()
          .replace(/\s+/g, " ")
          .replace(/-/g, " ")
          .trim()
          .split(" ")
          .filter(Boolean);

        return tagsData.filter((card) => {
          const titleToken = card.title
            .replace(/\s+/g, " ")
            .replace(/-/g, " ")
            .trim()
            .toLowerCase();

          return searchTokens.every((token) => titleToken.includes(token));
        });
      }

      return tagsData;
    };

    return searchData();
  }, [activeTags, data, debouncedSearch]);

  const hasSearch = search.trim().length > 0;
  const hasAppliedSearch = debouncedSearch.trim().length > 0;
  const hasFilters = activeTags.length > 0 || hasSearch;
  const hasAppliedFilters = activeTags.length > 0 || hasAppliedSearch;
  const isDesktopSearchOpen = !isMobile && (isSearchFocused || hasSearch);
  const mobileFiltersOpen = isMobile && isMobileFiltersOpen;
  const pageSize = 20;
  const pageFromUrl = parsePageParam(searchParams.get("page"));
  const safeInitialPage = Number.isFinite(initialPage)
    ? Math.max(1, Math.floor(initialPage))
    : 1;
  const currentPage = pageFromUrl || safeInitialPage;
  const total = filteredList.length;
  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  const activePage = hasAppliedFilters ? 1 : Math.min(currentPage, maxPage);
  const shown = hasAppliedFilters
    ? total
    : Math.min(activePage * pageSize, total);
  const visibleList = filteredList.slice(0, shown);
  const hasNextPage = !hasAppliedFilters && activePage < maxPage;
  const nextPage = activePage + 1;
  const pageHref = (page: number) => (page <= 1 ? `/${type}` : `/${type}?page=${page}`);
  const detailHref = (slug: string) => {
    const base = `/${type}/${slug}`;
    if (!hasAppliedFilters && activePage > 1) {
      return `${base}?page=${activePage}`;
    }
    return base;
  };

  const clearAllFilters = useCallback(() => {
    setActiveTags([]);
    setSearch("");
    setDebouncedSearch("");
    searchValueRef.current = "";
    scrollToCardsStart();
  }, [scrollToCardsStart]);

  const closeMobilePanels = useCallback(() => {
    setIsMobileFiltersOpen(false);
  }, []);

  const toggleMobileFilters = useCallback(() => {
    setIsMobileFiltersOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPinned(entry.boundingClientRect.top <= 0);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px",
      },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobilePanels();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobile, closeMobilePanels]);

  return (
    <section className="relative space-y-6 md:space-y-8">
      <div ref={sentinelRef} aria-hidden className="my-0!"/>
      <ResourcesFiltersBar
        type={type}
        uniqueTags={uniqueTags}
        activeTags={activeTags}
        search={search}
        hasSearch={hasSearch}
        hasFilters={hasFilters}
        isPinned={isPinned}
        isDown={isDown}
        isDesktopSearchOpen={isDesktopSearchOpen}
        mobileFiltersOpen={mobileFiltersOpen}
        onToggleTag={toggleTag}
        onSearchChange={handleSearchChange}
        onSearchFocus={() => setIsSearchFocused(true)}
        onSearchBlur={() => setIsSearchFocused(false)}
        onClearAllFilters={clearAllFilters}
        onToggleMobileFilters={toggleMobileFilters}
        onCloseMobilePanels={closeMobilePanels}
      />
      <div
        ref={cardsStartRef}
        className="flex w-full flex-col items-stretch gap-4 px-4 md:gap-5 md:px-10 sm:grid sm:grid-cols-2 sm:items-stretch lg:grid-cols-3 xl:grid-cols-4 xl:px-20"
      >
        {visibleList.map((c) => (
          <Link
            className="block h-full w-full"
            href={detailHref(c.slug)}
            key={c.slug}
            scroll={false}
          >
            {" "}
            <ResourceCard card={c} />
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 px-4 ">
        {hasNextPage && (
          <Link
            href={pageHref(nextPage)}
            scroll={false}
            className="cursor-pointer inline-flex items-center justify-center rounded-full border-2 font-semibold! border-primary px-5 py-2 text-sm text-black  hover:bg-black/5 transition-colors"
          >
            {`Load ${total - shown > pageSize ? pageSize : total - shown} more`}
          </Link>
        )}
        <div className="text-[12px] text-body-secondary ">
          Showing {shown} of {total}
        </div>
        {!hasAppliedFilters && (
          <nav className="sr-only" aria-label="Resources pagination">
            {activePage > 1 && (
              <Link rel="prev" href={pageHref(activePage - 1)} scroll={false}>
                Previous page
              </Link>
            )}
            {hasNextPage && (
              <Link rel="next" href={pageHref(nextPage)} scroll={false}>
                Next page
              </Link>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
