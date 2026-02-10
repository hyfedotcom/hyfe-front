const RESOURCE_TYPE_LABELS: Record<string, string> = {
  "cough-news": "Cough Science News",
};

export function formatResourceTypeLabel(type: string) {
  const mappedLabel = RESOURCE_TYPE_LABELS[type];
  if (mappedLabel) return mappedLabel;

  return type
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
