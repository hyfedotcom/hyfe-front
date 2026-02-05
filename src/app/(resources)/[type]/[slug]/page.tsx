import { ResourceDetails } from "@/app/(resources)/components/details/ResourceDetails";
import { ResourceButtonBack } from "@/app/(resources)/components/ui/ResourceButtonBack";
import {
  getResource,
  getResourcesList,
  ResourceType,
} from "@/features/resources";
import { ResourceDetailsHero } from "@/app/(resources)/components/details/ResourceDetailsHero";
import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { Metadata } from "next";
import { Sheet } from "@/components/layouts/sheet/Sheet";

export const dynamic = "force-static";
export const revalidate = false;

type PageProps = {
  params: { slug: string; type: string };
};

type Params = { slug: string; type: string };

const TYPES = [
  "publications",
  "insights",
  "white-papers",
  "news",
  "cough-news",
] as const;

export async function generateStaticParams(): Promise<Params[]> {
  const all = await Promise.all(
    TYPES.map(async (type) => {
      const data = await getResourcesList({ type });
      if (!data?.list?.length) return [];
      return data.list.map((item) => ({ type, slug: item.slug }));
    }),
  );

  return all.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  try {
    const { slug, type } = await params;
    const resource = await getResource({ type, slug });

    if (!resource.seo) {
      return {
        title: "Page not found",
        description: "This page does not exist.",
        robots: { index: false, follow: false },
      };
    }

    if (!resource) {
      return {
        title: "Page",
        description: "Default description",
        robots: { index: false, follow: false },
      };
    }

    return getSeoMetadata(resource.seo);
  } catch (e) {
    console.error(`SEO error on slug (metadata):`, e);
    return {
      title: "Resource Page",
      description: "Default description",
      robots: { index: false, follow: false },
    };
  }
}

export default async function ResourceSingle({ params }: PageProps) {
  const { slug, type } = await params;

  const resource = await getResource({ type, slug });

  return (
    <Sheet returnPath={type}>
      <div className="w-full relative overflow-hidden">
        {/* <ResourceButtonBack label={`All ${type}`} url={`/${type}`} /> */}
        <div className="w-full min-[1200px]:w-[70%] mx-auto max-w-258 pt-[60px] px-4 md:px-10">
          <ResourceDetailsHero data={resource} type={type} />
          <ResourceDetails
            data={resource.blocks}
            resourceType={type as ResourceType}
          />
        </div>
      </div>
    </Sheet>
  );
}
