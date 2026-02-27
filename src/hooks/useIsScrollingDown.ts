"use client";

import { useEffect, useRef, useState } from "react";

let lastKnownScrollDirectionDown = false;

export function useIsScrollingDown(threshold = 8) {
  const [isDown, setIsDown] = useState(lastKnownScrollDirectionDown);
  const lastY = useRef(0);
  const cumulativeDelta = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const setDirection = (next: boolean) => {
      lastKnownScrollDirectionDown = next;
      setIsDown((prev) => (prev === next ? prev : next));
    };

    const trigger = Math.max(1, threshold);
    lastY.current = window.scrollY;

    const applyDirection = (y: number) => {
      const diff = y - lastY.current;
      lastY.current = y;

      if (diff === 0) return;

      cumulativeDelta.current += diff;

      if (cumulativeDelta.current >= trigger) {
        setDirection(true);
        cumulativeDelta.current = 0;
      } else if (cumulativeDelta.current <= -trigger) {
        setDirection(false);
        cumulativeDelta.current = 0;
      }
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        applyDirection(window.scrollY);
        ticking.current = false;
      });
    };

    applyDirection(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return isDown;
}
