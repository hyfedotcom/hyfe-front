"use client";

import { useEffect, useRef, useState } from "react";
import { ResourceButton } from "@/app/(resources + privacy)/components/ui/ResourceButton";
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
        className={`${isPinned && !isDown && "translate-y-[60px] md:translate-y-[70px]"} duration-400 resources-glass-sticky-wrap mt-1 w-full max-w-full overflow-visible! px-0! md:px-0! xl:px-0! w-max`}
      >
        <div className="resources-glass-surface mx-4 rounded-[30px] md:mx-10 xl:mx-20">
          <div aria-hidden="true" className="resources-glass-overlay" />
          <div aria-hidden="true" className="resources-glass-highlight" />
          <div className="resources-glass-bar-content overflow-visible! px-0! py-0!">
            <div className="flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {resourceTypes.map((t, index) => (
                <ResourceButton
                  key={t}
                  label={t}
                  active
                  tag="button"
                  onClick={() => scroll(t)}
                  classNameProp={`resources-glass-resource-pill shrink-0 my-2 md:my-3 ${
                    index === 0 ? "ml-2 md:ml-3" : ""
                  } ${index === resourceTypes.length - 1 ? "mr-2 md:mr-3" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
