import { ResourcesListHero } from "@/features/resources/client";
import { notFound } from "next/navigation";
import { getPageResource } from "@/features/resources/data/api/getResourceFeedPage";
import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";
import { ScienceResourcesClient } from "./components/ScienceResourcesClient";

export const dynamic = "force-static";
export const revalidate = 86400;

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
