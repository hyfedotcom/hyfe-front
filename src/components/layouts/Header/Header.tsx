"use client";

import { useIsScrollingDown } from "@/hooks/useIsScrollingDown";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const isDown = useIsScrollingDown(10);

  return (
    <header className={`w-full flex items-center bg-white h-[100px] fixed z-1000 ${isDown ? "-translate-y-full" : "translate-y-0"} duration-200`}>
      <div className="flex mx-auto items-center gap-10 py-10 top-0">
        {/* <Link href={"/"}>
          <Image
            src="/general/logo.svg"
            width={157}
            height={57}
            alt=" hyfe logo's"
          ></Image>
        </Link> */}
        <div className="flex gap-5">
          <Link href={"/insights"}>Insights</Link>
          <Link href={"/publications"}>publications</Link>
          <Link href={"/cough-news"}>Cough News</Link>
          <Link href={"/news"}>News</Link>
          <Link href={"/white-papers"}>White Papers</Link>
        </div>
      </div>
    </header>
  );
}
