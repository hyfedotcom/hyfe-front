"use client";

import Link from "next/link";
import { ResourceCard } from "../../ui/ResourceCard";
import type {
  ResourceCardType,
  ResourceType,
  ResourcBlockType,
} from "@/features/resources/data/resources.types";
import { ButtonArrow } from "@/components/ui/buttons/ButtonArrow";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/buttons/Button";

type RelatedBlock = Extract<
  ResourcBlockType,
  { type: "resource.related-resources" }
>;

export function ResourcesRelated({
  block,
  resourceType,
  cards,
}: {
  block: RelatedBlock;
  resourceType: ResourceType;
  cards: ResourceCardType[];
}) {
  const { paragraph, title } = block;
  const cardsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const [activButton, setActivButton] = useState<"left" | "right" | null>(null);

  function MoveCards(side: "left" | "right") {
    const cards = cardsRef.current;
    const cardsContainer = cardsContainerRef.current;
    if (!cardsContainer || cards.length < 2 || !cards[0] || !cards[1]) return;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;

    const delta = side === "left" ? -step : step;
    cardsContainer.scrollBy({ left: delta, behavior: "smooth" });
  }

  if (cards.length === 0) return null;

  return (
    <div className="space-y-10 mt-20">
      <div className="flex gap-5 flex-col md:flex-row justify-between">
        <div className="space-y-6 md:block">
          <h2>{title ?? `Latest ${resourceType}`}</h2>
          {paragraph && <p className="body-small">{paragraph}</p>}
        </div>
        <div className="flex gap-3">
          <span
            onClick={() => MoveCards("left")}
            onMouseEnter={() => setActivButton("left")}
            onMouseLeave={() => setActivButton(null)}
          >
            <ButtonArrow
              isActive={activButton === "left"}
              activTextcolor="text-black"
              className="bg-white text-black border-2 border-black hover: ml-auto rotate-180 "
            />
          </span>
          <span
            onClick={() => MoveCards("right")}
            onMouseEnter={() => setActivButton("right")}
            onMouseLeave={() => setActivButton(null)}
          >
            <ButtonArrow
              activTextcolor="text-black"
              isActive={activButton === "right"}
              className="bg-white text-black border-2 border-black ml-auto"
            />
          </span>
        </div>
      </div>

      <div className="relative left-1/2 -translate-x-1/2 w-screen">
        <div
          ref={cardsContainerRef}
          className="w-full flex gap-3 md:gap-5 overflow-x-auto overflow-y-visible
                pl-[max(1rem,calc((100vw-870px)/2))]
                pr-[max(1rem,calc((100vw-870px)/2))]"
        >
          {cards.map((card, index) => (
            <Link
              ref={(r) => {
                cardsRef.current[index] = r;
              }}
              className="w-[85vw] sm:w-[50vw] shrink-0 md:w-full inline-block md:min-w-[425px] md:max-w-[425px]"
              key={card.slug}
              href={`/${resourceType}/${card.slug}`}
            >
              <ResourceCard card={card} />
            </Link>
          ))}
          <Link
            className="w-[85vw] sm:w-[50vw] shrink-0 md:w-full  md:min-w-[425px] md:max-w-[425px] flex flex-col justify-between md:max-w-[425px bg-primary p-5 rounded-[20px] group hover:bg-black  duration-300 transition-colors"
            href={`/${resourceType}`}
          >
            <h3 className="text-black group-hover:text-primary! font-medium!  duration-300 transition-colors">
              Read more exciting content like this in our {resourceType}
            </h3>
            <Button
              tag="button"
              label="REED MORE"
              url={`/${resourceType}`}
              color="yellow"
              arrow={false}
              classNameProp="ml-auto flex group-hover:bg-primary group-hover:text-black"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
