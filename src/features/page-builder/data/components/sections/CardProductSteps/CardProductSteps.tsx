import { ContentContainer } from "@/components/content/ContentContainer";
import { Card } from "./Card";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { CardProductStepsType } from "@/features/solutions/schema/hero/strapi.schema";

const shapePositions = [
  {
    0: "top-1/2 -translate-y-1/2 -left-[300px]",
    1: "top-1/2 -translate-y-1/2 -right-[300px]",
  },
  {
    0: "top-0 -translate-y-1/2 -right-[300px]",
    1: "bot-0 -translate-y-1/2  -left-[300px]",
  },
  {
    0: "top-0 -translate-y-1/2 -left-[300px]",
    1: "bottom-0 translate-y-1/2 -right-[300px]",
  },
  {
    0: "-top-[300px] -translate-x-1/2 left-1/2",
    1: "-bottom-[300px] -translate-x-1/2 left-1/2 ",
  },
];

export function CardProductSteps({
  section,
}: {
  section: CardProductStepsType;
}) {
  
  return (
    <SectionContainer>
      <div className="max-w-[1760px] mx-auto  space-y-15 bg-gray">
        <ContentContainer content={section} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-5  pt-4 md:pt-6 pb-10 bg-card px-4 md:pl-5 pl- md:pr-0 rounded-[26px]">
          {section.cards &&
            section.cards.map((card, index) => (
              <div
                className=""
                key={index}
              >
                <Card
                  data={card}
                  position={shapePositions[index]}
                  index={index + 1}
                />
              </div>
            ))}
        </div>
      </div>
    </SectionContainer>
  );
}
