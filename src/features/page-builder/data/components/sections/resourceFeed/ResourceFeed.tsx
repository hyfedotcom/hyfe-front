import { SectionContainer } from "@/components/layouts/SectionContainer";
import { ContentContainer } from "@/components/content/ContentContainer";
import { ResourceCard } from "@/features/resources/client";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/Button";
import type { ResourceFeedSectionRenderable } from "../../pageBuilder.types";

export function ResourceFeed({
  section,
}: {
  section: ResourceFeedSectionRenderable;
}) {
  const list = section.cards?.slice(0, 4);

  return (
    <SectionContainer className="bg-transparent!">
      <div id={`${section.typeResource}`} className="space-y-10 ">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <ContentContainer content={section} classContainer="text-left" />
          <Button
            label={`View all`}
            url={`/${section.typeResource}`}
            classNameProp="justify-between sm:w-max"
          />
        </div>
        {list && (
          <div className="flex max-md:px-4 items-stretch gap-3 lg:gap-4 overflow-x-auto pb-2 -mx-4 md:mx-0 md:grid md:auto-rows-fr md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {list.map((c, i) => (
              <Link
                href={`/${c.type}/${c.slug}`}
                key={i}
                scroll={false}
                className={
                  "snap-start flex self-stretch flex-none w-[82vw] max-w-[340px] sm:w-[66vw] md:w-auto md:max-w-none md:h-full"
                }
              >
                <ResourceCard card={c} renderMode={"full"} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
