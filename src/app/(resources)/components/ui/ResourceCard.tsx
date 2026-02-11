// import { ResourceCardType } from "@/features/resources";
import Image from "next/image";
import TagPlate from "./ResourceTagChip";
import { ResourceCardType } from "../../../../features/resources/data/resources.types";
import { formatDateWithDots } from "@/shared/utils/formatDateWithDots";

export function ResourceCard({
  card,
  
}: {
  card: ResourceCardType;

}) {
  const { cover, date, excerpt, title, tags, type } = card;

  return (
    <div
      className={
        "group flex flex-col w-full h-fit hover:bg-activ border-[1.5px] border-border hover:border-primary hover:shadow-hover duration-300 space-y-4 md:space-y-5 bg-card rounded-[20px] overflow-hidden"
      }
    >
      <Image
        src={cover.url || ""}
        width={cover.width ?? 300}
        height={cover.height ?? 220}
        alt={cover.alt ?? `Image resource about ${title}}`}
        className={`${type === "publications" && "object-top-left"} w-full h-46 md:h-65 object-cover`}
      />
      <div className="px-4 md:px-5  h-full flex flex-col">
        <div className=" h-full flex flex-col">
          <div className="flex mb-3 md:mb-4 gap-1 shrink-0">
            <TagPlate label={type} type={type} />
            {tags && tags.map((t, i) => <TagPlate label={t.tag} key={i} />)}
          </div>

          <div className="flex flex-col flex-1 min-h-0 ">
            <h4 className={`${excerpt && "mb-2"} max-[768px]:text-[14px]! line-clamp-2`}>{title}</h4>

            {excerpt && (
              <p className="text-[12px] md:text-[16px] text-body-secondary! line-clamp-2">{excerpt}</p>
            )}

       
            <div className="max-[768px]:text-[12px]! body-small mt-auto pt-4 md:pt-6 pb-4 md:pb-6 leading-[100%]!">
              {formatDateWithDots(date)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
