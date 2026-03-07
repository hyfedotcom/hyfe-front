import { ResourceCard } from "@/features/resources/client";
import type { ResourceCardType } from "@/features/resources/data/resources.types";
import Link from "next/link";
import { ResourcesFiltersBarCompressed } from "./ResourcesFiltersBarCompressed";

export function RecourcesListCompressed({
  data,
  type,
  tags,
  renderMode,
}: {
  data: ResourceCardType[];
  type: string;
  tags: string[];
  renderMode: "full" | "detail-canonical" | "detail-sheet";
}) {
  const visibleList = data.slice(0, 4);

  return (
    <section className="relative space-y-6 md:space-y-8">
      <ResourcesFiltersBarCompressed
        type={type}
        hasFilters={tags.length > 0}
        tags={tags}
      />
      <div className="flex w-full flex-col items-stretch gap-4 px-4 md:gap-5 md:px-10 sm:grid sm:grid-cols-2 sm:items-stretch lg:grid-cols-3 xl:grid-cols-4 xl:px-20">
        {visibleList.map((c) => (
          <Link
            className="block h-full w-full"
            href={`/${type}`}
            key={c.slug}
            scroll={false}
          >
            <ResourceCard card={c} renderMode={renderMode} />
          </Link>
        ))}
      </div>
    </section>
  );
}
