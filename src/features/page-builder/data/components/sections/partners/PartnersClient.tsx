"use client";
import { PartnersSectionType } from "../../../schema/pageBuilder";
import { useAnimation, motion } from "@/framer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PartnersCard } from "./PartnersCard";

export function PartnersClient({ section }: { section: PartnersSectionType }) {
  const { logos } = section;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const firstSetRef = useRef<HTMLDivElement | null>(null);
  const logosContainerRef = useRef<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState(0);
  const controls = useAnimation();

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

  useEffect(() => {
    if (distance <= 0) {
      controls.set({ x: 0 });
      return;
    }

    let isActive = true;

    const loop = async () => {
      controls.set({ x: 0 });
      const duration = Math.max(distance / 80, 10);

      while (isActive) {
        await controls.start({
          x: -distance,
          transition: { duration, ease: "linear" },
        });
        if (!isActive) return;
        controls.set({ x: 0 });
      }
    };

    loop();
    return () => {
      isActive = false;
      controls.stop();
    };
  }, [distance, controls]);

  return (
    <div
      ref={viewportRef}
      className="overflow-hidden w-screen px-0! -translate-x-4 md:-translate-x-10 xl:-translate-x-20"
    >
      <motion.div
        ref={logosContainerRef}
        className={`flex gap-10 md:gap-20 lg:gap-30 w-max items-center`}
        animate={controls}
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
      </motion.div>
    </div>
  );
}
