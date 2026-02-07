import CoughNewsIcon from "@/shared/icons/resources/CoughNewsIcon";
import InsightsIcon from "@/shared/icons/resources/InsightsIcon";
import NewsIcon from "@/shared/icons/resources/NewsIcon";
import PublicationIcon from "@/shared/icons/resources/PublicationIcon";
import WhitePapersIcon from "@/shared/icons/resources/WhitePapersIcon";
import { fstat } from "fs";
import Link from "next/link";

export function ResourceButton({
  label,
  tag = "Link",
  classNameProp,
  active = false,
  url,
}: {
  label: "news" | "publications" | "cough-news" | "white-papers" | "insights";
  url: string;
  tag?: "Link" | "button";
  classNameProp?: string;
  active: boolean;
}) {
  const META = {
    news: { label: "News", Icon: NewsIcon },
    publications: { label: "Publications", Icon: PublicationIcon },
    insights: { label: "Insights", Icon: InsightsIcon },
    "cough-news": { label: "Cough News", Icon: CoughNewsIcon },
    "white-papers": { label: "White Papers", Icon: WhitePapersIcon },
  } as const;

  const meta = label ? META[label] : null;
  const Icon = meta?.Icon;

  const content = (
    <span
      className={`flex ${classNameProp}  items-center gap-2.5 px-6 py-3 text-[20px] leading-[100%] capitalize ${active ? "font-medium text-body" : "font-normal text-body-secondary "}`}
    >
      {Icon && (
        <Icon
          className={` min-w-6 min-h-6 ${active ? "text-primary" : "text-body-secondary"}`}
        />
      )}
      {label.replace(/-/g, " ")}
    </span>
  );

  if (tag === "Link") {
    return (
      <Link className=" cursor-pointer" href={`${url ? url : `/${label}`}`}>
        {content}
      </Link>
    );
  } else {
    return <button className="cursor-pointer">{content}</button>;
  }
}
