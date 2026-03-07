"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SheetProvider } from "@/context/sheet/sheetContext";
import { useSheetNavigationState } from "@/context/sheet/sheetNavigationContext";
import { lockBodyScroll } from "@/shared/utils/bodyScrollLock";

type Props = {
  children: React.ReactNode;
  returnPath?: string;
  animation?: boolean;
  ariaLabel?: string;
};

function useLatestRef(value?: string) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

export function Sheet({
  children,
  returnPath,
  animation = true,
  ariaLabel = "Details",
}: Props) {
  const isAnimation = animation;
  const [open, setOpen] = useState(!isAnimation);
  const router = useRouter();
  const sheetRootRef = useRef<HTMLDivElement | null>(null);

  const path = usePathname();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef(path);
  const { setNextCloseFallback, consumeCloseFallback } =
    useSheetNavigationState();

  const isClosingRef = useRef(false);
  const [isClosingState, setIsClosingState] = useState(false);
  const pendingNavRef = useRef<null | { link: string }>(null);
  const inheritedFallbackRef = useRef<string | undefined>(undefined);
  const returnBackRef = useLatestRef(returnPath);

  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Consume one-shot fallback only in intercepted sheets.
    // Canonical sheets always have returnPath and should not steal this state.
    if (returnPath) return;
    const nextFallback = consumeCloseFallback(path);
    if (nextFallback) inheritedFallbackRef.current = nextFallback;
  }, [path, consumeCloseFallback, returnPath]);

  useEffect(() => {
    const div = scrollRef.current;
    if (path === pathRef.current) return;

    if (!div) return;

    div.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    pathRef.current = path;
  }, [path]);

  useEffect(() => {
    if (!isAnimation) return;
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, [isAnimation]);

  useEffect(() => {
    if (!open) return;
    return lockBodyScroll();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const sheetRoot = sheetRootRef.current;
    if (!sheetRoot) return;

    const changed = new Map<
      HTMLElement,
      { ariaHidden: string | null; hadInert: boolean }
    >();
    let current: HTMLElement | null = sheetRoot;

    while (
      current?.parentElement &&
      current.parentElement !== document.documentElement
    ) {
      const parent = current.parentElement as HTMLElement;
      const siblings = Array.from(parent.children);

      for (const sibling of siblings) {
        if (!(sibling instanceof HTMLElement) || sibling === current) continue;

        if (!changed.has(sibling)) {
          changed.set(sibling, {
            ariaHidden: sibling.getAttribute("aria-hidden"),
            hadInert: sibling.hasAttribute("inert"),
          });
        }

        sibling.setAttribute("aria-hidden", "true");
        sibling.setAttribute("inert", "");
      }

      current = parent;
    }

    return () => {
      changed.forEach(({ ariaHidden, hadInert }, el) => {
        if (ariaHidden === null) el.removeAttribute("aria-hidden");
        else el.setAttribute("aria-hidden", ariaHidden);

        if (!hadInert) el.removeAttribute("inert");
      });
    };
  }, [open]);

  const finishClose = useCallback(() => {
    if (!isClosingRef.current) return;
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    const pending = pendingNavRef.current;
    pendingNavRef.current = null;
    isClosingRef.current = false;
    setIsClosingState(false);

    if (pending?.link) router.push(pending.link, { scroll: true });
    else router.back();
  }, [router]);

  const close = useCallback(
    (href?: string, fallbackPath?: string) => {
      if (isClosingRef.current) return;
      isClosingRef.current = true;
      setIsClosingState(true);

      const fallback = inheritedFallbackRef.current ?? returnBackRef.current;

      if (href) {
        if (fallbackPath && fallbackPath !== href) {
          setNextCloseFallback({
            targetPath: href,
            fallbackPath,
          });
        }
        pendingNavRef.current = { link: href };
        setOpen(false);
        closeTimerRef.current = window.setTimeout(finishClose, 400);
        return;
      }
      if (fallback) pendingNavRef.current = { link: fallback };
      if (fallback === inheritedFallbackRef.current) {
        inheritedFallbackRef.current = undefined;
      }

      setOpen(false);
      closeTimerRef.current = window.setTimeout(finishClose, 400);
    },
    [returnBackRef, setNextCloseFallback, finishClose],
  );

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const onSheetTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      // 1) только сам контейнер
      if (e.target !== e.currentTarget) return;

      // 2) только то, что реально анимируем
      const p = e.propertyName;
      if (p !== "transform" && p !== "translate") return;

      // 3) только закрытие
      if (!isClosingRef.current) return;

      // 4) доп. защита: ждём именно состояние "закрыто"
      if (open) return;
      finishClose();
    },
    [open, finishClose],
  );

  const value = {
    close: close,
    isClosing: isClosingState,
  };

  return (
    <SheetProvider value={value}>
      <div
        ref={sheetRootRef}
        className={`${!open && "pointer-events-none"} max-w-screen fixed inset-0 z-1000000 `}
      >
        <button
          className={[
            "absolute inset-0 cursor-pointer bg-black/40",
            "transition-[opacity,backdrop-filter] duration-300 ease-out",
            open
              ? "opacity-100 backdrop-blur-[2px] pointer-events-auto"
              : "opacity-0 backdrop-blur-0 pointer-events-none",
          ].join(" ")}
          onClick={() => close()}
          aria-label="Close"
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          className={[
            "absolute left-0 right-0 bottom-0 top-0 bg-white mt-10 pt-0 ",
            "transition-transform duration-400 ease-out",
            open ? "translate-y-0" : "translate-y-full",
            "max-h-[100dvh] rounded-t-[28px] md:rounded-t-[40px]",
            "overflow-hidden flex flex-col",
          ].join(" ")}
          onTransitionEnd={onSheetTransitionEnd}
        >
          <button
            onClick={() => close()}
            aria-label="Close"
            className=" resources-glass-surface fixed w-10 h-10 rounded-full top-3 md:top-8 right-4 md:right-8 flex justify-center items-center cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)] hover:scale-110 duration-300 z-1000"
          >
            <div aria-hidden="true" className="resources-glass-overlay"></div>
            <div aria-hidden="true" className="resources-glass-highlight"></div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-45"
            >
              <path
                d="M7 0C7.55228 0 8 0.447715 8 1V6H13C13.5523 6 14 6.44772 14 7C14 7.55228 13.5523 8 13 8H8V13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13V8H1C0.447715 8 0 7.55228 0 7C0 6.44772 0.447715 6 1 6H6V1C6 0.447715 6.44772 0 7 0Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain"
          >
            <div className="w-full absolute top-0 z-100 h-10 md:h-25 bg-gradient-to-b via-white/50 from-white to-white/0"></div>
            {children}
          </div>
        </div>
      </div>
    </SheetProvider>
  );
}
