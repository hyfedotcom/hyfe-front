"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let rafId = 0;
    const clampScrollPosition = () => {
      rafId = 0;
      const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
      if (rail.scrollLeft < 0) {
        rail.scrollLeft = 0;
      } else if (rail.scrollLeft > maxScrollLeft) {
        rail.scrollLeft = maxScrollLeft;
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(clampScrollPosition);
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", clampScrollPosition);
    clampScrollPosition();

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", clampScrollPosition);
    };
  }, []);

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

  return (
    <div className={className}>
      <div
        ref={railRef}
        className="max-w-full overflow-x-auto overscroll-x-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
