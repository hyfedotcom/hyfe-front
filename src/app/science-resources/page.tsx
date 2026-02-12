import { ResourcesListHero } from "@/features/resources/client";
import { ResourceButton } from "@/app/(resources)/components/ui/ResourceButton";
import { notFound } from "next/navigation";
import { getPageResource } from "@/features/resources/data/api/getResourceFeedPage";
import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";

export const dynamic = "force-static";
export const revalidate = 86400;

export default async function ScienceResources() {
  const data = await getPageResource({ slug: "science-and-research-resource" });

  if (!data) return notFound();
  const resourceTypes: Array<"publications" | "white-papers" | "cough-news"> = [
    "publications",
    "white-papers",
    "cough-news",
  ];
  return (
    <div className="">
      <ResourcesListHero
        type={"science-resources"}
        data={{
          title: data.title ?? "Resources",
          paragraph: data.paragraph,
        }}
      />
      <div>
        <div className="resources-glass-sticky-wrap mt-10 w-max! overflow-visible!" >
          <div className="resources-glass-surface rounded-[30px]">
            <div aria-hidden="true" className="resources-glass-overlay" />
            <div aria-hidden="true" className="resources-glass-highlight" />
            <div className="resources-glass-bar-content ">
              <div className="flex min-w-0 gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {resourceTypes.map((t) => (
                  <ResourceButton
                    key={t}
                    label={t}
                    url={`#${t}`}
                    active
                    tag="Link"
                    classNameProp="resources-glass-resource-pill"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <PageBuilder sections={data?.sections} />
      </div>
    </div>
  );
}
