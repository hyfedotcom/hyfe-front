import type { TimelineItem } from "@/features/about/schema/domain";

export function TimelineItem({ item }: { item: TimelineItem }) {
  return (
    <div className="rounded-[20px] p-[1px] bg-gradient-to-br from-primary-200 via-primary-100/50 to-white">
      <article className="bg-gradient-to-br shadow-none!  from-white via-white to-primary-100/40 resources-glass-search-shell resources-glass-search-open relative overflow-hidden rounded-[20px] px-4 py-4 md:px-2 md:py-4  border-0">
        <div className="pl-3 space-y-1.5 md:space-y-2">
          <h3 className="text-[17px]! md:text-[20px]! leading-[120%]!">
            {item.month_day}
          </h3>
          <p className="body-medium text-body">{item.paragraph}</p>
        </div>
      </article>
    </div>
  );
}
