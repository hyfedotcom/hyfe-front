"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GTM_ID = "GTM-K646M5L";
const GOOGLE_TAG_ID = "G-FDYY62BKMY";
const AHREFS_KEY = "oKxNRpsjYqZ73g8TXQbS7w";
const CLARITY_ID = "i3tshx1j7p";

export function TrackingScripts() {
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    setIsReady(true)
  }, [])

  if (!isReady) return null
  return (
    <>
      <Script
        id="google-tag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        strategy="lazyOnload"
      />

      <Script id="google-tag-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_TAG_ID}');
        `}
      </Script>

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
      <Script
        id="hs-script-loader"
        src="https://js.hs-scripts.com/20037908.js"
        strategy="lazyOnload"
      />

      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key={AHREFS_KEY}
        defer
        strategy="lazyOnload"
      />

      <Script id="clarity-init" strategy="lazyOnload">
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
      </Script>
    </>
  );
}
