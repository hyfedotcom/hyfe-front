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
        <div className="flex justify-between">
          <ContentContainer content={section} classContainer="text-left" />
          <Button label={`View all`} url={`/${section.typeResource}`} />
        </div>
        {list && (
          <div className="grid grid-cols-4 gap-5">
            {list.map((c, i) => (
              <Link href={`/${c.type}/${c.slug}`} key={i}>
                <ResourceCard card={c} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
