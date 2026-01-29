// import { ResourceCardType } from "@/features/resources";
import Image from "next/image";
import TagPlate from "./ResourceTagChip";
import { ResourceCardType } from "../../data/resources.types";

export function ResourceCard({
  card,
  
}: {
  card: ResourceCardType;

}) {
  const { cover, date, excerpt, title, tags, type } = card;

  return (
    <div
      className={
        "group flex flex-col w-full h-fit hover:bg-activ border-[1.5px] border-border hover:border-primary duration-300 space-y-5 bg-card rounded-[20px] overflow-hidden"
      }
    >
      <Image
        src={cover.url || ""}
        width={cover.width ?? 300}
        height={cover.height ?? 220}
        alt={cover.alt ?? `Image resource about ${title}}`}
        className="w-full h-65 object-cover"
      />
      <div className="px-5 pb-6 space-y-4 h-full flex flex-col">
        <div className="space-y-5 h-full flex flex-col">
          <div className="flex gap-1 shrink-0">
            <TagPlate label={type} type={type} />
            {tags && tags.map((t, i) => <TagPlate label={t.tag} key={i} />)}
          </div>

          {/* вот тут главное */}
          <div className="flex flex-col flex-1 min-h-0 space-y-2">
            <h4 className="line-clamp-2">{title}</h4>

            {excerpt && (
              <p className="body-medium text-body-secondary! line-clamp-2">{excerpt}</p>
            )}

            {/* дата прижмётся вниз */}
            <div className="body-small mt-auto pt-8">{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
