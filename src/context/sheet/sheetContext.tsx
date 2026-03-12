"use client";

import { createContext } from "react";

type IsClosing = boolean;
type Close = (href?: string, fallbackPath?: string) => void;

type SheetController = {
  close: Close;
  isClosing: IsClosing;
};

export const SheetContext = createContext<SheetController | null>(null);

export function SheetProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SheetController;
}) {
  return <SheetContext value={value}>{children}</SheetContext>;
}
