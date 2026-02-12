import clsx from "clsx";
import { formatResourceTypeLabel } from "@/shared/utils/formatResourceTypeLabel";
import { ResourcesFiltersBarDesktop } from "./ResourcesFiltersBarDesktop";
import { ResourcesFiltersBarMobile } from "./ResourcesFiltersBarMobile";

type ResourcesFiltersBarProps = {
  type: string;
  uniqueTags: string[];
  activeTags: string[];
  search: string;
  hasSearch: boolean;
  hasFilters: boolean;
  isPinned: boolean;
  isDown: boolean;
  isDesktopSearchOpen: boolean;
  mobileFiltersOpen: boolean;
  onToggleTag: (tag: string) => void;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onClearSearch: () => void;
  onClearAllFilters: () => void;
  onToggleMobileFilters: () => void;
  onCloseMobilePanels: () => void;
};

export function ResourcesFiltersBar({
  type,
  uniqueTags,
  activeTags,
  search,
  hasSearch,
  hasFilters,
  isPinned,
  isDown,
  isDesktopSearchOpen,
  mobileFiltersOpen,
  onToggleTag,
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  onClearSearch,
  onClearAllFilters,
  onToggleMobileFilters,
  onCloseMobilePanels,
}: ResourcesFiltersBarProps) {
  const containerClassName = clsx(
    "sticky top-0 z-[100] w-full px-4 py-3 md:px-10 md:py-5 lg:px-20 duration-200",
    isPinned && !isDown && "translate-y-[60px] md:translate-y-[70px]",
  );
  const searchPlaceholder = `Search ${formatResourceTypeLabel(type)}`;

  return (
    <>
      {mobileFiltersOpen && (
        <button
          type="button"
          aria-label="Close search and filter panels"
          onClick={onCloseMobilePanels}
          className="fixed inset-0 z-[90] cursor-default md:hidden"
        />
      )}

      <div
        className={`${uniqueTags.length <= 0 ? "md:w-max" : "w-full"} ${containerClassName}`}
      >
        <div
          className={clsx(
            "resources-glass-surface rounded-[30px]",
            isPinned && "resources-glass-surface-strong",
          )}
        >
          <div aria-hidden="true" className="resources-glass-overlay" />
          <div aria-hidden="true" className="resources-glass-highlight" />

          <div className="relative z-10 px-2 py-2 md:px-3 md:py-3">
            <ResourcesFiltersBarDesktop
              uniqueTags={uniqueTags}
              activeTags={activeTags}
              hasFilters={hasFilters}
              hasSearch={hasSearch}
              isDesktopSearchOpen={isDesktopSearchOpen}
              search={search}
              searchPlaceholder={searchPlaceholder}
              onToggleTag={onToggleTag}
              onSearchChange={onSearchChange}
              onSearchFocus={onSearchFocus}
              onSearchBlur={onSearchBlur}
              onClearSearch={onClearSearch}
              onClearAllFilters={onClearAllFilters}
            />

            <ResourcesFiltersBarMobile
              uniqueTags={uniqueTags}
              activeTags={activeTags}
              search={search}
              mobileFiltersOpen={mobileFiltersOpen}
              hasSearch={hasSearch}
              hasFilters={hasFilters}
              onToggleTag={onToggleTag}
              onSearchChange={onSearchChange}
              onSearchFocus={onSearchFocus}
              onSearchBlur={onSearchBlur}
              onClearSearch={onClearSearch}
              onClearAllFilters={onClearAllFilters}
              onToggleMobileFilters={onToggleMobileFilters}
            />
          </div>
        </div>
      </div>
    </>
  );
}
