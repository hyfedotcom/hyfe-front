import { ICONS } from "@/shared/icons/resources";

export type ResourceLabelKey = keyof typeof ICONS;

const labelToIconKey: Record<string, ResourceLabelKey> = {
  publications: "Publications",
  "white-papers": "WhitePapers",
  "cough-news": "CoughNews",
  news: "News",
};

export function getResourceLabelKey(label: string) {
  return label.toLowerCase().replace(/\s/g, "-");
}

export function getResourceIconKey(label: string): ResourceLabelKey {
  const labelKey = getResourceLabelKey(label);
  return labelToIconKey[labelKey] ?? "Insights";
}

export const RESOURCE_ICONS = ICONS;
