import { ResourceCard } from "@/features/resources/client";
import type { ResourceCardType } from "@/features/resources/data/resources.types";
import Link from "next/link";
import type { RefObject } from "react";

import type { ResourceListRenderMode } from "./types";

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
      {cards.map((card, index) => (
        <Link
          className="block h-full w-full"
          href={detailHref(card.slug)}
          key={card.slug}
          onClick={onOpenCard}
          scroll={false}
        >
          <ResourceCard card={card} renderMode={renderMode} index={index} />
        </Link>
      ))}
    </div>
  );
}
