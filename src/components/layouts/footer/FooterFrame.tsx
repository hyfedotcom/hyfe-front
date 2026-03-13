"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function FooterFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hasCtaBeforeFooter, setHasCtaBeforeFooter] = useState(false);
  const footerTopSpacingClass = hasCtaBeforeFooter
    ? ""
    : "rounded-t-[80px] shadow-[0_20px_40px_rgba(0,0,0,0.30)] pt-15 md:pt-20";

  useEffect(() => {
    const syncFooterSpacing = () => {
      const markers = document.querySelectorAll<HTMLElement>(
        "[data-page-builder-last-section]",
      );
      const marker = markers.item(markers.length - 1);
      setHasCtaBeforeFooter(marker?.dataset.pageBuilderLastSection === "cta");
    };

    syncFooterSpacing();
    const frame = window.requestAnimationFrame(syncFooterSpacing);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <footer
      className={`px-4 md:px-10 xl:px-20 ${footerTopSpacingClass} pb-10 bg-white space-y-[60px] z-1000 relative`}
    >
      {children}
    </footer>
  );
}
