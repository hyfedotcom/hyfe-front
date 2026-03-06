"use client";

import { createContext } from "react";

// type Transition = "idle" | "exiting" | "entering";
// "простой" | "выход" | "вход";
type IsClosing = boolean;
type Close = (href?: string, fallbackPath?: string, scroll?: boolean) => void;
// type isOpen = boolean;
// type CloseThenNavigate = () => void;

type SheetController = {
  // transition: Transition;
  // closeThenNavigate: CloseThenNavigate;
  close: Close;
  isClosing: IsClosing;
  // isOpen: isOpen;
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
