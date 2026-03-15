import { SectionContainer } from "@/components/layouts/SectionContainer";
import { ContentContainer } from "@/components/content/ContentContainer";
import { TestimonialsFeedType } from "@/features/solutions/schema/hero/strapi.schema";
import { HorizontalRailClient } from "@/components/ui/rail/HorizontalRailClient";
import { Card } from "./Card";

export function Testimonials({ section }: { section: TestimonialsFeedType }) {
  const { testimonials } = section;
  const hasRail = Boolean(testimonials && testimonials.length > 3);

  return (
    <SectionContainer className="bg-gray-50 overflow-hidden max-md:px-0 z-300 relative">
      <div className=" space-y-10">
        <ContentContainer
          classContainer="px-4 md:px-0"
          classH="text-balance"
          classP="text-balance"
          content={section}
        />

        {testimonials && testimonials.length > 0 && (
          <HorizontalRailClient
            hasManyCards={hasRail}
            className="space-y-5"
            classNameBtn="0"
          >
            <div className="flex items-stretch gap-4 md:gap-5 px-4 md:px-0">
              {testimonials.map((card, index) => (
                <div
                  key={index}
                  data-card
                  className="shrink-0 w-[85%] sm:w-[42%] lg:w-[32%]"
                >
                  <Card testimonial={card} />
                </div>
              ))}
            </div>
          </HorizontalRailClient>
        )}
      </div>
    </SectionContainer>
  );
}
