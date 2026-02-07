import { SectionContainer } from "@/components/layouts/SectionContainer";
import { ContentImageSplitType } from "@/features/solutions/schema/hero/strapi.schema";
import Image from "next/image";

export default function ContentImageSplit({
  section,
}: {
  section: ContentImageSplitType;
}) {
  const { ctas, content, title, type, image } = section;
  return (
    <SectionContainer>
      <div className="flex items-center flex-col-reverse md:flex-row">
        <div className="md:w-1/2 space-y-6">
          <h2>{title}</h2>
          {content && (
            <div className="space-y-5">
              {content.map((e, i) => (
                <p className="text-balance" key={i}>{e.paragraph}</p>
              ))}
            </div>
          )}
        </div>
        <Image
          src={image.url}
          alt={image.alt ?? "image"}
          width={image.width}
          height={image.height}
          className="w-1/2"
        />
      </div>
    </SectionContainer>
  );
}
