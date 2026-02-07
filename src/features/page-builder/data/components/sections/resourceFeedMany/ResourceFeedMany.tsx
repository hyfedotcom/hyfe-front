import { SectionContainer } from "@/components/layouts/SectionContainer";
import { FeedContainer } from "../TabbedResourceFeed/FeedContainer";
import type { ResourceFeedManySectionRenderable } from "../../pageBuilder.types";

export function ResourceFeedMany({
  section,
}: {
  section: ResourceFeedManySectionRenderable;
}) {
  if (!section.resourceList?.length) return null;
  const resources =
    section.resources ?? section.resourceList.map(() => []);

  const type = section.resourceList.map((item) => ({
    type: item.typeResource,
  }));
  const meta = section.resourceList.map((item) => ({
    title: item.title,
    paragraph: item.paragraph,
    type: item.typeResource,
  }));

  return (
    <SectionContainer>
      <div className="space-y-10">
        <FeedContainer resources={resources} type={type} meta={meta} />
      </div>
    </SectionContainer>
  );
}
