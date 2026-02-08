export function resolveResourceItemsType(type: string) {
  if (type === "news") return "news-items";
  if (type === "cough-news") return "cough-news-items";
  return type;
}
