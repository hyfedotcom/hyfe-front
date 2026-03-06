import Link from "next/link";
import { CardLinkType } from "../../../schema/shared";
import NewsIcon from "@/shared/icons/resources/NewsIcon";
import PublicationIcon from "@/shared/icons/resources/PublicationIcon";
import InsightsIcon from "@/shared/icons/resources/InsightsIcon";
import CoughNewsIcon from "@/shared/icons/resources/CoughNewsIcon";
import WhitePapersIcon from "@/shared/icons/resources/WhitePapersIcon";
import { ButtonArrow } from "@/components/ui/buttons/ButtonArrow";

type CardLinkRoute =
  | CardLinkType["type"]
  | "/"
  | "science-resources"
  | "company-resources"
  | "faq";

type CardLinkItem = {
  title: string;
  description: string | null;
  type: CardLinkRoute;
};

function getCardIcon(type: CardLinkRoute) {
  switch (type) {
    case "news":
      return <NewsIcon className="text-primary min-w-8 min-h-8" />;
    case "publications":
      return <PublicationIcon className="text-primary min-w-8 min-h-8" />;
    case "insights":
      return <InsightsIcon className="text-primary min-w-8 min-h-8" />;
    case "cough-news":
      return <CoughNewsIcon className="text-primary min-w-8 min-h-8" />;
    case "white-papers":
      return <WhitePapersIcon className="text-primary min-w-8 min-h-8" />;
    default:
      return null;
  }
}

export function CardLink({ card }: { card: CardLinkItem }) {
  const { description, title, type } = card;
  const icon = getCardIcon(type);
  const href = type === "/" ? "/" : `/${type}`;

  return (
    <Link
      href={href}
      className="bg-card border flex flex-col justify-between border-border rounded-[20px] p-4 md:p-5 space-y-6 md:space-y-8 group/card cursor-pointer touch-manipulation transition-[border-color,background-color,box-shadow,transform] duration-300 hover:border-primary active:border-primary hover:bg-activ active:bg-activ hover:shadow-hover active:shadow-hover active:scale-[0.98]"
    >
      {icon && (
        <div className="p-3 rounded-full bg-white w-max">
          {icon}
        </div>
      )}
      <div className=" space-y-2 md:space-y-3 ">
        <h3 className="text-[18px]! md:text-[24px]!">{title}</h3>
        <div className="flex flex-row  justify-between md:flex-col lg:flex-row gap-4 md:items-end">
          <p className="text-[14px] md:text-[16px] text-body">{description}</p>
          <ButtonArrow className="bg-black text-white" />
        </div>
      </div>
    </Link>
  );
}
