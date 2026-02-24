"use client";

import Image from "next/image";
import { useRef, type ReactNode, type RefObject } from "react";
import { motion, useScroll, useTransform } from "@/framer";
import {
  useReducedMotion,
  useSpring,
  type MotionValue,
  type SpringOptions,
  type UseScrollOptions,
} from "framer-motion";

type HomeParallaxBackgroundProps = {
  className?: string;
  targetRef?: RefObject<HTMLElement | null>;
  progress?: MotionValue<number>;
  offset?: UseScrollOptions["offset"];
};

const SPRING_CONFIG: SpringOptions = {
  stiffness: 70,
  damping: 26,
  mass: 0.35,
};

const DEFAULT_OFFSET: UseScrollOptions["offset"] = ["start end", "end start"];

function HoneycombMark({ className }: { className?: string }) {
  return (
    <svg
      width="283"
      height="279"
      viewBox="0 0 283 279"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105.747 181.349L66.7786 158.899L27.8098 181.349L27.8098 226.142L66.7786 248.591L105.747 226.142L105.747 181.349ZM59.1229 276.275L7.65571 246.626C2.91833 243.896 7.31574e-06 238.853 6.97656e-06 233.395L0 174.096C3.21604e-06 168.637 2.91835 163.594 7.65571 160.865L59.1229 131.215C63.8603 128.486 69.6969 128.486 74.4343 131.215L125.901 160.865C130.639 163.594 133.557 168.637 133.557 174.096L133.557 233.395C133.557 238.853 130.639 243.897 125.901 246.626L74.4343 276.275C69.6969 279.004 63.8602 279.004 59.1229 276.275Z"
        fill="#FFF9CC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M255.115 181.348L216.146 158.899L177.177 181.348L177.177 226.141L216.146 248.591L255.115 226.141L255.115 181.348ZM208.49 276.275L157.023 246.625C152.286 243.896 149.367 238.852 149.367 233.394L149.367 174.095C149.367 168.637 152.286 163.593 157.023 160.864L208.49 131.215C213.227 128.486 219.064 128.486 223.801 131.215L275.269 160.864C280.006 163.593 282.924 168.637 282.924 174.095V233.394C282.924 238.852 280.006 243.896 275.269 246.625L223.801 276.275C219.064 279.004 213.227 279.004 208.49 276.275Z"
        fill="#FFF9CC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M180.435 52.1802L141.466 29.7309L102.497 52.1802L102.497 96.9733L141.466 119.423L180.435 96.9733L180.435 52.1802ZM133.81 147.107L82.3432 117.457C77.6058 114.728 74.6875 109.684 74.6875 104.226L74.6875 44.9273C74.6875 39.469 77.6058 34.4254 82.3432 31.6963L133.81 2.04684C138.548 -0.682285 144.384 -0.682277 149.122 2.04684L200.589 31.6963C205.326 34.4254 208.245 39.4691 208.245 44.9273L208.245 104.226C208.245 109.684 205.326 114.728 200.589 117.457L149.122 147.107C144.384 149.836 138.548 149.836 133.81 147.107Z"
        fill="#FFF9CC"
      />
    </svg>
  );
}

