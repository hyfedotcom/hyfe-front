"use client";

import { createContext } from "react";

type IsClosing = boolean;
type Close = (href?: string, fallbackPath?: string) => void;

type SheetController = {
  close: Close;
  isClosing: IsClosing;
};

type PendingFallback = {
  targetPath: string;
  fallbackPath: string;
} | null;

export const SheetContext = createContext<SheetController | null>(null);

const sheetNavigationState = {
  pendingFallback: null as PendingFallback,
};

function normalizePath(path: string) {
  return path.split("?")[0];
}

export function SheetProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SheetController;
}) {
  return <SheetContext value={value}>{children}</SheetContext>;
}

export const sheetNavigationController = {
  setNextCloseFallback(payload: Exclude<PendingFallback, null>) {
    sheetNavigationState.pendingFallback = payload;
  },
  consumeCloseFallback(currentPath: string) {
    const pending = sheetNavigationState.pendingFallback;
    if (!pending) return undefined;

    if (normalizePath(pending.targetPath) !== normalizePath(currentPath)) {
      return undefined;
    }

    sheetNavigationState.pendingFallback = null;
    return pending.fallbackPath;
  },
};

export function useSheetNavigationState() {
  return sheetNavigationController;
}
