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
      <div className="relative w-full aspect-[16/11]">
        <Image
          src={image.url}
          alt={image.alt ?? "image of card"}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 space-y-3  border-t border-border">
        <h3 className="text-[20px]! font-medium! md:text-[24px]!">{title}</h3>
        <p className="body-medium">{description}</p>
      </div>
    </div>
  );
}
