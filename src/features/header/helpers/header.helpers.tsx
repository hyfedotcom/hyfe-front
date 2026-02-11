import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { isInternalHref, normalizeHref } from "@/shared/utils/resolveLink";

export function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function useIsScrollingDown(threshold = 10) {
  const [down, setDown] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const diff = y - last.current;
      if (Math.abs(diff) < threshold) return;
      setDown(diff > 0);
      last.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return down;
}

export function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const hrefNormalized = normalizeHref(href);
  const isInternal = isInternalHref(hrefNormalized);

  if (!isInternal) {
    return (
      <a
        href={hrefNormalized}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={className}
      >
        {children}
      </a>
    );
  }

  const handleClick = () => {
    if (onClick) onClick();
    if (!hrefNormalized.startsWith("#")) {
      const root = document.documentElement;
      const prevBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      root.style.scrollBehavior = prevBehavior;
    }
  };

  return (
    <Link
      href={hrefNormalized}
      scroll={true}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}
