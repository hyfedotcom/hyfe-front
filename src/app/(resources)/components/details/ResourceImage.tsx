import Image from "next/image";
import { ResourceImageType } from "../../../../features/resources/data/resources.types";

export function ResourceImage({ block }: { block: ResourceImageType }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl mb-15">
      <div className="space-y-5 mb-4">
        {" "}
        {block.title && <h2>{block.title}</h2>}
        {block.description && <p className="body-small text-body-secondary font-normal!">{block.description}</p>}
      </div>
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={block.image.url}
          alt={block.image.alt ?? "resource image"}
          fill
          sizes="(max-width: 900px) 100vw, 870px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
