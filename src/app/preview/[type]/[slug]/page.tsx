import { getResource, ResourceType } from "@/features/resources";
import { ResourceDetails } from "@/app/(resources)/components/details/ResourceDetails";
import { ResourceDetailsHero } from "@/app/(resources)/components/details/ResourceDetailsHero";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildResourceDetailsBlocks } from "@/features/resources/utils/ResourceDetailsBuilder";

type Params = {
  type: string;
  slug: string;
  isEnabled: boolean;
};

export default async function Page({ params }: { params: Params }) {
  const { slug, type } = await params;
  const { isEnabled } = await draftMode();
  const isDraft = isEnabled;

  const resource = await getResource({ type, slug, isDraft });

  if (!resource) return notFound();
  const blocks = await buildResourceDetailsBlocks({
    blocks: resource.blocks,
    resourceType: type as ResourceType,
  });

  return (
    <div className="w-full min-[1200px]:w-[70%] mx-auto max-w-258 pt-[260px] px-4 md:px-10 z-10000 relative">
      <div className="fixed -translate-x-1/2 left-1/2 top-0 w-screen  bg-white shadow-classic">
        <div className="mx-auto w-max py-4  flex gap-4 items-center">
          You are using the draft mode
          <Link
            className="py-2 px-4 bg-activ border-black border-2"
            href={"/api/preview/exit"}
          >
            Exit draft mode
          </Link>
        </div>
      </div>
      <ResourceDetailsHero data={resource} type={type} />
      <ResourceDetails
        data={blocks}
        resourceType={type as ResourceType}
      />
    </div>
  );
}
