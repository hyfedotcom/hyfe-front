import { ContentContainer } from "@/components/content/ContentContainer";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { SolutionMapType } from "@/features/solutions/schema/hero/strapi.schema";
import Image from "next/image";

export function Map({ section }: { section: SolutionMapType }) {
  return (
    <SectionContainer>
      <div className="space-y-15">
        <ContentContainer content={section} />
        <Image
          className="rounded-[20px] mx-auto"
          src={"/solution/Countries.png"}
          width={1760}
          height={809}
          alt="map"
        />
      </div>
    </SectionContainer>
  );
}
