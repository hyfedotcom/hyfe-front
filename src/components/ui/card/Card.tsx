import { CardType } from "@/features/page-builder/data/schema/shared";
import Image from "next/image";

export function Card({
  card,
  width = "w-[90vw] md:max-w-[30vw]",
}: {
  card: CardType;
  width?: string;
}) {
  const { image, description, title } = card;
  return (
    <div className={`rounded-[20px] overflow-hidden bg-card flex-1 ${width}`}>
      <Image
        src={image.url}
        alt={image.alt ?? "image of card"}
        width={image.width}
        height={image.height}
        className="w-full"
      />
      <div className="p-6 space-y-3  border-t border-border">
        <h4>{title}</h4>
        <p className="body-medium">{description}</p>
      </div>
    </div>
  );
}
