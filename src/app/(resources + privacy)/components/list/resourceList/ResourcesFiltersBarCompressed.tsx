import clsx from "clsx";
import { ResourceTag } from "../../ui/ResourceTag";
import { useMemo } from "react";

type ResourcesFiltersBarProps = {
  type: string;
  hasFilters: boolean;
  tags: string[];
};

export function ResourcesFiltersBarCompressed({
  type,
  hasFilters,
  tags,
}: ResourcesFiltersBarProps) {
  const uniqueTags = useMemo(() => {
    return Array.from(new Set(tags)).filter(Boolean);
  }, [tags]);
  return (
    <>
      <div
        className={` ${hasFilters ? "w-full" : "w-max"} px-4 md:px-10 xl:px-20  max-md:h-[62px] sticky z-[100] w-full px-4 md:px-10 pt-3 md:pt-3 xl:px-20 duration-200`}
      >
        <div className={clsx("resources-glass-surface rounded-[30px]")}>
          <div aria-hidden="true" className="resources-glass-overlay" />
          <div aria-hidden="true" className="resources-glass-highlight" />

          <div className="flex justify-between">
            {uniqueTags && (
              <div className="hidden md:flex gap-2">
                {uniqueTags.map((e, i) => (
                  <ResourceTag
                    key={e}
                    tag={e}
                    glass
                    className={clsx(
                      "shrink-0",
                      i === 0 && "ml-3",
                      i === uniqueTags.length - 1 && "mr-3",
                    )}
                  />
                ))}
              </div>
            )}

            <label
              className={`  resources-glass-search-shell group relative  mr-2 my-2 flex h-11 w-[250px] shrink-0 items-center px-3 transition-colors md:mr-3 md:my-3 resources-glass-search-open resources-glass-search-idle backdrop-blur-sm`}
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
                className="h-full w-full bg-transparent pl-2 pr-1 text-[13px] leading-[100%] text-black outline-none placeholder:text-black/45"
                type="search"
                placeholder={`Search ${type}`}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
