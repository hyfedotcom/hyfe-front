"use client";

import { ResourceCard } from "@/features/resources/card";
import { ContentContainer } from "@/components/content/ContentContainer";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/buttons/Button";
import { HorizontalRailClient } from "@/components/ui/rail/HorizontalRailClient";
import {
  RESOURCE_META,
  cx,
  getCardWidthClass,
  getGridCols,
  type ResourceFeedMeta,
  type ResourcesLists,
  type ResourceTypes,
} from "./FeedContainer.shared";

export function FeedContainerClient({
  resources,
  type,
  meta,
}: {
  resources: ResourcesLists;
  type: ResourceTypes;
  meta?: ResourceFeedMeta;
}) {
  const [activeResource, setActiveResource] = useState(0);
  const [indicator, setIndicator] = useState({
    width: 0,
    left: 0,
    ready: false,
  });
  const [panelMinHeight, setPanelMinHeight] = useState<number>();

  const tabListId = useId();
  const buttonRef = useRef<Array<HTMLButtonElement | null>>([]);
  const panelRef = useRef<Array<HTMLDivElement | null>>([]);

  const hasResources = resources.length > 0;
  const normalizedIndex = useMemo(() => {
    if (!hasResources) return 0;
    return Math.min(activeResource, resources.length - 1);
  }, [activeResource, hasResources, resources.length]);

  const activeMeta = meta?.[normalizedIndex];
  const activeType = type[normalizedIndex]?.type;

  const moveIndicator = useCallback((index: number) => {
    const btn = buttonRef.current[index];
    if (!btn) return;

    setIndicator({
      width: btn.offsetWidth,
      left: btn.offsetLeft,
      ready: true,
    });
  }, []);

  const updatePanelHeight = useCallback((index: number) => {
    const panel = panelRef.current[index];
    if (!panel) return;

    setPanelMinHeight(Math.ceil(panel.getBoundingClientRect().height));
  }, []);

  useEffect(() => {
    if (!hasResources) return;

    moveIndicator(normalizedIndex);
    updatePanelHeight(normalizedIndex);

    const onResize = () => {
      moveIndicator(normalizedIndex);
      updatePanelHeight(normalizedIndex);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hasResources, moveIndicator, normalizedIndex, updatePanelHeight]);

  useEffect(() => {
    if (!hasResources) return;

    const panel = panelRef.current[normalizedIndex];
    if (!panel || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() =>
      updatePanelHeight(normalizedIndex),
    );
    observer.observe(panel);

    return () => observer.disconnect();
  }, [hasResources, normalizedIndex, updatePanelHeight]);

  if (!hasResources) return null;

  return (
    <div className="space-y-8 md:space-y-10">
      {activeMeta && (
        <ContentContainer
          content={{
            title: activeMeta.title,
            paragraph: activeMeta.paragraph ?? undefined,
          }}
          classContainer="text-left"
          width="max-w-[1000px]"
        />
      )}

      <div className="flex flex-col-reverse gap-12 md:flex-row md:items-center md:justify-between md:gap-5">
        <div className="relative w-max max-w-full ">
          <div
            role="tablist"
            aria-label="Resource feed categories"
            className={cx(
              "relative flex w-full max-w-full items-center gap-1 rounded-full resources-glass-surface px-2.5 py-1.5",
              "overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
            <div aria-hidden="true" className="resources-glass-overlay" />
            <div aria-hidden="true" className="resources-glass-highlight" />
            <div
              aria-hidden="true"
              className="resources-glass-bar-content absolute inset-0"
            ></div>
            <span
              aria-hidden
              className={cx(
                "-translate-x-2 md:-translate-x-2 pointer-events-none absolute top-2 bottom-2 rounded-full border-1 border-black/20 bg-gradient-to-tl from-primary/50 via-white to-white text-black opacity-100 md:top-1.5 md:bottom-1.5",
                "transition-[width,transform,opacity] duration-300 ease-out",
                !indicator.ready && "opacity-0",
              )}
              style={{
                width: indicator.width,
                transform: `translateX(${indicator.left}px)`,
              }}
            />

            {type.map((entry, index) => {
              const isActive = index === normalizedIndex;
              const metaEntry = RESOURCE_META[entry.type];
              const panelId = `${tabListId}-panel-${index}`;
              const tabId = `${tabListId}-tab-${index}`;

              return (
                <button
                  key={entry.type}
                  ref={(node) => {
                    buttonRef.current[index] = node;
                  }}
                  id={tabId}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => {
                    setActiveResource(index);
                    moveIndicator(index);
                    buttonRef.current[index]?.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                      inline: "center",
                    });
                  }}
                  onKeyDown={(event) => {
                    if (!type.length) return;

                    const goTo = (nextIndex: number) => {
                      setActiveResource(nextIndex);
                      moveIndicator(nextIndex);
                      buttonRef.current[nextIndex]?.focus();
                      buttonRef.current[nextIndex]?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                      });
                    };

                    if (event.key === "ArrowRight") {
                      event.preventDefault();
                      goTo((index + 1) % type.length);
                      return;
                    }

                    if (event.key === "ArrowLeft") {
                      event.preventDefault();
                      goTo((index - 1 + type.length) % type.length);
                      return;
                    }

                    if (event.key === "Home") {
                      event.preventDefault();
                      goTo(0);
                      return;
                    }

                    if (event.key === "End") {
                      event.preventDefault();
                      goTo(type.length - 1);
                    }
                  }}
                  className={cx(
                    "relative z-10 shrink-0 rounded-full px-4 py-2.5 md:px-5 md:py-3",
                    "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45",
                  )}
                >
                  <span
                    className={cx(
                      "flex cursor-pointer items-center gap-2 text-[15px] leading-none md:text-[18px]",
                      isActive
                        ? "font-medium text-body"
                        : "font-normal text-body-secondary",
                      "transition-colors duration-200",
                    )}
                  >
                    <metaEntry.Icon
                      className={cx(
                        "h-5 w-5 md:h-6 md:w-6",
                        isActive ? "text-primary" : "text-body-secondary",
                        "transition-colors duration-200",
                      )}
                    />
                    {metaEntry.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <Button
          label="View all"
          url={activeType ? `/${activeType}` : "/"}
          classNameProp="justify-between sm:w-max"
        />
      </div>

      <div
        className="relative -mx-4 md:mx-0 transition-[min-height] duration-300"
        style={panelMinHeight ? { minHeight: panelMinHeight } : undefined}
      >
        {resources.map((resourceCards, index) => {
          const isActive = normalizedIndex === index;
          const panelId = `${tabListId}-panel-${index}`;
          const tabId = `${tabListId}-tab-${index}`;
          const gridCols = getGridCols(resourceCards.length);
          const cardWidthClass = getCardWidthClass(resourceCards.length);

          return (
            <HorizontalRailClient
              hasManyCards
              classNameBtn={`${resourceCards.length > 1 ? "min-xl:hidden!" : "hidden"}`}
              key={`${type[index]?.type ?? index}-${index}`}
              className={`left-1/2 -translate-x-1/2 w-screen transition-all duration-300 ease-out ${
                isActive
                  ? "relative z-10 translate-y-0 opacity-100 pointer-events-auto"
                  : "absolute inset-0 z-0 translate-y-2 opacity-0 pointer-events-none"
              }`}
            >
              <div
                ref={(node) => {
                  panelRef.current[index] = node;
                }}
                id={panelId}
                role="tabpanel"
                aria-labelledby={tabId}
                aria-hidden={!isActive}
                inert={!isActive}
                className={`items-stretch gap-3 lg:gap-4 ${
                  resourceCards.length > 1 ? "w-max" : "w-full"
                } xl:w-full grid ${gridCols} px-4 md:px-10 xl:px-20`}
              >
                {resourceCards.map((card, cardIndex) => (
                  <Link
                    scroll={false}
                    key={`${card.slug}-${cardIndex}`}
                    className={`block h-full self-stretch shrink-0 ${cardWidthClass}`}
                    href={`/${card.type}/${card.slug}`}
                    data-card
                  >
                    <ResourceCard card={card} renderMode="full" />
                  </Link>
                ))}
              </div>
            </HorizontalRailClient>
          );
        })}
      </div>
    </div>
  );
}
