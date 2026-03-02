"use client";

import { JumpLinks } from "@/components/navigation/JumpLinks";
import { SearchInput } from "@/components/ui/search/SearchInput";
import { FaqSectionType } from "@/features/faq/schema/faq.schema";
import { filterFaqSections } from "@/features/faq/utils/filterSections";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function FAQClient({ sections }: { sections: FaqSectionType[] }) {
  const slugify = (s: string) => s.replace(/\s+/g, "-").trim().toLowerCase();
  const search = useSearchParams().get("search");
  const filteredSections = useMemo(
    () => filterFaqSections(sections, search),
    [sections, search],
  );
  const items = useMemo(
    () =>
      filteredSections.map((section) => ({
        id: slugify(section.title),
        label: section.title,
      })),
    [filteredSections],
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
    <div className="w-full max-sm:flex-col max-lg:flex max-lg:flex-row-reverse max-lg:justify-between max-sm:gap-1 max-lg:gap-4">
      <SearchInput
        placeholder="Search"
        className="mr-auto lg:mb-8! w-full max-sm:max-w-full! max-lg:max-w-1/3! lg:w-[80%]! md:mr-0!"
      />
      {items.length > 0 && (
        <JumpLinks
          className="w-full max-sm:max-w-full max-lg:max-w-2/3"
          items={items}
          activeId={forcedActiveId ?? activeId}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}
