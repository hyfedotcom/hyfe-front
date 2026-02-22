"use client";

import { ContentContainer } from "@/components/content/ContentContainer";
import { CardsGridSectionType } from "../../schema/pageBuilder";
import { Card } from "@/components/ui/card/Card";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "@/framer";
import { useWindowSize } from "@/hooks/useWindowSize";

export function CardsGrid({ section }: { section: CardsGridSectionType }) {
  const [sizes, setSizes] = useState({
    viewportWidth: 0,
    contentWidth: 0,
  });
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const width = useWindowSize();
  const isMobile = width <= 768;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const container = containerRef.current;
    if (!viewport || !container) return;

    const updateSizes = () => {
      setSizes({
        viewportWidth: viewport.clientWidth,
        contentWidth: container.scrollWidth,
      });
    };
    updateSizes();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateSizes);
      return () => window.removeEventListener("resize", updateSizes);
    }

    const observer = new ResizeObserver(updateSizes);
    observer.observe(viewport);
    observer.observe(container);
    return () => observer.disconnect();
  }, [section.cards.length]);

  const maxX = Math.min(sizes.viewportWidth - sizes.contentWidth, 0);
  const shouldCheckOverflow = () => {
    if (isMobile) return true;
    return isMobile || (section.cards.length > 3 && !isMobile);
  };
  const hasHorizontalScroll =
    shouldCheckOverflow() && (sizes.viewportWidth === 0 || maxX < -1);
  const scrollHeight = hasHorizontalScroll
    ? Math.max(section.cards.length, 1) * 600
    : undefined;
  const x = useTransform(scrollYProgress, [0.1, 0.8], [0, maxX]);

  return (
    <section
      ref={sectionRef}
      className="relative py-[100px] md:py-[140px]"
      style={{ height: scrollHeight }}
    >
      <div
        className={`space-y-6 md:space-y-10 ${hasHorizontalScroll ? "sticky top-10 md:top-30" : ""}`}
      >
        <ContentContainer
          content={section}
          classContainer="px-4 md:px-10 xl:px-20 text-center mx-auto"
          width="max-w-[1200px]"
        />
        {hasHorizontalScroll ? (
          <div ref={viewportRef} className="overflow-x-hidden ">
            <motion.div
              ref={containerRef}
              style={{ x }}
              className="flex flex-row gap-5 px-4 md:px-10 xl:px-20 w-max "
            >
              {section.cards.map((c, i) => (
                <Card card={c} key={i} />
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="px-4 md:px-10 xl:px-20">
            <div
              ref={viewportRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {section.cards.map((c, i) => (
                <Card card={c} key={i} width="w-full md:max-w-none" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
