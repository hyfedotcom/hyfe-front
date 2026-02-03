// src/shared/utils/slug.ts
export function toSlug(input: string, sep = "-") {
  return (
    input
      .trim()
      .toLowerCase()
      // всё кроме букв/цифр заменяем на разделитель
      .replace(/[^\p{L}\p{N}]+/gu, sep)
      // схлопываем повторяющиеся разделители
      .replace(new RegExp(`${sep}+`, "g"), sep)
      // убираем разделители по краям
      .replace(new RegExp(`^${sep}|${sep}$`, "g"), "")
  );
}
