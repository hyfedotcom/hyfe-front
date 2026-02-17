import { RichText } from "@/app/(resources)/components/details/detailsRender/RichText";
import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";
import { getPrivacyTermPage } from "@/features/privacy-terms";
import { getResourcesList } from "@/features/resources";
import {
  isResourceType,
  RESOURCE_TYPES,
} from "@/features/resources/data/api/resourceType";
import { getSlugs } from "@/features/shared/api/getSlugs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDateWithDots } from "@/shared/utils/formatDateWithDots";

export const dynamic = "force-static";
export const revalidate = 86400;

type Params = { type: string };

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const privacyTermSlugs = await getSlugs("privacy-term-items");
    const allTypes = Array.from(
      new Set([...RESOURCE_TYPES, ...privacyTermSlugs]),
    );
    return allTypes.map((type) => ({ type }));
  } catch (e) {
    console.error("generateStaticParams error on /[type] route:", e);
    return RESOURCE_TYPES.map((type) => ({ type }));
  }
}

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

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const fallback: Metadata = {
    title: "",
    description: "",
    robots: { index: false, follow: false },
  };

  try {
    const { type } = await params;

    if (isResourceType(type)) {
      const data = await getResourcesList({ type });
      if (!data?.landing?.seo) return fallback;
      return getSeoMetadata(data.landing.seo);
    }

    const legalPage = await getPrivacyTermPage(type);
    if (!legalPage?.seo) return fallback;

    return getSeoMetadata(legalPage.seo);
  } catch (e) {
    console.error(`Seo error on slug(metadata):`, e);
    return fallback;
  }
}

export default async function DynamicTypePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { type } = await params;

  if (isResourceType(type)) {
    return null;
  }

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
            : "pt-[220px] pb-[100px] md:pt-[240px] md:pb-[140px]"
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
