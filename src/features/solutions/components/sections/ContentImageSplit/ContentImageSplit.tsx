import { ContentContainer } from "@/components/content/ContentContainer";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { ContentImageSplitType } from "@/features/solutions/schema/hero/strapi.schema";
import Image from "next/image";

export default function ContentImageSplit({
  section,
}: {
  section: ContentImageSplitType;
}) {
  const { ctas, content, title, type, image, variant } = section;
  return (
    <SectionContainer className="bg-transparent!">
      <div
        className={`${variant === "right" ? "flex-col md:flex-row-reverse" : "flex-col md:flex-row"} flex items-center gap-10`}
      >

        <ContentContainer content={section} classContainer="md:w-1/2 space-y-6"/>
        <Image
          src={image.url}
          alt={image.alt ?? "image"}
          width={image.width}
          height={image.height}
          className="w-full md:w-1/2"
        />
      </div>
    </SectionContainer>
  );
}
