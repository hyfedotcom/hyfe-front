"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GOOGLE_TAG_ID = "G-FDYY62BKMY";
const AHREFS_KEY = "oKxNRpsjYqZ73g8TXQbS7w";
const CLARITY_ID = "i3tshx1j7p";

export function TrackingScripts() {

  const [loadGa, setLoadGa] = useState(false)
  const [loadClarity, setLoadClarity] = useState(false)
  const [loadMarkenting, setLoadMarkenting] = useState(false)

  useEffect(() => {
    let startId: number | null = null
    let gaId: number | null = null
    let marketingId: number | null = null
    let idleId: number | null = null

    const enableMarketing = () => { setLoadMarkenting(true); if (marketingId !== null) { window.clearTimeout(marketingId) } }

    const start = () => {
      startId = window.setTimeout(() => {
        const enableClarity = () => {
          setLoadClarity(true)

          gaId = window.setTimeout(() => {
            setLoadGa(true)
          }, 1500)
        }

        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(enableClarity, { timeout: 5000 })
        } else {
          enableClarity()
        }
      }, 2000)
    }

    marketingId = window.setTimeout(enableMarketing, 8000)

    const enableMarketingFromAction = () => {
      if (marketingId !== null) window.clearTimeout(marketingId)
      marketingId = window.setTimeout(enableMarketing, 3000)
    }

    window.addEventListener("pointerdown", enableMarketingFromAction, { passive: true, once: true })
    window.addEventListener("keydown", enableMarketingFromAction, { once: true })

    if (document.readyState === "complete") {
      start()
    } else {
      window.addEventListener("load", start, { once: true })
    }

    return () => {
      if (startId !== null) window.clearTimeout(startId)
      if (gaId !== null) window.clearTimeout(gaId)
      if (marketingId !== null) window.clearTimeout(marketingId)
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId)
      }

      window.removeEventListener("load", start);
      window.removeEventListener("pointerdown", enableMarketingFromAction);
      window.removeEventListener("keydown", enableMarketingFromAction);
    }
  }, [])

  return (
    <>
      {loadGa && (
        <>
          <Script
            id="google-tag-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
            strategy="afterInteractive"
          />

          <Script id="google-tag-init" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_TAG_ID}');
        `}
          </Script>
        </>)}

      {/* GTM still loads separately for container-managed tags. */}
      {/* <Script id="gtm-init" strategy="lazyOnload">
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
      </Script> */}

      {/* Deferred analytics: load non-critical third-party trackers after window load. */}
      {loadMarkenting && (<><Script
        id="hs-script-loader"
        src="https://js.hs-scripts.com/20037908.js"
        strategy="afterInteractive"
      />

        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key={AHREFS_KEY}
          defer
          strategy="afterInteractive"
        /></>)}

      {loadClarity && (<>
        <Script id="clarity-init" strategy="afterInteractive">
          {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r); t.async=1; t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");

          window.clarity('consentv2', {
            ad_Storage: "denied",
            analytics_Storage: "granted"
          });
        `}
        </Script></>)}
    </>
  );
}
