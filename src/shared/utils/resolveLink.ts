export function normalizeHref(rawHref: string) {
  const href = (rawHref ?? "").trim();
  if (!href) return href;

  if (href.startsWith("/") || href.startsWith("#")) return href;

  if (/^(mailto:|tel:|sms:)/i.test(href)) return href;

  try {
    const url = new URL(href);
    const host = url.host.toLowerCase().replace(/^www\./, "");
    if (host === "hyfe.com") {
      return `${url.pathname}${url.search}${url.hash}` || "/";
    }
    return href;
  } catch {
    return href;
  }
}

export function isInternalHref(rawHref: string) {
  const normalized = normalizeHref(rawHref);
  return normalized.startsWith("/") || normalized.startsWith("#");
}
