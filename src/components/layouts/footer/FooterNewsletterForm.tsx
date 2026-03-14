"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

const NewsletterSignupForm = dynamic(
  () =>
    import("@/features/newsletter/components/NewsletterSignupForm").then(
      (module) => ({
        default: module.NewsletterSignupForm,
      }),
    ),
  { ssr: false },
);

function FooterNewsletterSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="space-y-5 md:w-max mx-auto animate-pulse"
    >
      <div className="flex gap-3 flex-col sm:flex-row sm:items-start">
        <div className="h-12 w-full md:min-w-[380px] rounded-full border-2 border-black/8 bg-black/[0.03]" />
        <div className="h-12 w-full sm:w-[180px] rounded-[20px] bg-black" />
      </div>
      <div className="h-4 w-[260px] max-w-full rounded-full bg-black/[0.06] mx-auto" />
    </div>
  );
}

export function FooterNewsletterForm({
  ctaLabel,
  consentLabel,
}: {
  ctaLabel: string;
  consentLabel: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [shouldRenderForm, setShouldRenderForm] = useState(false);

  const activateForm = useCallback(() => {
    setShouldRenderForm(true);
  }, []);

  useEffect(() => {
    if (shouldRenderForm) return;

    const node = rootRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const frameId = window.requestAnimationFrame(activateForm);
      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        activateForm();
        observer.disconnect();
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [activateForm, shouldRenderForm]);

  return (
    <div
      ref={rootRef}
      onPointerEnter={activateForm}
      onTouchStart={activateForm}
      onFocusCapture={activateForm}
    >
      {shouldRenderForm ? (
        <NewsletterSignupForm
          className="space-y-5 md:w-max mx-auto"
          idSuffix="footer"
          ctaLabel={ctaLabel}
          consentLabel={consentLabel}
          align="center"
        />
      ) : (
        <FooterNewsletterSkeleton />
      )}
    </div>
  );
}
