"use client";

import { AdditionlInfoType } from "@/features/resources/data/resources.types";
import { AddtionalInfoCard } from "./AddtionalInfoCard";
import { useRef } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

export function ResourceAdditionalInfo({
  block,
}: {
  block: AdditionlInfoType;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const width = useWindowSize()

  function moveCards(dir: "left" | "right") {
    const container = containerRef.current;
    if (!container) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length <= 3) return;

    const first = cards[0];
    const second = cards[1];
    if (!first || !second) return;

    // расстояние между карточками (включая gap)
    const step = second.offsetLeft - first.offsetLeft;

    container.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  }
  return (
    <div className="bg-gray-100  pb-5 pt-7 space-y-5 rounded-[28px] ml-[-16px] md:ml-0 w-screen md:w-max md:max-w-full  mb-15 overflow-hidden">
      <div className="flex justify-between pr-5">
        {block.title && <h4 className="pl-5">{block.title}</h4>}

        <div
          className={`${block.title} ${block.info_links.length <= 3 && width >= 768 ? "hidden " : block.info_links.length <= 2 && width <= 768 ? "hidden" : ""} ml-auto flex gap-3 items-center`}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180 cursor-pointer hover:opacity-80 hover:text-primary-600 duration-200"
            onClick={() => moveCards("left")}
          >
            <path
              d="M27.7071 15.7071C28.0976 15.3166 28.0976 14.6834 27.7071 14.2929L21.3431 7.92893C20.9526 7.53841 20.3195 7.53841 19.9289 7.92893C19.5384 8.31946 19.5384 8.95262 19.9289 9.34315L25.5858 15L19.9289 20.6569C19.5384 21.0474 19.5384 21.6805 19.9289 22.0711C20.3195 22.4616 20.9526 22.4616 21.3431 22.0711L27.7071 15.7071ZM27 15V14H3V15V16H27V15Z"
              fill="currentColor"
            />
          </svg>

          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" cursor-pointer hover:opacity-80 hover:text-primary-600 duration-200"
            onClick={() => moveCards("right")}
          >
            <path
              d="M27.7071 15.7071C28.0976 15.3166 28.0976 14.6834 27.7071 14.2929L21.3431 7.92893C20.9526 7.53841 20.3195 7.53841 19.9289 7.92893C19.5384 8.31946 19.5384 8.95262 19.9289 9.34315L25.5858 15L19.9289 20.6569C19.5384 21.0474 19.5384 21.6805 19.9289 22.0711C20.3195 22.4616 20.9526 22.4616 21.3431 22.0711L27.7071 15.7071ZM27 15V14H3V15V16H27V15Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <div ref={containerRef} className="flex px-5 gap-3 overflow-x-scroll">
        {block.info_links.map((c, i) => (
          <AddtionalInfoCard
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            key={i}
            label={c.label}
            url={c.url}
          />
        ))}
      </div>
    </div>
  );
}
