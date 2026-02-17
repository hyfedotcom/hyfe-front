"use client";

import { useEffect, useRef, useState } from "react";
import { ResourceButton } from "@/app/(resources)/components/ui/ResourceButton";
import { useIsScrollingDown } from "@/hooks/useIsScrollingDown";
import { useWindowSize } from "@/hooks/useWindowSize";

const resourceTypes: Array<"publications" | "white-papers" | "cough-news"> = [
  "publications",
  "white-papers",
  "cough-news",
];

export function ScienceResourcesClient() {
  const [isPinned, setIsPinned] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isDown = useIsScrollingDown(10);
  const isMobile = useWindowSize() <= 768;

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPinned(entry.intersectionRect.top <= 0);
      },
      {
        root: null,
        threshold: 0,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scroll = (t: string) => {
    const div = document.getElementById(t);
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
      <div ref={sentinelRef} className="w-full h-0" aria-hidden></div>
      <div
        className={`${isPinned && !isDown && "translate-y-[60px] md:translate-y-[70px]"} duration-400 resources-glass-sticky-wrap mt-10 w-max! overflow-visible!`}
      >
        <div className="resources-glass-surface rounded-[30px]">
          <div aria-hidden="true" className="resources-glass-overlay" />
          <div aria-hidden="true" className="resources-glass-highlight" />
          <div className="resources-glass-bar-content ">
            <div className="flex min-w-0 gap-2  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div aria-hidden="true" className="resources-glass-overlay" />
              <div aria-hidden="true" className="resources-glass-highlight" />
              {resourceTypes.map((t) => (
                <ResourceButton
                  key={t}
                  label={t}
                  active
                  tag="button"
                  onClick={() => scroll(t)}
                  classNameProp="resources-glass-resource-pill"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
