import { cx, NavLink } from "@/features/header/helpers/header.helpers";
import { BaseLink } from "@/features/header/type/header.type";
import Image from "next/image";

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
          external={it.external}
          onClick={close}
          className={cx(
            "flex flex-col items-start gap-3 rounded-[18px] px-4 py-3 w-[280px]",
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
            <div className="flex items-center gap-1">
              <span className="font-medium text-black">{it.label}</span>

              <span className={`${it.external && "-rotate-45"} scale-65`}>
                <svg
                  width="25"
                  height="15"
                  viewBox="0 0 25 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.7071 8.07136C25.0976 7.68084 25.0976 7.04768 24.7071 6.65715L18.3431 0.29319C17.9526 -0.0973344 17.3195 -0.0973344 16.9289 0.29319C16.5384 0.683714 16.5384 1.31688 16.9289 1.7074L22.5858 7.36426L16.9289 13.0211C16.5384 13.4116 16.5384 14.0448 16.9289 14.4353C17.3195 14.8259 17.9526 14.8259 18.3431 14.4353L24.7071 8.07136ZM24 7.36426V6.36426H0V7.36426V8.36426H24V7.36426Z"
                    fill="#2E3542"
                  />
                </svg>
              </span>
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
