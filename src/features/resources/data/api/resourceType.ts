export const RESOURCE_TYPES = [
  "publications",
  "insights",
  "white-papers",
  "news",
  "cough-news",
] as const;

const resourceTypesSet = new Set<string>(RESOURCE_TYPES);

export function isResourceType(
  type: string,
): type is (typeof RESOURCE_TYPES)[number] {
  return resourceTypesSet.has(type);
}

export function resolveResourceItemsType(type: string) {
  if (type === "news") return "news-items";
  if (type === "cough-news") return "cough-news-items";
  return type;
}
