"use client";

import { ResourceCard } from "@/features/resources/client";
import { ContentContainer } from "@/components/content/ContentContainer";
import { ResourcesTypes } from "../../../schema/shared";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ResourceButton } from "@/app/(resources)/components/ui/ResourceButton";
import { ResourceCardListType } from "@/features/resources";

export type ResourcesLists = ResourceCardListType[];
export type ResourceTypes = Array<{ type: ResourcesTypes }>;
export type ResourceFeedMeta = Array<{
  title?: string;
  paragraph?: string;
  type: ResourcesTypes;
}>;

export function FeedContainer({
  resources,
  type,
  meta,
}: {
  resources: ResourcesLists;
  type: ResourceTypes;
  meta?: ResourceFeedMeta;
}) {
  const [activeResource, setActiveResource] = useState(0);
  const [spanParametrs, setSpanParametrs] = useState({
    width: 0,
    left: 0,
  });
  const buttonRef = useRef<Array<HTMLElement | null>>([]);
  const activeMeta = meta?.[activeResource];

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
      {activeMeta && (
        <ContentContainer
          content={{
            title: activeMeta.title,
            paragraph: activeMeta.paragraph ?? undefined,
          }}
          classContainer="text-left"
          width="max-w-[1000px]"
        />
      )}
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
            className={`w-full flex gap-4 overflow-x-auto pb-2 -mx-4 md:mx-0 md:pb-0 md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-4 md:overflow-visible ${activeResource === i ? "relative z-10" : "absolute top-0 z-0 opacity-0"}`}
            key={i}
          >
            {r.map((c, i) => (
              <Link
                className="flex-none w-[75vw] max-w-[320px] first:ml-4 last:mr-4 md:w-auto md:max-w-none md:first:ml-0 md:last:mr-0"
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
