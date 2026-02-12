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
      <div className="pointer-events-none fixed bottom-4 translate-y-[45px] left-1/2 z-4000 hidden -translate-x-1/2 md:block">
        <div className="resources-glass-surface rounded-[30px] px-3 py-3">
          <div aria-hidden="true" className="resources-glass-overlay" />
          <div aria-hidden="true" className="resources-glass-highlight" />
          <div className="relative z-10 pointer-events-auto flex gap-2">
            {tabs.map((label) => (
              <ResourceTab
                key={label}
                label={label}
                active={typeKey === getResourceLabelKey(label)}
              />
            ))}
          </div>
        </div>
      </div>

      {open && (
        <button
          type="button"
          aria-label="Close resource navigation"
          className="fixed inset-0 z-30 md:hidden cursor-default"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="md:hidden fixed bottom-4 md:bottom-0 right-4 z-40 w-max">
        <div className="relative ">
          {open && (
            <div
              id="resource-nav-list"
              className="resources-glass-mobile-panel absolute bottom-full w-max mb-1 -right-1 rounded-3xl p-2"
            >
              <div className="">
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
                        "flex items-center justify-between gap-3 rounded-[18px] px-3 py-3 transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-body hover:bg-primary/5",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={clsx(
                            "flex h-5 w-5 p-0.5 items-center justify-center rounded-full bg-white",
                          )}
                        >
                          <Icon
                            className={clsx(
                              "transition-colors",
                              isActive ? "text-primary" : "text-body-secondary",
                            )}
                          />
                        </span>
                        <span className="text-[13px] font-medium!  leading-[100%]">
                          {label}
                        </span>
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
            className="resources-glass-pill-surface resources-glass-pill-action flex w-max items-center justify-between gap-3 ml-auto px-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-expanded={open}
            aria-controls="resource-nav-list"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-6 w-6 p-0.5 items-center justify-center rounded-full border border-white/80 bg-white">
                <ActiveIcon className="text-primary w-5 h-5" />
              </span>
              <span className="text-[13px] font-medium! leading-[100%] text-body">
                {activeLabel}
              </span>
            </span>
            <span
              className={clsx(
                "flex h-4 w-4 items-center justify-center rounded-full border border-white/70 bg-white text-body-secondary transition-transform",
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
