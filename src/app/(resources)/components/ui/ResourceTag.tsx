import clsx from "clsx";
import { cross } from "@/shared/icons/icons";

export function ResourceTag({
  tag,
  active = false,
}: {
  tag: string;
  active?: boolean;
}) {
  return (
    <button
      className={clsx(
        "relative flex text-[12px]! md:text-[16px]! items-center body-medium font-medium! leading-[100%]! px-3 md:px-6 border-[1.5px] border-border text-black! rounded-full transition-colors gap-2 duration-200 cursor-pointer text-nowrap",
        active
          ? "bg-primary-200 border-primary py-1.5 md:py-2.5 "
          : "bg-bg-150  hover:border-primary py-3 md:py-3.5 "
      )}
    >
      {tag}
      <span className={clsx("duration-300",active ? "block" : "opacity-0 absolute right-0")}>{cross}</span>
    </button>
  );
}
