"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ResourceFeedMeta, ResourcesLists, ResourceTypes } from "./FeedContainer.shared";

const FeedContainerClient = dynamic(() =>
  import("./FeedContainerClient").then((mod) => mod.FeedContainerClient),
);

type FeedContainerLazyProps = {
  fallback: ReactNode;
  resources: ResourcesLists;
  type: ResourceTypes;
  meta?: ResourceFeedMeta;
};

export function FeedContainerLazy({
  fallback,
  resources,
  type,
  meta,
}: FeedContainerLazyProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    let idleHandle: number | null = null;
    let timeoutHandle: ReturnType<typeof globalThis.setTimeout> | null = null;
    const load = () => setShouldLoad(true);
    const root = rootRef.current;
    const requestIdle =
      typeof globalThis.requestIdleCallback === "function"
        ? globalThis.requestIdleCallback.bind(globalThis)
        : null;
    const cancelIdle =
      typeof globalThis.cancelIdleCallback === "function"
        ? globalThis.cancelIdleCallback.bind(globalThis)
        : null;

    if (
      typeof window !== "undefined" &&
      "IntersectionObserver" in window &&
      root
    ) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          observer.disconnect();
          load();
        },
        { rootMargin: "320px 0px" },
      );

      observer.observe(root);

      if (requestIdle) {
        idleHandle = requestIdle(load, { timeout: 2000 });
      } else {
        timeoutHandle = globalThis.setTimeout(load, 2000);
      }

      return () => {
        observer.disconnect();
        if (idleHandle !== null) {
          cancelIdle?.(idleHandle);
        }
        if (timeoutHandle !== null) {
          globalThis.clearTimeout(timeoutHandle);
        }
      };
    }

    load();
  }, [shouldLoad]);

  return (
    <div
      ref={rootRef}
      onPointerEnter={() => setShouldLoad(true)}
      onFocusCapture={() => setShouldLoad(true)}
    >
      {shouldLoad ? (
        <FeedContainerClient resources={resources} type={type} meta={meta} />
      ) : (
        fallback
      )}
    </div>
  );
}
