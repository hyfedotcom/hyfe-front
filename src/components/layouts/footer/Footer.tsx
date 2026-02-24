"use client";

import { NavLink } from "@/features/header/helpers/header.helpers";
import React from "react";
import type { NewsletterFormType } from "@/features/newsletter";
import { NewsletterSignupForm } from "@/features/newsletter/components/NewsletterSignupForm";
import type { FooterType } from "@/features/general/schema/domain";

type FooterLink = {
  label: string;
  url: string;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

const FALLBACK_COPYRIGHT = "© 2026 Hyfe Inc. All Rights Reserved.";

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
    <footer className="px-4 md:px-10 xl:px-20 pt-20 pb-10 rounded-t-[80px] shadow-[0_20px_40px_rgba(0,0,0,0.30)] bg-white space-y-[60px]">
      <div
        className=" space-y-8 mt-2  text-center! mx-auto"
        aria-labelledby="news-subscription-title-footer"
      >
        <div className="space-y-3">
          <h3
            id="news-subscription-title-footer"
            className="text-[28px]! md:text-[40px]! text-balance max-w-[1000px] mx-auto"
          >
            {newsletter.title}
          </h3>
        </div>

        <NewsletterSignupForm
          className="space-y-5 md:w-max mx-auto"
          idSuffix="footer"
          ctaLabel={newsletter.ctaLabel}
          consentLabel={newsletter.consentLabel}
          align="center"
        />
      </div>
      <div className="w-[70vw] mx-auto h-[1px] bg-[#D5D7DD]"></div>
      {navigationGroups.length > 0 && (
        <div className="grid grid-cols-2 gap-10 md:flex w-full justify-evenly">
          {navigationGroups.map((group) => (
            <div className="flex flex-col" key={group.title}>
              <p className="body-large pb-6 uppercase font-medium! text-[#90949F]!">
                {group.title}
              </p>
              {group.links.map((link) => (
                <NavLink
                  href={link.url}
                  key={`${group.title}-${link.url}-${link.label}`}
                  className="body-medium text-black! pb-3 font-medium!"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      )}
      <div className="w-[70vw] mx-auto h-[1px] bg-[#D5D7DD]"></div>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <p className="text-center">{copyrightText}</p>
        {legalLinks.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base">
            {legalLinks.map((link, idx) => (
              <React.Fragment key={`${link.url}-${link.label}`}>
                {idx > 0 && (
                  <span aria-hidden className="text-black/30">
                    |
                  </span>
                )}
                <NavLink
                  href={link.url}
                  className="underline-offset-2 hover:underline text-black/80 hover:text-black"
                >
                  {link.label}
                </NavLink>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
