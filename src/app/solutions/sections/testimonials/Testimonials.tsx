import { SectionContainer } from "@/components/layouts/SectionContainer";
import { CardsWrapper } from "./CardsWrapper";
import { ContentContainer } from "@/components/content/ContentContainer";
import { TestimonialsFeedType } from "@/features/solutions/schema/hero/strapi.schema";

export function Testimonials({ section }: { section: TestimonialsFeedType }) {
  const { testimonials } = section;

  return (
    <SectionContainer className="bg-gray-50 overflow-hidden  z-300 relative">
      <div className=" space-y-10">
        <ContentContainer
          classContainer="px-4 md:px-0"
          classH="text-balance"
          classP="text-balance"
          content={section}
        />

        {testimonials && testimonials.length > 0 && <CardsWrapper data={testimonials} />}
      </div>
    </SectionContainer>
  );
}
