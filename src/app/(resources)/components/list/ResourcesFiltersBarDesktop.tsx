import clsx from "clsx";
import { ResourceTag } from "@/app/(resources)/components/ui/ResourceTag";
import { cross } from "@/shared/icons/icons";

type ResourcesFiltersBarDesktopProps = {
  uniqueTags: string[];
  activeTags: string[];
  hasFilters: boolean;
  hasSearch: boolean;
  isDesktopSearchOpen: boolean;
  search: string;
  searchPlaceholder: string;
  onToggleTag: (tag: string) => void;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onClearSearch: () => void;
  onClearAllFilters: () => void;
};

export function ResourcesFiltersBarDesktop({
  uniqueTags,
  activeTags,
  hasFilters,
  hasSearch,
  isDesktopSearchOpen,
  search,
  searchPlaceholder,
  onToggleTag,
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  onClearSearch,
  onClearAllFilters,
}: ResourcesFiltersBarDesktopProps) {
  return (
    <div className="hidden md:flex items-center gap-3">
      {uniqueTags.length > 0 && (
        <div className="flex min-w-0 flex-1 items-center gap-2 ">
          {hasFilters && (
            <button
              type="button"
              onClick={onClearAllFilters}
              className="resources-glass-pill-surface resources-glass-pill-action flex h-10 w-10 shrink-0 items-center justify-center"
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
                onClick={() => onToggleTag(tag)}
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
        onClick={onClearSearch}
        className={clsx(
          "resources-glass-pill-surface resources-glass-pill-action mr-1 flex h-10 w-10 items-center justify-center transition-all",
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
          "resources-glass-search-shell group relative ml-auto flex h-11 w-[250px] items-center overflow-hidden px-3 transition-colors",
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
