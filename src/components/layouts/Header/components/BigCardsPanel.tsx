import { cx, NavLink } from "@/features/header/helpers/header.helpers";
import { BaseLink } from "@/features/header/type/header.type";
import Image from "next/image";
import { LinkIndicator } from "@/components/ui/buttons/LinkIndicator";

export function BigCardsPanel({
  items,
  close,
}: {
  items: BaseLink[];
  close: () => void;
}) {
  return (
    <div
      className={cx(
        "absolute flex pt-3 top-full mt-3  -translate-x-1/2 left-1/2 rounded-[24px] bg-white p-2 shadow-xl ring-1 ring-black/10",
      )}
    >
      {items.map((it) => (
        <NavLink
          key={it.id}
          href={it.href}
          onClick={close}
          className={cx(
            "relative flex flex-col items-start gap-3 rounded-[18px] px-4 py-3 w-[280px] group",
            "hover:bg-black/5",
          )}
        >
          {it.image && (
            <div className="relative w-full h-[240px] ">
              <Image
                src={it.image?.url}
                alt={it.label}
                fill
                className="rounded-[12px]"
              />
            </div>
          )}
          <div className="w-full">
            <div className="flex  items-center gap-2">
              <span className="font-medium text-black">{it.label}</span>
              <LinkIndicator
                href={it.href}
                className="text-black  opacity-100 pointer-events-none"
                internalClassName="w-2 h-4"
                externalClassName="w-4 h-4"
              />
            </div>
            {it.description && (
              <div className="text-xs text-black/55 leading-relaxed">
                {it.description}
              </div>
            )}
          </div>
        </NavLink>
      ))}
    </div>
  );
}
