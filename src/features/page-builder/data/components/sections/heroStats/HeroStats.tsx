"use client";

import { Button } from "@/components/ui/buttons/Button";
import { HeroStatsSectionType } from "../../../schema/pageBuilder";
import Image from "next/image";
import { motion, useScroll, useTransform } from "@/framer";
import { useRef } from "react";

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

export function HeroStats({ section }: { section: HeroStatsSectionType }) {
  const { title, paragraph, ctas, stats } = section;
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const totalItems = stats?.length ?? 0;
  const revealStart = 0.4;
  const revealSpan = 0.4;
  const step = totalItems > 0 ? revealSpan / totalItems : revealSpan;
  const mapY = useTransform(scrollYProgress, [0, 0.2], [120, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const getRange = (index: number) => {
    const start = revealStart + index * step;
    const end = Math.min(start + step * 1.2, 0.98);
    return [start, end] as const;
  };

  return (
    <main
      ref={sectionRef}
      className="w-full pt-[240px] relative  h-auto min-h-[220vh] md:min-h-[160vh] space-y-20 md:space-y-40 lg:space-y-[326px]"
    >
      <div>
        {" "}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bottom-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1920"
            height="1798"
            viewBox="0 0 1920 1798"
            fill="none"
            className="absolute left-1/2 -translate-x-1/2 translate-y-[32%] w-full max-w-none -top-200 md:-top-140 overflow-visible"
            preserveAspectRatio="xMidYMin slice"
          >
            <g className="svg-blur-filter" filter="url(#hero_stats_blur_filter)">
              <path
                d="M-388 531.555C-204.407 531.555 -206.5 828.554 -63 531.555C80.5 234.556 305 808.553 466 531.555C627 254.557 733.5 939.053 1030 531.555C1326.5 124.057 1330.73 531.555 1488 531.555C1614.81 531.555 1750 10.5563 1884 531.555C2018 1052.55 2158.82 531.555 2309 531.555V1497.56H-388V531.555Z"
                fill="url(#hero_stats_blur_gradient)"
              />
            </g>
            <g
              className="svg-blur-fallback"
              filter="url(#hero_stats_blur_filter_fallback)"
            >
              <path
                d="M-388 531.555C-204.407 531.555 -206.5 828.554 -63 531.555C80.5 234.556 305 808.553 466 531.555C627 254.557 733.5 939.053 1030 531.555C1326.5 124.057 1330.73 531.555 1488 531.555C1614.81 531.555 1750 10.5563 1884 531.555C2018 1052.55 2158.82 531.555 2309 531.555V1497.56H-388V531.555Z"
                fill="url(#hero_stats_blur_gradient)"
              />
            </g>
            <defs>
              <filter
                id="hero_stats_blur_filter"
                x="-688"
                y="0"
                width="3297"
                height="1797.56"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="150"
                  result="effect1_foregroundBlur_327_2267"
                />
              </filter>
              <filter
                id="hero_stats_blur_filter_fallback"
                x="-1100"
                y="-500"
                width="4200"
                height="2800"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feGaussianBlur stdDeviation="150" />
              </filter>
              <linearGradient
                id="hero_stats_blur_gradient"
                x1="982"
                y1="457.5"
                x2="1046.08"
                y2="1403.51"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.00154131" stopColor="white" />
                <stop offset="0.151644" stopColor="#FFCE1D" />
                <stop offset="0.301746" stopColor="#FFC800" />
                <stop offset="0.63368" stopColor="#FFAE00" />
                <stop offset="1" stopColor="#FF9D00" />
              </linearGradient>
            </defs>
          </svg>
          <div className="sticky top-0 h-[100vh] flex items-end justify-center overflow-hidden">
            <motion.div style={{ y: mapY, scale }} className="w-screen">
              <Image
                src="/home/mappoints.png"
                width={1920}
                height={1080}
                alt="maps"
                quality={100}
                sizes="100vw"
                className="w-[200vw] h-auto object-contain object-bottom origin-bottom translate-y-[10%]"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col items-center px-4 md:px-10 text-center space-y-11 z-3 relative">
          <div className="space-y-8 text-balance max-w-[1000px]">
            <h1>{title}</h1>
            <p className="body-large text-balance">{paragraph}</p>
          </div>
          <div className="flex gap-6 flex-col sm:flex-row">
            {ctas &&
              ctas.map((c, i) => (
                <Button
                  key={i}
                  label={c.label}
                  url={c.url}
                  version={i === 1 ? "white" : "black"}
                  color={i === 1 ? "black" : "white"}
                />
              ))}
          </div>
        </div>
      </div>
      {stats.length > 0 && (
        <div className="relative min-h-[120vh] md:min-h-[150vh]">
          <div className="sticky top-1/2 -translate-y-1/2">
            <div className="flex flex-col lg:flex-row gap-3 px-4 xl:px-20 pb-20 md:pb-[329px]">
              {stats.map((s, i) => {
                const [start, end] = getRange(i);
                return (
                  <ScrollRevealItem
                    key={i}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                    className="w-full flex flex-col items-center justify-center py-10 bg-[#FBF9F2]/20 backdrop-blur-[6px] rounded-[20px] border-2 border-[#FFF199]/25"
                    yFrom={18}
                  >
                    <h2 className="text-[60px]! md:text-[80px]! text-center">
                      {s.value}
                    </h2>
                    <strong className="mx-auto text-center w-full block text-black">
                      {s.label}
                    </strong>
                  </ScrollRevealItem>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
