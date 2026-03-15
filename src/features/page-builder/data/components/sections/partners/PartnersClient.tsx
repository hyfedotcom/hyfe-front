"use client";
import { PartnersSectionType } from "../../../schema/pageBuilder";
import type { CSSProperties } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { PartnersCard } from "./PartnersCard";

export function PartnersClient({ section }: { section: PartnersSectionType }) {
  const { logos } = section;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const firstSetRef = useRef<HTMLDivElement | null>(null);
  const logosContainerRef = useRef<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const viewportEl = viewportRef.current;
    const firstSetEl = firstSetRef.current;
    const trackEl = logosContainerRef.current;
    if (!viewportEl || !firstSetEl || !trackEl) return;

    const recalculateDistance = () => {
      const trackWidth = trackEl.scrollWidth;
      const viewportWidth = viewportEl.clientWidth;
      if (trackWidth <= viewportWidth) {
        setDistance(0);
        return;
      }

      const firstSetWidth = firstSetEl.scrollWidth;
      const styles = getComputedStyle(trackEl);
      const rawGap = styles.columnGap === "normal" ? styles.gap : styles.columnGap;
      const gap = Number.parseFloat(rawGap) || 0;
      setDistance(Math.max(firstSetWidth + gap, 0));
    };

    recalculateDistance();

    const resizeObserver = new ResizeObserver(recalculateDistance);
    resizeObserver.observe(viewportEl);
    resizeObserver.observe(firstSetEl);
    resizeObserver.observe(trackEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, [logos]);

  const duration = distance > 0 ? Math.max(distance / 80, 10) : 0;
  const marqueeStyle =
    distance > 0
      ? ({
          "--partners-marquee-distance": `${distance}px`,
          animation: `partners-marquee ${duration}s linear infinite`,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
        } as CSSProperties)
      : undefined;

  return (
    <>
      <div
        ref={viewportRef}
        className="overflow-hidden w-screen px-0! -translate-x-4 md:-translate-x-10 xl:-translate-x-20"
      >
        <div
          ref={logosContainerRef}
          className="flex gap-10 md:gap-20 lg:gap-30 w-max items-center"
          style={marqueeStyle}
        >
          <div
            ref={firstSetRef}
            className="flex shrink-0 gap-10 md:gap-20 lg:gap-30 items-center"
          >
            {logos.map((p, i) => (
              <PartnersCard key={`${p.url}-primary-${i}`} partner={p} />
            ))}
          </div>
          <div
            aria-hidden="true"
            className="flex shrink-0 gap-10 md:gap-20 lg:gap-30 items-center"
          >
            {logos.map((p, i) => (
              <PartnersCard key={`${p.url}-duplicate-${i}`} partner={p} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes partners-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(
              calc(var(--partners-marquee-distance) * -1),
              0,
              0
            );
          }
        }
      `}</style>
    </>
  );
}
