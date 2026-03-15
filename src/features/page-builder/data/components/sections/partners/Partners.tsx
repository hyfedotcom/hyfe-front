import { ContentContainer } from "@/components/content/ContentContainer";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { PartnersSectionType } from "../../../schema/pageBuilder";
import { PartnersClientLazy } from "./PartnersClientLazy";
import { PartnersFallback } from "./PartnersFallback";

export function Partners({ section }: { section: PartnersSectionType }) {
  return (
    <SectionContainer>
      <div className="space-y-10 md:space-y-15 bg-white">
        <ContentContainer content={section} width="max-w-[900px]" />
        <PartnersClientLazy
          section={section}
          fallback={<PartnersFallback section={section} />}
        />
      </div>
    </SectionContainer>
  );
}
