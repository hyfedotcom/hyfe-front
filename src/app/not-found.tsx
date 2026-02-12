import Link from "next/link";
import { Button } from "@/components/ui/buttons/Button";

const quickLinks = [
  {
    href: "/",
    title: "Home",
    description: "Go back to the main page and continue browsing.",
  },
  {
    href: "/science-resources",
    title: "Science Resources",
    description: "Explore publications, white papers, and cough science news.",
  },
  {
    href: "/company-resources",
    title: "Company Resources",
    description: "Read Hyfe updates, insights, and product stories.",
  },
  {
    href: "/faq",
    title: "FAQ",
    description: "Find quick answers to common questions.",
  },
] as const;

export default function NotFound() {
  return (
    <main className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FFFDF4_0%,#F7F5ED_45%,#FFFFFF_100%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
      >
        <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-[-8rem] top-28 h-72 w-72 rounded-full bg-[#F3D36A]/35 blur-3xl" />
        <div className="absolute left-1/2 top-[62%] h-80 w-[28rem] -translate-x-1/2 rounded-full bg-[#FFE9A3]/30 blur-3xl" />
      </div>

      <section className="mx-auto flex min-h-[76vh] w-full max-w-[1200px] flex-col items-center justify-center px-4 py-24 text-center md:px-10 xl:px-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/80 px-4 py-2 text-[13px] font-medium uppercase tracking-[0.08em] text-primary-800 shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
          Error 404
        </div>

        <p className="mt-7 text-[min(24vw,180px)] leading-[0.9] font-semibold text-black/90">
          404
        </p>

        <h1 className="mt-4 max-w-[16ch] text-[34px] leading-[110%] font-semibold text-black md:text-[56px]">
          This page could not be found.
        </h1>

        <p className="mt-5 max-w-[62ch] text-[16px] leading-[155%] text-body-secondary md:text-[19px]">
          The link may be outdated, moved, or typed incorrectly. Use one of the
          routes below to keep exploring Hyfe.
        </p>

        <div className="mt-10 flex w-full max-w-[560px] flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            label="Go Home"
            url="/"
            version="black"
            color="white"
            classNameProp="justify-center"
          />
          <Button
            label="Browse Resources"
            url="/science-resources"
            version="white"
            color="black"
            classNameProp="justify-center"
          />
        </div>

        <div className="mt-12 grid w-full max-w-[980px] gap-3 text-left sm:grid-cols-2">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[20px] border border-border bg-white/85 p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_14px_30px_rgba(46,53,66,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
            >
              <h2 className="text-[21px] leading-[120%] font-medium text-black transition-colors duration-300 group-hover:text-primary-800">
                {item.title}
              </h2>
              <p className="mt-2 text-[15px] leading-[145%] text-body-secondary">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
