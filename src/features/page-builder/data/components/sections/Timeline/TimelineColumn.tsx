import type { TimelineColumnType } from "@/features/about/schema/domain";
import { TimelineItem } from "./TimelineItem";

export function TimelineColumn({
  column,
  anchorId,
}: {
  column: TimelineColumnType;
  anchorId: string;
}) {
  return (
    <section
      id={anchorId}
      className=" resources-glass-surface resources-glass-surface-strong relative overflow-hidden rounded-[28px] p-4 md:p-8 lg:p-10 shadow-none shadow-classic!"
    >
      <div aria-hidden="true" className="resources-glass-overlay" />
      <div aria-hidden="true" className="resources-glass-highlight" />

      <div className="relative z-10 space-y-4 md:space-y-10">
        <div className="w-max resources-glass-pill-surface px-4 py-2 md:px-5 md:py-2.5">
          <h2 className="text-[22px]! md:text-[30px]!">
            {column.year}
          </h2>
        </div>

        <div className="space-y-3 md:space-y-4">
          {column.item.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
