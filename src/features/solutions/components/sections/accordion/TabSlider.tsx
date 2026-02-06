"use client";

import clsx from "clsx";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "@/framer";
import { CardType } from "@/features/page-builder/data/schema/shared";

export function TabSlider({ card }: { card: CardType[] }) {
  const [activ, setActiv] = useState(0);
  const active = card[activ];

  const preload = (url: string) => {
    if (!url || url === "") return;
    const img = new window.Image();
    img.src = url;
  };

  return (
    <div className="flex gap-5  justify-center">
      <div className="space-y-3 md:space-y-0 max-[768px]:w-full max-[1300px]:w-1/2 ">
        {card.length > 0 &&
          card.map((c, index) => (
            <div
              key={index}
              onClick={() => setActiv(index)}
              onMouseEnter={() => preload(c.icon?.url || "")}
              className={clsx(
                "group md:max-w-[586px] p-4 md:px-5 rounded-[28px] cursor-pointer transition-all duration-400",
                index === activ
                  ? `bg-primary-100 py-4 md:py-5 ${activ === 0 ? "mb-3" : "my-3"}`
                  : "bg-gray-50 md:bg-transparent hover:bg-gray-50 ",
              )}
            >
              <button type="button" className="cursor-pointer">
                <div className="flex items-center gap-3 md:gap-5">
                  <span
                    className={`w-13 min-w-13 h-13 min-h-13 transition-colors duration-400 ${
                      index === activ
                        ? "bg-white"
                        : "bg-white md:bg-gray-50 group-hover:bg-white"
                    } rounded-full flex items-center justify-center`}
                  >
                    <Image
                      src={c.icon?.url ?? "/icons/icon.svg"}
                      alt={c.icon?.alt ?? "icon"}
                      width={c.icon?.width}
                      height={c.icon?.height}
                      loading="lazy"
                    />
                  </span>
                  <h3 className="font-medium !text-[20px] md:!text-[24px] text-balance text-left">
                    {c.title}
                  </h3>
                </div>
                <div
                  className={clsx(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    index === activ ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                  aria-hidden={index !== activ}
                >
                  <div className="overflow-hidden">
                    <p className="min-lg:pl-[72px] mt-3 md:mt-0 text-left">
                      {c.description}
                    </p>
                  </div>
                </div>
                {c.image?.url && activ === index && (
                  <span
                    className={clsx(
                      "relative w-full h-[400px] rounded-[20px] overflow-hidden mt-5 md:hidden",
                      index === activ ? "block" : "hidden",
                    )}
                  >
                    <motion.div
                      key={index}
                      initial={{ opacity: index === 0 ? 1 : 0 }}
                      animate={{ opacity: index === activ ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                      style={{ height: "100%" }}
                    >
                      <Image
                        src={c.image.url}
                        alt={c.image.alt || `Slide ${index + 1}`}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes=" 90vw, 80vw"
                      />
                    </motion.div>
                  </span>
                )}
              </button>
            </div>
          ))}
      </div>

      <div className="hidden md:block w-full max-[1300px]:w-1/2 max-w-[820px] h-[440px] relative rounded-[20px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {active?.image?.url && (
            <motion.div
              key={active.image.url}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={active?.image?.url}
                alt={active.image.alt || ""}
                fill
                sizes="(min-width: 768px) 820px, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
