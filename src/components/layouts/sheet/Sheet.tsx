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
          "max-h-[100dvh]",
          "rounded-t-[28px] md:rounded-t-[40px] overflow-hidden",
          "flex flex-col",
        ].join(" ")}
      >
        <div className="overflow-y-auto overscroll-contain">
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
    </div>
  );
}

{
  /* <button
            onClick={() => close(returnPath)}
            className="fixed max-[1400px]:bg-white translate-x-4 md:translate-x-[40px] lg:translate-x-[80px] px-5 py-2 rounded-[20px] top-5 flex gap-5 text-black hover:text-primary-500! duration-200 body-small md:body-large items-center font-medium! w-max text-nowrap cursor-pointer"
          >
            <svg
              width="8"
              height="16"
              viewBox="0 0 8 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.68311 1L1.24093 7.34921C0.919935 7.7237 0.919935 8.2763 1.24093 8.65079L6.68311 15"
                stroke="#2E3542"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            All
            {returnPath
              .replace(/[-/]/g, " ")
              .split(" ")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")}
          </button> */
}
