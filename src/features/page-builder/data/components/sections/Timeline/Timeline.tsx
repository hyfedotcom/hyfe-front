"use client";

import { SectionContainer } from "@/components/layouts/SectionContainer";
import { TimelineType } from "@/features/about/schema/domain";
import { TimelineColumn } from "./TimelineColumn";
import { HomeParallaxBackground } from "@/components/background/HomeParallaxBackground";
import { toSlug } from "@/shared/utils/toSlug";
import { TimelineJumpLinksClient } from "./TimelineJumpLinksClient";
// import { useEffect } from "react";
import { useIsScrollingDown } from "@/hooks/useIsScrollingDown";

export default function Timeline({ section }: { section: TimelineType }) {
  const isDown = useIsScrollingDown();

  const columns = section.column.map((column) => {
    const yearSlug = toSlug(column.year);
    const anchorId = yearSlug
      ? `timeline-${column.id}-${yearSlug}`
      : `timeline-${column.id}`;

    return {
      anchorId,
      column,
    };
  });

  const jumpItems = columns.map(({ anchorId, column }) => ({
    id: anchorId,
    label: column.year,
  }));

  // useEffect(() => {
  //   const observer = new IntersectionObserver(([entry]) => {}, {});
  // }, []);

  return (
    <SectionContainer className="bg-transparent! px-0!">
      <div className="relative lg:flex">
        {jumpItems.length > 0 && (
          <aside
            className={`${isDown ? "max-md:top-0" : "max-md:top-14"} translate-x-4  md:translate-x-10 xl:translate-x-20 sticky mb-4 z-[100] w-max  max-md:transition-[top] max-md:duration-300 max-md:ease-out md:top-[70px]  lg:col-start-1 lg:top-1/3 lg:w-auto lg:self-start lg:h-fit lg:px-0 lg:pt-0 lg:justify-end`}
          >
            <TimelineJumpLinksClient items={jumpItems} />
          </aside>
        )}
        <div className="mx-auto w-full max-w-[1000px] space-y-4 px-4 md:w-[80vw] md:space-y-6 md:px-0 lg:col-start-2">
          {columns.map(({ anchorId, column }) => (
            <TimelineColumn
              key={column.id}
              column={column}
              anchorId={anchorId}
            />
          ))}
        </div>
        <HomeParallaxBackground />
      </div>
    </SectionContainer>
  );
}
