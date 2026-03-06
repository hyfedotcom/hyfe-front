import Image from "next/image";
import { ResourceTag } from "@/app/(resources + privacy)/components/ui/ResourceTag";
import type { ResourceCardType } from "../../../../features/resources/data/resources.types";
import { formatDateWithDots } from "@/shared/utils/formatDateWithDots";
import { formatResourceTypeLabel } from "@/shared/utils/formatResourceTypeLabel";
import { SheetLink } from "@/app/@sheet/components/navigation/SheetLink";
import {
  getResourceIconKey,
  RESOURCE_ICONS,
} from "../navigation/resourceNav.utils";

export function ResourceDetailsHero({
  data,
  type,
}: {
  data: ResourceCardType;
  type: string;
}) {
  const { date, tags, title, cover, excerpt } = data;
  const typeLabel = formatResourceTypeLabel(type);

  const iconKey = getResourceIconKey(typeLabel);
  const Icon = RESOURCE_ICONS[iconKey];

  return (
    <div className=" w-full items-center space-y-8 md:space-y-15 pt-6 pb-10 md:pb-20">
      {/* <div className="space-y-4 md:space-y-6">
        <div className="flex justify-center items-center">
          {" "}
          <div className="w-[50%] flex flex-row items-center md:flex-row justify-center gap-6  mx-auto">
            {tags.length > 0 && (
              <div className="flex gap-2">
                {tags.map((t: { tag: string }, i: number) => (
                  <SheetLink mode="close" key={i} href={`/${type}`}>
                    <ResourceTag tag={t.tag} />
                  </SheetLink>
                ))}
              </div>
            )}
          </div>
        </div>
        <h1 className="w-full md:w-[90%] text-[24px]! md:text-[28px]! lg:text-[32px] xl:text-[42px]! text-balance md:text-center mx-auto">
          {title}
        </h1>
        <div className="flex justify-between items-center mx-auto w-[40%]">
          <SheetLink
            mode="close"
            href={`/${type}`}
            className="text-medium hover:bg-primary-100 transition-colors py-1.5 px-4 rounded-full font-medium text-body flex items-center gap-3 md:text-center!  h-max"
          >
            <>
              <Icon className="text-primary-600" />
              {typeLabel}
            </>
          </SheetLink>
          <p
            className={`${tags.length === 0 && "mx-auto"} text-[14px] md:text-[16px] text-body-secondary! py-1.5 px-4 `}
          >
            {formatDateWithDots(date)}
          </p>
        </div>
        {excerpt && <p className="text-body body-medium">{excerpt}</p>}{" "}
      </div> */}
      <div className="space-y-4 md:space-y-6 w-full md:max-w-[60%] mx-auto">
        {tags.length > 0 && (
          <div className="flex justify-start gap-2">
            {tags.map((t: { tag: string }, i: number) => (
              <SheetLink mode="close" key={i} href={`/${type}`}>
                <ResourceTag tag={t.tag} />
              </SheetLink>
            ))}
          </div>
        )}
        <h1 className="w-full  text-[24px]! md:text-[28px]! lg:text-[32px] xl:text-[42px]! text-balance mx-auto! mx-auto">
          {title}
        </h1>
        <div className="flex justify-between items-center w-max mr-auto">
          <SheetLink
            mode="close"
            href={`/${type}`}
            className="text-medium hover:bg-primary-100 transition-colors py-1.5 px-4 rounded-full font-medium text-body flex items-center gap-3   h-max"
          >
            <>
              <Icon className="text-primary-600" />
              {typeLabel}
            </>
          </SheetLink>
          <p
            className={`${tags.length === 0 && "mx-auto"} text-[14px] md:text-[16px] text-body-secondary! py-1.5 px-4 `}
          >
            {formatDateWithDots(date)}
          </p>
        </div>
        {excerpt && <p className="text-body body-medium">{excerpt}</p>}{" "}
      </div>
      <Image
        src={cover.url}
        alt={cover.alt ?? title}
        width={cover.width}
        height={cover.height}
        preload
        className="w-full md:w-[70%] max-md:object-left mx-auto max-h-[300px] md:max-h-[400px] lg:max-h-[500px] object-contain border-border border-0 rounded-[20px]"
      ></Image>
    </div>
  );
}
