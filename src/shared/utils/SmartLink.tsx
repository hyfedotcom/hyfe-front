import Link from "next/link";
import { isInternalHref, normalizeHref } from "./resolveLink";

export default function SmartLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactElement;
}) {
  const hrefNormalized = normalizeHref(href);
  const isInternal = isInternalHref(href);

  return isInternal ? (
    <Link className="w-full h-full" href={hrefNormalized}>{children}</Link>
  ) : (
    <a
      className="w-full h-full"
      href={hrefNormalized}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
