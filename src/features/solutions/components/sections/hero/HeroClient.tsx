"use client";

import { useScroll, useTransform, motion } from "@/framer";
import Image from "next/image";
import { useRef } from "react";

export default function HeroClient() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const tabletY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const watchY = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <>
      <div ref={sectionRef} className="absolute inset-0 z-[-1]"></div>
      <div className="relative w-full max-w-[80vw] mx-auto h-[500px] md:h-[800px] 2xl:h-screen translate-x-[-5%] translate-y-[15%]">
        <motion.div style={{ y: tabletY }} className="relative z-10">
          <Image
            className="min-w-[700px]  md:w-full h-auto translate-y-[20px] md:translate-x-[100px]"
            src="/image/tablet-hero.png"
            width={1254}
            height={807}
            fetchPriority="high"
            alt="cough monitor and dashboard"
          />
        </motion.div>
        <motion.div
          style={{ y: watchY }}
          className="w-[180px] md:w-[22%] absolute -translate-y-1/2 top-[280px] md:top-1/2 -left-12 md:left-4 z-20 "
        >
          <Image
            src="/image/watch-hero.png"
            width={293}
            height={425}
            loading="eager"
            alt="cough monitor and dashboard"
            className="w-full"
          />
        </motion.div>
      </div>
    </>
  );
}
