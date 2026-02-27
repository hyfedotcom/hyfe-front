import Link from "next/link";
import { CardLinkType } from "../../../schema/shared";
import NewsIcon from "@/shared/icons/resources/NewsIcon";
import PublicationIcon from "@/shared/icons/resources/PublicationIcon";
import InsightsIcon from "@/shared/icons/resources/InsightsIcon";
import CoughNewsIcon from "@/shared/icons/resources/CoughNewsIcon";
import WhitePapersIcon from "@/shared/icons/resources/WhitePapersIcon";
import { ButtonArrow } from "@/components/ui/buttons/ButtonArrow";

export function CardLink({ card }: { card: CardLinkType }) {
  const { description, title, type } = card;

  const META = {
    news: { label: "News", Icon: NewsIcon },
    publications: { label: "Publications", Icon: PublicationIcon },
    insights: { label: "Insights", Icon: InsightsIcon },
    "cough-news": { label: "Cough News", Icon: CoughNewsIcon },
    "white-papers": { label: "White Papers", Icon: WhitePapersIcon },
  } as const;

  const meta = type ? META[type] : null;
  const Icon = meta?.Icon;

  const linkHref = type.replace(/-/g, "-");

  return (
    <Link
      href={`/${linkHref}`}
      className="bg-card border flex flex-col justify-between border-border rounded-[20px] p-4 md:p-5 space-y-6 md:space-y-8 group/card cursor-pointer touch-manipulation transition-[border-color,background-color,box-shadow,transform] duration-300 hover:border-primary active:border-primary hover:bg-activ active:bg-activ hover:shadow-hover active:shadow-hover active:scale-[0.98]"
    >
      <div className="p-3 rounded-full bg-white w-max">
        {Icon && <Icon className="text-primary min-w-8 min-h-8" />}
      </div>
      <div className=" space-y-3 ">
        <h3 className="text-[18px]! md:text-[24px]!">{title}</h3>
        <div className="flex flex-row  justify-between md:flex-col lg:flex-row gap-4 md:items-end">
          <p className="text-[14px] md:text-[16px] text-body">{description}</p>
          <ButtonArrow className="bg-black text-white" />
        </div>
      </div>
    </Link>
  );
}
