"use client";

import isScienceType from "@/hooks/isScienceType";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ResourcesBreadcrumbs({ type }: { type: string }) {
  const activeClassName =
    "body-medium text-body-main underline underline-offset-4 hover:opacity-70 duration-200 text-nowrap";
  const anActiveClassName = "body-medium text-body-secondaty  text-nowrap";
  const rightType = isScienceType({ type })
    ? "Science Resources"
    : "Company Resources";
  const path = usePathname();
  const paths = [];
  if (
    path === "/publications" ||
    path === "/cough-news" ||
    path === "/white-papers"
  ) {
    paths.push("/science-resources", path);
  } else if (path === "/insights" || path === "/news") {
    paths.push("/company-resources", path);
  } else {
    paths.push(path);
  }

  return (
    <span className="flex gap-1">
      <Link href={"/"} className={`hidden md:block ${activeClassName}`}>
        Home
      </Link>
      {paths.length > 0 &&
        paths.map((e, i) => {
          const len = paths.length;
          return (
            <Link
              key={i}
              href={`${e.replace(/\s/g, "-").toLowerCase()}`}
              className={`${len === i + 1 ? anActiveClassName : activeClassName}`}
            >
              {e
                .replace(/-/g, " ")
                .replace(/\b\p{L}/gu, (ch) => ch.toUpperCase())}
            </Link>
          );
        })}
    </span>
  );
}
