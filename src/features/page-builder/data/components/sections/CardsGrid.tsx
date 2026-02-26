"use client";

import { ContentContainer } from "@/components/content/ContentContainer";
import { CardsGridSectionType } from "../../schema/pageBuilder";
import { Card } from "@/components/ui/card/Card";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "@/framer";
import { useWindowSize } from "@/hooks/useWindowSize";

const MOBILE_PARAGRAPH_LENGTH_THRESHOLD_CHARS = 120;

export function CardsGrid({ section }: { section: CardsGridSectionType }) {
  const [sizes, setSizes] = useState({
    viewportWidth: 0,
    contentWidth: 0,
  });
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const width = useWindowSize();
  const isMobile = width > 0 ? width <= 768 : false;
  const hasCta = Boolean(section.ctas?.length);
  const paragraphLength = section.paragraph?.replace(/\s+/g, " ").trim().length ?? 0;
  const hasLongParagraph = paragraphLength > MOBILE_PARAGRAPH_LENGTH_THRESHOLD_CHARS;
  const shouldDisableMobileCardsScroll =
    isMobile &&
    hasCta &&
    hasLongParagraph;

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
  }, [isMobile, section.cards.length, shouldDisableMobileCardsScroll]);

  const maxX = Math.min(sizes.viewportWidth - sizes.contentWidth, 0);
  const hasMeasuredWidths = sizes.viewportWidth > 0 && sizes.contentWidth > 0;
  const likelyOverflowWithoutMeasure = isMobile
    ? section.cards.length > 1
    : section.cards.length > 3;
  const shouldCheckOverflow = () => {
    if (shouldDisableMobileCardsScroll) return false;
    if (isMobile) return true;
    return isMobile || (section.cards.length > 3 && !isMobile);
  };
  const hasHorizontalScroll =
    shouldCheckOverflow() &&
    (hasMeasuredWidths ? maxX < -1 : likelyOverflowWithoutMeasure);
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
        className={`space-y-6 md:space-y-10 ${hasHorizontalScroll ? "sticky top-20 md:top-30" : ""}`}
      >
        <div>
          <ContentContainer
            content={section}
            classContainer="px-4 md:px-10 xl:px-20 text-left md:text-center mx-auto"
            width="max-w-[1200px]"
            classP="body-large cards-grid-paragraph"
          />
        </div>
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
