"use client";

import { useRef } from "react";
import { ButtonAccordion } from "../buttons/ButtonAccordion";

export function HorizontalRailClient({
  children,
  hasManyCards,
  className = "w-full",
  classNameBtn,
}: {
  children: React.ReactNode;
  hasManyCards: boolean;
  className?: string;
  classNameBtn?: string;
}) {
  const railRef = useRef<HTMLDivElement | null>(null);

  function move(side: "left" | "right") {
    const rail = railRef.current;
    const firstCard = rail?.querySelector<HTMLElement>("[data-card]");
    if (!rail || !firstCard) return;

    const row = firstCard.parentElement;
    const styleTarget = row ?? rail;
    const rawGap =
      getComputedStyle(styleTarget).columnGap ||
      getComputedStyle(styleTarget).gap;
    const parsedGap = Number.parseFloat(rawGap);
    const gap = Number.isFinite(parsedGap) ? parsedGap : 0;
    const cardWidth = firstCard.getBoundingClientRect().width;

    const step = side === "left" ? -(cardWidth + gap) : cardWidth + gap;
    rail.scrollBy({
      left: step,
      behavior: "smooth",
    });
  }

  return (
    <div className={className}>
      <div
        ref={railRef}
        className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div
        className={`${hasManyCards ? "" : "flex lg:hidden"} ${classNameBtn} w-full flex gap-3 ml-auto w-max pr-4 md:pr-10 lg:pr-20 pt-4 md:pt-10 `}
      >
        <ButtonAccordion
          onClick={() => move("left")}
          className="rotate-180 bg-black text-white active:scale-110 duration-300"
        />
        <ButtonAccordion
          onClick={() => move("right")}
          className=" bg-black text-white active:scale-110 duration-300"
        />
      </div>
    </div>
  );
}
