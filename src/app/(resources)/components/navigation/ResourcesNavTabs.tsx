"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { ResourceTab } from "./ResourceTab";
import {
  getResourceIconKey,
  getResourceLabelKey,
  RESOURCE_ICONS,
} from "./resourceNav.utils";

type Props = {
  type: string;
};

export function ResourcesNavTabs({ type }: Props) {
  const science = ["Publications", "White Papers", "Cough News"];
  const corporate = ["News", "Insights"];

  const typeKey = type.toLowerCase();
  const tabs = science.some((label) => getResourceLabelKey(label) === typeKey)
    ? science
    : corporate;
  const activeLabel =
    tabs.find((label) => getResourceLabelKey(label) === typeKey) ?? tabs[0];
  const activeIconKey = getResourceIconKey(activeLabel);
  const ActiveIcon = RESOURCE_ICONS[activeIconKey];
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex mb-0! rounded-t-[28px] py-3 px-3 gap-2 left-1/2 -translate-x-1/2 fixed bottom-0 bg-white/20 backdrop-blur-2xl">
        {tabs.map((label) => (
          <ResourceTab
            key={label}
            label={label}
            active={typeKey === getResourceLabelKey(label)}
          />
        ))}
      </div>

      {open && (
        <button
          type="button"
          aria-label="Close resource navigation"
          className="fixed inset-0 z-30 md:hidden cursor-default"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="md:hidden md:absolute fixed bottom-4 md:bottom-0 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-32px)] max-w-[560px]">
        <div className="relative">
          {open && (
            <div
              id="resource-nav-list"
              className="absolute bottom-full mb-3 w-full rounded-[24px] border border-white/50 bg-white/90 backdrop-blur-xl p-2 shadow-[0_20px_50px_rgba(15,23,42,0.18)]"
            >
              <div className="space-y-1">
                {tabs.map((label) => {
                  const labelKey = getResourceLabelKey(label);
                  const iconKey = getResourceIconKey(label);
                  const Icon = RESOURCE_ICONS[iconKey];
                  const isActive = labelKey === typeKey;

                  return (
                    <Link
                      key={label}
                      href={`/${labelKey}`}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "flex items-center justify-between gap-3 rounded-[18px] px-4 py-3 transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-body hover:bg-primary/5",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={clsx(
                            "flex h-9 w-9 items-center justify-center rounded-full border",
                            isActive
                              ? "border-primary/30 bg-white"
                              : "border-border bg-white",
                          )}
                        >
                          <Icon
                            className={clsx(
                              "transition-colors",
                              isActive
                                ? "text-primary"
                                : "text-body-secondary",
                            )}
                          />
                        </span>
                        <span className="body-medium">{label}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex w-full items-center justify-between gap-3 rounded-full border border-white/60 bg-white/90 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-expanded={open}
            aria-controls="resource-nav-list"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white">
                <ActiveIcon className="text-primary" />
              </span>
              <span className="body-medium text-body">{activeLabel}</span>
            </span>
            <span
              className={clsx(
                "flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white text-body-secondary transition-transform",
                open && "rotate-180",
              )}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 8L10 13L15 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
