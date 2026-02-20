"use client";

import { useNavStack } from "@/hooks/useNavStack";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SheetShare } from "./SheetShare";

type Props = {
  children: React.ReactNode;
  returnPath: string;
  share?: { citation?: string };
};

function useLatestRef(value: string) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

export function Sheet({ children, returnPath, share }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { hasInternalBack } = useNavStack();

  const isClosingRef = useRef(false);
  const pendingNavRef = useRef<null | { fallback: string; useBack: boolean }>(
    null,
  );

  const returnBackRef = useLatestRef(returnPath);
  const hasInternalBackRef = hasInternalBack;

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const scrollY = window.scrollY;

    // компенсация скроллбара, чтобы не было прыжка ширины
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;

    // body.style.position = "fixed";
    body.style.position = "hidden";
    // body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;

    return () => {
      const top = body.style.top;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.paddingRight = "";

      const restoredY = top ? Math.abs(parseInt(top, 10)) : scrollY;
      window.scrollTo(0, restoredY);
    };
  }, [open]);

  const close = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    const fallback = returnBackRef.current;
    const useBack = Boolean(hasInternalBackRef());

    pendingNavRef.current = { fallback, useBack };
    console.log(pendingNavRef.current);
    setOpen(false);
  }, [hasInternalBackRef, returnBackRef]);

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

      const pending = pendingNavRef.current;
      if (!pending) return;

      pendingNavRef.current = null;
      isClosingRef.current = false;

      if (pending.useBack) router.back();
      else router.replace(pending.fallback);
    },
    [open, router],
  );

  return (
    <div className="max-w-screen fixed inset-0 z-1000000 ">
      <button
        className="absolute inset-0 bg-black/40 cursor-pointer"
        onClick={() => close()}
        aria-label="Close"
      />

      <div
        role="dialog"
        aria-modal="true"
        className={[
          "absolute left-0 right-0 bottom-0 top-0 bg-white mt-10 pt-0 ",
          "transition-transform duration-300 ease-out",
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
              fill="black"
            />
          </svg>
        </button>

        {share && <SheetShare citation={share.citation} />}

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <div className="w-full absolute top-0 z-100 h-10 md:h-25 bg-gradient-to-b via-white/50 from-white to-white/0"></div>
          {children}
        </div>
      </div>
    </div>
  );
}
