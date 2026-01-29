"use client";

import { useEffect, useRef, useState } from "react";

export function useIsScrollingDown(threshold = 8) {
  const [isDown, setIsDown] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const diff = y - lastY.current;

        if (Math.abs(diff) >= threshold) {
          setIsDown(diff > 0);
          lastY.current = y;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return isDown;
}
