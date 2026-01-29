const SCIENCE_TYPES = new Set(["cough-news", "publications", "white-papers"]);

export default function isScienceType({ type }: { type: string }) {
  const slug = type.trim().toLowerCase().replace(/\s/g, "-");
  return SCIENCE_TYPES.has(slug);
}
