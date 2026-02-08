"use client";

import { ButtonArrow } from "@/components/ui/buttons/ButtonArrow";
import { ResourceBlockCtaType } from "@/features/resources/data/resources.types";
import SmartLink from "@/shared/utils/SmartLink";
import { useState } from "react";

export function ResourceCta({ block }: { block: ResourceBlockCtaType }) {
  const [isHover, setIsHover] = useState<number | null>(null);
  return (
    <div className="space-y-5 mb-15">
      {block.title && <h3 className="mt-20">{block.title}</h3>}
      <div className={`grid grid-cols-2 gap-3  ${!block.title && "-mt-8"}`}>
        {block.cta.map((e: { url: string; label: string }, i: number) => (
          <span
            key={i}
            className="p-4 md:p-5 w-full flex  h-[200px] text-black! bg-primary-100 border border-border hover:bg-primary-200 hover:border-primary duration-300 rounded-[20px] hover:shadow-hover"
            onMouseEnter={() => setIsHover(i)}
            onMouseLeave={() => setIsHover(null)}
          >
            <SmartLink href={e.url} >
              <div className="flex flex-col justify-between flex-1 h-full w-full ">
                <span className="text-balance text-[16px] md:text-[20px] font-semibold! ">{e.label}</span>
                <ButtonArrow
                  isActive={isHover === i}
                  className="bg-black text-white ml-auto"
                />
              </div>
            </SmartLink>
          </span>
        ))}
      </div>
    </div>
  );
}
