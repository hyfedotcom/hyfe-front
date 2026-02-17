"use client";

import { JumpLinks } from "@/components/navigation/JumpLinks";
import { FaqSectionType } from "@/features/faq/schema/faq.schema";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useActiveSection } from "./useActiveSection";

export function FAQClient({ sections }: { sections: FaqSectionType[] }) {
  const slugify = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "-");

  const items = useMemo(
    () => sections.map((s) => ({ id: slugify(s.title), label: s.title })),
    [sections],
  );

  const { activeId } = useActiveSection(
    items.map((x) => x.id),
    280,
  );
  const [forcedActiveId, setForcedActiveId] = useState<string | null>(null);
  const scrollListenerRef = useRef<(() => void) | null>(null);
  const scrollIdleTimerRef = useRef<number | null>(null);
  const scrollHardStopTimerRef = useRef<number | null>(null);

  const clearAutoScrollLock = useCallback(() => {
    if (scrollListenerRef.current) {
      window.removeEventListener("scroll", scrollListenerRef.current);
      scrollListenerRef.current = null;
    }
    if (scrollIdleTimerRef.current) {
      window.clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = null;
    }
    if (scrollHardStopTimerRef.current) {
      window.clearTimeout(scrollHardStopTimerRef.current);
      scrollHardStopTimerRef.current = null;
    }
    setForcedActiveId(null);
  }, []);

  const onSelect = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const targetTop =
      section.getBoundingClientRect().top + window.scrollY - 200;
    const clampedTop = Math.max(targetTop, 0);

    clearAutoScrollLock();
    setForcedActiveId(id);

    const onScroll = () => {
      if (scrollIdleTimerRef.current) {
        window.clearTimeout(scrollIdleTimerRef.current);
      }

      const reachedTarget = Math.abs(window.scrollY - clampedTop) <= 12;
      if (reachedTarget) {
        clearAutoScrollLock();
        return;
      }

      scrollIdleTimerRef.current = window.setTimeout(() => {
        clearAutoScrollLock();
      }, 120);
    };

    scrollListenerRef.current = onScroll;
    window.addEventListener("scroll", onScroll, { passive: true });

    window.scrollTo({ top: clampedTop, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);

    onScroll();
    scrollHardStopTimerRef.current = window.setTimeout(() => {
      clearAutoScrollLock();
    }, 2000);
  };

  useEffect(() => {
    return () => clearAutoScrollLock();
  }, [clearAutoScrollLock]);

  return (
    <div className="w-full max-w-[340px]">
      <JumpLinks
        items={items}
        activeId={forcedActiveId ?? activeId}
        onSelect={onSelect}
      />
    </div>
  );
}
