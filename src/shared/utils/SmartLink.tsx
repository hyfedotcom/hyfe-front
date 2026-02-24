import Link from "next/link";
import { ReactNode } from "react";
import { isInternalHref, normalizeHref } from "./resolveLink";

export default function SmartLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const hrefNormalized = normalizeHref(href);
  const isInternal = isInternalHref(href);
  const classes = className ?? "flex h-full w-full";

  return isInternal ? (
    <Link className={classes} href={hrefNormalized}>
      {children}
    </Link>
  ) : (
    <a
      className={classes}
      href={hrefNormalized}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
