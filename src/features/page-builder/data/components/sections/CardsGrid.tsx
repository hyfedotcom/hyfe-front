import { ContentContainer } from "@/components/content/ContentContainer";
import { CardsGridSectionType } from "../../schema/pageBuilder";
import { Card } from "@/components/ui/card/Card";
import { HorizontalRailClient } from "@/components/ui/rail/HorizontalRailClient";

export function CardsGrid({ section }: { section: CardsGridSectionType }) {
  const hasManyCards = section.cards.length > 3;

  return (
    <section className="relative py-[100px] md:py-[140px]">
      <div
        className={`space-y-8 ${section.ctas?.length && section.ctas?.length > 0 && "md:space-y-15"}`}
      >
        <div>
          <ContentContainer
            content={section}
            classContainer="px-4 md:px-10 xl:px-20 text-left md:text-center mx-auto"
            width="max-w-[1200px]"
            classP="body-large cards-grid-paragraph"
          />
        </div>

        <div>
          <HorizontalRailClient hasManyCards={hasManyCards}>
            <div
              className={`flex items-stretch flex-row gap-3 md:gap-4 px-4 md:px-10 xl:px-20 ${hasManyCards ? "w-max" : "w-max lg:w-full"}`}
            >
              {section.cards.map((c, i) => (
                <div
                  key={i}
                  className={`flex self-stretch items-stretch flex-none ${hasManyCards ? "" : "md:flex-1 md:basis-0 md:min-w-0"}`}
                  data-card
                >
                  <Card
                    card={c}
                    width={`${hasManyCards ? "w-[80vw] md:w-[40vw] lg:w-[36vw] xl:w-[26vw]" : "w-[80vw] md:w-[40vw] lg:w-full"}`}
                  />
                </div>
              ))}
            </div>
          </HorizontalRailClient>
        </div>
      </div>
    </section>
  );
}
