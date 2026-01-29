import { ContentContainer } from "@/components/content/ContentContainer";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { PartnersSectionType } from "../../../schema/pageBuilder";
import { PartnersCard } from "./PartnersCard";

export function Partners({ section }: { section: PartnersSectionType }) {
  const { logos } = section;

  return (
    <SectionContainer>
      <div className="space-y-10 md:space-y-15 bg-white">
        <ContentContainer content={section} width="max-w-[900px]"/>
        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-6 gap-5 w-full ">
          {logos.map((p, i) => (
            <PartnersCard key={i} partner={p} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
