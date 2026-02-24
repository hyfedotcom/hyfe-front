"use client";

import Link from "next/link";
import { useState } from "react";

const COOKIE_NAME = "analytics_consent";
const COOKIE_VALUE = "granted";
const COOKIE_DAYS = 365;

function setConsentCookie() {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DAYS);

  document.cookie = [
    `${COOKIE_NAME}=${encodeURIComponent(COOKIE_VALUE)}`,
    `expires=${expires.toUTCString()}`,
    "path=/",
    "SameSite=Lax",
  ].join("; ");
}

export function CookieBanner({
  initialAccepted,
}: {
  initialAccepted: boolean;
}) {
  const [isOpen, setIsOpen] = useState(!initialAccepted);

  if (!isOpen) return null;

  return (
    <div className="fixed flex gap-3 left-4 bottom-4 z-[9999] w-[90vw] max-w-[570px] rounded-2xl border border-gray-200 bg-white p-3 shadow-lg md:left-4 md:bottom-4 md:p-4">
      <p className="text-[12px] md:text-[14px]">
        Our website use cookies. By continuing navigating, we assume your
        permission to deploy cookies as detailed in our{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="max-sm:h-[40px] mt-auto flex justify-end">
        <button
          type="button"
          onClick={() => {
            setConsentCookie();
            setIsOpen(false);
          }}
          className="cursor-pointer rounded-[8px] bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-85"
        >
          OK
        </button>
      </div>
    </div>
  );
}
