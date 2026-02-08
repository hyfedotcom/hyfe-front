import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";
import { getSlugs } from "@/features/shared/api/getSlugs";
import getSolutionPage from "@/features/solutions/api/getSolutionPage";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";

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
  const page = await getSolutionPage({ slug });
  if (!page || !page.seo) return fallBack;
  return getSeoMetadata(page.seo);
}

export default async function SolutionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = await getSolutionPage({ slug });
  if (!page || !page.sections) return notFound();

  return (
    <>
      <SeoStructuredData seo={page.seo} id="solution-seo-jsonld" />
      <PageBuilder sections={page.sections}></PageBuilder>
    </>
  );
}
