import Image from "next/image";
import Link from "next/link";
import { ResourceTag } from "@/app/(resources)/components/ui/ResourceTag";
import type { ResourceCardType } from "../../../../features/resources/data/resources.types";
import { formatDateWithDots } from "@/shared/utils/formatDateWithDots";
import { formatResourceTypeLabel } from "@/shared/utils/formatResourceTypeLabel";

export function ResourceDetailsHero({
  data,
  type,
}: {
  data: ResourceCardType;
  type: string;
}) {
  const { date, tags, title, cover } = data;
  const typeLabel = formatResourceTypeLabel(type);

  return (
    <div className=" w-full space-y-8 md:space-y-15 pt-6 pb-10 md:pb-20">
      <div className="space-y-4 md:space-y-8">
        <div>
          {" "}
          <Link href={`/${type}`} className="h4-class text-primary-700!">
            {typeLabel}
          </Link>
        </div>
        <h1 className="text-[24px]! md:text-[42px]! lg:text-[52px]! text-balance">
          {title}
        </h1>
        <div className="flex flex-row items-center md:flex-row justify-between gap-6">
          <div className="flex gap-2">
            {tags.map((t: { tag: string }, i: number) => (
              <Link key={i} href={`/${type}`}>
                <ResourceTag tag={t.tag} />
              </Link>
            ))}
          </div>
          <p className="text-[14px] md:text-[16px] text-body-secondary!">
            {formatDateWithDots(date)}
          </p>
        </div>
      </div>
      <Image
        src={cover.url}
        alt={cover.alt ?? title}
        width={cover.width}
        height={cover.height}
        className="w-full max-h-[400px] md:max-h-[700px] object-cover border-border border-2 rounded-[20px]"
      ></Image>
    </div>
  );
}
