import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";
import getAbout from "@/features/about/api/getAbout";
import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateMetadata() {
  const fallback: Metadata = {
    title: "",
    description: "",
    robots: { index: false, follow: false },
  };
  const data = await getAbout();

  if (!data || !data.seo) return fallback;
  return getSeoMetadata(data.seo);
}

export default async function About() {
  const about = await getAbout();
  if (!about.sections) return notFound();

  return (
    <>
      {about.seo && <SeoStructuredData seo={about.seo} id="about-seo-jsonld" />}
      <PageBuilder sections={about.sections} />
    </>
  );
}
