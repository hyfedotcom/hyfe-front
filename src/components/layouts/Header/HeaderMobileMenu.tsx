"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useId, useState } from "react";
import type { ComponentType } from "react";
import {
  BaseLink,
  CtaNavItem,
  NavItem,
} from "@/features/header/type/header.type";
import { cx, NavLink } from "@/features/header/helpers/header.helpers";
import { LinkIndicator } from "@/components/ui/buttons/LinkIndicator";
import BriefeCaseIcon from "@/shared/icons/company/BriefeCaseIcon";
import CompassIcon from "@/shared/icons/company/CompassIcon";
import GraduationCapIcon from "@/shared/icons/company/GraduationCapIcon";
import QuestionIcon from "@/shared/icons/company/QuestionIcon";
import UsersIcon from "@/shared/icons/company/UsersIcon";
import LifeScienceIcon from "@/shared/icons/solutions/LifeScienceIcon";
import ResearchIcon from "@/shared/icons/solutions/ResearchIcon";
import VirtualCareIcon from "@/shared/icons/solutions/VirtualCareIcon";
import CoughNewsIcon from "@/shared/icons/resources/CoughNewsIcon";
import InsightsIcon from "@/shared/icons/resources/InsightsIcon";
import NewsIcon from "@/shared/icons/resources/NewsIcon";
import PublicationIcon from "@/shared/icons/resources/PublicationIcon";
import WhitePapersIcon from "@/shared/icons/resources/WhitePapersIcon";
import { lockBodyScroll } from "@/shared/utils/bodyScrollLock";

