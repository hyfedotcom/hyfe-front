import Link from "next/link";

type RecourcesListFooterProps = {
  activePage: number;
  hasFilters: boolean;
  hasNextPage: boolean;
  nextPage: number;
  pageHref: (page: number) => string;
  pageSize: number;
  shown: number;
  total: number;
};

export function RecourcesListFooter({
  activePage,
  hasFilters,
  hasNextPage,
  nextPage,
  pageHref,
  pageSize,
  shown,
  total,
}: RecourcesListFooterProps) {
  const loadMoreCount = total - shown > pageSize ? pageSize : total - shown;

  return (
    <div className="flex flex-col items-center gap-2 px-4">
      {hasNextPage && (
        <Link
          href={pageHref(nextPage)}
          scroll={false}
          className="cursor-pointer inline-flex items-center justify-center rounded-full border-2 font-semibold! border-primary px-5 py-2 text-sm text-black hover:bg-black/5 transition-colors"
        >
          {`Load ${loadMoreCount} more`}
        </Link>
      )}

      <div className="text-[12px] text-body-secondary">Showing {shown} of {total}</div>

      {!hasFilters && (
        <nav className="sr-only" aria-label="Resources pagination">
          {activePage > 1 && (
            <Link rel="prev" href={pageHref(activePage - 1)} scroll={false}>
              Previous page
            </Link>
          )}
          {hasNextPage && (
            <Link rel="next" href={pageHref(nextPage)} scroll={false}>
              Next page
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
