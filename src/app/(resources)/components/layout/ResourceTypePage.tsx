import { RecourcesList, ResourcesListHero } from "@/features/resources/client";
import { getResourcesList } from "@/features/resources";
import { ResourcesNavTabs } from "@/app/(resources)/components/navigation/ResourcesNavTabs";
import { notFound } from "next/navigation";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateStaticParams() {
  return ["publications", "insights", "white-papers", "news", "cough-news"].map(
    (type) => ({ type }),
  );
}

export default async function ResourceTypePage({ type }: { type: string }) {
  const data = await getResourcesList({ type });

  if (!data?.landing) notFound();
  if (!data?.list) notFound();
  const { landing, list } = data;

  const tags = list.flatMap((l) => l.tags.map((t) => t.tag));

  return (
    <div className="w-full space-y-10 relative pb-[100px] md:pb-[140px]">
      <SeoStructuredData seo={landing.seo} id="resource-type-seo-jsonld" />
      <div className=" mx-auto md:space-y-10">
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
