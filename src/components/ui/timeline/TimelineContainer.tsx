"use client";

import { useScroll, useTransform, motion } from "@/framer";
import { useRef } from "react";

export function TimelineContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const yProgres = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="h-full relative">
      <div className="absolute inset-0">
        <motion.div
          style={{ opacity }}
          className="sticky hidden md:flex md:left-4 xl:left-4 top-35  w-max  h-[80vh]  flex-col gap-1 items-center"
        >
          <div
            className=" left-4 w-[50px] h-[50px] pointer-events-none"
            aria-hidden
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/video/scrollDown.gif"
              className="w-full h-full object-contain"
            >
              <source src="/video/scoll.webm" type="video/webm" />
            </video>
          </div>
          <svg
            width="2"
            height="100%"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
            className="overflow-visible text-black"
          >
            {/* Фоновая линия (серая) */}
            <line x1="1" y1="0" x2="1" y2="100" stroke="#fff" strokeWidth="2" />

            {/* Линия прогресса (цветная) */}
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="currentColor"
              strokeWidth="2"
              style={{ pathLength: yProgres }} // Главный мастхэв Framer Motion
            />
          </svg>
          <span className="w-1.5 h-1.5 rounded-full bg-black block"></span>
        </motion.div>
      </div>
      {children}
    </div>
  );
}
