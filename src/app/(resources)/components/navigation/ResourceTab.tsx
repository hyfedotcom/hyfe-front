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
        "group flex gap-2 py-3 px-6 transition-[transform,box-shadow,background-color,border-color] duration-200 rounded-[20px] body-large border-[1.5px] text-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        active
          ? "bg-white border-primary font-medium!"
          : "bg-white/60 border-border font-normal! hover:bg-white hover:border-primary/40 hover:-translate-y-[1px] hover:shadow-active",
      )}
      href={`/${labelKey}`}
    >
      <Icon
        className={clsx(
          "transition-colors",
          active
            ? "text-primary"
            : "text-body-secondary group-hover:text-primary",
        )}
      />
      {label}
    </Link>
  );
}
