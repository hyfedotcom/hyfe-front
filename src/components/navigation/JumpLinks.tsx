"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type JumpLinkItem = { id: string; label: string };

export function JumpLinks({
  items,
  activeId,
  onSelect,
  className = "w-full"
}: {
  className?: string,
  items: JumpLinkItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const desktopLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const mobileLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [marker, setMarker] = useState({ top: 0, height: 0, width: 0 });

  useLayoutEffect(() => {
    const el = desktopLinkRefs.current[activeId];
    if (!el) return;

    const top = el.offsetTop;
    const height = el.offsetHeight;
    const width = el.offsetWidth;

    setMarker({ top, height, width });
  }, [activeId, items.length]);

  useEffect(() => {
    const activeMobileLink = mobileLinkRefs.current[activeId];
    if (!activeMobileLink) return;

    activeMobileLink.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId, items.length]);

  return (
    <div className={className}>
      <div className="resources-glass-surface rounded-[30px] lg:hidden">
        <div aria-hidden="true" className="resources-glass-overlay" />
        <div aria-hidden="true" className="resources-glass-highlight" />
        <div className="resources-glass-bar-content">
          <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max min-w-full items-center gap-1 pr-1">
              {items.map((item) => (
                <a
                  key={item.id}
                  ref={(node) => {
                    mobileLinkRefs.current[item.id] = node;
                  }}
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? "true" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    onSelect(item.id);
                  }}
                  className={`resources-glass-tab-base whitespace-nowrap px-3 py-2.5 text-[13px] leading-[100%] transition-transform duration-200 shadow-none! ${
                    activeId === item.id
                      ? "resources-glass-tab-active font-medium bg-gradient-to-br from-white via-white to-primary/40"
                      : "resources-glass-tab-idle "
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden w-full max-w-[340px] gap-4 lg:flex">
        <span
          className="resources-glass-surface absolute left-0 z-[-1] rounded-full bg-gradient-to-br from-white via-white to-primary/40 transition-transform duration-200"
          style={{
            width: marker.width,
            height: marker.height,
            transform: `translateY(${marker.top}px)`,
          }}
        >
          <div aria-hidden="true" className="resources-glass-overlay" />
          <div aria-hidden="true" className="resources-glass-highlight" />
        </span>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <a
              key={item.id}
              ref={(node) => {
                desktopLinkRefs.current[item.id] = node;
              }}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "true" : undefined}
              onClick={(event) => {
                event.preventDefault();
                onSelect(item.id);
              }}
              className={`w-max max-w-[340px] rounded-full px-6 py-0 transition duration-300 ${
                activeId === item.id
                  ? "rounded-full px-6 py-4 font-semibold text-black"
                  : "text-body-secondary hover:font-medium hover:text-black"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
