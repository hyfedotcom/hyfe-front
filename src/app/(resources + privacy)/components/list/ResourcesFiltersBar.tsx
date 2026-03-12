import clsx from "clsx";
import { formatResourceTypeLabel } from "@/shared/utils/formatResourceTypeLabel";
import { ResourcesFiltersBarDesktop } from "./ResourcesFiltersBarDesktop";
import { ResourcesFiltersBarMobile } from "./ResourcesFiltersBarMobile";

type ResourcesFiltersBarProps = {
  type: string;
  uniqueTags: string[];
  activeTags: string[];
  hasFilters: boolean;
  isPinned: boolean;
  isDown: boolean;
  mobileFiltersOpen: boolean;
  onClearAllFilters: () => void;
  onToggleMobileFilters: () => void;
  onCloseMobilePanels: () => void;
};

export function ResourcesFiltersBar({
  type,
  uniqueTags,
  activeTags,
  hasFilters,
  isPinned,
  isDown,
  mobileFiltersOpen,
  onClearAllFilters,
  onToggleMobileFilters,
  onCloseMobilePanels,
}: ResourcesFiltersBarProps) {
  const containerClassName = clsx(
    "sticky z-[100] w-full px-4 md:px-10 mt-3 md:mt-8 xl:px-20",
    "duration-200",
    isPinned && !isDown ? "top-18 md:top-24 " : "top-3  ",
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

          <div className="relative z-10 ">
            <ResourcesFiltersBarDesktop
              uniqueTags={uniqueTags}
              activeTags={activeTags}
              hasFilters={hasFilters}

              searchPlaceholder={searchPlaceholder}
              onClearAllFilters={onClearAllFilters}
            />

            <ResourcesFiltersBarMobile
              uniqueTags={uniqueTags}
              activeTags={activeTags}
              hasFilters={hasFilters}
              
              mobileFiltersOpen={mobileFiltersOpen}

              onClearAllFilters={onClearAllFilters}
              onToggleMobileFilters={onToggleMobileFilters}
            />
          </div>
        </div>
      </div>
    </>
  );
}
