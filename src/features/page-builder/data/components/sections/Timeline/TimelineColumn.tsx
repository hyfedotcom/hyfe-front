"use client";

import type { TimelineColumnType } from "@/features/about/schema/domain";
import { motion } from "@/framer";
import type { Variants } from "framer-motion";
import { TimelineItem } from "./TimelineItem";

const columnRevealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const yearRevealVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.26, ease: [0.33, 1, 0.68, 1] },
  },
};

const itemsRevealVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.02,
      staggerChildren: 0.08,
    },
  },
};

export function TimelineColumn({
  column,
  anchorId,
}: {
  column: TimelineColumnType;
  anchorId: string;
}) {
  return (
    <motion.section
      id={anchorId}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={columnRevealVariants}
      className=" resources-glass-surface resources-glass-surface-strong relative overflow-hidden rounded-[28px] p-4 md:p-8 lg:p-10 shadow-none shadow-classic!"
    >
      <div aria-hidden="true" className="resources-glass-overlay" />
      <div aria-hidden="true" className="resources-glass-highlight" />

      <div className="relative z-10 space-y-4 md:space-y-10">
        <motion.div
          variants={yearRevealVariants}
          className="w-max resources-glass-pill-surface px-4 py-2 md:px-5 md:py-2.5"
        >
          <h2 className="text-[22px]! md:text-[30px]!">
            {column.year}
          </h2>
        </motion.div>

        <motion.div variants={itemsRevealVariants} className="space-y-3 md:space-y-4">
          {column.item.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
