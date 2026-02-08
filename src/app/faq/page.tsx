import { getFaqPage } from "@/features/faq/api/getFaq";
import { notFound } from "next/navigation";
import { FAQClient } from "./FAQClient";
import { Metadata } from "next";
import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";
import { buildFaqJsonLd } from "@/components/seo/jsonLdBuilders";

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
      <div className=" gap-10 w-full 2xl:w-[80%] mx-auto">
        <main className="pt-[260px] pb-[60px] lg:ml-[340px]">
          <div className="space-y-5">
            <h1>{title}</h1>
            <p>{paragraph}</p>
          </div>
        </main>
        {sections && <FAQClient sections={sections} />}
      </div>
    </div>
  );
}
