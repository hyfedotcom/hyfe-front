"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "@/framer";

function useIsMobileBreakpoint(maxWidth: number) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setIsMobile(media.matches);

    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, [maxWidth]);

  return isMobile;
}

function ScrollRevealItem({
  progress,
  start,
  end,
  className,
  children,
  yFrom = 24,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  className?: string;
  children: React.ReactNode;
  yFrom?: number;
}) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [yFrom, 0]);

  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

export function HeroStatsScene({
  mapTitle,
  stats,
}: {
  mapTitle: string;
  stats: Record<string, string>[];
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobileBreakpoint(768);
  const [isBlurReady, setIsBlurReady] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const totalItems = stats?.length ?? 0;
  const revealStart = 0.4;
  const revealSpan = 0.4;
  const step = totalItems > 0 ? revealSpan / totalItems : revealSpan;

  const mapY = useTransform(scrollYProgress, [0, 0.2], [0, -120]);
  const mapTitleY = useTransform(scrollYProgress, [0.95, 1], [0, -45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, !isMobile ? 1.5 : 1]);

  const getRange = (index: number) => {
    const start = revealStart + index * step;
    const end = Math.min(start + step * 1.2, 0.98);
    return [start, end] as const;
  };

  const isVisualReady = isBlurReady && isMapReady;

  return (
    <div
      ref={sectionRef}
      className="w-full relative h-auto min-h-[200vh] md:min-h-[160vh] pt-150"
    >
      <div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bottom-0"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-b ${!isVisualReady ? " from-[#fffdf3] via-[#ffe789] to-[#FFD67F]" : "bg-white"} opacity-70 duration-1000`}
          />
          <Image
            src="/home/bgBlur.png"
            alt="Background blur"
            width={1620}
            height={1080}
            priority
            fetchPriority="high"
            sizes="100vw"
            onLoadingComplete={() => setIsBlurReady(true)}
            className={`absolute  w-full h-full object-cover object-top transition-opacity duration-500 ${
              isBlurReady ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="sticky top-0 h-[100vh] flex items-end justify-center overflow-hidden">
            <motion.div
              style={{ y: mapTitleY }}
              className={`resources-glass-surface-strong opacity-100! backdrop-blur-[10px] w:max min-w-[200px] md:w-max rounded-[30px] absolute bottom-4 py-1.5 px-4 z-10 text-center left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
                isVisualReady ? "opacity-100" : "opacity-0"
              }`}
            >
              <div aria-hidden="true" className="resources-glass-overlay" />
              <div aria-hidden="true" className="resources-glass-highlight" />
              <p className="text-[12px] md:text-[16px] font-medium text-black text-balance leading-[126%]">
                {mapTitle}
              </p>
            </motion.div>

            <motion.div
              style={{ y: mapY, scale }}
              className={`relative w-[1000px] md:w-screen translate-y-[120px] transition-opacity duration-500 ${
                isVisualReady ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src="/home/map.png"
                width={1600}
                height={900}
                alt="Global map"
                quality={80}
                sizes="100vw"
                loading="eager"
                fetchPriority="low"
                onLoadingComplete={() => setIsMapReady(true)}
                className="w-[1000px] max-[768px]:max-w-none md:w-[200vw] h-auto object-contain object-bottom origin-bottom translate-y-[10%]"
              />

              <Image
                src="/home/Points.svg"
                alt=""
                aria-hidden
                width={2894}
                height={827}
                sizes="100vw"
                className="absolute top-0 left-0 w-[1000px] max-w-none w-full h-auto object-contain object-bottom origin-bottom translate-y-[10%]"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {stats.length > 0 && (
        <div className="relative min-h-[120vh] md:min-h-[150vh]">
          <div className="sticky top-1/2 -translate-y-1/2">
            <div className="grid grid-cols-2 grid-rows-2 md:flex flex-col lg:flex-row gap-3 px-4 xl:px-20 pb-20 md:pb-[329px]">
              {stats.map((stat, i) => {
                const [start, end] = getRange(i);
                return (
                  <ScrollRevealItem
                    key={i}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                    className="w-full px-4 flex flex-col items-center justify-center py-10 bg-[#FBF9F2]/20 backdrop-blur-[6px] rounded-[20px] border-2 border-[#FFF199]/25"
                    yFrom={18}
                  >
                    <h2 className="text-[50px]! md:text-[60px]! lg:text-[80px]! text-center">
                      {stat.value}
                    </h2>
                    <strong className="text-[14px] md:text-[16px] mx-auto text-center w-full block text-black">
                      {stat.label}
                    </strong>
                  </ScrollRevealItem>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
