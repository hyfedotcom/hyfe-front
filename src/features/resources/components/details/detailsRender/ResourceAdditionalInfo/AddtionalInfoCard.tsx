import SmartLink from "@/shared/utils/SmartLink";
import Image from "next/image";
import { forwardRef } from "react";

export const AddtionalInfoCard = forwardRef<
  HTMLDivElement,
  { label: string; url: string; className?: string }
>(({ label, url, className }, ref) => {
  return (
    <SmartLink href={url}>
      <div
        ref={ref}
        className="group hover:border-primary transform-border duration-200 p-4 bg-activ rounded-[18px] min-w-[240px] w-[240px] h-[280px] border-2 border-border overflow-hidden relative"
      >
        <p className="p-small z-1 relative">{label}</p>
        <div className="absolute -right-6 -bottom-20 w-[136px] h-[191px] -rotate-30 ">
          <Image
            src="/image/filte.png"
            alt="filte"
            fill
            className="object-contain group group-hover:translate-y-[-10%]  duration-200 group-hover:scale-105 -z-1"
          />
        </div>
      </div>
    </SmartLink>
  );
});

AddtionalInfoCard.displayName = "AddtionalInfoCard";
