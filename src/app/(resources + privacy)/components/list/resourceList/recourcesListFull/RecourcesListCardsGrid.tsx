import { ResourceCard } from "@/features/resources/client";
import type { ResourceCardType } from "@/features/resources/data/resources.types";
import Link from "next/link";
import type { RefObject } from "react";

import type { ResourceListRenderMode } from "./types";
import { AnimatePresence, motion } from "@/framer";

type RecourcesListCardsGridProps = {
  cards: ResourceCardType[];
  cardsStartRef: RefObject<HTMLDivElement | null>;
  detailHref: (slug: string) => string;
  onOpenCard: () => void;
  renderMode: ResourceListRenderMode;
};

export function RecourcesListCardsGrid({
  cards,
  cardsStartRef,
  detailHref,
  onOpenCard,
  renderMode,
}: RecourcesListCardsGridProps) {
  return (
    <div
      ref={cardsStartRef}
      className="flex w-full flex-col items-stretch gap-4 px-4 md:gap-5 md:px-10 sm:grid sm:grid-cols-2 sm:items-stretch lg:grid-cols-3 xl:grid-cols-4 xl:px-20"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {cards.map((card, index) => (
          <motion.div
            key={card.slug}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Link
              className="block h-full w-full"
              href={detailHref(card.slug)}
              onClick={onOpenCard}
              scroll={false}
            >
              <ResourceCard card={card} renderMode={renderMode} index={index} />
            </Link>
          </motion.div>
        ))}</AnimatePresence>
    </div>
  );
}
