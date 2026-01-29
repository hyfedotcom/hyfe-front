import { ContentContainer } from "@/components/content/ContentContainer";
import { CardsGridSectionType } from "../../schema/pageBuilder";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { Card } from "@/components/ui/card/Card";

export function CardsGrid({ section }: { section: CardsGridSectionType }) {
  return (
    <SectionContainer>
      <div className="space-y-10 space-y-15px">
        <ContentContainer content={section} width="max-w-[1000px]"/>
        <div className="flex flex-col md:flex-row gap-5">
          {" "}
          {section.cards.map((c, i) => (
            <Card card={c} key={i} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
