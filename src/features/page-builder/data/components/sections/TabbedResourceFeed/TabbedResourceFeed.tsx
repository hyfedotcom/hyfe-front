import { SectionContainer } from "@/components/layouts/SectionContainer";
import { ContentContainer } from "@/components/content/ContentContainer";
import { FeedContainer } from "./FeedContainer";
import type { ResourceCardListType } from "@/features/resources";
import type { TabbedResourceFeedSectionRenderable } from "../../pageBuilder.types";

export function TabbedResourceFeed({
  section,
}: {
  section: TabbedResourceFeedSectionRenderable;
}) {
  const resources =
    section.resources ?? section.cards.map((c) => c.cards as ResourceCardListType);

  return (
    <SectionContainer>
      <div className="space-y-10 ">
        <ContentContainer content={section} classContainer="text-left" />
        <FeedContainer
          resources={resources}
          type={section.cards.map((c) => ({
            type: c.type,
          }))}
        />
      </div>
    </SectionContainer>
  );
}
