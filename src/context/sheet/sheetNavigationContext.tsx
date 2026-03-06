"use client";

import { createContext, useCallback, useContext, useMemo, useRef } from "react";

type PendingFallback = {
  targetPath: string;
  fallbackPath: string;
} | null;

type SheetNavigationController = {
  setNextCloseFallback: (payload: Exclude<PendingFallback, null>) => void;
  consumeCloseFallback: (currentPath: string) => string | undefined;
};

const SheetNavigationContext = createContext<SheetNavigationController | null>(
  null,
);

function normalizePath(path: string) {
  return path.split("?")[0];
}

export function SheetNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pendingRef = useRef<PendingFallback>(null);

  const setNextCloseFallback = useCallback(
    (payload: Exclude<PendingFallback, null>) => {
      pendingRef.current = payload;
    },
    [],
  );

  const consumeCloseFallback = useCallback((currentPath: string) => {
    const pending = pendingRef.current;
    if (!pending) return undefined;

    if (normalizePath(pending.targetPath) !== normalizePath(currentPath)) {
      return undefined;
    }

    pendingRef.current = null;
    return pending.fallbackPath;
  }, []);

  const value = useMemo(
    () => ({
      setNextCloseFallback,
      consumeCloseFallback,
    }),
    [setNextCloseFallback, consumeCloseFallback],
  );

  return <SheetNavigationContext value={value}>{children}</SheetNavigationContext>;
}

export function useSheetNavigationState() {
  const value = useContext(SheetNavigationContext);
  if (!value) {
    throw new Error(
      "useSheetNavigationState must be used within SheetNavigationProvider",
    );
  }
  return value;
}

