"use client";
import React, { useLayoutEffect, useRef, useState } from "react";

export function JumpLinks({
  items,
  activeId,
  onSelect,
}: {
  items: { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  // const trackRef = useRef<HTMLDivElement | null>(null);

  const [marker, setMarker] = useState({ top: 0, height: 0, width: 0 });

  useLayoutEffect(() => {
    const el = linkRefs.current[activeId];
    if (!el) return;

    const top = el.offsetTop;
    const height = el.offsetHeight;
    const width = el.offsetWidth;

    setTimeout(() => setMarker({ top, height, width }), 0);
  }, [activeId, items.length]);

  return (
    <div className="flex gap-4 w-full max-w-[340px]">
      <span
        className="resources-glass-surface bg-gradient-to-br from-white via-white to-primary/40  absolute left-0 z-[-1] rounded-full transition-transform duration-200 "
        style={{
          width: marker.width,
          height: marker.height,
          transform: `translateY(${marker.top + marker.height - marker.height}px)`,
        }}
      >
        <div aria-hidden="true" className="resources-glass-overlay" />
        <div aria-hidden="true" className="resources-glass-highlight" />
      </span>
      <div className="gap-3 flex flex-col">
        {items.map((l) => (
          <a
            key={l.id}
            ref={(node) => {
              linkRefs.current[l.id] = node;
            }}
            href={`#${l.id}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(l.id);
            }}
            className={` w-max max-w-[340px] px-6 duration-300 transition rounded-full py-0 
              ${
                activeId === l.id
                  ? "text-black font-semibold  px-6  rounded-full py-4"
                  : "text-body-secondary hover:text-black hover:font-medium "
              }
            `}
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}
