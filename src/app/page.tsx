import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { getPage } from "@/features/page-builder/data/api/getPage";
import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = false;


export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: "",
    description: "",
    robots: { index: false, follow: false },
  };

  try {
    const page = await getPage({ slug: "home" });

    if (!page?.seo) return fallback;

    return getSeoMetadata(page.seo);
  } catch (e) {
    console.error("Seo error on slug (metaData)", e);
    return fallback;
  }
}

export default async function Home() {
  const page = await getPage({ slug: "home" });
  if (!page?.sections) return notFound();

  return <PageBuilder sections={page?.sections} />;
}
