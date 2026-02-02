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
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [marker, setMarker] = useState({ top: 0, height: 0 });

  useLayoutEffect(() => {
    const el = linkRefs.current[activeId];
    const track = trackRef.current;
    if (!el || !track) return;

    const top = el.offsetTop;
    const height = el.offsetHeight;

    setMarker({ top, height });
  }, [activeId, items.length]);

  return (
    <div className="flex gap-4 max-w-[300px] w-full md:min-w-[300px]">
      {/* track */}
      <div ref={trackRef} className="w-1 min-w-1 relative bg-gray-300 rounded-full">
        <span
          className="absolute left-0 w-1 rounded-full bg-black transition-transform duration-200"
          style={{
            height: marker.height,
            transform: `translateY(${marker.top + marker.height - marker.height}px)`,
          }}
        />
      </div>

      {/* links */}
      <div className="space-y-4 flex flex-col">
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
            className={
              activeId === l.id
                ? "text-primary-700 font-semibold"
                : "text-body-secondary"
            }
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}
