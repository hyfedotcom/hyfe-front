import { formatDateWithDots } from "@/shared/utils/formatDateWithDots";
import { RichText } from "../details/detailsRender/RichText";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";
import { notFound } from "next/navigation";
import { getPrivacyTermPage } from "@/features/privacy-terms";

function ChromeOffStyle() {
  return (
    <style>{`
      [data-site-header],
      [data-site-footer] {
        display: none !important;
      }
    `}</style>
  );
}

export default async function LegalLayout({ type }: { type: string }) {
  const legalPage = await getPrivacyTermPage(type);
  if (!legalPage) {
    return notFound();
  }

  const dir = legalPage.textOrientation === "left" ? "ltr" : "rtl";
  return (
    <>
      {legalPage.content_only && <ChromeOffStyle />}
      {legalPage.seo && (
        <SeoStructuredData seo={legalPage.seo} id="privacy-terms-seo-jsonld" />
      )}
      <main
        dir={dir}
        className={` legal max-w-[950px] mx-auto px-4 md:px-10 ${
          legalPage.content_only
            ? "py-10 md:py-16"
            : "pt-[100px] pb-[100px] md:pt-[140px] md:pb-[140px]"
        }`}
      >
        <div className="space-y-8 md:space-y-10">
          <div className="space-y-3">
            {legalPage.date && (
              <p className="body-medium text-body-secondary!">
                {formatDateWithDots(legalPage.date)}
              </p>
            )}
            <h1 className="text-[28px]! md:text-[52px]!">{legalPage.title}</h1>
          </div>
          <RichText blocks={legalPage.content} />
        </div>
      </main>
    </>
  );
}
