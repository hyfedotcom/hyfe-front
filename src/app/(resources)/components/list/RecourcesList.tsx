"use client";

import clsx from "clsx";
import { ResourceCard, ResourceTag } from "@/features/resources/client";
import type { ResourceCardType } from "@/features/resources/data/resources.types";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useIsScrollingDown } from "@/hooks/useIsScrollingDown";
import { formatResourceTypeLabel } from "@/shared/utils/formatResourceTypeLabel";
import { cross } from "@/shared/icons/icons";

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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const width = useWindowSize();
  const isMobile = (width ?? 0) <= 768;
  const isDown = useIsScrollingDown(10);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);
  const [isPinned, setIsPinned] = useState(false);

  const uniqueTags = useMemo(() => {
    return Array.from(new Set(tags)).filter(Boolean);
  }, [tags]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

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
  const mobileSearchOpen = isMobile && isMobileSearchOpen;
  const isMobileOverlayOpen = mobileFiltersOpen || mobileSearchOpen;
  const total = filteredList.length;
  const shown = Math.min(visibleCount, total);
  const visibleList = filteredList.slice(0, shown);
  const containerClassName = clsx(
    "sticky top-0 z-[100] w-full px-4 py-3 md:px-10 md:py-5 lg:px-20 duration-200",
    isPinned && !isDown && "translate-y-[60px] md:translate-y-[70px]",
  );

  const clearAllFilters = useCallback(() => {
    setActiveTags([]);
    setSearch("");
  }, []);

  const closeMobilePanels = useCallback(() => {
    setIsMobileFiltersOpen(false);
    setIsMobileSearchOpen(false);
    if (!hasSearch) {
      setIsSearchFocused(false);
      mobileSearchInputRef.current?.blur();
    }
  }, [hasSearch]);

  useEffect(() => {
    let ticking = false;
    const updatePinned = () => {
      ticking = false;
      if (!sentinelRef.current) return;
      const y = window.scrollY || 0;
      if (y <= 0) {
        setIsPinned(false);
        return;
      }
      const top = sentinelRef.current.getBoundingClientRect().top;
      setIsPinned(top <= 0);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updatePinned);
    };

    updatePinned();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      setIsPinned(false);
    };
  }, []);

  useEffect(() => {
    const set = () => setVisibleCount(isMobile ? 10 : 20);
    set();
  }, [isMobile, search, activeTags]);

  useEffect(() => {
    if (isMobile && isMobileSearchOpen) {
      mobileSearchInputRef.current?.focus();
    }
  }, [isMobile, isMobileSearchOpen]);

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
    <section className="relative space-y-10">
      <div ref={sentinelRef} aria-hidden />
      {isMobileOverlayOpen && (
        <button
          type="button"
          aria-label="Close search and filter panels"
          onClick={closeMobilePanels}
          className="fixed inset-0 z-[90] cursor-default md:hidden"
        />
      )}
      <div
        className={`${uniqueTags.length <= 0 ? "w-max" : "w-full"} ${containerClassName}`}
      >
        <div
          className={clsx(
            "relative isolate overflow-hidden rounded-[30px] border border-black/[0.12] bg-gradient-to-b from-white/56 via-white/30 to-white/16 ring-1 ring-black/[0.05] backdrop-blur-[28px] backdrop-saturate-150 shadow-[0_12px_30px_rgba(15,23,42,0.12),0_1px_6px_rgba(255,255,255,0.45)_inset]",
            isPinned &&
              "border-black/[0.14] bg-gradient-to-b from-white/62 via-white/36 to-white/20 shadow-[0_20px_48px_rgba(15,23,42,0.18),0_2px_10px_rgba(255,255,255,0.55)_inset]",
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-5 top-[1px] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
          />
          <div className={`relative z-10 px-2 py-2 md:px-3 md:py-3`}>
            <div className="hidden md:flex items-center gap-3">
              {uniqueTags.length > 0 && (
                <div className="flex min-w-0 flex-1 items-center gap-2 ">
                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="cursor-pointer flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/15 bg-gradient-to-b from-white/96 to-white/78 text-black/75 shadow-[0_8px_18px_rgba(15,23,42,0.11),0_1px_5px_rgba(255,255,255,0.6)_inset] transition-colors hover:border-black/20 hover:text-black"
                      aria-label="Clear search and filters"
                    >
                      {cross}
                    </button>
                  )}
                  <div className="flex min-w-0 gap-2 max-[768px]:overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden h-[42px]">
                    {uniqueTags.map((tag) => (
                      <ResourceTag
                        key={tag}
                        tag={tag}
                        active={activeTags.includes(tag)}
                        onClick={() => toggleTag(tag)}
                        glass
                        className="shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}
              {uniqueTags.length === 0 && <div className="flex-1" />}
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  if (!hasSearch) {
                    setIsSearchFocused(false);
                  }
                }}
                className={clsx(
                  "mr-1 flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-gradient-to-b from-white/96 to-white/78 text-black/75 shadow-[0_8px_18px_rgba(15,23,42,0.11),0_1px_5px_rgba(255,255,255,0.6)_inset] transition-all",
                  hasSearch
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none absolute",
                )}
                aria-label="Clear search"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 5L15 15M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <label
                className={clsx(
                  "group relative ml-auto flex h-11 w-[250px] items-center overflow-hidden rounded-full border bg-gradient-to-b px-3 shadow-[0_8px_20px_rgba(15,23,42,0.11),0_1px_6px_rgba(255,255,255,0.55)_inset] transition-colors",
                  isDesktopSearchOpen
                    ? "border-black/20 from-white/98 to-white/82"
                    : "border-black/12 from-white/90 to-white/72",
                )}
              >
                <svg
                  className="pointer-events-none h-5 w-5 shrink-0 text-black/55"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="search"
                  className="h-full w-full bg-transparent pl-2 pr-1 text-[13px] leading-[100%] text-black outline-none placeholder:text-black/45"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder={`Search ${formatResourceTypeLabel(type)}`}
                />
              </label>
            </div>

            <div className="md:hidden space-y-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const next = !isMobileSearchOpen;
                    setIsMobileSearchOpen(next);
                    setIsMobileFiltersOpen(false);
                    if (!next && !hasSearch) {
                      setIsSearchFocused(false);
                      mobileSearchInputRef.current?.blur();
                    }
                  }}
                  aria-expanded={mobileSearchOpen}
                  aria-controls="resources-mobile-search"
                  className={clsx(
                    "flex h-11 flex-1 items-center justify-center gap-2 rounded-full border px-3 text-[13px] font-medium text-black transition-colors",
                    mobileSearchOpen || hasSearch
                      ? "border-black/20 bg-gradient-to-b from-white/98 to-white/82"
                      : "border-black/12 bg-gradient-to-b from-white/90 to-white/72",
                  )}
                >
                  <svg
                    className="h-4 w-4 text-black/70"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M21 21l-4.35-4.35"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Search
                </button>

                {uniqueTags.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileFiltersOpen((prev) => !prev);
                      setIsMobileSearchOpen(false);
                    }}
                    aria-expanded={mobileFiltersOpen}
                    aria-controls="resources-mobile-filters"
                    className={clsx(
                      "flex h-11 items-center justify-center gap-2 rounded-full border px-3 text-[13px] font-medium text-black transition-colors",
                      mobileFiltersOpen || activeTags.length > 0
                        ? "border-black/20 bg-gradient-to-b from-white/98 to-white/82"
                        : "border-black/12 bg-gradient-to-b from-white/90 to-white/72",
                    )}
                  >
                    Filters
                    {activeTags.length > 0 && (
                      <span className="min-w-5 rounded-full border border-black/15 bg-white/95 px-1.5 text-[11px] leading-5 text-black/80">
                        {activeTags.length}
                      </span>
                    )}
                  </button>
                )}

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/15 bg-gradient-to-b from-white/96 to-white/78 text-black/75 shadow-[0_8px_18px_rgba(15,23,42,0.11),0_1px_5px_rgba(255,255,255,0.6)_inset]"
                    aria-label="Clear search and filters"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 5L15 15M15 5L5 15"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {mobileSearchOpen && (
                <div
                  id="resources-mobile-search"
                  className="relative flex h-11 items-center rounded-full border border-black/15 bg-gradient-to-b from-white/96 to-white/80 px-3 shadow-[0_8px_20px_rgba(15,23,42,0.12),0_1px_6px_rgba(255,255,255,0.62)_inset]"
                >
                  <svg
                    className="pointer-events-none h-5 w-5 shrink-0 text-black/55"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M21 21l-4.35-4.35"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    ref={mobileSearchInputRef}
                    type="search"
                    className="h-full w-full bg-transparent pl-2 pr-9 text-[13px] leading-[100%] text-black outline-none placeholder:text-black/45"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search resources"
                  />
                  {hasSearch && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-full text-black/65"
                      aria-label="Clear search"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 5L15 15M15 5L5 15"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {uniqueTags.length > 0 && mobileFiltersOpen && (
                <div
                  id="resources-mobile-filters"
                  className="rounded-[22px] border border-black/15 bg-gradient-to-b from-white/96 to-white/80 p-2.5 shadow-[0_12px_30px_rgba(15,23,42,0.14),0_1px_6px_rgba(255,255,255,0.62)_inset]"
                >
                  <div className="max-h-[45vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex flex-wrap gap-2">
                      {uniqueTags.map((tag) => (
                        <ResourceTag
                          key={tag}
                          tag={tag}
                          active={activeTags.includes(tag)}
                          onClick={() => toggleTag(tag)}
                          glass
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col sm:grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-4 md:gap-5 px-4 md:px-10 lg:px-20">
        {visibleList.map((c) => (
          <Link
            className="w-full"
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
