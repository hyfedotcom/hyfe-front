import clsx from "clsx";
import Image from "next/image";
import { CardType } from "../../../schema/shared";

export function Card({
  data,
  position,
  index,
}: {
  data: CardType,
  position: { 0: string; 1: string };
  index: number;
}) {
  const { title, image, description } = data;

  return (
    <div className="group mb-auto">
      {image?.url && (
        <div className="relative w-full max-w-[330px] h-full  sm:max-w-[401px] max-h-[380px] bg-[#F7F7F9] rounded-[20px] overflow-hidden">
          <Image
            src={image.url}
            alt={image.alt ?? ""}
            width={image.width}
            height={image.height}
            loading="lazy"
            className="z-1 relative group-hover:scale-110 transform-scale duration-500  "
          ></Image>
          <div
            className={clsx(
              "absolute w-[380px] group-hover:left-1/2 group-hover:top-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 duration-500  z-0 h-[380px] bg-[radial-gradient(circle_at_center,_#FDC500,_#F0F0F0)] rounded-full blur-[60px] opacity-50",
              position[0],
            )}
          ></div>
          <div
            className={clsx(
              "absolute w-[380px] group-hover:left-1/2 group-hover:top-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 duration-500  z-0 h-[380px] bg-[radial-gradient(circle_at_center,_#FDC500,_#F0F0F0)] rounded-full blur-[60px] opacity-50",
              position[1],
            )}
          ></div>{" "}
        </div>
      )}
      <div className="mt-4 sm:max-w-[330px]">
        <p className="text-[16px] leading-5 text-gray-700 uppercase mb-1">
          Step {index}
        </p>

        {title && (
          <h4
            className={`font-medium !text-[20px] body-large ${
              description ? "mb-3" : "mb-0"
            }`}
          >
            {title}
          </h4>
        )}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
