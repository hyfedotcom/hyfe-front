"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { PartnersSectionType } from "../../../schema/pageBuilder";

const PartnersClient = dynamic(() =>
  import("./PartnersClient").then((mod) => mod.PartnersClient),
);

export function PartnersClientLazy({
  fallback,
  section,
}: {
  fallback: ReactNode;
  section: PartnersSectionType;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const root = rootRef.current;
    if (!root) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      const frameId = globalThis.requestAnimationFrame(() => {
        setShouldLoad(true);
      });

      return () => globalThis.cancelAnimationFrame(frameId);
    }

    const load = () => setShouldLoad(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        load();
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  return (
    <div
      ref={rootRef}
    >
      {shouldLoad ? <PartnersClient section={section} /> : fallback}
    </div>
  );
}
