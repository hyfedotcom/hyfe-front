import { ResourceCard } from "@/features/resources/card";
import { ContentContainer } from "@/components/content/ContentContainer";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/Button";
import {
  RESOURCE_META,
  cx,
  getCardWidthClass,
  getGridCols,
  type ResourceFeedMeta,
  type ResourcesLists,
  type ResourceTypes,
} from "./FeedContainer.shared";

export function FeedContainerStatic({
  resources,
  type,
  meta,
}: {
  resources: ResourcesLists;
  type: ResourceTypes;
  meta?: ResourceFeedMeta;
}) {
  if (!resources.length) return null;

  const activeMeta = meta?.[0];
  const activeType = type[0]?.type;
  const activeCards = resources[0] ?? [];
  const gridCols = getGridCols(activeCards.length);
  const cardWidthClass = getCardWidthClass(activeCards.length);

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

            {type.map((entry, index) => {
              const isActive = index === 0;
              const metaEntry = RESOURCE_META[entry.type];

              return (
                <span
                  key={entry.type}
                  role="tab"
                  aria-selected={isActive}
                  className={cx(
                    "relative z-10 shrink-0 rounded-full px-4 py-2.5 md:px-5 md:py-3",
                    isActive &&
                      "border-1 border-black/20 bg-gradient-to-tl from-primary/50 via-white to-white text-black",
                  )}
                >
                  <span
                    className={cx(
                      "flex items-center gap-2 text-[15px] leading-none md:text-[18px]",
                      isActive
                        ? "font-medium text-body"
                        : "font-normal text-body-secondary",
                    )}
                  >
                    <metaEntry.Icon
                      className={cx(
                        "h-5 w-5 md:h-6 md:w-6",
                        isActive ? "text-primary" : "text-body-secondary",
                      )}
                    />
                    {metaEntry.label}
                  </span>
                </span>
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

      <div className="relative -mx-4 overflow-hidden md:mx-0">
        <div className="max-w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            className={`items-stretch gap-3 lg:gap-4 ${
              activeCards.length > 1 ? "w-max" : "w-full"
            } xl:w-full grid ${gridCols} px-4 md:px-10 xl:px-20`}
          >
            {activeCards.map((card, cardIndex) => (
              <Link
                scroll={false}
                key={`${card.slug}-${cardIndex}`}
                className={`block h-full self-stretch shrink-0 ${cardWidthClass}`}
                href={`/${card.type}/${card.slug}`}
              >
                <ResourceCard card={card} renderMode="full" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
