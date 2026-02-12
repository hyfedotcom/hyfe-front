import clsx from "clsx";
import Link from "next/link";
import {
  getResourceIconKey,
  getResourceLabelKey,
  RESOURCE_ICONS,
} from "./resourceNav.utils";

type Props = {
  label: string;
  active: boolean;
};

export function ResourceTab({ label, active = false }: Props) {
  const labelKey = getResourceLabelKey(label);
  const iconKey = getResourceIconKey(label);
  const Icon = RESOURCE_ICONS[iconKey];

  return (
    <Link
      className={clsx(
        "group relative flex items-center gap-2 rounded-[18px] border px-4 py-2.5 text-[16px]! text-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        active
          ? "border-white/80 bg-gradient-to-b from-white/95 via-white/80 to-white/70 text-black font-medium! shadow-[0_8px_20px_rgba(15,23,42,0.12),0_1px_6px_rgba(255,255,255,0.6)_inset]"
          : "border-white/55 bg-gradient-to-b from-white/55 to-white/35 text-black/90 font-normal! hover:-translate-y-[1px] hover:border-white/75 hover:from-white/70 hover:to-white/45 hover:shadow-[0_8px_18px_rgba(15,23,42,0.1),0_1px_4px_rgba(255,255,255,0.42)_inset]",
      )}
      href={`/${labelKey}`}
    >
      <Icon
        className={clsx(
          "transition-colors",
          active
            ? "text-primary"
            : " text-black group-hover:text-primary",
        )}
      />
      {label}
    </Link>
  );
}
