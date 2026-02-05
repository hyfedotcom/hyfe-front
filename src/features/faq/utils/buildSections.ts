// src/features/faq/utils/buildSections.ts
import type { FaqItemForBuildType, FaqSectionType } from "../schema/faq.schema";

export function buildSections({
  groupOrder,
  items,
  otherTitle = "Other",
  includeEmptySections = false,
}: {
  groupOrder: string[];
  items: FaqItemForBuildType[];
  otherTitle?: string;
  includeEmptySections?: boolean;
}): FaqSectionType[] {
  const map = new Map<string, FaqSectionType>();

  const getOrCreate = (title: string) => {
    const key = title || otherTitle;
    const existing = map.get(key);
    if (existing) return existing;
    const created: FaqSectionType = { title: key, faqs: [] };
    map.set(key, created);
    console.log(created);
    return created;
  };

  // 1) раскидываем все вопросы по секциям (ничего не теряем)
  for (const item of items) {
    getOrCreate(item.groupTitle).faqs.push(item.qa);
  }

  // 2) строим порядок: сначала landing order, потом "все остальные группы", потом Other (если есть)
  const orderedTitles: string[] = [];

  const pushUnique = (t: string) => {
    if (!orderedTitles.includes(t)) orderedTitles.push(t);
  };

  for (const t of groupOrder) pushUnique(t);

  // группы, которые есть в items, но не указаны на landing → добавим в конец
  for (const t of map.keys()) {
    if (!groupOrder.includes(t) && t !== otherTitle) pushUnique(t);
  }

  // Other — в самый конец, если реально есть
  if (map.has(otherTitle)) pushUnique(otherTitle);

  const sections = orderedTitles
    .map((title) => map.get(title) ?? { title, faqs: [] })
    .filter((s) => includeEmptySections || s.faqs.length > 0);

  return sections;
}
