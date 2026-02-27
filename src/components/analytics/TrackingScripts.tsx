"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  ANALYTICS_CONSENT_GRANTED_EVENT,
  hasAnalyticsConsentInDocument,
} from "@/core/cookies/analyticsConsent";

const GTM_ID = "GTM-K646M5L";
const AHREFS_KEY = "oKxNRpsjYqZ73g8TXQbS7w";
const CLARITY_ID = "i3tshx1j7p";

export function TrackingScripts({
  initialEnabled = false,
}: {
  initialEnabled?: boolean;
}) {
  const [enabled, setEnabled] = useState(
    () => initialEnabled || hasAnalyticsConsentInDocument(),
  );

  useEffect(() => {
    if (enabled) return;

    const onConsentGranted = () => setEnabled(true);
    window.addEventListener(ANALYTICS_CONSENT_GRANTED_EVENT, onConsentGranted);

    return () => {
      window.removeEventListener(
        ANALYTICS_CONSENT_GRANTED_EVENT,
        onConsentGranted,
      );
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      {/* Ahrefs Web Analytics */}
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key={AHREFS_KEY}
        defer
        strategy="afterInteractive"
      />

      {/* Microsoft Clarity */}
      <Script id="clarity-init" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r); t.async=1; t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");

          // Clarity docs currently show mixed key casing across pages.
          // Send both variants to ensure consent is picked up consistently.
          clarity('consentv2', { ad_storage: "denied", analytics_storage: "granted" });
          clarity('consentv2', { ad_Storage: "denied", analytics_Storage: "granted" });
        `}
      </Script>
    </>
  );
}
