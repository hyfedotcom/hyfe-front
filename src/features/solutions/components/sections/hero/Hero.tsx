"use client";

import { Button } from "@/components/ui/buttons/Button";
import { SolutionsHeroType } from "@/features/solutions/schema/hero/strapi.schema";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "@/framer";

export function Hero({ section }: { section: SolutionsHeroType }) {
  const { ctas, paragraph, title } = section;
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const ctasY = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const tabletY = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const watchY = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <main
      ref={sectionRef}
      className="relative bg-primary-100 overflow-hidden"
    >
      <svg
        width="1920"
        height="1911"
        viewBox="0 0 1920 1911"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[-20%] -bottom-1/2 z-0 w-[2400px] max-w-none overflow-visible"
      >
        <g className="svg-blur-filter" filter="url(#hero_simple_blur_filter)">
          <path
            d="M-388 553.49C-204.407 553.49 -206.5 878.624 -63 553.49C80.5 228.357 305 856.729 466 553.49C627 250.252 733.5 999.591 1030 553.49C1326.5 107.389 1330.73 553.49 1488 553.49C1614.81 553.49 1750 -16.8628 1884 553.49C2018 1123.84 2158.82 553.49 2309 553.49V1611H-388V553.49Z"
            fill="url(#hero_simple_blur_gradient)"
          />
        </g>
        <g
          className="svg-blur-fallback"
          filter="url(#hero_simple_blur_filter_fallback)"
        >
          <path
            d="M-388 553.49C-204.407 553.49 -206.5 878.624 -63 553.49C80.5 228.357 305 856.729 466 553.49C627 250.252 733.5 999.591 1030 553.49C1326.5 107.389 1330.73 553.49 1488 553.49C1614.81 553.49 1750 -16.8628 1884 553.49C2018 1123.84 2158.82 553.49 2309 553.49V1611H-388V553.49Z"
            fill="url(#hero_simple_blur_gradient)"
          />
        </g>
        <defs>
          <filter
            id="hero_simple_blur_filter"
            x="-688"
            y="0"
            width="3297"
            height="1911"
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
              result="effect1_foregroundBlur_1028_25466"
            />
          </filter>
          <filter
            id="hero_simple_blur_filter_fallback"
            x="-1100"
            y="-500"
            width="4200"
            height="3200"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="150" />
          </filter>
          <linearGradient
            id="hero_simple_blur_gradient"
            x1="982"
            y1="472.42"
            x2="1058.73"
            y2="1507.11"
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
      <div className="relative z-1">
        {" "}
        <div className="space-y-5 pt-[240px] max-w-[1600px] mx-auto text-center text-balance mb-11 px-4 md:px-10 xl:px-20">
          <h1 className="md:text-[50px]! lg:text-[70px]!">{title}</h1>
          <p className="body-large text-balance">{paragraph}</p>
        </div>
        <motion.div
          style={{ y: ctasY }}
          className="flex gap-5 flex-col md:flex-row items-center justify-center "
        >
          {ctas?.map((c, i) => (
            <Button
              key={i}
              label={c.label}
              url={c.url}
              version={i > 0 ? "white" : "black"}
              color={i > 0 ? "black" : "white"}
            />
          ))}
        </motion.div>
        <div className="relative min-w-[800px] mx-auto w-full max-w-[1254px] h-[600px] md:h-[800px] translate-x-[-5%]">
          <motion.div style={{ y: tabletY }} className="relative z-10">
            <Image
              className="w-full h-auto md:translate-x-[100px]"
              src="/image/tablet-hero.png"
              width={1254}
              height={807}
              alt="cough monitor and dashboard"
            />
          </motion.div>
          <motion.div
            style={{ y: watchY }}
            className="absolute left-0 bottom-0 z-20 md:translate-x-[-10%] md:left-[4%] md:translate-x-[-20%] lg:left-[6%]"
          >
            <Image
              src="/image/watch-hero.png"
              width={293}
              height={425}
              alt="cough monitor and dashboard"
              className="w-[25vh] md:w-[293px]"
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
