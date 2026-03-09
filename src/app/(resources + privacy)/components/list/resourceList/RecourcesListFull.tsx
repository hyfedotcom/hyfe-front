"use client";

import type { ResourceCardType } from "@/features/resources/data/resources.types";
import { useCallback } from "react";

import { useIsScrollingDown } from "@/hooks/useIsScrollingDown";
import { ResourcesFiltersBar } from "../ResourcesFiltersBar";
import { useWindowMetrics } from "@/context/window/windowContext";
import { RecourcesListCardsGrid } from "./recourcesListFull/RecourcesListCardsGrid";
import { RecourcesListFooter } from "./recourcesListFull/RecourcesListFooter";
import type { ResourceListRenderMode } from "./recourcesListFull/types";
import { useRecourcesListUiState } from "./recourcesListFull/useRecourcesListUiState";
import { useRecourcesListViewModel } from "./recourcesListFull/useRecourcesListViewModel";

export function RecourcesListFull({
  data,
  type,
  tags,
  initialPage = 1,
  renderMode,
}: {
  data: ResourceCardType[];
  type: string;
  tags: string[];
  initialPage?: number;
  renderMode: ResourceListRenderMode;
}) {
  const { width } = useWindowMetrics();
  const isMobile = (width ?? 0) <= 768;
  const isDown = useIsScrollingDown(10);

  const {
    cardsStartRef,
    closeMobilePanels,
    isPinned,
    mobileFiltersOpen,
    scrollToCardsStart,
    sentinelRef,
    toggleMobileFilters,
  } = useRecourcesListUiState({ isMobile });

  const {
    activePage,
    activeTags,
    clearAllFiltersInUrl,
    detailHref,
    hasFilters,
    hasNextPage,
    nextPage,
    pageHref,
    pageSize,
    shown,
    total,
    uniqueTags,
    visibleList,
  } = useRecourcesListViewModel({
    data,
    initialPage,
    tags,
    type,
  });

  const clearAllFilters = useCallback(() => {
    closeMobilePanels();
    clearAllFiltersInUrl();
    scrollToCardsStart();
  }, [clearAllFiltersInUrl, closeMobilePanels, scrollToCardsStart]);

  return (
    <section className="relative space-y-6 md:space-y-8">
      <div ref={sentinelRef} aria-hidden className="my-0!" />

      <ResourcesFiltersBar
        type={type}
        uniqueTags={uniqueTags}
        activeTags={activeTags}
        hasFilters={hasFilters}
        isPinned={isPinned}
        isDown={isDown}
        mobileFiltersOpen={mobileFiltersOpen}
        onClearAllFilters={clearAllFilters}
        onToggleMobileFilters={toggleMobileFilters}
        onCloseMobilePanels={closeMobilePanels}
      />

      <RecourcesListCardsGrid
        cards={visibleList}
        cardsStartRef={cardsStartRef}
        detailHref={detailHref}
        renderMode={renderMode}
      />

      <RecourcesListFooter
        activePage={activePage}
        hasFilters={hasFilters}
        hasNextPage={hasNextPage}
        nextPage={nextPage}
        pageHref={pageHref}
        pageSize={pageSize}
        shown={shown}
        total={total}
      />
    </section>
  );
}
