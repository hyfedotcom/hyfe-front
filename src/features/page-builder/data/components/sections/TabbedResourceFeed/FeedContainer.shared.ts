import type { ResourceCardListType } from "@/features/resources";
import type { ResourcesTypes } from "../../../schema/shared";
import type { ComponentType } from "react";
import CoughNewsIcon from "@/shared/icons/resources/CoughNewsIcon";
import InsightsIcon from "@/shared/icons/resources/InsightsIcon";
import NewsIcon from "@/shared/icons/resources/NewsIcon";
import PublicationIcon from "@/shared/icons/resources/PublicationIcon";
import WhitePapersIcon from "@/shared/icons/resources/WhitePapersIcon";

export type ResourcesLists = ResourceCardListType[];
export type ResourceTypes = Array<{ type: ResourcesTypes }>;
export type ResourceFeedMeta = Array<{
  title?: string;
  paragraph?: string;
  type: ResourcesTypes;
}>;

type ResourceIcon = ComponentType<{ className?: string }>;

export const RESOURCE_META: Record<
  ResourcesTypes,
  { label: string; Icon: ResourceIcon }
> = {
  news: { label: "News", Icon: NewsIcon },
  publications: { label: "Publications", Icon: PublicationIcon },
  insights: { label: "Insights", Icon: InsightsIcon },
  "cough-news": { label: "Cough News", Icon: CoughNewsIcon },
  "white-papers": { label: "White Papers", Icon: WhitePapersIcon },
};

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function getGridCols(length: number) {
  if (length === 4) return "grid-cols-4";
  if (length === 3) return "grid-cols-3";
  if (length === 2) return "grid-cols-2";
  return "grid-cols-1";
}

export function getCardWidthClass(length: number) {
  return length > 1
    ? "sm:w-[40vw] lg:w-[30vw] xl:w-full w-[85vw]"
    : "w-full lg:w-[30vw] xl:w-full";
}
