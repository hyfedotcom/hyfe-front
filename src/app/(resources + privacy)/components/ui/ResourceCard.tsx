import Image from "next/image";
import TagPlate from "./ResourceTagChip";
import { ResourceCardType } from "../../../../features/resources/data/resources.types";
import { formatDateWithDots } from "@/shared/utils/formatDateWithDots";

export function ResourceCard({
  card,
  renderMode,
  index,
}: {
  card: ResourceCardType;
  renderMode: "full" | "detail-canonical" | "detail-sheet";
  index?: number;
}) {
  const { cover, date, excerpt, title, tags, type } = card;
  const isOptimizedMode = renderMode !== "full";
  const cardSizes =
    "(min-width: 1280px) calc((100vw - 10rem - 3.75rem) / 4), " +
    "(min-width: 1024px) calc((100vw - 5rem - 2.5rem) / 3), " +
    "(min-width: 640px) calc((100vw - 2rem - 1rem) / 2), " +
    "calc(100vw - 2rem)";
  return (
    <div
      className={
        "group self-stretch flex h-full w-full flex-col border-[1.5px] border-border hover:border-primary hover:shadow-hover hover:bg-activ duration-300 space-y-4 md:space-y-5 bg-card rounded-[20px] overflow-hidden"
      }
    >
      <Image
        src={cover.url || ""}
        width={cover.width ?? 300}
        height={cover.height ?? 220}
        sizes={cardSizes}
        quality={renderMode === "full" ? 70 : 40}
        loading={isOptimizedMode ? "lazy" : undefined}
        preload={!isOptimizedMode && index === 0 ? true : false}
        alt={cover.alt ?? `Image resource about ${title}`}
        className={`${type === "publications" && "object-top-left"} w-full h-46 md:h-65 object-cover`}
      />
      <div className="px-4 md:px-5 flex flex-col flex-1">
        <div className="flex mb-3 md:mb-4 gap-1 shrink-0">
          <TagPlate label={type} type={type} />
          {tags && tags.map((t, i) => <TagPlate label={t.tag} key={i} />)}
        </div>

        <div className="flex flex-col min-h-0 flex-1 justify-between">
          <div>
            <h3
              className={`${excerpt && "mb-2"} body-large font-medium! text-black! max-[768px]:text-[16px]! `}
            >
              {title}
            </h3>

            {excerpt && (
              <p className="text-[14px] md:text-[16px] text-body-secondary! min-h-0 overflow-hidden line-clamp-2 md:flex-1">
                {excerpt}
              </p>
            )}
          </div>

          <div className="max-[768px]:text-[12px]! body-small mt-4 md:mt-auto pt-0 md:pt-6 pb-4 md:pb-6 leading-[100%]!">
            {formatDateWithDots(date)}
          </div>
        </div>
      </div>
    </div>
  );
}
