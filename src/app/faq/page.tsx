import { getFaqPage } from "@/features/faq/api/getFaq";
import { notFound } from "next/navigation";
import { FAQClient } from "./FAQClient";
import { Metadata } from "next";
import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";
import { buildFaqJsonLd } from "@/components/seo/jsonLdBuilders";
import { FAQSection } from "./FAQSection";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateMetadata() {
  const fallback: Metadata = {
    title: "",
    description: "",
    robots: { index: false, follow: false },
  };
  const data = await getFaqPage();

  if (!data || !data.seo) return fallback;
  return getSeoMetadata(data.seo);
}

export default async function FAQ({}) {
  const data = await getFaqPage();

  if (!data) return notFound();
  const { paragraph, sections, title } = data;
  const faqJsonLd = buildFaqJsonLd(sections);

  return (
    <div className="px-4 md:px-10 xl:px-20  pb-[100px] md:pb-[140px]">
      {faqJsonLd && <JsonLd data={faqJsonLd} id="faq-jsonld" />}
      <SeoStructuredData seo={data.seo} id="faq-seo-jsonld" />
      <div className="relative lg:grid lg:grid-cols-[340px_minmax(0,1fr)_340px] lg:gap-x-4">
        {sections && (
          <aside className="hidden lg:flex lg:col-start-1 lg:sticky lg:top-1/3 self-start h-fit justify-end">
            <FAQClient sections={sections} />
          </aside>
        )}
        <div className="gap-10 w-full max-w-[1000px] mx-auto lg:col-start-2">
          <main className="pt-[260px] pb-[60px]  lg:min-w-[600px] xl:min-w-[800px] 2xl:min-w-[1000px]">
            <div className="space-y-5">
              <h1>{title}</h1>
              <p>{paragraph}</p>
            </div>
          </main>
          <div className="space-y-25">
            {sections.map((s, i) => (
              <FAQSection key={i} section={s}></FAQSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
