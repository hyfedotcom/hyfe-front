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
    <SectionContainer>
      <div
        className={`${variant === "right" ? "flex-col-reverse md:flex-row-reverse" : "flex-col md:flex-row"} flex items-center `}
      >
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-balance">{title}</h2>
          {content && (
            <div className="space-y-5">
              {content.map((e, i) => (
                <p className="text-balance" key={i}>
                  {e.paragraph}
                </p>
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
