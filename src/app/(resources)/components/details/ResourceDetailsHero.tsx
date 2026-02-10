import Image from "next/image";
import Link from "next/link";
import { ResourceTag } from "@/app/(resources)/components/ui/ResourceTag";
import type { ResourceCardType } from "../../../../features/resources/data/resources.types";
import { formatDateWithDots } from "@/shared/utils/formatDateWithDots";

export function ResourceDetailsHero({
  data,
  type,
}: {
  data: ResourceCardType;
  type: string;
}) {
  const { date, tags, title, cover } = data;

  return (
    <div className=" w-full md:space-y-10 md:space-y-15 pb-10 md:pb-20">
      <div className="space-y-5 md:space-y-8">
        <div>
          {" "}
          <Link href={`/${type}`} className="h4-class text-primary-700!">
            {type}
          </Link>
        </div>
        <h1 className="text-[28px]! md:text-[52px]! text-balance">{title}</h1>
        <div className="flex flex-col-reverse md:flex-row justify-between gap-6">
          <div className="flex gap-2">
            {tags.map((t: { tag: string }, i: number) => (
              <Link key={i} href={`/${type}`}>
                <ResourceTag tag={t.tag} />
              </Link>
            ))}
          </div>
          <p className="body-medium text-body-secondary!">
            {formatDateWithDots(date)}
          </p>
        </div>
      </div>
      <Image
        src={cover.url}
        alt={cover.alt ?? title}
        width={1034}
        height={714}
        className="w-full h-[400px] md:h-[700px] object-cover border-border border-2 rounded-[20px]"
      ></Image>
    </div>
  );
}
