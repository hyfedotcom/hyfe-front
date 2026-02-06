"use client";

import { headerNav } from "@/features/header/data/header.data";
import { cx, NavLink } from "@/features/header/helpers/header.helpers";
import { useIsScrollingDown } from "@/hooks/useIsScrollingDown";
import Image from "next/image";
import Link from "next/link";
import { TriggerButton } from "./components/TriggerButton";
import { DropdownPanel } from "./components/DropdownPanel";
import { MegaPanel } from "./components/MegaPanel";
import { useCallback, useEffect, useRef, useState } from "react";
import { BigCardsPanel } from "./components/BigCardsPanel";
import { CtaNavItem } from "@/features/header/type/header.type";

export function Header() {
  const isDown = useIsScrollingDown(10);

  const [openId, setOpenId] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpenId(null), []);

  // ESC + outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onDown = (e: MouseEvent) => {
      if (!headerRef.current) return;
      if (openId === null) return;
      const t = e.target as Node;
      if (!headerRef.current.contains(t)) close();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [openId, close]);

  const closeT = useRef<number | null>(null);

  const openMenu = (id: string) => {
    if (closeT.current) window.clearTimeout(closeT.current);
    setOpenId(id);
  };

  const scheduleClose = () => {
    if (closeT.current) window.clearTimeout(closeT.current);
    closeT.current = window.setTimeout(() => setOpenId(null), 500);
  };

  const cancelClose = () => {
    if (closeT.current) window.clearTimeout(closeT.current);
  };

  // Close on route change (basic)
  useEffect(() => {
    const onPop = () => close();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [close]);

  return (
    <header
      ref={headerRef}
      className={cx(
        "fixed top-0 left-0 right-0 z-[1000] bg-white/90 backdrop-blur",
        "border-b border-black/10",
        "transition-transform duration-200",
        isDown && openId === null && "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-[84px] items-center justify-between px-4 md:px-10 lg:px-20">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/general/logo.svg"
            width={157}
            height={57}
            alt="Hyfe"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 relative">
          {headerNav.map((item) => {
            if (item.kind === "cta") return null;

            if (item.kind === "link") {
              return (
                <NavLink
                  key={item.id}
                  href={item.href}
                  external={item.external}
                  className="rounded-full px-3 py-2 text-sm text-black/80 hover:text-black hover:bg-black/5"
                >
                  {item.label}
                </NavLink>
              );
            }

            const isOpen = openId === item.id;
            const megaItem = item.kind === "mega" ? item : null;

            return (
              <div
                key={item.id}
                className="relative  "
                onPointerEnter={() => openMenu(item.id)}
                onPointerLeave={scheduleClose}
              >
                <TriggerButton
                  label={item.label}
                  open={isOpen}
                  onClick={() =>
                    setOpenId((v) => (v === item.id ? null : item.id))
                  }
                />

                {isOpen && item.kind === "dropdown" && (
                  <div
                    onPointerEnter={cancelClose}
                    onPointerLeave={scheduleClose}
                  >
                    <DropdownPanel items={item.items} close={close} />
                  </div>
                )}

                {isOpen && item.kind === "card" && (
                  <div
                    onPointerEnter={cancelClose}
                    onPointerLeave={scheduleClose}
                  >
                    <BigCardsPanel items={item.items} close={close} />
                  </div>
                )}

                {isOpen && megaItem && (
                  <div
                    onPointerEnter={cancelClose}
                    onPointerLeave={scheduleClose}
                    className="mx-auto"
                  >
                    <MegaPanel
                      sections={megaItem.sections}
                      quickLinks={megaItem.quickLinks}
                      close={close}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* CTA */}
          {(() => {
            const cta = headerNav.find((x) => x.kind === "cta") as
              | CtaNavItem
              | undefined;
            if (!cta) return null;
            return (
              <NavLink
                href={cta.href}
                external={cta.external}
                className={cx(
                  "hidden sm:inline-flex items-center justify-center",
                  "rounded-full px-5 h-11 text-sm font-medium",
                  "bg-black text-white hover:bg-primary-600 transition-colors",
                )}
              >
                {cta.label}
              </NavLink>
            );
          })()}

          {/* Mobile menu button */}
          {/* <MobileMenu nav={headerNav} /> */}
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ Mobile Menu ------------------------------ */

// function MobileMenu({ nav }: { nav: NavItem[] }) {
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (!open) return;
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = prev;
//     };
//   }, [open]);

//   return (
//     <>
//       <button
//         type="button"
//         className={cx(
//           "lg:hidden inline-flex items-center justify-center",
//           "h-11 w-11 rounded-full border border-black/10",
//           "hover:bg-black/5",
//         )}
//         aria-label="Open menu"
//         onClick={() => setOpen(true)}
//       >
//         <span className="text-xl leading-none">≡</span>
//       </button>

//       {open && (
//         <div className="fixed inset-0 z-11000 bg-black/40">
//           <div className="absolute right-0 top-0 h-full w-[92vw] max-w-[420px] bg-white shadow-2xl">
//             <div className="flex items-center justify-between p-4 border-b border-black/10">
//               <div className="text-sm font-semibold">Menu</div>
//               <button
//                 className="h-10 w-10 rounded-full hover:bg-black/5"
//                 onClick={() => setOpen(false)}
//                 aria-label="Close menu"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-64px)]">
//               {nav.map((item) => {
//                 if (item.kind === "cta") {
//                   return (
//                     <a
//                       key={item.id}
//                       href={item.href}
//                       target={item.external ? "_blank" : undefined}
//                       rel={item.external ? "noreferrer" : undefined}
//                       className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-blue-600 text-white h-12 font-medium"
//                     >
//                       {item.label}
//                     </a>
//                   );
//                 }

//                 if (item.kind === "link") {
//                   return (
//                     <NavLink
//                       key={item.id}
//                       href={item.href}
//                       external={item.external}
//                       onClick={() => setOpen(false)}
//                       className="block rounded-[16px] px-4 py-3 hover:bg-black/5"
//                     >
//                       {item.label}
//                     </NavLink>
//                   );
//                 }

//                 return (
//                   <MobileAccordion
//                     key={item.id}
//                     label={item.label}
//                     render={() => {
//                       if (item.kind === "dropdown") {
//                         return (
//                           <div className="pt-2 space-y-1">
//                             {item.items.map((it) => (
//                               <NavLink
//                                 key={it.id}
//                                 href={it.href}
//                                 external={it.external}
//                                 onClick={() => setOpen(false)}
//                                 className="block rounded-[14px] px-4 py-2 hover:bg-black/5"
//                               >
//                                 <div className="text-sm font-medium text-black">
//                                   {it.label} {it.external ? "↗" : ""}
//                                 </div>
//                                 {it.description && (
//                                   <div className="text-xs text-black/55">
//                                     {it.description}
//                                   </div>
//                                 )}
//                               </NavLink>
//                             ))}
//                           </div>
//                         );
//                       }

//                       // mega
//                       return (
//                         <div className="pt-2 space-y-4">
//                           {item.sections.map((sec) => (
//                             <div key={sec.id}>
//                               <div className="px-4">
//                                 <div className="text-sm font-semibold">
//                                   {sec.title}
//                                 </div>
//                                 {sec.description && (
//                                   <div className="text-xs text-black/55">
//                                     {sec.description}
//                                   </div>
//                                 )}
//                                 {sec.allHref && (
//                                   <NavLink
//                                     href={sec.allHref}
//                                     onClick={() => setOpen(false)}
//                                     className="mt-2 inline-flex text-xs rounded-full bg-black/5 px-3 py-1.5"
//                                   >
//                                     View all →
//                                   </NavLink>
//                                 )}
//                               </div>

//                               <div className="mt-2 space-y-1">
//                                 {sec.items.map((it) => (
//                                   <NavLink
//                                     key={it.id}
//                                     href={it.href}
//                                     external={it.external}
//                                     onClick={() => setOpen(false)}
//                                     className="block rounded-[14px] px-4 py-2 hover:bg-black/5"
//                                   >
//                                     <div className="text-sm font-medium text-black">
//                                       {it.label} {it.external ? "↗" : ""}
//                                     </div>
//                                     {it.description && (
//                                       <div className="text-xs text-black/55">
//                                         {it.description}
//                                       </div>
//                                     )}
//                                   </NavLink>
//                                 ))}
//                               </div>
//                             </div>
//                           ))}

//                           {/* {item.quickLinks?.length ? (
//                             <div className="mt-2 rounded-[18px] bg-black/[0.03] p-3">
//                               <div className="px-2 pb-2 text-sm font-semibold">
//                                 Quick links
//                               </div>
//                               <div className="space-y-1">
//                                 {item.quickLinks.map((it) => (
//                                   <NavLink
//                                     key={it.id}
//                                     href={it.href}
//                                     external={it.external}
//                                     onClick={() => setOpen(false)}
//                                     className="block rounded-[14px] px-3 py-2 hover:bg-black/5"
//                                   >
//                                     <div className="text-sm font-medium">
//                                       {it.label} {it.external ? "↗" : ""}
//                                     </div>
//                                     {it.description && (
//                                       <div className="text-xs text-black/55">
//                                         {it.description}
//                                       </div>
//                                     )}
//                                   </NavLink>
//                                 ))}
//                               </div>
//                             </div>
//                           ) : null} */}
//                         </div>
//                       );
//                     }}
//                   />
//                 );
//               })}
//             </div>
//           </div>

//           <button
//             className="absolute inset-0"
//             aria-label="Close overlay"
//             onClick={() => setOpen(false)}
//           />
//         </div>
//       )}
//     </>
//   );
// }

// function MobileAccordion({
//   label,
//   render,
// }: {
//   label: string;
//   render: () => React.ReactNode;
// }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="rounded-[18px] border border-black/10 overflow-hidden">
//       <button
//         type="button"
//         onClick={() => setOpen((v) => !v)}
//         className="w-full flex items-center justify-between px-4 py-3 hover:bg-black/5"
//       >
//         <span className="text-sm font-medium">{label}</span>
//         <span className={cx("transition-transform", open && "rotate-45")}>
//           +
//         </span>
//       </button>

//       <div
//         className={cx(
//           "grid transition-[grid-template-rows] duration-200 ease-out",
//           open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
//         )}
//       >
//         <div className="overflow-hidden">{render()}</div>
//       </div>
//     </div>
//   );
// }
