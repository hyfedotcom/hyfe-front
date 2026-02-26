import clsx from "clsx";
import { ResourceTag } from "@/app/(resources)/components/ui/ResourceTag";
import { cross } from "@/shared/icons/icons";

type ResourcesFiltersBarDesktopProps = {
  uniqueTags: string[];
  activeTags: string[];
  hasFilters: boolean;
  isDesktopSearchOpen: boolean;
  search: string;
  searchPlaceholder: string;
  onToggleTag: (tag: string) => void;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onClearAllFilters: () => void;
};

export function ResourcesFiltersBarDesktop({
  uniqueTags,
  activeTags,
  hasFilters,
  isDesktopSearchOpen,
  search,
  searchPlaceholder,
  onToggleTag,
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  onClearAllFilters,
}: ResourcesFiltersBarDesktopProps) {
  return (
    <div className={`${ uniqueTags.length === 0 && "pl-3"} hidden min-w-0 md:flex items-center`}>
      {uniqueTags.length > 0 && (
        <div className="flex min-w-0 flex-1 items-center overflow-visible">
          {hasFilters && (
            <button
              type="button"
              onClick={onClearAllFilters}
              className="resources-glass-pill-surface resources-glass-pill-action mx-2 my-2 flex h-10 w-10 shrink-0 items-center justify-center md:mx-3 md:my-3"
              aria-label="Clear search and filters"
            >
              {cross}
            </button>
          )}
          <div className="min-w-0 flex-1 overflow-visible">
            <div className="">
              <div className="flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {uniqueTags.map((tag, index) => (
                  <ResourceTag
                    key={tag}
                    tag={tag}
                    active={activeTags.includes(tag)}
                    onClick={() => onToggleTag(tag)}
                    glass
                    className={clsx(
                      "shrink-0",
                      index === 0 && "ml-3",
                      index === uniqueTags.length - 1 && "mr-3",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {uniqueTags.length === 0 && <div className="flex-1" />}

      {uniqueTags.length === 0 && hasFilters && (
        <button
          type="button"
          onClick={onClearAllFilters}
          className="resources-glass-pill-surface resources-glass-pill-action mr-2 my-2 flex h-10 w-10 shrink-0 items-center justify-center md:mr-3 md:my-3"
          aria-label="Clear search and filters"
        >
          {cross}
        </button>
      )}

      <label
        className={clsx(
          "resources-glass-search-shell group relative ml-auto mr-2 my-2 flex h-11 w-[250px] shrink-0 items-center px-3 transition-colors md:mr-3 md:my-3",
          isDesktopSearchOpen
            ? "resources-glass-search-open"
            : "resources-glass-search-idle",
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
          onChange={(event) => onSearchChange(event.target.value)}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
          placeholder={searchPlaceholder}
        />
      </label>
    </div>
  );
}
