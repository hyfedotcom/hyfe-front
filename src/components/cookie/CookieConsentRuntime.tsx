"use client";

import dynamic from "next/dynamic";

const TrackingScripts = dynamic(
  () =>
    import("@/components/analytics/TrackingScripts").then(
      (module) => module.TrackingScripts,
    ),
  { ssr: false },
);

const CookieBanner = dynamic(
  () =>
    import("@/components/cookie/CookieBanner").then(
      (module) => module.CookieBanner,
    ),
  { ssr: false },
);

export function CookieConsentRuntime() {
  return (
    <>
      <TrackingScripts />
      <CookieBanner />
    </>
  );
}
