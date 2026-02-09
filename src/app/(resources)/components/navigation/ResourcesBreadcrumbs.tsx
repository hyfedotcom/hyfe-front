"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ResourcesBreadcrumbs() {
  const activeClassName =
    "text-[14px] md:text-[16px] text-body underline underline-offset-4 hover:opacity-70 duration-200 text-nowrap";
  const anActiveClassName = "text-[14px] md:text-[16px] text-body-secondary  ";

  const path = usePathname();
  const segments = path.split("/").filter(Boolean);
  const root = segments[0];
  const paths: string[] = [];

  if (root && ["publications", "cough-news", "white-papers"].includes(root)) {
    paths.push("/ science-resources", `/ ${root}`);
  } else if (root && ["insights", "news"].includes(root)) {
    paths.push("/ company-resources", `/ ${root}`);
  } else if (root) {
    paths.push(`/${root}`);
  }

  return (
    <span className="flex gap-1 items-center">
      <Link href={"/"} className={` ${activeClassName}`}>
        <span className="hidden md:block">Home</span>
        <span className=" md:hidden">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.28571 20.6699H9.03257V12.8434H14.9674V20.6699H19.7143V8.69876L12 2.66266L4.28571 8.69876V20.6699ZM3 22V8.0337L12 1L21 8.0337V22H13.6817V14.1735H10.3183V22H3Z"
              fill="#2E3542"
            />
          </svg>
        </span>
      </Link>
      {paths.length > 0 &&
        paths.map((e, i) => {
          const len = paths.length;
          return (
            <Link
              key={i}
              href={`${e.replace(/\s/g, "").toLowerCase()}`}
              className={`${len === i + 1 ? anActiveClassName : activeClassName}`}
            >
              /{" "}
              {e
                .replace(/^\/+/, "")
                .replace(/-/g, " ")
                .replace(/\b\p{L}/gu, (ch) => ch.toUpperCase())}
            </Link>
          );
        })}
    </span>
  );
}
