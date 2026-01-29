import { ICONS } from "@/shared/icons/resources";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  label: string;
  active: boolean;
};

export function ResourceTab({ label, active = false }: Props) {
  type IconKey = keyof typeof ICONS;
  const labelToIconKey: Record<string, IconKey> = {
    publications: "Publications",
    "white-papers": "WhitePapers",
    "cough-news": "CoughNews",
    news: "News",
  };
  const labelKey = label.toLowerCase().replace(/\s/g, "-");
  const iconKey: IconKey = labelToIconKey[labelKey] ?? "Insights";
  const Icon = ICONS[iconKey];

  return (
    <Link
      className={clsx(
        "flex gap-2 py-3 px-6 t transition-all rounded-[20px] body-large  border-[1.5] text-nowrap",
        active
          ? "bg-white border-primary font-medium!"
          : "bg-white/60  border-border font-normal! ",
      )}
      href={`/${labelKey}`}
    >
      <Icon className={`${active ? "text-primary" : "text-body-secondary"}`} />
      {label}
    </Link>
  );
}
