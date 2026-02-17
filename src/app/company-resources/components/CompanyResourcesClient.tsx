"use client";

import { ResourceButton } from "@/app/(resources)/components/ui/ResourceButton";
import { useIsScrollingDown } from "@/hooks/useIsScrollingDown";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";

export function CompanyResourcesClient() {
  const resourceTypes: Array<"news" | "insights"> = ["news", "insights"];

  const [isPinned, setIsPinned] = useState(false);
  const isDown = useIsScrollingDown(10);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useWindowSize() <= 768;

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPinned(entry.boundingClientRect.top <= 0);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px",
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const Scroll = (label: string) => {
    const div = document.getElementById(label);
    if (!div) return;
    const top =
      window.scrollY + div.getBoundingClientRect().top - (isMobile ? 150 : 200);

    window.scrollTo({
      top: top,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div ref={sentinelRef} className="w-full h-0"></div>
      <div
        className={`${isPinned && !isDown && "translate-y-[60px] md:translate-y-[70px]"} shadow-none! duration-400 resources-glass-sticky-wrap mt-10 w-max! overflow-visible!`}
      >
        <div
          className={`${!isPinned && " shadow-none!"} duration-300 transition-shadow resources-glass-surface rounded-[30px] `}
        >
          <div aria-hidden="true" className="resources-glass-overlay" />
          <div aria-hidden="true" className="resources-glass-highlight" />
          <div className="resources-glass-bar-content">
            <div
              className={
                "flex min-w-0 gap-2  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              }
            >
              {resourceTypes.map((t) => (
                <ResourceButton
                  key={t}
                  label={t}
                  active
                  tag="button"
                  onClick={() => Scroll(t)}
                  classNameProp="resources-glass-resource-pill "
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
