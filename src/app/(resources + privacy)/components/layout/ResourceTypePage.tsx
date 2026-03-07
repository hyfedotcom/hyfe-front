import { getResourcesList } from "@/features/resources";
import { ResourcesNavTabs } from "@/app/(resources + privacy)/components/navigation/ResourcesNavTabs";
import { notFound } from "next/navigation";
import { ResourceTypePageListMode } from "./ResourceTypePageListMode";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateStaticParams() {
  return ["publications", "insights", "white-papers", "news", "cough-news"].map(
    (type) => ({ type }),
  );
}

export default async function ResourceTypePage({ type }: { type: string }) {
  const data = await getResourcesList({ type });

  if (!data) notFound();

  const { landing, list } = data;

  const tags = list.flatMap((l) => l.tags.map((t) => t.tag));

  return (
    <div className="w-full space-y-10 relative pb-[100px] md:pb-[140px]">
      <div className=" mx-auto md:space-y-5">
        <ResourceTypePageListMode
          landing={landing}
          list={list}
          tags={tags}
          type={type}
        />
        <ResourcesNavTabs type={type} />
      </div>
    </div>
  );
}
