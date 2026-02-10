"use client";

import { Button } from "@/components/ui/buttons/Button";
import { headerNav } from "@/features/header/data/header.data";
import { NavLink } from "@/features/header/helpers/header.helpers";
import Link from "next/link";
import React from "react";
import type { NewsletterFormType } from "@/features/newsletter";

export function Footer({ newsletter }: { newsletter: NewsletterFormType }) {
  return (
    <footer className="px-4 md:px-10 lg:px-20 pt-20 pb-10 rounded-t-[80px] shadow-[0_20px_40px_rgba(0,0,0,0.30)] bg-white space-y-[60px]">
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

        <form
          className="space-y-5 md:w-max mx-auto"
          method="post"
          action="/api/hubspot/submitEmail"
        >
          <div className="flex gap-3 flex-col sm:flex-row sm:items-start">
            <label className="sr-only" htmlFor="newsletter-email-footer">
              Email
            </label>

            <div className="flex flex-col gap-1 w-full md:w-max md:min-w-[380px] space-y-1">
              <input
                id="newsletter-email-footer"
                name="email"
                required
                autoComplete="email"
                inputMode="email"
                type="email"
                placeholder="Your email"
                aria-describedby="newsletter-help-footer"
                className="
    w-full sm:max-w-[520px] bg-white border-2 rounded-full px-5 h-12 outline-none
    border-black

    focus-visible:border-primary
    focus-visible:ring-2
    focus-visible:ring-primary
    focus-visible:ring-offset-2

    invalid:[&:not(:placeholder-shown)]:border-red-500
    invalid:[&:not(:placeholder-shown)]:focus-visible:border-red-500
    invalid:[&:not(:placeholder-shown)]:focus-visible:ring-red-500
  "
              />
              <span
                id="newsletter-help-footer"
                className="body-small text-black! ml-4.5 text-left!"
              >
                No spam. Unsubscribe anytime.
              </span>
            </div>

            <Button
              label={newsletter.ctaLabel}
              url={""}
              type="submit"
              tag="button"
              color="yellow"
              classNameProp="h-12 sm:w-max shrink-0 md: "
              arrow={false}
            />
          </div>

          <div className="flex justify-center items-start gap-3">
            <input
              id="newsletter-consent-footer"
              name="consent"
              required
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border"
            />

            <label htmlFor="newsletter-consent-footer" className="text-sm opacity-90 ">
              {newsletter.consentLabel}{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
              <span className="text-red-500"> *</span>
            </label>
          </div>

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="sr-only"
            aria-hidden="true"
          />
        </form>
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
                    external={item.external}
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
                    external={item.external}
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
                        external={item.external}
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
