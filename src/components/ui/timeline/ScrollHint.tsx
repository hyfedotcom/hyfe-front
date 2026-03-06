"use client";

import { motion, useScroll, useMotionValueEvent } from "@/framer";
import { useState } from "react";

export function ScrollHint() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 6) setHasScrolled(true); // после первого скролла прячем
  });

  const letters = [
    "S",
    "C",
    "R",
    "O",
    "L",
    "L",
    " ",
    " ",
    " ",
    "D",
    "O",
    "W",
    "N",
  ];

  return (
    <motion.div
      initial={false}
      animate={hasScrolled ? "hidden" : "show"}
      variants={{
        show: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
        hidden: { opacity: 0, y: 10, transition: { duration: 0.25 } },
      }}
      className="flex justify-center items-center flex-col gap absolute left-10 top-30 text-[12px]"
    >
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          variants={{
            show: {
              opacity: [0.35, 1, 0.35],
              y: [0, -2, 0],
              transition: { duration: 1.1, repeat: Infinity, delay: i * 0.06 },
            },
            hidden: { opacity: 0, y: 4, transition: { duration: 0.15 } },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.div>
  );
}
