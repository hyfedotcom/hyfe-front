import { ICONS } from "@/shared/icons/resources";
import CoughNewsIcon from "@/shared/icons/resources/CoughNewsIcon";
import InsightsIcon from "@/shared/icons/resources/InsightsIcon";
import NewsIcon from "@/shared/icons/resources/NewsIcon";
import PublicationIcon from "@/shared/icons/resources/PublicationIcon";
import WhitePapersIcon from "@/shared/icons/resources/WhitePapersIcon";
import clsx from "clsx";

export default function TagPlate({
  type,
  label,
}: {
  type?: "news" | "publications" | "cough-news" | "white-papers" | "insights";
  label: string;
}) {
  const META = {
    news: { label: "News", Icon: NewsIcon },
    publications: { label: "Publications", Icon: PublicationIcon },
    insights: { label: "Insights", Icon: InsightsIcon },
    "cough-news": { label: "Cough News", Icon: CoughNewsIcon },
    "white-papers": { label: "White Papers", Icon: WhitePapersIcon },
  } as const;

  const meta = type ? META[type] : null;
  const Icon = meta?.Icon;
  const text = meta?.label ?? label;

  return (
    <span
      className={clsx(
        "bg-white body-small leading-[100%]! rounded-full overflow-hidden h-10 px-4 border flex gap-2 items-center justify-between border-gray-200 text-nowrap min-w-max ",
        type ? "" : "",
      )}
    >
      {Icon && <Icon className="text-primary min-w-6 min-h-6" />}
      {text}
    </span>
  );
}
