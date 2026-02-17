"use client";

import { headerNav } from "@/features/header/data/header.data";
import { NavLink } from "@/features/header/helpers/header.helpers";
import React from "react";
import type { NewsletterFormType } from "@/features/newsletter";
import { NewsletterSignupForm } from "@/features/newsletter/components/NewsletterSignupForm";

export function Footer({ newsletter }: { newsletter: NewsletterFormType }) {
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
      <div className="grid grid-cols-2 gap-10 md:flex w-full justify-evenly">
        {headerNav.map((items, i) => (
          <React.Fragment key={i}>
            {items.kind === "card" ? (
              <div className="flex flex-col">
                <p className="body-large pb-6 uppercase font-medium! text-body-secondary!">
                  {items.label}
                </p>
                {items.items.map((item) => (
                  <NavLink
                    href={item.href}
                    key={item.id}
                    className="body-medium text-black! pb-3 font-medium!"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            ) : items.kind === "dropdown" ? (
              <div className="flex flex-col">
                <p className="body-large pb-6 uppercase font-medium! text-body-secondary!">
                  {items.label}
                </p>
                {items.items.map((item) => (
                  <NavLink
                    href={item.href}
                    key={item.id}
                    className="body-medium text-black! pb-3 font-medium!"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            ) : items.kind === "mega" ? (
              <div className="flex flex-col">
                <p className="body-large pb-6 uppercase font-medium! text-body-secondary!">
                  {items.label}
                </p>
                {items.sections.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.items.map((item) => (
                      <NavLink
                        href={item.href}
                        key={item.id}
                        className="body-medium text-black! pb-3 font-medium!"
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <div className="w-[70vw] mx-auto h-[1px] bg-[#D5D7DD]"></div>
      <div className="w-full flex flex-col items-center justify-center space-y-[80px]">
        <p>© 2026 Hyfe Inc. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
