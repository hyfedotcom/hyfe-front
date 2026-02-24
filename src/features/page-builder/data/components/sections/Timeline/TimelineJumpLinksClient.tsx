"use client";

import { JumpLinks } from "@/components/navigation/JumpLinks";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useCallback, useEffect, useRef, useState } from "react";

type TimelineJumpLinkItem = {
  id: string;
  label: string;
};

export function TimelineJumpLinksClient({
  items,
}: {
  items: TimelineJumpLinkItem[];
}) {
  const { activeId } = useActiveSection(
    items.map((item) => item.id),
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

  const onSelect = useCallback(
    (id: string) => {
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
    },
    [clearAutoScrollLock],
  );

  useEffect(() => {
    return () => clearAutoScrollLock();
  }, [clearAutoScrollLock]);

  if (!items.length) return null;

  return (
    <div className="w-full max-w-full">
      <JumpLinks
        items={items}
        activeId={forcedActiveId ?? activeId}
        onSelect={onSelect}
      />
    </div>
  );
}
