import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";
import { solutionsPageBuilderRegistry } from "@/features/page-builder/data/components/pageBuilder.registry.solutions";
import { getSlugs } from "@/features/shared/api/getSlugs";
import getSolutionPage from "@/features/solutions/api/getSolutionPage";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";
import { isValidCmsPathSegment } from "@/shared/utils/isValidCmsPathSegment";

export const dynamic = "force-static";
export const revalidate = 86400;

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const slugs = await getSlugs("solutions");
  return slugs.map((s) => ({ slug: s }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const fallBack: Metadata = {
    title: "",
    description: "",
    robots: { follow: false, index: false },
  };

  const { slug } = await params;
  if (!isValidCmsPathSegment(slug)) return fallBack;
  const slugs = await getSlugs("solutions");
  if (!slugs.includes(slug)) return fallBack;
  const page = await getSolutionPage({ slug });
  if (!page || !page.seo) return fallBack;
  return getSeoMetadata(page.seo);
}

export default async function SolutionPage({ params }: { params: Params }) {
  const { slug } = await params;
  if (!isValidCmsPathSegment(slug)) return notFound();
  const slugs = await getSlugs("solutions");
  if (!slugs.includes(slug)) return notFound();
  const page = await getSolutionPage({ slug });
  if (!page || !page.sections) return notFound();

  return (
    <>
      <SeoStructuredData seo={page.seo} id="solution-seo-jsonld" />
      <PageBuilder
        registry={solutionsPageBuilderRegistry}
        sections={page.sections}
      ></PageBuilder>
    </>
  );
}
