import { ResourceDetails } from "@/app/(resources + privacy)/components/details/ResourceDetails";
import {
  getResource,
  getResourceSlugs,
  ResourceType,
} from "@/features/resources";
import { buildResourceDetailsBlocks } from "@/features/resources/utils/ResourceDetailsBuilder";
import { ResourceDetailsHero } from "@/app/(resources + privacy)/components/details/ResourceDetailsHero";
import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { Metadata } from "next";
import { Sheet } from "@/components/layouts/sheet/Sheet";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";
import { buildArticleJsonLd } from "@/components/seo/jsonLdBuilders";
import { notFound } from "next/navigation";
import { isResourceType } from "@/features/resources/data/api/resourceType";
import { SheetShare } from "@/components/layouts/sheet/SheetShare";
import { isValidCmsPathSegment } from "@/shared/utils/isValidCmsPathSegment";

export const dynamic = "force-static";
export const revalidate = 86400;

type PageProps = {
  params: Promise<Params>;
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
      const slugs = await getResourceSlugs(type);
      if (!slugs.length) return [];
      return slugs.map((slug) => ({ type, slug }));
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

    if (!isValidCmsPathSegment(type) || !isValidCmsPathSegment(slug)) {
      return {
        title: "Page not found",
        description: "This page does not exist.",
        robots: { index: false, follow: false },
      };
    }

    if (!isResourceType(type)) {
      return {
        title: "Page not found",
        description: "This page does not exist.",
        robots: { index: false, follow: false },
      };
    }

    const slugs = await getResourceSlugs(type);
    if (!slugs.includes(slug)) {
      return {
        title: "Page not found",
        description: "This page does not exist.",
        robots: { index: false, follow: false },
      };
    }

    const resource = await getResource({ type, slug });

    if (!resource || !resource.seo) {
      return {
        title: "Page not found",
        description: "This page does not exist.",
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

  if (!isValidCmsPathSegment(type) || !isValidCmsPathSegment(slug)) {
    return notFound();
  }

  if (!isResourceType(type)) {
    return notFound();
  }

  const slugs = await getResourceSlugs(type);
  if (!slugs.includes(slug)) {
    return notFound();
  }

  const returnPath = `/${type}`;

  const resource = await getResource({ type, slug });
  if (!resource) {
    return notFound();
  }
  const citationForShare =
    type === "publications" && resource.citation?.trim()
      ? resource.citation.trim()
      : undefined;

  const blocks = await buildResourceDetailsBlocks({
    blocks: resource.blocks,
    resourceType: type as ResourceType,
    slugException: slug,
  });

  return (
    <>
      <JsonLd
        data={buildArticleJsonLd({
          resource,
          type: type as ResourceType,
        })}
        id="resource-article-jsonld"
      />
      <SeoStructuredData seo={resource.seo} id="resource-seo-jsonld" />
      <Sheet
        returnPath={returnPath}
        animation={false}
        ariaLabel="Resource details"
      >
        <SheetShare citation={citationForShare} />
        <div className="max-w-screen relative overflow-hidden">
          <div className="max-w-screen min-[1200px]:w-[70%] mx-auto max-w-258 pt-[60px] px-4 md:px-10">
            <ResourceDetailsHero data={resource} type={type} />
            <ResourceDetails
              data={blocks}
              resourceType={type as ResourceType}
              closeMode={"close"}
            />
          </div>
        </div>
      </Sheet>
    </>
  );
}
