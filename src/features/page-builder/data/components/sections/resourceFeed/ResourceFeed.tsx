import { SectionContainer } from "@/components/layouts/SectionContainer";
import { ContentContainer } from "@/components/content/ContentContainer";
import { ResourceCard } from "@/features/resources/card";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/Button";
import type { ResourceFeedSectionRenderable } from "../../pageBuilder.types";
import { HorizontalRailClient } from "@/components/ui/rail/HorizontalRailClient";

export function ResourceFeed({
  section,
}: {
  section: ResourceFeedSectionRenderable;
}) {
  const list = section.cards?.slice(0, 4);
  const length = list?.length
  const gridCols = length === 4 ? "grid-cols-4" : length === 3 ? "grid-cols-3" : length === 2 ? "grid-cols-2" : "grid-cols-1"

  return (
    <SectionContainer className="bg-transparent! pointer-events-none">
      <div id={`${section.typeResource}`} className="space-y-10 ">
        <div className="flex flex-col md:flex-row justify-between gap-4  pointer-events-auto">
          <ContentContainer content={section} classContainer="text-left" />
          <Button
            label={`View all`}
            url={`/${section.typeResource}`}
            classNameProp="justify-between md:w-max"
          />
        </div>
        {list && (
          <HorizontalRailClient hasManyCards classNameBtn={` ${list.length > 1 ? "min-xl:hidden!" : "hidden"}`} className="relative left-1/2 -translate-x-1/2 w-screen pointer-events-auto" >
            <div className={`items-stretch gap-3 lg:gap-4 ${list.length > 1 ? "w-max" : "w-full"} xl:w-full grid ${gridCols}  px-4 md:px-10 xl:px-20`}>
              {list.map((c, i) => (
                <Link
                  href={`/${c.type}/${c.slug}`}
                  key={i}
                  scroll={false}
                  data-card
                  className={
                    `block self-stretch shrink-0 h-full  ${list.length > 1 ? "sm:w-[40vw] lg:w-[30vw] xl:w-full  w-[85vw]" : "w-full lg:w-[30vw] xl:w-full"}`
                  }
                >
                  <ResourceCard card={c} renderMode={"full"} />
                </Link>
              ))}
            </div>
          </HorizontalRailClient>
        )}
      </div>
    </SectionContainer>
  );
}
