export function normalizeHref(rawHref: string | undefined) {
  const href = (rawHref ?? "").trim();
  if (!href) return href;

  if (href.startsWith("/") || href.startsWith("#")) return href;
  if (href === "https://www.hyfe.com") return "/";
  if (href === "https://www.hyfe.ai") return "/";
  if (href === "https://hyfe.ai") return "/";
  if (href === "https://hyfe.com") return "/";
  if (href === "https://www.hyfe.com/") return "/";
  if (href === "https://www.hyfe.ai/") return "/";
  if (href === "https://hyfe.ai/") return "/";
  if (href === "https://hyfe.com/") return "/";

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
  return (
    normalized.startsWith("/") ||
    normalized.startsWith("#") ||
    normalized.startsWith("https://www.hyfe.ai")
  );
}
