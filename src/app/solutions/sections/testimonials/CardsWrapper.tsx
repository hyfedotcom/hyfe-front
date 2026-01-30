"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "./Card";
import { ButtonArrow } from "@/components/ui/buttons/ButtonArrow";

export function CardsWrapper({
  data,
}: {
  data: { paragraph: string; name: string; role: string }[];
}) {
  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // берём первую карточку
      const firstCard =
        containerRef.current.querySelector<HTMLDivElement>(".card-item");
      if (firstCard) {
        setStep(firstCard.offsetWidth + 20); // ширина + gap (px)
      }
    }
  }, []);

  const next = () => {
    if (current < data.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  return (
    <div className="relative  space-y-5">
      {/* viewport */}
      <div ref={containerRef}>
        <div
          className="flex gap-4 scrollbar-hide md:gap-5 transition-transform duration-500 overflow-x-auto md:overflow-x-visible px-4 md:px-0"
          style={{
            transform: `translateX(-${current * step}px)`,
          }}
        >
          {data.map((card, index) => (
            <div
              key={index}
              className="card-item flex-shrink-0 w-[85%] sm:w-[42%] lg:w-[32%] "
            >
              <Card testimonial={card} />
            </div>
          ))}
        </div>
      </div>

      {/* кнопки */}
      {data.length > 3 && (
        <div className=" left-0 bottom-0 hidden md:flex gap-2 ">
          <div onClick={prev} className="rotate-180">
            <ButtonArrow className="bg-primary hover:bg-white text-white hover:text-primary border-2" />
          </div>
          <div onClick={next}>
            <ButtonArrow className="bg-primary hover:bg-white text-white hover:text-primary border-2" />
          </div>
        </div>
      )}
    </div>
  );
}
