import { ResourcesListHero } from "@/features/resources/client";
import { notFound } from "next/navigation";
import { getPageResource } from "@/features/resources/data/api/getResourceFeedPage";
import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";
import { CompanyResourcesClient } from "./components/CompanyResourcesClient";
import { Metadata } from "next";
import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: "",
    description: "",
    robots: { index: false, follow: false },
  };

  try {
    const page = await getPageResource({ slug: "company-resource" });

    if (!page?.seo) return fallback;

    return getSeoMetadata(page.seo);
  } catch (e) {
    console.error("Seo error on slug (metaData)", e);
    return fallback;
  }
}

export default async function ScienceResources() {
  const data = await getPageResource({ slug: "company-resource" });

  if (!data) return notFound();

  return (
    <div className="relative">
      {data.seo && (
        <SeoStructuredData seo={data.seo} id="company-resources-seo-jsonld" />
      )}
      <ResourcesListHero data={data} />
      <div className="mb-30 md:mb-60">
        <CompanyResourcesClient />
        <div className="space-y-[-100px] md:space-y-[-200px]!  -mt-15">
          <PageBuilder sections={data?.sections} />
        </div>
      </div>
    </div>
  );
}
