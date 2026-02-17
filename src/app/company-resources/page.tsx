import { ResourcesListHero } from "@/features/resources/client";
import { ResourceButton } from "@/app/(resources)/components/ui/ResourceButton";
import { notFound } from "next/navigation";
import { getPageResource } from "@/features/resources/data/api/getResourceFeedPage";
import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";
import { CompanyResourcesClient } from "./components/CompanyResourcesClient";

export const dynamic = "force-static";
export const revalidate = 86400;

export default async function ScienceResources() {
  const data = await getPageResource({ slug: "company-resource" });

  if (!data) return notFound();

  return (
    <div className="relative">
      <ResourcesListHero
        data={{
          title: data.title ?? "Resources",
          paragraph: data.paragraph,
        }}
      />
      <div>
        <CompanyResourcesClient />
        <PageBuilder sections={data?.sections} />
      </div>
    </div>
  );
}
