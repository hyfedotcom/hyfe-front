"use client";

import { SheetContext } from "@/context/sheet/sheetContext";
import { isInternalHref } from "@/shared/utils/resolveLink";
import Link from "next/link";
import { useContext } from "react";

export function SheetLink({
  href,
  className,
  children,
  mode,
  fallbackPath,
  scroll,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  mode: "close" | "swap";
  fallbackPath?: string;
  scroll?: boolean;
}) {
  const context = useContext(SheetContext);
  const isInternal = isInternalHref(href);

  const closeSheet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isSimpleLeftClick =
      e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey;
    if (isSimpleLeftClick && isInternal) {
      e.preventDefault();
      if (context?.isClosing) return;
      context?.close(href, fallbackPath, scroll);
    }
  };

  if (context && mode === "close") {
    if (!isInternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} onClick={(e) => closeSheet(e)} className={className}>
        {children}
      </Link>
    );
  }

  if (mode === "swap") {
    return (
      <Link href={href} className={className} replace scroll={false}>
        {children}
      </Link>
    );
  }

  if (!isInternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
