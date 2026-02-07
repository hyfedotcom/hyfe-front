"use client";

import { useNavStack } from "@/hooks/useNavStack";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Sheet({
  children,
  returnPath,
}: {
  children: React.ReactElement;
  returnPath: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { hasInternalBack } = useNavStack();

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const body = document.body;

    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = "";

      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const close = (url: string) => {
    setOpen(false);

    setTimeout(() => {
      if (hasInternalBack()) {
        router.back(); // пришёл изнутри — назад
      } else {
        router.replace(url); // deep link — уходим на fallback без лишней записи
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-1000000 ">
      <button
        className="absolute inset-0 bg-black/40"
        onClick={() => close(returnPath)}
        aria-label="Close"
      />

      <div
        className={[
          "absolute left-0 right-0 bottom-0 top-0 bg-white mt-10 pt-15",
          "transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
          "max-h-[100dvh] overflow-y-auto overscroll-contain",
          "rounded-t-[28px] md:rounded-t-[40px] overflow-hidden",
          "flex flex-col",
        ].join(" ")}
      >
        <button
          onClick={() => close(returnPath)}
          aria-label="Close"
          className="fixed w-10 h-10 rounded-full bg-white top-3 md:top-8 right-4 md:right-8 flex justify-center items-center cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)] hover:scale-110 duration-300 z-1000"
        >
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
        {children}
      </div>
    </div>
  );
}
