import { SectionContainer } from "@/components/layouts/SectionContainer";
import { ResourceFeedSectionType } from "../../../schema/pageBuilder";
import { ContentContainer } from "@/components/content/ContentContainer";
import { ResourceCard } from "@/features/resources/client";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/Button";
import { getResourcesList } from "@/features/resources";

export async function ResourceFeed({
  section,
}: {
  section: ResourceFeedSectionType;
}) {
  let cards;
  if (!section.cards) {
    const data = await getResourcesList({ type: section.type });

    return;
  }

  return (
    <SectionContainer className="bg-transparent!">
      <div id={`${section.cards[0].type}`} className="space-y-10 ">
        <div className="flex justify-between">
          <ContentContainer content={section} classContainer="text-left" />
          <Button label={`View all`} url={`${section.cards[0].type}`} />
        </div>
        <div className="grid grid-cols-4 gap-5">
          {section.cards.map((c, i) => (
            <Link href={`${c.type}/${c.slug}`} key={i}>
              <ResourceCard card={c} />
            </Link>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
