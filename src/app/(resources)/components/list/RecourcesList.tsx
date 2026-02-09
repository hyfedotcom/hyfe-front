"use client";

import { ResourceCard, ResourceTag } from "@/features/resources/client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ResourceCardType } from "@/features/resources/data/resources.types";
import { cross } from "@/shared/icons/icons";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useIsScrollingDown } from "@/hooks/useIsScrollingDown";

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
  const width = useWindowSize();
  const isMobile = (width ?? 0) <= 768;
  const isDown = useIsScrollingDown(10);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
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

  const hasFilters = activeTags.length > 0 || search.trim().length > 0;
  const isSearchActive = isSearchFocused || search.length > 0;
  const total = filteredList.length;
  const shown = isMobile ? Math.min(visibleCount, total) : total;
  const visibleList = isMobile ? filteredList.slice(0, shown) : filteredList;
  const containerClassName = [
    "flex gap-2 md:gap-5 w-full py-3 md:py-5 md:px-10 lg:px-20 sticky top-0 duration-200",
    isPinned && !isDown ? "translate-y-[60px] md:translate-y-[84px]" : "",
    isSearchActive ? "flex-col-reverse md:flex-row" : "flex-row",
    hasFilters ? "justify-between" : "justify-end",
    hasFilters && !isSearchActive && isMobile
      ? ""
      : "bg-white/20 border-b-2 border-[#EEEEEE]/40 backdrop-blur-[40px]",
  ].join(" ");

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
    if (!isMobile) return;
    const set = () => setVisibleCount(10);
    set();
  }, [isMobile, search, activeTags]);
  return (
    <section className="relative space-y-10">
      <div ref={sentinelRef} aria-hidden />
      <div className={containerClassName}>
        {uniqueTags.length > 0 && (
          <div className="flex gap-1 pl-4 md:pl-0 md:gap-3 w-full overflow-x-scroll relative">
            {hasFilters && (
              <button
                onClick={() => {
                  setActiveTags([]);
                  setSearch("");
                }}
                className="bg-bg-150  border-[1.5px] rounded-full border-border hover:border-primary p-1.5 md:p-2.5 cursor-pointer "
              >
                {cross}
              </button>
            )}
            {uniqueTags.map((t) => (
              <div key={t} onClick={() => toggleTag(t)}>
                <ResourceTag
                  key={t}
                  tag={t}
                  active={activeTags.some((a) => a === t)}
                />
              </div>
            ))}
            {/* <div className="w-10 h-[35px] bg-gradient-to-r from-white/0 to-white/60 backdrop-blur-[40px] absolute right-0" /> */}
          </div>
        )}
        <div
          className={`z-100 cursor-pointer flex ${isSearchActive ? "px-4 " : "mr-4"}`}
        >
          <div
            className={`relative ml-auto ${isSearchActive && isMobile ? "w-full " : ""} ${isSearchActive && "border-primary"} min-w-[35px] items-center justify-center flex md:mx-4 md:px-0 rounded-full overflow-hidden border-border border-[1.5px] bg-activ`}
          >
            {/* icon */}
            <svg
              className={`pointer-events-none absolute ${isSearchActive ? "left-4" : "left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 "} h-5 w-5 text-black/40`}
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
              className={`${
                search.length > 0 ? "bg-primary-200" : "bg-bg-150"
              } ${isSearchActive ? "pl-12 " : "w-[35px]! h-[35px]! max-w-[35px]! min-w-[35px]! md:max-h-[47px]! md:h-[47px]! md:max-w-[47px]! md:w-[47px]!"} h-max rounded-full
              w-full  px-4 py-2 md:py-3 
              text-black body-small leading-[100%]!
              placeholder:text-black/40 placeholder:body-small placeholder:leading-[100%]!
              focus:outline-primary
            `}
              value={search}
              onChange={(t) => {
                setSearch(t.target.value);
              }}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search"
            />
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
      {isMobile && (
        <div className="flex flex-col items-center gap-2 px-4">
          {shown < total && (
            <button
              type="button"
              onClick={() =>
                setVisibleCount((prev) => Math.min(prev + 10, total))
              }
              className="inline-flex items-center justify-center rounded-full border border-primary px-5 py-2 text-sm text-black font-medium hover:bg-black/5 transition-colors"
            >
              Load 10 more{" "}
            </button>
          )}
          <div className="text-[12px] text-body-secondary">
            Showing {shown} of {total}
          </div>
        </div>
      )}
    </section>
  );
}
