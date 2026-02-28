import { CardLink } from "@/features/page-builder/data/components/sections/resourceLinks/CardLinks";

const quickLinks = [
  {
    type: "/",
    title: "Home",
    description: "Go back to the main page and continue browsing.",
  },
  {
    type: "science-resources",
    title: "Science Resources",
    description: "Explore publications, white papers, and cough science news.",
  },
  {
    type: "company-resources",
    title: "Company Resources",
    description: "Read Hyfe updates, insights, and product stories.",
  },
  {
    type: "faq",
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
        <p className="mt-7 text-[min(24vw,140px)] leading-[0.9] font-semibold text-black/90">
          404
        </p>

        <h1 className="mt-4 max-w-[16ch] text-[34px] leading-[110%] font-semibold text-black md:text-[42px]!">
          This page could not be found.
        </h1>

        <p className="mt-5 max-w-[62ch] text-[16px] leading-[155%] text-body body-medium text-balance">
          The link may be outdated, moved, or typed incorrectly. Use one of the
          routes below to keep exploring Hyfe.
        </p>
        <div className="mt-12 grid w-full max-w-[800px] gap-3 text-left sm:grid-cols-2">
          {quickLinks.map((item) => (
            <CardLink key={item.title} card={item}></CardLink>
          ))}
        </div>
      </section>
    </main>
  );
}
