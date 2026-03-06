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
    if (host === "hyfe.com" || host === "hyfe.ai") {
      return `${url.pathname}${url.search}${url.hash}` || "/";
    }
    return href;
  } catch {
    return href;
  }
}

export function isInternalHref(rawHref: string) {
  const normalized = normalizeHref(rawHref);
  if (normalized.startsWith("/") || normalized.startsWith("#")) return true;

  try {
    const url = new URL(normalized);
    const host = url.host.toLowerCase().replace(/^www\./, "");
    return host === "hyfe.com" || host === "hyfe.ai";
  } catch {
    return false;
  }
}
