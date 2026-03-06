import { ContentContainer } from "@/components/content/ContentContainer";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { PartnersClient } from "./PartnersClient";
import { PartnersSectionType } from "../../../schema/pageBuilder";

export function Partners({ section }: { section: PartnersSectionType }) {

  return (
    <SectionContainer>
      <div className="space-y-10 md:space-y-15 bg-white">
        <ContentContainer content={section} width="max-w-[900px]" />
        <PartnersClient section={section} />
      </div>
    </SectionContainer>
  );
}
