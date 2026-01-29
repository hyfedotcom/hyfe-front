import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { RecourcesList, ResourcesListHero } from "@/features/resources/client";
import { getResourcesList } from "@/features/resources";
import { ResourcesNavTabs } from "@/features/resources/components/navigation/ResourcesNavTabs";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = false;

type PageProps = {
  params: { type: string };
};

type Params = { type: string };

export async function generateStaticParams() {
  return ["publications", "insights", "white-papers", "news", "cough-news"].map(
    (type) => ({ type }),
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const fallback: Metadata = {
    title: "",
    description: "",
    robots: { index: false, follow: false },
  };

  try {
    const { type } = await params;
    const data = await getResourcesList({ type });

    if (!data?.landing) {
      return fallback;
    }

    if (!data?.landing.seo) {
      return fallback;
    }
    return getSeoMetadata(data.landing.seo);
  } catch (e) {
    console.error(`Seo error on slug(metadata):`, e);
    return fallback;
  }
}

export default async function Recourcelist({ params }: PageProps) {
  const { type } = await params;

  const data = await getResourcesList({ type });
  if (!data?.landing) notFound();
  if (!data?.landing) notFound();
  const { landing, list } = data;

  const tags = list.flatMap((l) => l.tags.map((t) => t.tag));

  return (
    <div className="w-full  space-y-10 relative">
      <div className=" mx-auto space-y-10">
        <ResourcesListHero
          data={{ ...landing, paragraph: landing.paragraph ?? null }}
          type={type}
        />
        <RecourcesList tags={tags} data={list} type={type} />
        <ResourcesNavTabs type={type} />
      </div>
    </div>
  );
}
