import clsx from "clsx";
import { ResourceTag } from "@/app/(resources + privacy)/components/ui/ResourceTag";
import { cross } from "@/shared/icons/icons";
import { SearchInput } from "@/components/ui/search&Tags/SearchInput";
import { Tags } from "@/components/ui/search&Tags/Tags";

type ResourcesFiltersBarMobileProps = {
  uniqueTags: string[];
  activeTags: string[];
  mobileFiltersOpen: boolean;
  hasFilters: boolean;
  onClearAllFilters: () => void;
  onToggleMobileFilters: () => void;
};

export function ResourcesFiltersBarMobile({
  uniqueTags,
  activeTags,
  mobileFiltersOpen,
  hasFilters,
  onClearAllFilters,
  onToggleMobileFilters,
}: ResourcesFiltersBarMobileProps) {
  const hasActiveTags = activeTags.length > 0;
  const filtersButtonStateClass = hasActiveTags
    ? "border-white/85 ring-1 ring-primary/45 bg-gradient-to-tl from-primary/50 via-white to-white shadow-[0_8px_18px_rgba(15,23,42,0.12),0_1px_4px_rgba(255,255,255,0.72)_inset]"
    : mobileFiltersOpen
      ? "resources-glass-search-open"
      : "resources-glass-search-idle";

  return (
    <div className="md:hidden space-y-2 m-2">
      <div className="flex items-center gap-2">
        <SearchInput placeholder={""} className="resources-glass-search-shell relative flex h-11 w-full items-center px-3 isSearchActive resources-glass-search-open" />

        {uniqueTags.length > 0 && (
          <button
            type="button"
            onClick={onToggleMobileFilters}
            aria-expanded={mobileFiltersOpen}
            aria-controls="resources-mobile-filters"
            aria-label={
              mobileFiltersOpen
                ? "Close filters panel"
                : hasActiveTags
                  ? `Open filters panel, ${activeTags.length} filters selected`
                  : "Open filters panel"
            }
            className={clsx(
              "resources-glass-toggle-shell resources-glass-search-shell flex h-11 items-center justify-center gap-2 px-3 text-[13px] font-medium text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              filtersButtonStateClass,
            )}
          >
            <span>{mobileFiltersOpen ? "Close" : "Filters"}</span>
            {mobileFiltersOpen && (
              <span className="min-w-5 rounded-full border border-black/20 bg-white/95 px-1.5 text-[11px] leading-5 text-black/90">
                Filters
              </span>
            )}
            {!mobileFiltersOpen && hasActiveTags && (
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
          className={clsx(
            "resources-glass-mobile-panel resources-glass-mobile-panel-open p-2.5",
            hasActiveTags && "resources-glass-mobile-panel-active",
          )}
        >
          <div className="max-h-[45vh] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-wrap gap-2">
              <Tags tags={uniqueTags} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
