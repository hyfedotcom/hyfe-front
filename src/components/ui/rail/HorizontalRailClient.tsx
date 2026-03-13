"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonAccordion } from "../buttons/ButtonAccordion";

export function HorizontalRailClient({
  children,
  hasManyCards,
  className = "w-full",
  classNameBtn,
  classScoll = "overflow-x-auto ",
}: {
  children: React.ReactNode;
  hasManyCards: boolean;
  className?: string;
  classNameBtn?: string;
  classScoll?: string;
}) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState<boolean>(false);
  const [canRight, setCanRight] = useState<boolean>(true);

  function move(side: "left" | "right") {
    const rail = railRef.current;
    const firstCard = rail?.querySelector<HTMLElement>("[data-card]");
    console.log(rail)
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
    const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const targetScrollLeft = Math.min(
      maxScrollLeft,
      Math.max(0, rail.scrollLeft + step),
    );

    rail.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const updateButtons = () => {
      const scrollLeft = rail.scrollLeft;
      const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
      setCanLeft(scrollLeft > 1);
      setCanRight(scrollLeft < maxScrollLeft - 1);
      if (rail.scrollLeft < 0) {
        rail.scrollLeft = 0;
      } else if (rail.scrollLeft > maxScrollLeft) {
        rail.scrollLeft = maxScrollLeft;
      }
    };

    updateButtons();

    rail.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      rail.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  return (
    <div className={className}>
      <div
        ref={railRef}
        className={`${classScoll} max-w-full overscroll-x-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {children}
      </div>
      <div
        className={`${hasManyCards ? "" : "flex lg:hidden"} ${classNameBtn}  flex gap-3 ml-auto w-max pr-4 md:pr-10 xl:pr-20 pt-4 md:pt-10 `}
      >
        <ButtonAccordion
          onClick={() => move("left")}
          disabled={!canLeft}
          className={`rotate-180 ${canLeft ? "active:scale-110 duration-300 bg-black text-white" : "bg-black/30 text-white cursor-not-allowed"}`}
        />
        <ButtonAccordion
          onClick={() => move("right")}
          disabled={!canRight}
          className={`${canRight ? "active:scale-110 duration-300 bg-black text-white" : "bg-black/30 text-white cursor-not-allowed"}`}
        />
      </div>
    </div>
  );
}
