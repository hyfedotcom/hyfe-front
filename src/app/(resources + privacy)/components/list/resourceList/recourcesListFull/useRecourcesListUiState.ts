"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CARDS_SCROLL_OFFSET_MOBILE = 250;
const CARDS_SCROLL_OFFSET_DESKTOP = 250;

type UseRecourcesListUiStateArgs = {
  isMobile: boolean;
};

export function useRecourcesListUiState({
  isMobile,
}: UseRecourcesListUiStateArgs) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const cardsStartRef = useRef<HTMLDivElement | null>(null);
  const [isPinned, setIsPinned] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.scrollY > 0 : false,
  );

  const scrollToCardsStart = useCallback(() => {
    requestAnimationFrame(() => {
      const cardsStart = cardsStartRef.current;
      if (!cardsStart) return;

      const offset = isMobile
        ? CARDS_SCROLL_OFFSET_MOBILE
        : CARDS_SCROLL_OFFSET_DESKTOP;

      const targetTop =
        window.scrollY + cardsStart.getBoundingClientRect().top - offset;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: "smooth",
      });
    });
  }, [isMobile]);

  const closeMobilePanels = useCallback(() => {
    setIsMobileFiltersOpen(false);
  }, []);

  const toggleMobileFilters = useCallback(() => {
    setIsMobileFiltersOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

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

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile || !isMobileFiltersOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobilePanels();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMobilePanels, isMobile, isMobileFiltersOpen]);

  return {
    cardsStartRef,
    closeMobilePanels,
    isPinned,
    mobileFiltersOpen: isMobile && isMobileFiltersOpen,
    scrollToCardsStart,
    sentinelRef,
    toggleMobileFilters,
  };
}
