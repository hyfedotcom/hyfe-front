import Link from "next/link";

export default function SmartLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactElement;
}) {
  const hrefNormalized = normalizeHref(href);
  const isInternal =
    hrefNormalized.startsWith("/") || hrefNormalized.startsWith("#");

  return isInternal ? (
    <Link className="w-full h-full" href={hrefNormalized}>{children}</Link>
  ) : (
    <a  className="w-full h-full" href={hrefNormalized} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function normalizeHref(rawHref: string) {
  const href = (rawHref ?? "").trim();
  if (!href) return href;

  if (href.startsWith("/") || href.startsWith("#")) return href;

  if (/^(mailto:|tel:|sms:)/i.test(href)) return href;

  if (href.startsWith("/")) return href;

  try {
    const url = new URL(href);
    const host = url.host.toLowerCase().replace(/^www\./, "");
    if (host === "hyfe.com")
      return `${url.pathname}${url.search}${url.hash}` || "/";
    return href;
  } catch {
    return href;
  }
}
