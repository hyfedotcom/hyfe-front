import { ContentContainer } from "@/components/content/ContentContainer";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { FeatureCardsRightSectionType } from "../../../schema/pageBuilder";
import { Card } from "@/components/ui/card/Card";
import { HorizontalRailClient } from "@/components/ui/rail/HorizontalRailClient";

export function FeatureCardsRight({
  section,
}: {
  section: FeatureCardsRightSectionType;
}) {
  return (
    <SectionContainer className="px-0!">
      <div
        className={`  flex flex-col justify-between lg:flex-row gap-10 md:gap-15 lg:gap-8 bg-white`}
      >
        <div className="min-w-1/3">
          <ContentContainer
            content={section}
            classContainer=" lg:text-left sticky top-[30%]  max-w-[700px] lg:w-full px-4 md:px-10 lg:pr-0 xl:pr-0 xl:pl-20"
            classCtas="lg:justify-start!"
            classBtn=" justify-between! md:mr-auto"
            classP="text-medium text-body"
          />
        </div>
        <HorizontalRailClient hasManyCards={false}>
          <div className="flex items-stretch w-max lg:w-full lg:grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-5 w-full justify-end px-4 md:px-10 lg:pl-0 xl:pl-0 xl:pr-20 ">
            {section.cards.map((c, i) => (
              <div key={i} className="self-stretch w-full" data-card>
                <Card width="w-[80vw] md:w-[40vw] lg:w-full" card={c} />
              </div>
            ))}
          </div>
        </HorizontalRailClient>
      </div>
    </SectionContainer>
  );
}
