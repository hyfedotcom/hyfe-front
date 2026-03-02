import { getFaqPage } from "@/features/faq/api/getFaq";
import { notFound } from "next/navigation";
import { FAQClient } from "./FAQClient";
import { Metadata } from "next";
import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";
import { buildFaqJsonLd } from "@/components/seo/jsonLdBuilders";
import FAQContainer from "./FAQContainer";
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
      <div className="relative mx-auto lg:grid lg:grid-cols-[340px_minmax(0,1fr)] min-[2000px]:grid-cols-[340px_minmax(0,1fr)_340px] lg:gap-x-4">
        <main className="lg:col-start-2 xl:justify-self-center w-full max-w-[1000px] pt-[140px] md:pt-[260px] lg:pb-[60px]">
          <div className="space-y-5">
            <h1>{title}</h1>
            <p>{paragraph}</p>
          </div>
        </main>

        {sections && (
          <aside className="lg:col-start-1 lg:row-span-2 lg:justify-self-end flex my-6 sticky top-20 self-start h-fit w-full">
            <FAQClient sections={sections} />
          </aside>
        )}

        <div className="lg:col-start-2 lg:row-start-2 xl:justify-self-center w-full max-w-[1000px]">
          <FAQContainer sections={sections} />
        </div>
      </div>
    </div>
  );
}