function ParallaxLayer({
  progress,
  fromY,
  toY,
  className,
  opacity = 1,
  reduceMotion,
  children,
}: {
  progress: MotionValue<number>;
  fromY: number;
  toY: number;
  className?: string;
  opacity?: number;
  reduceMotion: boolean | null;
  children: ReactNode;
}) {
  const yRaw = useTransform(
    progress,
    [0, 1],
    [reduceMotion ? 0 : fromY, reduceMotion ? 0 : toY],
  );
  const y = useSpring(yRaw, SPRING_CONFIG);

  return (
    <motion.div style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

export function HomeParallaxBackground({
  className,
  targetRef,
  progress,
  offset = DEFAULT_OFFSET,
}: HomeParallaxBackgroundProps) {
  const localRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef ?? localRef,
    offset,
  });
  const activeProgress = progress ?? scrollYProgress;

  const rootClassName = [
    "pointer-events-none absolute inset-0 h-full w-full overflow-hidden z-[-1]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={localRef} aria-hidden className={rootClassName} id="paralax">
      <ParallaxLayer
        progress={activeProgress}
        fromY={-52}
        toY={52}
        className="absolute -left-[8%] top-[6%]"
        opacity={0.5}
        reduceMotion={reduceMotion}
      >
        <HoneycombMark className="w-[280px] md:w-[360px] xl:w-[440px] h-auto" />
      </ParallaxLayer>
      <ParallaxLayer
        progress={activeProgress}
        fromY={56}
        toY={-56}
        className="absolute left-[36%] top-[12%]"
        opacity={0.5}
        reduceMotion={reduceMotion}
      >
        <HoneycombMark className="w-[220px] md:w-[280px] xl:w-[340px] h-auto" />
      </ParallaxLayer>
      <ParallaxLayer
        progress={activeProgress}
        fromY={-50}
        toY={50}
        className="absolute right-[-6%] top-[10%]"
        opacity={0.5}
        reduceMotion={reduceMotion}
      >
        <HoneycombMark className="w-[260px] md:w-[340px] xl:w-[420px] h-auto" />
      </ParallaxLayer>
      <ParallaxLayer
        progress={activeProgress}
        fromY={42}
        toY={-42}
        className="absolute left-[4%] top-[46%] "
        opacity={0.5}
        reduceMotion={reduceMotion}
      >
        <HoneycombMark className="w-[250px] xl:w-[300px] h-auto" />
      </ParallaxLayer>
      <ParallaxLayer
        progress={activeProgress}
        fromY={-44}
        toY={44}
        className="absolute right-[3%] top-[42%]"
        opacity={0.5}
        reduceMotion={reduceMotion}
      >
        <HoneycombMark className="w-[250px] xl:w-[300px] h-auto" />
      </ParallaxLayer>
      <ParallaxLayer
        progress={activeProgress}
        fromY={38}
        toY={-38}
        className="absolute left-[12%] bottom-[10%]"
        opacity={0.5}
        reduceMotion={reduceMotion}
      >
        <HoneycombMark className="w-[230px] xl:w-[290px] h-auto" />
      </ParallaxLayer>
      <ParallaxLayer
        progress={activeProgress}
        fromY={-36}
        toY={36}
        className="absolute right-[11%] bottom-[12%] "
        opacity={0.5}
        reduceMotion={reduceMotion}
      >
        <HoneycombMark className="w-[220px] xl:w-[280px] h-auto" />
      </ParallaxLayer>

      <ParallaxLayer
        progress={activeProgress}
        fromY={112}
        toY={-112}
        className="absolute top-[56%] right-[-24%] xl:right-[-20%] 2xl:right-[-16%]"
        opacity={1}
        reduceMotion={reduceMotion}
      >
        <Image
          src="/home/watch.png"
          alt=""
          width={1703}
          height={2000}
          sizes="(min-width: 1536px) 520px, (min-width: 1280px) 460px, (min-width: 768px) 38vw, 0px"
          className="h-auto w-[42vw] max-w-[520px] min-w-[260px]"
          aria-hidden
          draggable={false}
        />
      </ParallaxLayer>
      <ParallaxLayer
        progress={activeProgress}
        fromY={-104}
        toY={104}
        className="absolute top-[30%] left-[-18%] xl:left-[-14%] 2xl:left-[-10%]"
        opacity={1}
        reduceMotion={reduceMotion}
      >
        <Image
          src="/home/watch-right.png"
          alt=""
          width={706}
          height={712}
          sizes="(min-width: 1536px) 420px, (min-width: 1280px) 360px, (min-width: 768px) 32vw, 0px"
          className="h-auto w-[34vw] max-w-[430px] min-w-[220px]"
          aria-hidden
          draggable={false}
        />
      </ParallaxLayer>

      <ParallaxLayer
        progress={activeProgress}
        fromY={-86}
        toY={86}
        className="absolute right-[-2%] top-[17%] 2xl:right-[0%]"
        opacity={1}
        reduceMotion={reduceMotion}
      >
        <Image
          src="/home/screen4.png"
          alt=""
          width={1000}
          height={2000}
          sizes="(min-width: 1536px) 470px, (min-width: 1280px) 420px, 0px"
          className="h-auto w-[62vw] max-w-[470px]"
          aria-hidden
          draggable={false}
        />
      </ParallaxLayer>
      <ParallaxLayer
        progress={activeProgress}
        fromY={80}
        toY={-80}
        className="absolute left-[-2%] bottom-[24%]2xl:left-[0%]"
        opacity={1}
        reduceMotion={reduceMotion}
      >
        <Image
          src="/home/screen3.png"
          alt=""
          width={200}
          height={408}
          sizes="(min-width: 1536px) 450px, (min-width: 1280px) 400px, 0px"
          className="h-auto w-[60vw] max-w-[450px]"
          draggable={false}
        />
      </ParallaxLayer>
      <ParallaxLayer
        progress={activeProgress}
        fromY={-76}
        toY={76}
        className="absolute right-[-1%] bottom-[16%]  2xl:right-[1%]"
        opacity={1}
        reduceMotion={reduceMotion}
      >
        <Image
          src="/home/screen2.png"
          alt=""
          width={200}
          height={408}
          sizes="(min-width: 1536px) 440px, (min-width: 1280px) 390px, 0px"
          className="h-auto w-[58vw] max-w-[440px] "
          aria-hidden
          draggable={false}
        />
      </ParallaxLayer>
      <ParallaxLayer
        progress={activeProgress}
        fromY={66}
        toY={-66}
        className="absolute left-[2%] -translate-x-1/2 bottom-[2%]"
        opacity={1}
        reduceMotion={reduceMotion}
      >
        <Image
          src="/home/screen1.png"
          alt=""
          width={200}
          height={408}
          sizes="128px"
          className="h-auto w-[56vw] max-w-[400px] "
          aria-hidden
          draggable={false}
        />
      </ParallaxLayer>
    </div>
  );
}
