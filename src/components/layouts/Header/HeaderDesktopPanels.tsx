"use client";

import type {
  CardNavItem,
  DropdownNavItem,
  MegaNavItem,
} from "@/features/header/type/header.type";
import { DropdownPanel } from "./components/DropdownPanel";
import { BigCardsPanel } from "./components/BigCardsPanel";
import { MegaPanel } from "./components/MegaPanel";

type DesktopPanelItem = DropdownNavItem | CardNavItem | MegaNavItem;

export function HeaderDesktopPanels({
  item,
  close,
  onPointerEnter,
  onPointerLeave,
}: {
  item: DesktopPanelItem;
  close: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  if (item.kind === "dropdown") {
    return (
      <div onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
        <DropdownPanel items={item.items} close={close} />
      </div>
    );
  }

  if (item.kind === "card") {
    return (
      <div onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
        <BigCardsPanel items={item.items} close={close} />
      </div>
    );
  }

  return (
    <div
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="mx-auto backdrop-blur-[20px]!"
    >
      <MegaPanel
        sections={item.sections}
        quickLinks={item.quickLinks}
        close={close}
      />
    </div>
  );
}
