"use client";

import { useCallback, useSyncExternalStore } from "react";

export const MD_DOWN_QUERY = "(max-width: 768px)";
export const MD_UP_QUERY = "(min-width: 768px)";
export const STACKED_LAYOUT_QUERY = "(max-width: 999px)";

function getMediaQueryList(query: string) {
  if (typeof window === "undefined") return null;
  return window.matchMedia(query);
}

export function matchesMediaQuery(query: string) {
  return getMediaQueryList(query)?.matches ?? false;
}

export function useMediaQuery(query: string, defaultValue = false) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = getMediaQueryList(query);
      if (!mediaQueryList) return () => {};

      const handleChange = () => onStoreChange();
      const legacyMediaQueryList = mediaQueryList as MediaQueryList & {
        addListener?: (listener: () => void) => void;
        removeListener?: (listener: () => void) => void;
      };

      if (typeof mediaQueryList.addEventListener === "function") {
        mediaQueryList.addEventListener("change", handleChange);
        return () => mediaQueryList.removeEventListener("change", handleChange);
      }

      legacyMediaQueryList.addListener?.(handleChange);
      return () => legacyMediaQueryList.removeListener?.(handleChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    return getMediaQueryList(query)?.matches ?? defaultValue;
  }, [defaultValue, query]);

  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
