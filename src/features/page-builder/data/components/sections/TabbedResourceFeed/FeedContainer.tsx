"use client";

import { ResourceCard } from "@/features/resources/client";
import { ContentContainer } from "@/components/content/ContentContainer";
import { ResourcesTypes } from "../../../schema/shared";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { ResourceCardListType } from "@/features/resources";
import CoughNewsIcon from "@/shared/icons/resources/CoughNewsIcon";
import InsightsIcon from "@/shared/icons/resources/InsightsIcon";
import NewsIcon from "@/shared/icons/resources/NewsIcon";
import PublicationIcon from "@/shared/icons/resources/PublicationIcon";
import WhitePapersIcon from "@/shared/icons/resources/WhitePapersIcon";
import { Button } from "@/components/ui/buttons/Button";

export type ResourcesLists = ResourceCardListType[];
export type ResourceTypes = Array<{ type: ResourcesTypes }>;
export type ResourceFeedMeta = Array<{
  title?: string;
  paragraph?: string;
  type: ResourcesTypes;
}>;

type ResourceIcon = ComponentType<{ className?: string }>;

const RESOURCE_META: Record<
  ResourcesTypes,
  { label: string; Icon: ResourceIcon }
> = {
  news: { label: "News", Icon: NewsIcon },
  publications: { label: "Publications", Icon: PublicationIcon },
  insights: { label: "Insights", Icon: InsightsIcon },
  "cough-news": { label: "Cough News", Icon: CoughNewsIcon },
  "white-papers": { label: "White Papers", Icon: WhitePapersIcon },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function FeedContainer({
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

  const tabListRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<Array<HTMLButtonElement | null>>([]);
  const panelRef = useRef<Array<HTMLDivElement | null>>([]);

  const tabListId = useId();
  const activeMeta = meta?.[activeResource];
  const hasResources = resources.length > 0;

  const normalizedIndex = useMemo(() => {
    if (!hasResources) return 0;
    return Math.min(activeResource, resources.length - 1);
  }, [activeResource, hasResources, resources.length]);
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

      <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-12 md:gap-5">
        <div className="relative w-max max-w-full ">
          <div
            ref={tabListRef}
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
                "-translate-x-2 md:-translate-x-2 pointer-events-none absolute top-2 md:top-1.5 bottom-2 md:bottom-1.5 rounded-full box-border border-1 border-black/20 bg-gradient-to-tl from-primary/50 via-white to-white text-black",
                " transition-[width,transform,opacity] duration-300 ease-out",
                !indicator.ready && "opacity-0",
              )}
              style={{
                width: indicator.width,
                transform: `translateX(${indicator.left}px)`,
              }}
            />

            {type.map((entry, index) => {
              const isActive = index === normalizedIndex;
              const meta = RESOURCE_META[entry.type];
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
                      "flex items-center gap-2 text-[15px] leading-none md:text-[18px]",
                      isActive
                        ? "font-medium text-body"
                        : "font-normal text-body-secondary",
                      "transition-colors duration-200",
                      "cursor-pointer",
                    )}
                  >
                    <meta.Icon
                      className={cx(
                        "h-5 w-5 md:h-6 md:w-6",
                        isActive ? "text-primary" : "text-body-secondary",
                        "transition-colors duration-200",
                      )}
                    />
                    {meta.label}
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
        className="relative  -mx-4 md:mx-0 transition-[min-height] duration-300"
        style={panelMinHeight ? { minHeight: panelMinHeight } : undefined}
      >
        {resources.map((resourceCards, index) => {
          const isActive = normalizedIndex === index;
          const panelId = `${tabListId}-panel-${index}`;
          const tabId = `${tabListId}-tab-${index}`;

          return (
            <div
              key={`${type[index]?.type ?? index}-${index}`}
              ref={(node) => {
                panelRef.current[index] = node;
              }}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              aria-hidden={!isActive}
              inert={!isActive}
              className={cx(
                "w-full transition-all duration-300 ease-out",
                "flex items-stretch gap-3 lg:gap-4 overflow-x-auto pb-2 pl-4 pr-4 snap-x snap-mandatory [scroll-padding-left:1rem] [scroll-padding-right:1rem] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                "md:pb-0 md:pl-0 md:pr-0 md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:snap-none",
                isActive
                  ? "relative z-10 opacity-100 translate-y-0 pointer-events-auto"
                  : "absolute inset-0 z-0 opacity-0 translate-y-2 pointer-events-none",
              )}
            >
              {resourceCards.map((card, cardIndex) => (
                <Link
                  scroll={false}
                  key={`${card.slug}-${cardIndex}`}
                  className={cx(
                    "snap-start flex self-stretch flex-none w-[82vw] max-w-[340px]",
                    "sm:w-[66vw] md:w-auto md:max-w-none md:h-full",
                  )}
                  href={`/${card.type}/${card.slug}`}
                >
                  <ResourceCard card={card}  renderMode="full"/>
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
