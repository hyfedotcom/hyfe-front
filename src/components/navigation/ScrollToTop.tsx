"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const MODAL_ROUTE_PATTERNS = [
  /^\/team\/.+$/,
  /^\/advisors\/.+$/,
  /^\/careers\/.+$/,
  /^\/(publications|insights|white-papers|news|cough-news)\/.+$/,
];

const isModalRoute = (path: string) =>
  MODAL_ROUTE_PATTERNS.some((pattern) => pattern.test(path));

const scrollToTopImmediate = () => {
  const root = document.documentElement;
  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  root.style.scrollBehavior = prevBehavior;
};

export function ScrollToTop() {
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevPathRef.current;
    if (!prev) {
      prevPathRef.current = pathname;
      return;
    }

    if (pathname === prev) return;

    const shouldSkip = isModalRoute(pathname) || isModalRoute(prev);

    if (!shouldSkip) {
      scrollToTopImmediate();
    }

    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
}
