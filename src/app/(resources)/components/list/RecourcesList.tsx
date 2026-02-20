"use client";

import { ResourceCard } from "@/features/resources/client";
import type { ResourceCardType } from "@/features/resources/data/resources.types";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useIsScrollingDown } from "@/hooks/useIsScrollingDown";
import { ResourcesFiltersBar } from "./ResourcesFiltersBar";

export function RecourcesList({
  data,
  type,
  tags,
}: {
  data: ResourceCardType[];
  type: string;
  tags: string[];
}) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const width = useWindowSize();
  const isMobile = (width ?? 0) <= 768;
  const isDown = useIsScrollingDown(10);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const cardsStartRef = useRef<HTMLDivElement | null>(null);
  const [isPinned, setIsPinned] = useState(false);

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

  const filteredList = useMemo(() => {
    if (activeTags.length === 0 && search.length === 0) return data;

    const tagsData =
      activeTags.length > 0
        ? data.filter((card) =>
            (card.tags ?? []).some((c) => activeTags.includes(c.tag)),
          )
        : data;

    const searchData = () => {
      if (search !== "" && tagsData.length > 0) {
        const searchTokens = search
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
  }, [activeTags, data, search]);

  const hasSearch = search.trim().length > 0;
  const hasFilters = activeTags.length > 0 || hasSearch;
  const isDesktopSearchOpen = !isMobile && (isSearchFocused || hasSearch);
  const mobileFiltersOpen = isMobile && isMobileFiltersOpen;
  const total = filteredList.length;
  const shown = Math.min(visibleCount, total);
  const visibleList = filteredList.slice(0, shown);

  const clearAllFilters = useCallback(() => {
    setActiveTags([]);
    setSearch("");
    scrollToCardsStart();
  }, [scrollToCardsStart]);

  const closeMobilePanels = useCallback(() => {
    setIsMobileFiltersOpen(false);
  }, []);

  const toggleMobileFilters = useCallback(() => {
    setIsMobileFiltersOpen((prev) => !prev);
  }, []);

  const clearSearch = useCallback(() => {
    setSearch("");
    if (!hasSearch) {
      setIsSearchFocused(false);
    }
  }, [hasSearch]);

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
    const set = () => setVisibleCount(isMobile ? 10 : 20);
    set();
  }, [isMobile, search, activeTags]);

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
        onSearchChange={setSearch}
        onSearchFocus={() => setIsSearchFocused(true)}
        onSearchBlur={() => setIsSearchFocused(false)}
        onClearSearch={clearSearch}
        onClearAllFilters={clearAllFilters}
        onToggleMobileFilters={toggleMobileFilters}
        onCloseMobilePanels={closeMobilePanels}
      />
      <div
        ref={cardsStartRef}
        className="flex w-full flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start sm:items-stretch gap-4 md:gap-5 px-4 md:px-10 xl:px-20"
      >
        {visibleList.map((c) => (
          <Link
            className="w-full sm:h-full"
            href={`/${type}/${c.slug}`}
            key={c.slug}
            scroll={false}
          >
            {" "}
            <ResourceCard card={c} />
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 px-4 ">
        {shown < total && (
          <button
            type="button"
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + (isMobile ? 10 : 20), total),
              )
            }
            className="cursor-pointer inline-flex items-center justify-center rounded-full border-2 font-semibold! border-primary px-5 py-2 text-sm text-black  hover:bg-black/5 transition-colors"
          >
            {isMobile
              ? `Load ${total - shown > 10 ? 10 : total - shown} more`
              : `Load ${total - shown > 20 ? 20 : total - shown} more`}
          </button>
        )}
        <div className="text-[12px] text-body-secondary ">
          Showing {shown} of {total}
        </div>
      </div>
    </section>
  );
}
