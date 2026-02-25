import SmartLink from "@/shared/utils/SmartLink";
import Image from "next/image";
import { forwardRef } from "react";

export const AddtionalInfoCard = forwardRef<
  HTMLDivElement,
  { label: string; url: string; className?: string }
>(({ label, url, className }, ref) => {
  const isLongLabel = label.length >= 100;

  return (
    <div
      ref={ref}
      className={`${isLongLabel ? "w-[340px]" : "w-[240px]"} min-w-[240px] shrink-0 self-stretch min-h-[300px] ${className ?? ""}`}
    >
      <SmartLink href={url}>
        <div className="group relative h-full overflow-hidden rounded-[18px] border-2 border-border bg-activ p-4 transition-colors duration-200 hover:border-primary">
          <p className="p-small relative z-[1]">{label}</p>
          <div className="absolute -right-6 -bottom-20 h-[191px] w-[136px] -rotate-30">
            <Image
              src="/image/filte.png"
              alt="filte"
              fill
              className="object-contain duration-200 group-hover:translate-y-[-10%] group-hover:scale-105 -z-1"
            />
          </div>
        </div>
      </SmartLink>
    </div>
  );
});

AddtionalInfoCard.displayName = "AddtionalInfoCard";
