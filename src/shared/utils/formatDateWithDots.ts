export function formatDateWithDots(value?: string | null): string {
  if (!value) return "";

  const raw = value.trim();
  const isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/);

  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return `${day}.${month}.${year}`;
  }

  return raw.replace(/-/g, ".");
}
