"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ANALYTICS_CONSENT_COOKIE_NAME,
  ANALYTICS_CONSENT_GRANTED_EVENT,
  ANALYTICS_CONSENT_GRANTED_VALUE,
  ANALYTICS_CONSENT_MAX_AGE_SECONDS,
  hasAnalyticsConsentInDocument,
} from "@/core/cookies/analyticsConsent";

function setConsentCookie() {
  if (typeof document === "undefined") return;

  const expires = new Date(Date.now() + ANALYTICS_CONSENT_MAX_AGE_SECONDS * 1000);
  const cookieParts = [
    `${ANALYTICS_CONSENT_COOKIE_NAME}=${encodeURIComponent(ANALYTICS_CONSENT_GRANTED_VALUE)}`,
    `Max-Age=${ANALYTICS_CONSENT_MAX_AGE_SECONDS}`,
    `expires=${expires.toUTCString()}`,
    "path=/",
    "SameSite=Lax",
  ];

  if (window.location.protocol === "https:") {
    cookieParts.push("Secure");
  }

  document.cookie = cookieParts.join("; ");

  window.dispatchEvent(new Event(ANALYTICS_CONSENT_GRANTED_EVENT));
}

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(() => !hasAnalyticsConsentInDocument());

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
