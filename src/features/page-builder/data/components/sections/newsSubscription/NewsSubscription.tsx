import { getNewsletterForm } from "@/features/newsletter";
import { NewsletterSignupForm } from "@/features/newsletter/components/NewsletterSignupForm";

export async function NewsSubscription() {
  const newsletter = await getNewsletterForm();

  return (
    <section
      className="bg-activ shadow-classic border-black border-1 p-5 md:p-10 rounded-[20px] space-y-4 md:space-y-8 mt-2 w-screen -ml-4 md:-ml-0 md:w-full"
      aria-labelledby="news-subscription-title-resource"
    >
      <div className="space-y-3">
        <h3
          id="news-subscription-title-resource"
          className="text-[20px]! md:text-[40px]! text-balance"
        >
          {newsletter.title}
        </h3>

        <ul className="space-y-1 text-[14px] md:text-[18px] font-medium text-black/70! list-disc ml-5">
          {newsletter.benefits.map((benefit, index) => (
            <li key={`${benefit}-${index}`}>{benefit}</li>
          ))}
        </ul>
      </div>

      <NewsletterSignupForm
        className="space-y-5"
        idSuffix="resource"
        ctaLabel={newsletter.ctaLabel}
        consentLabel={newsletter.consentLabel}
        align="left"
      />
    </section>
  );
}
