"use client";

import { headerNav } from "@/features/header/data/header.data";
import { cx, NavLink } from "@/features/header/helpers/header.helpers";
import Image from "next/image";
import Link from "next/link";
import { TriggerButton } from "./components/TriggerButton";
import { DropdownPanel } from "./components/DropdownPanel";
import { MegaPanel } from "./components/MegaPanel";
import type { ComponentType } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BigCardsPanel } from "./components/BigCardsPanel";
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
import {
  BaseLink,
  CtaNavItem,
  NavItem,
} from "@/features/header/type/header.type";
import { LinkIndicator } from "@/components/ui/buttons/LinkIndicator";

export function Header({ topBannerHeight = 0 }: { topBannerHeight?: number }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHiddenOnScroll, setIsHiddenOnScroll] = useState(false);
  const [topOffset, setTopOffset] = useState(topBannerHeight);
  const headerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpenId(null), []);

  // ESC + outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onDown = (e: MouseEvent) => {
      if (!headerRef.current) return;
      if (openId === null) return;
      const t = e.target as Node;
      if (!headerRef.current.contains(t)) close();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [openId, close]);

  const closeT = useRef<number | null>(null);

  const openMenu = (id: string) => {
    if (closeT.current) window.clearTimeout(closeT.current);
    setOpenId(id);
  };

  const scheduleClose = () => {
    if (closeT.current) window.clearTimeout(closeT.current);
    closeT.current = window.setTimeout(() => setOpenId(null), 500);
  };

  const cancelClose = () => {
    if (closeT.current) window.clearTimeout(closeT.current);
  };

  // Close on route change (basic)
  useEffect(() => {
    const onPop = () => {
      close();
      setMobileOpen(false);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [close]);

  useEffect(() => {
    let ticking = false;
    let lastY = window.scrollY;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const diff = y - lastY;
        const nextTopOffset = Math.max(topBannerHeight - y, 0);
        setTopOffset((prev) => (prev === nextTopOffset ? prev : nextTopOffset));

        if (y <= 8) {
          setIsHiddenOnScroll(false);
          lastY = y;
          ticking = false;
          return;
        }

        if (Math.abs(diff) >= 6) {
          setIsHiddenOnScroll(diff > 0);
          lastY = y;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const syncTopOffsetOnMount = requestAnimationFrame(() => {
      const y = window.scrollY;
      const nextTopOffset = Math.max(topBannerHeight - y, 0);
      setTopOffset((prev) => (prev === nextTopOffset ? prev : nextTopOffset));
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(syncTopOffsetOnMount);
    };
  }, [topBannerHeight]);
  

  return (
    <header
      ref={headerRef}
      style={{ top: topOffset }}
      className={cx(
        "fixed left-0 right-0 overflow-visible flex items-center justify-between",
        mobileOpen ? "h-[100dvh]" : "h-[60px] md:h-[84px]",
        isHiddenOnScroll || openId != null ? "z-[200000]" : "z-[2000]",
        mobileOpen
          ? "bg-white/96 backdrop-blur-sm"
          : "border-b border-black/[0.12] ring-1 ring-black/[0.05] bg-gradient-to-b from-white/56 via-white/30 to-white/16 backdrop-blur-[28px] backdrop-saturate-150 shadow-[0_12px_30px_rgba(15,23,42,0.12),0_1px_6px_rgba(255,255,255,0.45)_inset]",
        "transition-[transform,height] duration-300",
        isHiddenOnScroll &&
          openId === null &&
          !mobileOpen &&
          "-translate-y-full",
      )}
    >
      {!mobileOpen && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-5 md:inset-x-10 top-[1px] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
          />
        </>
      )}
      <div className="relative z-10 mx-auto flex w-full items-center justify-between px-4 md:px-10 xl:px-20">
        {/* Logo */}
        <Link
          href="/"
          className={cx(
            "shrink-0 transition-opacity duration-300",
            mobileOpen ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
          aria-hidden={mobileOpen}
          tabIndex={mobileOpen ? -1 : 0}
        >
          <Image
            src="/header/logo.png"
            width={120}
            height={36}
            alt="Hyfe logo"
            loading="lazy"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 relative">
          {headerNav.map((item) => {
            if (item.kind === "cta") return null;

            if (item.kind === "link") {
              return (
                <NavLink
                  key={item.id}
                  href={item.href}
                  className="group rounded-full px-3 py-2 text-sm text-black/80 hover:text-black hover:bg-black/5"
                >
                  <span className="inline-flex items-center gap-2">
                    {item.label}
                    <LinkIndicator
                      href={item.href}
                      className="text-black/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      internalClassName="w-2 h-4"
                      externalClassName="w-3.5 h-3.5"
                    />
                  </span>
                </NavLink>
              );
            }

            const isOpen = openId === item.id;
            const megaItem = item.kind === "mega" ? item : null;

            return (
              <div
                key={item.id}
                className="relative  "
                onPointerEnter={() => openMenu(item.id)}
                onPointerLeave={scheduleClose}
              >
                <TriggerButton
                  label={item.label}
                  open={isOpen}
                  onClick={() =>
                    setOpenId((v) => (v === item.id ? null : item.id))
                  }
                />

                {isOpen && item.kind === "dropdown" && (
                  <div
                    onPointerEnter={cancelClose}
                    onPointerLeave={scheduleClose}
                  >
                    <DropdownPanel items={item.items} close={close} />
                  </div>
                )}

                {isOpen && item.kind === "card" && (
                  <div
                    onPointerEnter={cancelClose}
                    onPointerLeave={scheduleClose}
                  >
                    <BigCardsPanel items={item.items} close={close} />
                  </div>
                )}

                {isOpen && megaItem && (
                  <div
                    onPointerEnter={cancelClose}
                    onPointerLeave={scheduleClose}
                    className="mx-auto backdrop-blur-[20px]!"
                  >
                    <MegaPanel
                      sections={megaItem.sections}
                      quickLinks={megaItem.quickLinks}
                      close={close}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* CTA */}
          {(() => {
            const cta = headerNav.find((x) => x.kind === "cta") as
              | CtaNavItem
              | undefined;
            if (!cta) return null;
            return (
              <NavLink
                href={cta.href}
                className={cx(
                  "hidden sm:inline-flex items-center justify-center group",
                  "rounded-full px-5 h-11 text-sm font-medium",
                  "bg-black text-white hover:bg-primary-600 transition-colors",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  {cta.label}
                </span>
              </NavLink>
            );
          })()}

          {/* Mobile menu button */}
          <MobileMenu
            nav={headerNav}
            open={mobileOpen}
            onOpenChange={setMobileOpen}
          />
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ Mobile Menu ------------------------------ */

function MobileMenu({
  nav,
  open,
  onOpenChange,
}: {
  nav: NavItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
  const closeMenu = useCallback(() => {
    setOpenAccordionId(null);
    onOpenChange(false);
  }, [onOpenChange]);
  const openMenu = useCallback(() => {
    setOpenAccordionId(null);
    onOpenChange(true);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  const cta = nav.find((x) => x.kind === "cta") as CtaNavItem | undefined;
  const mainItems = nav.filter((x) => x.kind !== "cta");
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
  const getMegaIcon = (id: string, label: string) =>
    megaMetaById[id]?.Icon ?? megaMetaByLabel[label]?.Icon;

  return (
    <>
      <button
        type="button"
        className={cx(
          "lg:hidden inline-flex items-center justify-center ",
          "h-[40px] w-11 rounded-full border border-black/10",
          "hover:bg-black/5 text-black",
        )}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={openMenu}
      >
        <span className="text-xl leading-none">≡</span>
      </button>

      <div
        className={cx(
          "fixed inset-0 z-[20010] lg:hidden transition-opacity duration-300 ease-out",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <button
          className={cx(
            "absolute inset-0 bg-black/30 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          aria-label="Close menu"
          onClick={closeMenu}
        />

        <div
          id="mobile-menu"
          role="dialog"
          aria-modal={open}
          aria-hidden={!open}
          aria-labelledby="mobile-menu-title"
          className={cx(
            "absolute right-0 top-0 h-full w-screen max-w-[420px] bg-white shadow-2xl border-l border-black/10 flex flex-col",
            "transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-black/10">
            <Link
              href="/"
              onClick={closeMenu}
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
            </Link>
            <button
              className="h-10 w-10 rounded-full hover:bg-black/5 text-black"
              onClick={closeMenu}
              aria-label="Close menu"
              autoFocus={open}
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
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-[16px] px-4 py-3 text-base font-medium hover:bg-black/5"
                  >
                    <span className="inline-flex items-center gap-2">
                      {item.label}
                      <LinkIndicator
                        href={item.href}
                        className="text-black/70"
                        internalClassName="w-2 h-4"
                        externalClassName="w-4 h-4"
                      />
                    </span>
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
                      {item.items.map((it) => {
                        const meta =
                          it.label && isDropdownMeta(it.label)
                            ? dropdownMeta[it.label]
                            : null;
                        const Icon = meta?.Icon;
                        return (
                          <MobileLinkItem
                            key={it.id}
                            item={it}
                            onClick={closeMenu}
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
                      {item.items.map((it) => (
                        <MobileLinkItem
                          key={it.id}
                          item={it}
                          onClick={closeMenu}
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
                    {item.sections.map((sec) => (
                      <div key={sec.id} className="space-y-2">
                        <div className="px-0">
                          <div className="text-xs font-semibold uppercase tracking-wide text-black/60">
                            {sec.title}
                          </div>
                          {sec.description && (
                            <div className="text-xs text-black/55">
                              {sec.description}
                            </div>
                          )}
                          {sec.allHref && (
                            <NavLink
                              href={sec.allHref}
                              onClick={closeMenu}
                              className="mt-2 inline-flex items-center gap-2 text-xs rounded-full bg-black/5 px-3 py-1.5"
                            >
                              View all
                              <LinkIndicator
                                href={sec.allHref}
                                className="text-black/70"
                                internalClassName="w-2 h-4"
                                externalClassName="w-3.5 h-3.5"
                              />
                            </NavLink>
                          )}
                        </div>

                        <div className="space-y-1">
                          {sec.items.map((it) => {
                            const Icon = getMegaIcon(it.id, it.label);
                            return (
                              <MobileLinkItem
                                key={it.id}
                                item={it}
                                onClick={closeMenu}
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
                onClick={closeMenu}
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
    </>
  );
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
        ) : Icon ? (
          <Icon className="text-black min-w-5 min-h-5 mt-0.5" />
        ) : null}
        <div className="min-w-0 grow">
          <div className="text-sm font-medium text-black inline-flex items-center gap-2">
            {item.label}
            <LinkIndicator
              href={item.href}
              className="text-black/70"
              internalClassName="w-2 h-4"
              externalClassName="w-4 h-4"
            />
          </div>
          {item.description && (
            <div className="text-xs text-black/55">{item.description}</div>
          )}
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