export function HeaderMobileMenu({
  nav,
  onClose,
}: {
  nav: NavItem[];
  onClose: () => void;
}) {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
  const cta = nav.find((item) => item.kind === "cta") as
    | CtaNavItem
    | undefined;
  const mainItems = nav.filter((item) => item.kind !== "cta");

  useEffect(() => lockBodyScroll(), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const dropdownMeta = {
    "Life Sciences": { Icon: LifeScienceIcon },
    Research: { Icon: ResearchIcon },
    "Virtual Care": { Icon: VirtualCareIcon },
    Team: { Icon: UsersIcon },
    Careers: { Icon: BriefeCaseIcon },
    Advisors: { Icon: GraduationCapIcon },
    About: { Icon: CompassIcon },
  } as const;
  const megaMetaById: Record<
    string,
    { Icon: ComponentType<{ className?: string }> }
  > = {
    news: { Icon: NewsIcon },
    publications: { Icon: PublicationIcon },
    insights: { Icon: InsightsIcon },
    "cough-news": { Icon: CoughNewsIcon },
    whitepapers: { Icon: WhitePapersIcon },
    "white-papers": { Icon: WhitePapersIcon },
    faq: { Icon: QuestionIcon },
  };
  const megaMetaByLabel: Record<
    string,
    { Icon: ComponentType<{ className?: string }> }
  > = {
    News: { Icon: NewsIcon },
    Publications: { Icon: PublicationIcon },
    Insights: { Icon: InsightsIcon },
    "Cough News": { Icon: CoughNewsIcon },
    "Cough Science News": { Icon: CoughNewsIcon },
    "White Papers": { Icon: WhitePapersIcon },
    FAQ: { Icon: QuestionIcon },
  };
  type DropdownMetaKey = keyof typeof dropdownMeta;
  const isDropdownMeta = (label: string): label is DropdownMetaKey =>
    label in dropdownMeta;

  const getSolutionsIconByHref = (href: string) => {
    const normalized = href.replace(/\/+$/, "");
    if (normalized.includes("/solutions/life-sciences")) return LifeScienceIcon;
    if (normalized.includes("/solutions/research")) return ResearchIcon;
    if (normalized.includes("/solutions/virtual-care")) return VirtualCareIcon;
    return null;
  };

  const getDropdownIcon = (item: BaseLink) => {
    const solutionsIcon = getSolutionsIconByHref(item.href);
    if (solutionsIcon) return solutionsIcon;
    if (item.label && isDropdownMeta(item.label)) {
      return dropdownMeta[item.label].Icon;
    }
    return undefined;
  };

  const getMegaIcon = (id: string, label: string) =>
    megaMetaById[id]?.Icon ?? megaMetaByLabel[label]?.Icon;

  const overlay = (
    <div className="fixed inset-0 z-[20010] lg:hidden">
      <button
        className="absolute inset-0 bg-black/30 transition-opacity duration-300"
        aria-label="Close menu"
        onClick={onClose}
      />

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        className="absolute inset-0 w-full bg-white shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-black/10">
          <NavLink
            href="/"
            onClick={onClose}
            id="mobile-menu-title"
            className="shrink-0"
            aria-label="Hyfe home"
          >
            <Image
              src="/header/logo.png"
              width={120}
              height={36}
              alt="Hyfe"
            />
          </NavLink>
          <button
            className="h-10 w-10 rounded-full hover:bg-black/5 text-black"
            onClick={onClose}
            aria-label="Close menu"
            autoFocus
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {mainItems.map((item) => {
            if (item.kind === "link") {
              return (
                <NavLink
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-[16px] px-4 py-3 text-base font-medium hover:bg-black/5"
                >
                  <span className="min-w-0 truncate">{item.label}</span>
                  <LinkIndicator
                    href={item.href}
                    className="ml-3 shrink-0 text-[#C08A00]"
                    internalClassName="w-2 h-4"
                    externalClassName="w-4 h-4"
                  />
                </NavLink>
              );
            }

            if (item.kind === "dropdown") {
              return (
                <MobileAccordion
                  key={item.id}
                  label={item.label}
                  open={openAccordionId === item.id}
                  onToggle={() =>
                    setOpenAccordionId((prev) =>
                      prev === item.id ? null : item.id,
                    )
                  }
                >
                  <div className="space-y-1 pb-2">
                    {item.items.map((linkItem) => {
                      const Icon = getDropdownIcon(linkItem);
                      return (
                        <MobileLinkItem
                          key={linkItem.id}
                          item={linkItem}
                          onClick={onClose}
                          Icon={Icon}
                        />
                      );
                    })}
                  </div>
                </MobileAccordion>
              );
            }

            if (item.kind === "card") {
              return (
                <MobileAccordion
                  key={item.id}
                  label={item.label}
                  open={openAccordionId === item.id}
                  onToggle={() =>
                    setOpenAccordionId((prev) =>
                      prev === item.id ? null : item.id,
                    )
                  }
                >
                  <div className="space-y-1 pb-2">
                    {item.items.map((linkItem) => (
                      <MobileLinkItem
                        key={linkItem.id}
                        item={linkItem}
                        onClick={onClose}
                        showImage
                      />
                    ))}
                  </div>
                </MobileAccordion>
              );
            }

            return (
              <MobileAccordion
                key={item.id}
                label={item.label}
                open={openAccordionId === item.id}
                onToggle={() =>
                  setOpenAccordionId((prev) =>
                    prev === item.id ? null : item.id,
                  )
                }
              >
                <div className="space-y-4 pb-2">
                  {item.sections.map((section) => (
                    <div key={section.id} className="space-y-2">
                      <div className="px-0">
                        <div className="text-xs font-semibold uppercase tracking-wide text-black/60">
                          {section.title}
                        </div>
                        {section.description && (
                          <div className="text-xs text-black/55">
                            {section.description}
                          </div>
                        )}
                        {section.allHref && (
                          <NavLink
                            href={section.allHref}
                            onClick={onClose}
                            className="mt-2 inline-flex items-center gap-2 text-xs rounded-full bg-black/5 px-3 py-1.5"
                          >
                            View all
                            <LinkIndicator
                              href={section.allHref}
                              className="text-black/70"
                              internalClassName="w-2 h-4"
                              externalClassName="w-3.5 h-3.5"
                            />
                          </NavLink>
                        )}
                      </div>

                      <div className="space-y-1">
                        {section.items.map((linkItem) => {
                          const Icon = getMegaIcon(linkItem.id, linkItem.label);
                          return (
                            <MobileLinkItem
                              key={linkItem.id}
                              item={linkItem}
                              onClick={onClose}
                              Icon={Icon}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </MobileAccordion>
            );
          })}
        </div>

        {cta ? (
          <div className="px-4 pb-5 pt-2 border-t border-black/10">
            <NavLink
              href={cta.href}
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-full bg-black text-white h-12 text-sm font-medium hover:bg-primary-600 transition-colors gap-2"
            >
              {cta.label}
              <LinkIndicator
                href={cta.href}
                className="text-white"
                internalClassName="w-2 h-4"
                externalClassName="w-4 h-4"
              />
            </NavLink>
          </div>
        ) : null}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}

function MobileLinkItem({
  item,
  onClick,
  showImage = false,
  Icon,
}: {
  item: BaseLink;
  onClick: () => void;
  showImage?: boolean;
  Icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <NavLink
      href={item.href}
      onClick={onClick}
      className="block rounded-[14px] py-3 hover:bg-black/5"
    >
      <div className="flex items-start gap-3 w-full">
        {showImage && item.image?.url ? (
          <Image
            src={item.image.url}
            width={44}
            height={44}
            alt={item.image.alt ?? item.label}
            className="h-11 w-11 rounded-[12px] border border-black/10 object-cover"
          />
        ) : item.icon?.url ? (
          <Image
            src={item.icon.url}
            width={20}
            height={20}
            alt={item.icon.alt ?? `${item.label} icon`}
            className="h-5 w-5 object-contain mt-0.5"
          />
        ) : Icon ? (
          <Icon className="text-primary-600 min-w-5 min-h-5 mt-0.5" />
        ) : null}
        <div className="min-w-0 grow flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-medium text-black">{item.label}</div>
            {item.description && (
              <div className="text-xs text-black/55">{item.description}</div>
            )}
          </div>
          <LinkIndicator
            href={item.href}
            className="mt-0.5 shrink-0 text-[#C08A00]"
            internalClassName="w-2 h-4"
            externalClassName="w-4 h-4"
          />
        </div>
      </div>
    </NavLink>
  );
}

function MobileAccordion({
  label,
  children,
  open,
  onToggle,
}: {
  label: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();

  return (
    <div className="rounded-[18px] border border-black/10 overflow-hidden bg-black/[0.02]">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-black/5"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
      >
        <span className="text-sm font-medium">{label}</span>
        <span
          className={cx(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M3 5.25L7 9.25L11 5.25"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={cx(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden px-4">{children}</div>
      </div>
    </div>
  );
}
