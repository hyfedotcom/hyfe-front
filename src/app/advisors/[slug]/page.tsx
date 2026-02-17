import { LocationsType } from "@/app/careers/components/LocationsType";
import { Sheet } from "@/components/layouts/sheet/Sheet";
import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { RichText } from "@/app/(resources)/components/details/detailsRender/RichText";
import { getSlugs } from "@/features/shared/api/getSlugs";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAdvisorMember } from "@/features/advisors/api/getAdvisorMembers";

export const dynamic = "force-static";
export const revalidate = 86400;

type Props = {
  slug: string;
};

export async function generateStaticParams() {
  const slugs = await getSlugs("advisors");
  return slugs.map((s) => ({ slug: s }));
}

export async function generateMetadata({ params }: { params: Props }) {
  const { slug } = await params;
  const fallback: Metadata = {
    title: "",
    description: "",
    robots: { index: false, follow: false },
  };

  const member = await getAdvisorMember(slug);
  if (!member?.seo) return fallback;
  return getSeoMetadata(member.seo);
}

export default async function Member({ params }: { params: Props }) {
  const { slug } = await params;
  const member = await getAdvisorMember(slug);
  if (!member) notFound();
  const { biography, image, job, linkedin, location, name, twitter } = member;
  return (
    <Sheet returnPath="/team">
      <div className="max-w-[970px] mx-auto pt-10 px-4 md:px-10">
        <div className="relative w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] lg:w-[320px] lg:h-[320px] mb-10">
          <Image
            src={image.url}
            alt={image.alt ?? name}
            fill
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 400px"
            className="object-cover rounded-full border border-border"
          />
        </div>
        <div className="space-y-10">
          <div className="space-y-1 mb-10">
            <h1 className="text-[28px]! md:text-[52px]!">{name}</h1>
            <p className="body-large text-black! font-medium!">{job}</p>
          </div>
          {location && <LocationsType location_type={location} />}
          <RichText blocks={biography.content} />
        </div>
      </div>
    </Sheet>
  );
}
