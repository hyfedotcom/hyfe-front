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
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 md:mx-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
            {list.map((c, i) => (
              <Link
                href={`/${c.type}/${c.slug}`}
                key={i}
                scroll={false}
                className="flex-none w-[75vw] max-w-[320px] first:ml-4 last:mr-4 md:w-auto md:max-w-none md:first:ml-0 md:last:mr-0"
              >
                <ResourceCard card={c} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
