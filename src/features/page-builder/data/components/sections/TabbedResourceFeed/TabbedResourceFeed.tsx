import { SectionContainer } from "@/components/layouts/SectionContainer";
import { TabbedResourceFeedSectionType } from "../../../schema/pageBuilder";
import { ContentContainer } from "@/components/content/ContentContainer";
import { FeedContainer } from "./FeedContainer";
import { getResourcesList, ResourceCardListType } from "@/features/resources";

export async function TabbedResourceFeed({
  section,
}: {
  section: TabbedResourceFeedSectionType;
}) {
  const data = await Promise.all(
    section.cards.map(async (c) => {
      const res = await getResourcesList({ type: c.type });
      return res ?? { landing: undefined, list: [] };
    }),
  );

  if (!data) return;

  const tabsWithLists = section.cards.map((c) => {
    const lists = data.map((d) => d.list);

    const slug = c.cards.map((c) => c.slug) ?? [];

    const filtered = lists.length
      ? lists.flatMap((i) => i.filter((item) => slug.includes(item.slug)))
      : lists;

    return filtered as ResourceCardListType;
  });

  return (
    <SectionContainer>
      <div className="space-y-10 ">
        <ContentContainer content={section} classContainer="text-left" />
        <FeedContainer
          resources={tabsWithLists}
          type={section.cards.map((c) => ({
            type: c.type,
          }))}
        />
      </div>
    </SectionContainer>
  );
}
