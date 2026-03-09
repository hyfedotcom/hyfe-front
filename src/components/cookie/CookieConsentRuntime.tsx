"use client";

import { TrackingScripts } from "@/components/analytics/TrackingScripts";
import { CookieBanner } from "@/components/cookie/CookieBanner";

export function CookieConsentRuntime() {
  return (
    <>
      <TrackingScripts />
      <CookieBanner />
    </>
  );
}