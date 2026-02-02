"use client";

import Link from "next/link";
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

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const body = document.body;

    body.style.overflow = "hidden";
    // body.style.top = `-${scrollY}px`;
    // body.style.left = "0";
    // body.style.right = "0";
    // body.style.width = "100%";

    return () => {
      body.style.overflow = "";
      // body.style.top = "";
      // body.style.left = "";
      // body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const close = (url: string) => {
    setOpen(false);

    setTimeout(() => {
      if (window.history.length > 1) router.back();
      else router.push(url);
    }, 300); // должно совпадать с duration-300
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
          "absolute left-0 right-0 bottom-0 top-10 bg-white mt-10 pt-15",
          "transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
          "max-h-[100dvh]", // лучше, чем vh (мобилки)
          "rounded-t-[28px] md:rounded-t-[60px] overflow-hidden",
          "flex flex-col",
        ].join(" ")}
      >
        <div className="overflow-y-auto overscroll-contain">
          <button
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
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
