import { ContentContainer } from "@/components/content/ContentContainer";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { FeatureCardsRightSectionType } from "../../../schema/pageBuilder";
import { Card } from "@/components/ui/card/Card";

export function FeatureCardsRight({
  section,
}: {
  section: FeatureCardsRightSectionType;
}) {

  return (
    <SectionContainer>
      <div className="flex flex-col justify-between lg:flex-row gap-10 lg:gap-5 bg-white">
        <div className="">
          <ContentContainer
            content={section}
            classContainer="lg:text-left sticky top-[30%]  max-w-[700px] lg:w-full"
            classCtas="lg:justify-start!"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full lg:max-w-[60%] justify-end">
          {section.cards.map((c, i) => (
            <Card width="w-full" key={i} card={c} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
