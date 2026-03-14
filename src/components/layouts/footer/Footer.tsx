import Link from "next/link";
import { Fragment } from "react";
import type { NewsletterFormType } from "@/features/newsletter";
import type { FooterType } from "@/features/general/schema/domain";
import { isInternalHref, normalizeHref } from "@/shared/utils/resolveLink";
import { FooterFrame } from "./FooterFrame";
import { FooterNewsletterForm } from "./FooterNewsletterForm";

type FooterLink = {
  label: string;
  url: string;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

const FALLBACK_COPYRIGHT = "© 2026 Hyfe Inc. All Rights Reserved.";

function FooterNavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const normalizedHref = normalizeHref(href);

  if (!isInternalHref(normalizedHref)) {
    return (
      <a
        href={normalizedHref}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={normalizedHref} className={className}>
      {children}
    </Link>
  );
}

export function Footer({
  newsletter,
  footer,
}: {
  newsletter: NewsletterFormType;
  footer?: FooterType | null;
}) {
  const navigationGroups: FooterGroup[] = footer?.navigation_groups ?? [];
  const legalLinks: FooterLink[] = footer?.legal_links ?? [];
  const copyrightText = footer?.copyright_text?.trim() || FALLBACK_COPYRIGHT;

  return (
    <FooterFrame>
      <div
        className="space-y-8 mt-2 text-center! mx-auto"
        aria-labelledby="news-subscription-title-footer"
      >
        <div className="space-y-3">
          <h3
            id="news-subscription-title-footer"
            className="text-[24px]! md:text-[40px]! text-balance max-w-[1000px] mx-auto"
          >
            {newsletter.title}
          </h3>
        </div>

        <FooterNewsletterForm
          ctaLabel={newsletter.ctaLabel}
          consentLabel={newsletter.consentLabel}
        />
      </div>

      <div className="w-[70vw] mx-auto h-[1px] bg-[#D5D7DD]" />

      {navigationGroups.length > 0 && (
        <div className="grid grid-cols-2 gap-10 md:flex w-full justify-evenly">
          {navigationGroups.map((group) => (
            <div className="flex flex-col" key={group.title}>
              <p className="body-large pb-6 uppercase font-medium! text-[#90949F]!">
                {group.title}
              </p>
              {group.links.map((link) => (
                <FooterNavLink
                  href={link.url}
                  key={`${group.title}-${link.url}-${link.label}`}
                  className="body-medium text-black! pb-3 font-medium!"
                >
                  {link.label}
                </FooterNavLink>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="w-[70vw] mx-auto h-[1px] bg-[#D5D7DD]" />

      <div className="w-full flex flex-col items-center justify-center gap-4">
        <p className="text-center">{copyrightText}</p>
        {legalLinks.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base">
            {legalLinks.map((link, idx) => (
              <Fragment key={`${link.url}-${link.label}`}>
                {idx > 0 && (
                  <span aria-hidden className="text-black/30">
                    |
                  </span>
                )}
                <FooterNavLink
                  href={link.url}
                  className="underline-offset-2 hover:underline text-black/80 hover:text-black"
                >
                  {link.label}
                </FooterNavLink>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </FooterFrame>
  );
}
