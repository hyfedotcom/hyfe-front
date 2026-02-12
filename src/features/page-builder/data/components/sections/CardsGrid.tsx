"use client";

import { ContentContainer } from "@/components/content/ContentContainer";
import { CardsGridSectionType } from "../../schema/pageBuilder";
import { Card } from "@/components/ui/card/Card";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "@/framer";
import { useWindowSize } from "@/hooks/useWindowSize";

export function CardsGrid({ section }: { section: CardsGridSectionType }) {
  const [sizes, setSizes] = useState({
    sectionWidth: 0,
    containerWidth: 0,
  });
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const width = useWindowSize();
  const isMobile = width <= 768;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["10% start", "90% end"],
  });

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const updateSizes = () => {
      setSizes({
        sectionWidth: section.clientWidth,
        containerWidth: container.clientWidth,
      });
    };

    updateSizes();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateSizes);
      return () => window.removeEventListener("resize", updateSizes);
    }

    const observer = new ResizeObserver(updateSizes);
    observer.observe(section);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const scrollHeight =
    Math.max(section.cards.length, 1) * (isMobile ? 600 : 600);
  const maxX = sizes.sectionWidth - sizes.containerWidth;
  const x = useTransform(scrollYProgress, [0.1, 0.8], [0, maxX]);

  return (
    <section
      ref={sectionRef}

      className="relative py-[100px]  md:py-[140px]"
      style={{ height: scrollHeight }}
    >
      <div className="space-y-6 md:space-y-10  sticky top-10 md:top-24">
        <ContentContainer content={section} classContainer="px-4 md:px-10 lg:px-20 text-center mx-auto" width="max-w-[1200px]" />
        <div className="overflow-x-hidden">
          <motion.div
            ref={containerRef}
            style={{ x }}
            className="flex flex-row gap-5 px-4 md:px-10 lg:px-20 w-max"
          >
            {section.cards.map((c, i) => (
              <Card card={c} key={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
