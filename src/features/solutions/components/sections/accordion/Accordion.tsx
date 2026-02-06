import { ContentContainer } from "@/components/content/ContentContainer";
import { TabSlider } from "./TabSlider";
import { AccordionType } from "@/features/solutions/schema/hero/strapi.schema";
import { SectionContainer } from "@/components/layouts/SectionContainer";


export function Accordion({ section }: { section: AccordionType }) {
  const { cards } = section;
  return (
    <SectionContainer className="bg-white z-100 relative pt-[100px] md:pt-[140px]">
      <div className=" space-y-15">
        <ContentContainer
          classContainer="text-center max-w-[900px] mx-auto flex flex-col items-center"
          classH="text-balance"
          classP="text-balance"
          content={section}
        />
        {cards && cards.length > 0 && <TabSlider card={cards} />}
      </div>
    </SectionContainer>
  );
}
