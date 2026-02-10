import { Button } from "@/components/ui/buttons/Button";
import Link from "next/link";
import { getNewsletterForm } from "@/features/newsletter";

export async function NewsSubscription() {
  const newsletter = await getNewsletterForm();

  return (
    <section
      className="bg-activ shadow-classic border-black border-1 p-5 md:p-10 rounded-[20px] space-y-8 mt-2 w-screen -ml-4 md:-ml-0 md:w-full"
      aria-labelledby="news-subscription-title-resource"
    >
      <div className="space-y-3">
        <h3
          id="news-subscription-title-resource"
          className="text-[28px]! md:text-[40px]! text-balance"
        >
          {newsletter.title}
        </h3>

        <ul className="space-y-1 text-[18px] font-medium text-black/70! list-disc ml-5">
          {newsletter.benefits.map((benefit, index) => (
            <li key={`${benefit}-${index}`}>{benefit}</li>
          ))}
        </ul>
      </div>

      <form
        className="space-y-5"
        method="post"
        action="/api/hubspot/submitEmail"
      >
        <div className="flex gap-3 flex-col sm:flex-row sm:items-start">
          <label className="sr-only" htmlFor="newsletter-email-resource">
            Email
          </label>

          <div className="flex flex-col gap-1 w-full md:w-max md:min-w-[380px] space-y-1">
            <input
              id="newsletter-email-resource"
              name="email"
              required
              autoComplete="email"
              inputMode="email"
              type="email"
              placeholder="Your email"
              aria-describedby="newsletter-help-resource"
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
              id="newsletter-help-resource"
              className="body-small text-black! ml-4.5"
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

        <div className="flex items-start gap-3">
          <input
            id="newsletter-consent-resource"
            name="consent"
            required
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border"
          />

          <label htmlFor="newsletter-consent-resource" className="text-sm opacity-90">
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
    </section>
  );
}
