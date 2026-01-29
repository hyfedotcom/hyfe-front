"use client";

import { ResourceCard } from "@/features/resources/client";
import {  ResourcesTypes } from "../../../schema/shared";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ResourceButton } from "@/features/resources/components/ui/ResourceButton";
import { ResourceCardListType } from "@/features/resources";

export type ResourcesLists = ResourceCardListType[];
export type ResourceTypes = Array<{ type: ResourcesTypes }>;

export function FeedContainer({
  resources,
  type,
}: {
  resources: ResourcesLists;
  type: ResourceTypes;
}) {
  // console.log(type);
  const [activeResource, setActiveResource] = useState(0);
  const [spanParametrs, setSpanParametrs] = useState({
    width: 0,
    left: 0,
  });
  const buttonRef = useRef<Array<HTMLElement | null>>([]);

  function moveSpan(i: number) {
    const btn = buttonRef.current[i];

    if (!btn) return;

    const width = btn.getBoundingClientRect().width;
    const left = btn.offsetLeft;

    setSpanParametrs({
      width: width,
      left: left,
    });
  }

  useEffect(() => {
    moveSpan(0);
  }, []);

  if (!resources) return null;
  

  return (
    <div className="space-y-10 md:space-y-15">
      <div className="bg-bg-100 rounded-full flex gap-3 p-1 w-max">
        <span
          className="h-[48px] flex-1 bg-white rounded-full z-0 absolute "
          style={{ width: spanParametrs.width, left: spanParametrs.left }}
        ></span>
        {type.map((e, i) => (
          <div
            key={i}
            onClick={() => {
              setActiveResource(i);
              moveSpan(i);
            }}
            ref={(r) => {
              buttonRef.current[i] = r;
            }}
            className="z-1 relative"
          >
            <ResourceButton
              url=""
              classNameProp=" cursor-pointer"
              tag="button"
              label={e.type}
              key={i}
              active={i === activeResource}
            ></ResourceButton>
          </div>
        ))}
      </div>
      <div className="relative">
        {" "}
        {resources.map((r, i) => (
          <div
            className={`w-full flex gap-5 ${activeResource === i ? "relative z-10" : "absolute top-0 z-0 opacity-0"}`}
            key={i}
          >
            {r.map((c, i) => (
              <Link
                className="w-full max-w-1/4"
                href={`/${c.type}/${c.slug}`}
                key={i}
              >
                <ResourceCard card={c} key={i} />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
