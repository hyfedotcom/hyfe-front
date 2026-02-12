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
        "group resources-glass-tab-base",
        active ? "resources-glass-tab-active font-medium! bg-gradient-to-tl from-primary/30 via-white to-white" : "resources-glass-tab-idle font-normal!",
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
