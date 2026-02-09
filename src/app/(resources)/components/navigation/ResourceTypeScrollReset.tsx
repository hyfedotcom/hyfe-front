"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const RESOURCE_TYPES = new Set([
  "publications",
  "insights",
  "white-papers",
  "news",
  "cough-news",
]);

const getTypeFromPath = (path: string) =>
  path.split("/").filter(Boolean)[0] ?? "";

const scrollToTopImmediate = () => {
  const root = document.documentElement;
  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  root.style.scrollBehavior = prevBehavior;
};

export function ResourceTypeScrollReset() {
  const pathname = usePathname();
  const prevTypeRef = useRef<string>("");

  useEffect(() => {
    const nextType = getTypeFromPath(pathname);
    const prevType = prevTypeRef.current;

    if (
      prevType &&
      nextType &&
      prevType !== nextType &&
      RESOURCE_TYPES.has(nextType)
    ) {
      scrollToTopImmediate();
    }

    prevTypeRef.current = nextType;
  }, [pathname]);

  return null;
}
