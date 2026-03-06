import { ResourceDetails } from "@/app/(resources + privacy)/components/details/ResourceDetails";
import { getResource } from "@/features/resources";
import { buildResourceDetailsBlocks } from "@/features/resources/utils/ResourceDetailsBuilder";
import { ResourceDetailsHero } from "@/app/(resources + privacy)/components/details/ResourceDetailsHero";
import { notFound } from "next/navigation";
import { SheetShare } from "@/components/layouts/sheet/SheetShare";

export const dynamic = "force-static";
export const revalidate = 86400;

type PageProps = {
  params: Promise<Params>;
};

type Params = { slug: string };

export default async function ResourceSingle({ params }: PageProps) {
  const { slug } = await params;

  const resource = await getResource({ type: "white-papers", slug });
  if (!resource) {
    return notFound();
  }

  const blocks = await buildResourceDetailsBlocks({
    blocks: resource.blocks,
    resourceType: "white-papers",
    slugException: slug,
  });

  return (
    <>
      <SheetShare />
      <div className="max-w-screen relative overflow-hidden">
        <div className="max-w-screen min-[1200px]:w-[70%] mx-auto max-w-258 pt-[60px] px-4 md:px-10">
          <ResourceDetailsHero data={resource} type={"white-papers"} />
          <ResourceDetails
            data={blocks}
            resourceType={"white-papers"}
            closeMode="swap"
          />
        </div>
      </div>
    </>
  );
}
