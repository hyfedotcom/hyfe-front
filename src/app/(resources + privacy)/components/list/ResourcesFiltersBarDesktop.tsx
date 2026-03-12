import { cross } from "@/shared/icons/icons";
import { SearchInput } from "@/components/ui/search&Tags/SearchInput";
import { Tags } from "@/components/ui/search&Tags/Tags";

type ResourcesFiltersBarDesktopProps = {
  uniqueTags: string[];
  activeTags: string[];
  hasFilters: boolean;

  searchPlaceholder: string;
  onClearAllFilters: () => void;
};

export function ResourcesFiltersBarDesktop({
  uniqueTags,
  hasFilters,
  searchPlaceholder,
  onClearAllFilters,
}: ResourcesFiltersBarDesktopProps) {
  return (
    <div className={`${uniqueTags.length === 0 && "pl-3"} hidden min-w-0 md:flex items-center`}>
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
                <Tags tags={uniqueTags} />
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


      <SearchInput placeholder={searchPlaceholder} className="resources-glass-search-shell group relative ml-auto mr-2 my-2 flex h-11 w-[250px] shrink-0 items-center px-3 transition-colors md:mr-3 md:my-3  resources-glass-search-open" />

    </div >
  );
}
