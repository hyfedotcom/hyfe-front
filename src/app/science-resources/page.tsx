import { ResourcesListHero } from "@/features/resources/client";
import { notFound } from "next/navigation";
import { getPageResource } from "@/features/resources/data/api/getResourceFeedPage";
import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";
import { ScienceResourcesClient } from "./components/ScienceResourcesClient";
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
    const page = await getPageResource({
      slug: "science-and-research-resource",
    });

    if (!page?.seo) return fallback;

    return getSeoMetadata(page.seo);
  } catch (e) {
    console.error("Seo error on slug (metaData)", e);
    return fallback;
  }
}

export default async function ScienceResources() {
  const data = await getPageResource({ slug: "science-and-research-resource" });

  if (!data) return notFound();

  return (
    <div className="">
      {data.seo && (
        <SeoStructuredData seo={data.seo} id="science-resources-seo-jsonld" />
      )}
      <ResourcesListHero
        data={{
          title: data.title ?? "Resources",
          paragraph: data.paragraph,
        }}
      />
      <div>
        <ScienceResourcesClient />
        <div className="space-y-[-100px] md:space-y-[-200px]!  -mt-15">
          <PageBuilder sections={data?.sections} />
        </div>
      </div>
    </div>
  );
}
