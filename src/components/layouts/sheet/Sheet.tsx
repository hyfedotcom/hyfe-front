"use client";

import { useNavStack } from "@/hooks/useNavStack";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ICONS } from "@/shared/icons/resources";
import { useWindowSize } from "@/hooks/useWindowSize";

export function Sheet({
  children,
  returnPath,
}: {
  children: React.ReactElement;
  returnPath: string;
}) {
  const [open, setOpen] = useState(false);
  const width = useWindowSize();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const router = useRouter();
  const { hasInternalBack } = useNavStack();
  const didInitShare = useRef(false);

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

  const normalizeInternalPath = (url: string) => {
    if (!url) return "/";
    return url.startsWith("/") ? url : `/${url}`;
  };

  const close = (url: string) => {
    setOpen(false);
    const fallbackPath = normalizeInternalPath(url);

    setTimeout(() => {
      if (hasInternalBack()) {
        router.back(); // пришёл изнутри — назад
      } else {
        router.replace(fallbackPath); // deep link — уходим на fallback без лишней записи
      }
    }, 300);
  };

  useEffect(() => {
    console.log("BROWSER width:", width);
  }, [width]);

  useEffect(() => {
    if (didInitShare.current) return;
    if (width === 0) return;
    didInitShare.current = true;

    const set = () => setIsShareOpen(width >= 768);
    set();
  }, [width]);

  const toggleShare = () => {
    setIsShareOpen((prev) => !prev);
  };

  const Twitter = ICONS.Twitter;
  const Copy = ICONS.Copy;
  const Facebook = ICONS.Facebook;
  const Linkedin = ICONS.Linkedin;
  const Quote = ICONS.Quote;
  const Share = ICONS.Share;

  return (
    <div className="max-w-screen fixed inset-0 z-1000000 ">
      <button
        className="absolute inset-0 bg-black/40"
        onClick={() => close(returnPath)}
        aria-label="Close"
      />

      <div
        className={[
          "absolute left-0 right-0 bottom-0 top-0 bg-white mt-10 pt-0 md:pt-15",
          "transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
          "max-h-[100dvh] rounded-t-[28px] md:rounded-t-[40px]",
          "overflow-hidden flex flex-col",
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
        <div className="fixed flex flex-col md:flex-row gap-2  mx-auto top-3 md:top-3 left-4 md:left-8 z-1000 ">
          <button
            onClick={toggleShare}
            className="z-100000 md:hidden w-10 h-10 rounded-full bg-white  flex justify-center items-center cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)] hover:scale-110 duration-300 z-1000"
          >
            <Share className="text-black" />
          </button>
          <button
            className={`${isShareOpen ? "shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)]" : "absolute"} w-10 h-10 rounded-full bg-white  flex justify-center items-center cursor-pointer  hover:scale-110 duration-300 z-1000`}
          >
            <Twitter className="text-black" />
          </button>
          <button
            className={`${isShareOpen ? "shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)]" : "absolute"} w-10 h-10 rounded-full bg-white  flex justify-center items-center cursor-pointer  hover:scale-110 duration-300 z-1000`}
          >
            <Copy className="text-black" />
          </button>
          <button
            className={`${isShareOpen ? "shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)]" : "absolute"} w-10 h-10 rounded-full bg-white  flex justify-center items-center cursor-pointer  hover:scale-110 duration-300 z-1000`}
          >
            <Facebook className="text-black" />
          </button>
          <button
            className={`${isShareOpen ? "" : "absolute"} w-10 h-10 rounded-full bg-white  flex justify-center items-center cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)] hover:scale-110 duration-300 z-1000`}
          >
            <Linkedin className="text-black" />
          </button>
          <button
            className={`${isShareOpen ? "px-4 shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)]" : "absolute w-10 h-10"}   font-semibold h-10 rounded-full bg-white  flex justify-center items-center gap-2 cursor-pointer  hover:scale-110 duration-300 z-1000`}
          >
            <Quote className="text-black" /> {isShareOpen && "Cite"}
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}
