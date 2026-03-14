"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem, CtaNavItem } from "@/features/header/type/header.type";
import { cx, NavLink } from "@/features/header/helpers/header.helpers";
import { TriggerButton } from "./components/TriggerButton";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { LinkIndicator } from "@/components/ui/buttons/LinkIndicator";
import { useIsScrollingDown } from "@/hooks/useIsScrollingDown";

const loadHeaderDesktopPanels = () =>
  import("./HeaderDesktopPanels").then((module) => ({
    default: module.HeaderDesktopPanels,
  }));

const HeaderMobileMenu = dynamic(
  () =>
    import("./HeaderMobileMenu").then((module) => ({
      default: module.HeaderMobileMenu,
    })),
  { ssr: false },
);

const HeaderDesktopPanels = dynamic(loadHeaderDesktopPanels, {
  ssr: false,
});

export function HeaderClient({
  nav,
  topBannerHeight = 0,
}: {
  nav: NavItem[];
  topBannerHeight?: number;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isHeaderReady, setIsHeaderReady] = useState(false);
  const isScrollingDown = useIsScrollingDown(10);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const syncScrollY = useCallback((y: number) => {
    setScrollY((prev) => (prev === y ? prev : y));
  }, []);
  const topOffset = Math.max(topBannerHeight - scrollY, 0);
  const shouldHideOnScroll =
    isScrollingDown && scrollY >= 56 && openId === null && !mobileOpen;
  const closeDesktopMenus = useCallback(() => setOpenId(null), []);
  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDesktopMenus();
    };
    const onMouseDown = (event: MouseEvent) => {
      if (!headerRef.current || openId === null) return;
      const target = event.target as Node;
      if (!headerRef.current.contains(target)) closeDesktopMenus();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [openId, closeDesktopMenus]);

  useEffect(() => {
    const onPopState = () => {
      closeDesktopMenus();
      closeMobileMenu();
      requestAnimationFrame(() => syncScrollY(window.scrollY));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [closeDesktopMenus, closeMobileMenu, syncScrollY]);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      syncScrollY(window.scrollY);
      setIsHeaderReady(true);
    });
    return () => cancelAnimationFrame(rafId);
  }, [syncScrollY]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        syncScrollY(window.scrollY);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [syncScrollY]);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => syncScrollY(window.scrollY));
    return () => cancelAnimationFrame(rafId);
  }, [pathname, syncScrollY]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const openDesktopMenu = (id: string) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    setOpenId(id);
  };

  const scheduleDesktopClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => setOpenId(null), 500);
  };

  const cancelDesktopClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
  };

  const prefetchDesktopPanels = useCallback(() => {
    void loadHeaderDesktopPanels();
  }, []);

  const cta = nav.find((item) => item.kind === "cta") as
    | CtaNavItem
    | undefined;

  return (
    <>
      <header
        ref={headerRef}
        style={{ top: topOffset }}
        className={cx(
          "fixed left-0 right-0 overflow-visible flex items-center justify-between",
          "h-[60px] md:h-[84px]",
          shouldHideOnScroll || openId != null ? "z-[200000]" : "z-[2000]",
          mobileOpen
            ? "bg-white/96 backdrop-blur-sm"
            : "border-b border-black/[0.12] ring-1 ring-black/[0.05] bg-gradient-to-b from-white/56 via-white/30 to-white/16 backdrop-blur-[28px] backdrop-saturate-150 shadow-[0_12px_30px_rgba(15,23,42,0.12),0_1px_6px_rgba(255,255,255,0.45)_inset]",
          "transition-[transform,translate,height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
          isHeaderReady ? "opacity-100" : "opacity-0 pointer-events-none",
          mobileOpen
            ? ""
            : shouldHideOnScroll
              ? "-translate-y-full pointer-events-none"
              : "translate-y-0",
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

          <nav className="hidden lg:flex items-center gap-1 relative">
            {nav.map((item) => {
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
              return (
                <div
                  key={item.id}
                  className="relative"
                  onPointerEnter={() => {
                    prefetchDesktopPanels();
                    openDesktopMenu(item.id);
                  }}
                  onPointerLeave={scheduleDesktopClose}
                  onFocusCapture={prefetchDesktopPanels}
                >
                  <TriggerButton
                    label={item.label}
                    open={isOpen}
                    onClick={() => {
                      prefetchDesktopPanels();
                      openDesktopMenu(item.id);
                    }}
                  />

                  {isOpen && (
                    <HeaderDesktopPanels
                      item={item}
                      close={closeDesktopMenus}
                      onPointerEnter={cancelDesktopClose}
                      onPointerLeave={scheduleDesktopClose}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {cta ? (
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
            ) : null}

            <button
              type="button"
              className={cx(
                "lg:hidden inline-flex items-center justify-center",
                "h-[40px] w-11 rounded-full border border-black/10",
                "hover:bg-black/5 text-black",
              )}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
            >
              <span className="text-xl leading-none">≡</span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <HeaderMobileMenu nav={nav} onClose={closeMobileMenu} />
      ) : null}
    </>
  );
}
