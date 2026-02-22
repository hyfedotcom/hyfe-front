import { ResourcesListHero } from "@/features/resources/client";
import { notFound } from "next/navigation";
import { getPageResource } from "@/features/resources/data/api/getResourceFeedPage";
import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";
import { ScienceResourcesClient } from "./components/ScienceResourcesClient";
import { Metadata } from "next";
import { getSeoMetadata } from "@/components/seo/getSeoMetaData";

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
  const data = await getPageResource({ slug: "science-and-research-resource" });

  if (!data) return notFound();

  return (
    <div className="">
      <ResourcesListHero
        data={{
          title: data.title ?? "Resources",
          paragraph: data.paragraph,
        }}
      />
      <div>
        <ScienceResourcesClient />
        <PageBuilder sections={data?.sections} />
      </div>
    </div>
  );
}
