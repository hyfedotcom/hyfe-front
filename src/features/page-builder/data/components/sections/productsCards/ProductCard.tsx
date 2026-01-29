import Image from "next/image";
import { CardCtaType } from "../../../schema/shared";
import { Button } from "@/components/ui/buttons/Button";

export function ProductCard({ card }: { card: CardCtaType }) {
  const { cta, description, image, title } = card;
  return (
    <div className="w-full flex-col sm:flex-row items-center justify-between flex bg-card rounded-[20px] border  border-border hover:bg-activ hover:border-primary overflow-hidden">
      <div className="space-y-10 p-5 pt-10 md:p-7 w-full sm:max-w-[45%]">
        <div className="space-y-5">
          <h3 className="text-balance">{title}</h3>
          {description && (
            <p className="body-medium text-balance">{description}</p>
          )}
        </div>
        <Button
          label={cta[0].label}
          url={cta[0].url}
          classNameProp="w-max "
          tag="button"
        />
      </div>
      <div className="relative w-full max-w-[680px] h-[300px] md:h-[500px] ">
        {" "}
        <Image
          src={card.image.url}
          alt={image.alt ?? `${title} App`}
          fill
          className="object-cover inset-0 "
        ></Image>
      </div>
    </div>
  );
}
