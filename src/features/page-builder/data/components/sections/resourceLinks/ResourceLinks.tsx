import { ContentContainer } from "@/components/content/ContentContainer";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { ResourceLinksSectionType } from "../../../schema/pageBuilder";
import { CardLink } from "./CardLinks";

export function ResourceLinks({
  section,
}: {
  section: ResourceLinksSectionType;
}) {
  const { links } = section;
  return (
    <SectionContainer>
      <div className="space-y-10 md:space-y-15 bg-white">
        <ContentContainer content={section} />
        <div className="flex flex-col md:flex-row gap-5 max-w-[1220px] mx-auto">
          {links.map((l, i) => (
            <CardLink card={l} key={i} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
