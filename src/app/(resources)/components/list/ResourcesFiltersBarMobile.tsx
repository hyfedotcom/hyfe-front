import clsx from "clsx";
import { ResourceTag } from "@/app/(resources)/components/ui/ResourceTag";
import { cross } from "@/shared/icons/icons";

type ResourcesFiltersBarMobileProps = {
  uniqueTags: string[];
  activeTags: string[];
  search: string;
  mobileFiltersOpen: boolean;
  hasSearch: boolean;
  hasFilters: boolean;
  onToggleTag: (tag: string) => void;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onClearSearch: () => void;
  onClearAllFilters: () => void;
  onToggleMobileFilters: () => void;
};

export function ResourcesFiltersBarMobile({
  uniqueTags,
  activeTags,
  search,
  mobileFiltersOpen,
  hasSearch,
  hasFilters,
  onToggleTag,
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  onClearSearch,
  onClearAllFilters,
  onToggleMobileFilters,
}: ResourcesFiltersBarMobileProps) {
  return (
    <div className="md:hidden space-y-2">
      <div className="flex items-center gap-2">
        <div
          id="resources-mobile-search"
          className="resources-glass-search-shell resources-glass-search-open relative flex h-11 w-full items-center px-3"
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
            className="h-full w-full bg-transparent pl-2 pr-9 text-[13px] leading-[100%] text-black outline-none placeholder:text-black/45"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            onFocus={onSearchFocus}
            onBlur={onSearchBlur}
            placeholder="Search resources"
          />
          {hasSearch && (
            <button
              type="button"
              onClick={onClearSearch}
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

        {uniqueTags.length > 0 && (
          <button
            type="button"
            onClick={onToggleMobileFilters}
            aria-expanded={mobileFiltersOpen}
            aria-controls="resources-mobile-filters"
            className={clsx(
              "resources-glass-toggle-shell flex h-11 items-center justify-center gap-2 px-3 text-[13px] font-medium text-black resources-glass-search-shell",
              mobileFiltersOpen || activeTags.length > 0
                ? "resources-glass-toggle-active "
                : "resources-glass-toggle-idle",
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
            onClick={onClearAllFilters}
            className="resources-glass-pill-surface resources-glass-pill-action flex h-11 w-11 shrink-0 items-center justify-center"
            aria-label="Clear search and filters"
          >
            {cross}
          </button>
        )}
      </div>

      {uniqueTags.length > 0 && mobileFiltersOpen && (
        <div
          id="resources-mobile-filters"
          className="resources-glass-mobile-panel p-2.5"
        >
          <div className="max-h-[45vh] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-wrap gap-2">
              {uniqueTags.map((tag) => (
                <ResourceTag
                  key={tag}
                  tag={tag}
                  active={activeTags.includes(tag)}
                  onClick={() => onToggleTag(tag)}
                  glass
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
