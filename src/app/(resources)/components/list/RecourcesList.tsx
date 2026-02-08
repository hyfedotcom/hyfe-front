"use client";

import { ResourceCard, ResourceTag } from "@/features/resources/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ResourceCardType } from "../../../../features/resources/data/resources.types";
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

  return (
    <section className="relative space-y-10">
      <div className="flex flex-col-reverse  gap-5 md:flex-row w-full justify-between py-5 px-4 md:px-10 lg:px-20 sticky top-0 bg-white/20 border-b-2 border-[#EEEEEE]/40 backdrop-blur-[40px] z-100000">
        {uniqueTags.length > 0 && (
          <div className="flex gap-3 w-full overflow-x-scroll">
            {hasFilters && (
              <button
                onClick={() => (setActiveTags([]), setSearch(""))}
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
          </div>
        )}
        <div className="relative flex rounded-full overflow-hidden border-border border-[1.5px]">
          {/* icon */}
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/40"
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
            } h-max rounded-full
              w-full  px-4 py-3 pl-12
              text-black body-small leading-[100%]!
              placeholder:text-black/40 placeholder:body-small placeholder:leading-[100%]!
              focus:outline-primary
            `}
            value={search}
            onChange={(t) => setSearch(t.target.value)}
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex w-full flex-col sm:grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-5 px-4 md:px-10 lg:px-20">
        {filteredList.map((c) => (
          <Link
            className="w-full"
            href={`/${type}/${c.slug}`}
            key={c.title}
            scroll={false}
          >
            {" "}
            <ResourceCard card={c} />
          </Link>
        ))}
      </div>
    </section>
  );
}
