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
    <div className="absolute flex pt-3 top-full mt-3 -translate-x-1/2 left-1/2 z-1000">
      <div
        className={cx(
          "relative overflow-hidden rounded-[24px] border border-black/[0.14] bg-gradient-to-b from-white/88 via-white/74 to-white/58 p-2 shadow-[0_22px_55px_rgba(15,23,42,0.2),0_2px_10px_rgba(255,255,255,0.55)_inset] ring-1 ring-black/[0.06]",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-white/62 backdrop-blur-[36px] backdrop-saturate-180"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 top-[1px] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
        />
        <div className="relative z-10 flex">
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
      </div>
    </div>
  );
}
