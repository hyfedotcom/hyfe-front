"use client";

import { Button } from "@/components/ui/buttons/Button";
import { headerNav } from "@/features/header/data/header.data";
import { NavLink } from "@/features/header/helpers/header.helpers";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="px-4 md:px-10 lg:px-20 pt-20 pb-10 rounded-t-[80px] shadow-[0_20px_40px_rgba(0,0,0,0.30)] bg-white space-y-[60px]">
      <div
        className=" space-y-8 mt-2  text-center! mx-auto"
        aria-labelledby="news-subscription-title"
      >
        <div className="space-y-3">
          <h3
            id="news-subscription-title"
            className="text-[28px]! md:text-[40px]! text-balance"
          >
            Get the Cough Science Research Roundup
          </h3>
          {/* 
          <ul className="space-y-1 w-max mx-auto text-[18px] font-medium text-black/70! list-disc ">
            <li className="w-max">Vetted publications, key takeaways</li>
            <li className="w-max">1 emails/month</li>
            <li className="w-max">Join researchers hyfe team</li>
          </ul> */}
        </div>

        <form
          className="space-y-5 md:w-max mx-auto"
          method="post"
          action="/api/hubspot/submitEmail"
        >
          <div className="flex gap-3 flex-col sm:flex-row sm:items-start">
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>

            <div className="flex flex-col gap-1 w-full md:w-max md:min-w-[380px] space-y-1">
              <input
                id="newsletter-email"
                name="email"
                required
                autoComplete="email"
                inputMode="email"
                type="email"
                placeholder="Your email"
                aria-describedby="newsletter-help"
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
                id="newsletter-help"
                className="body-small text-black! ml-4.5 text-left!"
              >
                No spam. Unsubscribe anytime.
              </span>
            </div>

            <Button
              label="Get the Roundup"
              url={""}
              type="submit"
              tag="button"
              color="yellow"
              classNameProp="h-12 sm:w-max shrink-0 md: "
              arrow={false}
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id="newsletter-consent"
              name="consent"
              required
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border"
            />

            <label htmlFor="newsletter-consent" className="text-sm opacity-90">
              I agree to receive the Cough Science Research Roundup from Hyfe{" "}
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
        <p>© 2025 Hyfe Inc. All Rights Reserved.</p>
        <svg
       
          viewBox="0 0 636 172"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-[635px]"
        >
          <path
            opacity="0.4"
            d="M97.4255 52.6742L97.4254 52.6629L132.658 73.0046L132.673 72.9797L146.209 80.8342L169.179 67.5724L169.121 40.8377L145.997 27.4202L123.027 40.682L123.053 52.6629L97.3934 37.8482L97.3852 34.0625C97.3742 29.0159 100.062 24.3485 104.433 21.8252L138.964 1.88841C143.335 -0.634908 148.721 -0.629104 153.086 1.90369L187.714 21.9961C192.05 24.5125 194.724 29.1432 194.735 34.1572L194.821 74.1918C194.832 79.2385 192.144 83.9059 187.774 86.4292L153.242 106.366C148.872 108.889 143.486 108.883 139.121 106.351L123.013 97.0045V97.0313L85.2139 75.2078L85.2102 75.2142L61.5066 61.5289L25.6278 82.2436L25.6278 123.673L61.5066 144.388L97.3855 123.673V97.0313L123.013 111.828V130.331C123.013 135.367 120.327 140.02 115.966 142.538L68.5543 169.911C64.1932 172.429 58.8201 172.429 54.459 169.911L7.04763 142.538C2.68655 140.02 4.52098e-06 135.367 0 130.331L2.86895e-06 75.5853C2.57949e-06 70.5495 2.68654 65.8963 7.04764 63.3784L54.459 36.0054C58.8201 33.4876 64.1932 33.4876 68.5543 36.0054L97.4255 52.6742Z"
            fill="#FDC500"
          />
          <g opacity="0.4">
            <path
              d="M609.245 79.8259C608.306 75.8605 606.376 72.6777 603.454 70.2775C600.532 67.8774 596.984 66.6773 592.81 66.6773C588.427 66.6773 584.827 67.8252 582.009 70.121C579.296 72.4168 577.574 75.6518 576.844 79.8259H609.245ZM576.061 96.2616C576.061 108.471 581.8 114.576 593.279 114.576C599.436 114.576 604.08 112.071 607.211 107.062H634.603C629.073 125.428 615.246 134.612 593.123 134.612C586.34 134.612 580.131 133.62 574.496 131.637C568.861 129.55 564.008 126.629 559.938 122.872C555.973 119.115 552.895 114.628 550.703 109.41C548.512 104.192 547.416 98.3487 547.416 91.8787C547.416 85.2001 548.46 79.1998 550.547 73.8777C552.634 68.4513 555.608 63.8598 559.469 60.1031C563.33 56.3463 567.974 53.4766 573.4 51.4939C578.931 49.4068 585.14 48.3633 592.027 48.3633C598.81 48.3633 604.915 49.4068 610.341 51.4939C615.768 53.4766 620.359 56.3985 624.116 60.2596C627.873 64.1207 630.742 68.8688 632.725 74.5039C634.708 80.0346 635.699 86.2958 635.699 93.2875V96.2616H576.061Z"
              fill="#2E3542"
            />
            <path
              d="M516.629 74.9781V131.642H488.297V74.9781H478.122V51.342H488.297V39.2891C488.297 32.6105 488.923 27.2885 490.175 23.323C491.218 19.9837 492.888 16.9053 495.184 14.0877C497.48 11.1658 500.141 8.66135 503.167 6.57428C506.298 4.4872 509.637 2.86972 513.185 1.72183C516.733 0.573941 520.229 0 523.672 0C526.073 0 528.264 0.260881 530.247 0.782648C532.334 1.30442 534.421 2.03489 536.508 2.97408V27.7059C534.63 26.7667 532.856 26.0884 531.186 25.671C529.621 25.1492 527.951 24.8883 526.177 24.8883C525.029 24.8883 523.829 25.097 522.577 25.5145C521.429 25.8275 520.333 26.558 519.29 27.7059C518.246 28.8538 517.516 30.5234 517.098 32.7149C516.785 34.8019 516.629 37.6717 516.629 41.324V51.342H536.508V74.9781H516.629Z"
              fill="#2E3542"
            />
            <path
              d="M399.39 120.683L360.57 51.3398H393.442L414.886 92.5074L435.705 51.3398H468.263L403.773 171.712H371.997L399.39 120.683Z"
              fill="#2E3542"
            />
            <path
              d="M273.223 59.1773H317.521V13.627H348.201V131.651H317.521V82.9699H273.223V131.651H242.543V13.627H273.223V59.1773Z"
              fill="#2E3542"
            />
          </g>
        </svg>
      </div>
    </footer>
  );
}
