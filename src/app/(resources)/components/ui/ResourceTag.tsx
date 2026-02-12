import clsx from "clsx";
import { cross } from "@/shared/icons/icons";

export function ResourceTag({
  tag,
  active = false,
  glass = false,
  className,
  onClick,
}: {
  tag: string;
  active?: boolean;
  glass?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "relative flex items-center gap-2 rounded-full text-nowrap duration-200 cursor-pointer transition-[border-color,background-color,box-shadow,transform,color]",
        glass
          ? "px-3 md:px-5 py-2 text-[12px]! md:text-[14px]! leading-[100%]! font-medium! border border-black/12 shadow-[0_8px_16px_rgba(15,23,42,0.09),0_1px_4px_rgba(255,255,255,0.55)_inset]"
          : "text-[12px]! md:text-[16px]! body-medium font-medium! leading-[100%]! px-3 md:px-6 border-[1.5px] border-border text-black! py-3 md:py-3.5",
        glass && active
          ? "border-black/20 bg-gradient-to-tl from-primary/50 via-white to-white text-black shadow-[0_8px_18px_rgba(15,23,42,0.12),0_1px_4px_rgba(255,255,255,0.72)_inset]"
          : "",
        glass && !active
          ? "border-black/12 bg-gradient-to-b from-white/88 to-white/72 text-black/90 hover:-translate-y-[1px] hover:border-black/20 hover:from-white/95 hover:to-white/80"
          : "",
        !glass && active ? "bg-primary-200 border-primary py-1.5 md:py-2.5 " : "",
        !glass && !active ? "bg-bg-150  hover:border-primary " : "",
        className,
      )}
    >
      {tag}
      <span
        className={clsx(
          "duration-300",
          active ? "block" : "opacity-0 absolute right-0",
        )}
      >
        {cross}
      </span>
    </button>
  );
}
