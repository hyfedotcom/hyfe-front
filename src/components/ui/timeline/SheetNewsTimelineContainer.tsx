"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "@/framer";
import { useCallback, useEffect, useRef, useState } from "react";

const END_PROGRESS = 0.96;
const CIRCLE_START_PROGRESS = 0.9;

export function SheetNewsTimelineContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const assignContainerRef = useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node;
    scrollContainerRef.current = null;

    let parent = node?.parentElement ?? null;
    while (parent) {
      const overflowY = window.getComputedStyle(parent).overflowY;
      if (/auto|scroll|overlay/.test(overflowY)) {
        scrollContainerRef.current = parent;
        break;
      }
      parent = parent.parentElement;
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.28,
    restDelta: 0.0005,
  });

  const lineProgress = useTransform(smoothScrollProgress, [0, END_PROGRESS], [0, 1]);
  const circleProgress = useTransform(
    smoothScrollProgress,
    [CIRCLE_START_PROGRESS, END_PROGRESS],
    [0, 1],
  );
  const circleActiveOpacity = useTransform(circleProgress, [0, 0.08, 1], [0, 0.9, 1]);

  const [showConfetti, setShowConfetti] = useState(false);
  const previousProgressRef = useRef(0);
  const confettiStartTimerRef = useRef<number | null>(null);
  const confettiHideTimerRef = useRef<number | null>(null);

  useMotionValueEvent(smoothScrollProgress, "change", (value) => {
    const reachedEnd =
      previousProgressRef.current < END_PROGRESS && value >= END_PROGRESS;
    previousProgressRef.current = value;

    if (!reachedEnd) return;

    if (confettiStartTimerRef.current) {
      window.clearTimeout(confettiStartTimerRef.current);
    }
    if (confettiHideTimerRef.current) {
      window.clearTimeout(confettiHideTimerRef.current);
    }

    setShowConfetti(false);
    confettiStartTimerRef.current = window.setTimeout(() => {
      setShowConfetti(true);
    }, 40);

    confettiHideTimerRef.current = window.setTimeout(() => {
      setShowConfetti(false);
    }, 1300);
  });

  useEffect(() => {
    return () => {
      if (confettiStartTimerRef.current) {
        window.clearTimeout(confettiStartTimerRef.current);
      }
      if (confettiHideTimerRef.current) {
        window.clearTimeout(confettiHideTimerRef.current);
      }
    };
  }, []);

  return (
    <div ref={assignContainerRef} className="relative min-h-[100dvh]">
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="sticky top-0 hidden h-[100dvh] w-max md:left-4 md:flex xl:left-60">
          <div className="flex h-[100dvh] flex-col items-center pt-20 pb-20">
            <div className="relative w-[2px] flex-1 overflow-hidden rounded-full bg-primary/20">
              <motion.div
                className="absolute inset-0 rounded-full bg-primary"
                style={{ scaleY: lineProgress, transformOrigin: "top" }}
              />
            </div>

            <div className="relative -mt-px h-4 w-4 shrink-0">
              <span className="absolute inset-0 rounded-full border border-black/25 bg-white/60" />
              <svg className="absolute inset-0 -rotate-90 text-primary-600" viewBox="0 0 16 16" aria-hidden>
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-20"
                />
                <motion.circle
                  cx="8"
                  cy="8"
                  r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ pathLength: circleProgress, opacity: circleActiveOpacity }}
                />
              </svg>

              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 z-[2000] h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2"
                initial={false}
                animate={
                  showConfetti
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 4, scale: 0.94 }
                }
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                >
                  <source src="/resources/confetti.webm" type="video/webm" />
                </video>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
