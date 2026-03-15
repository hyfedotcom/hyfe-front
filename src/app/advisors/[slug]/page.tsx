import { LocationsType } from "@/app/careers/components/LocationsType";
import { Sheet } from "@/components/layouts/sheet/Sheet";
import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { RichText } from "@/app/(resources + privacy)/components/details/detailsRender/RichText";
import { getSlugs } from "@/features/shared/api/getSlugs";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAdvisorMember } from "@/features/advisors/api/getAdvisorMembers";
import { isValidCmsPathSegment } from "@/shared/utils/isValidCmsPathSegment";

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

  if (!isValidCmsPathSegment(slug)) return fallback;

  const slugs = await getSlugs("advisors");
  if (!slugs.includes(slug)) return fallback;

  const member = await getAdvisorMember(slug);
  if (!member?.seo) return fallback;
  return getSeoMetadata(member.seo);
}

export default async function Member({ params }: { params: Props }) {
  const { slug } = await params;
  if (!isValidCmsPathSegment(slug)) notFound();
  const slugs = await getSlugs("advisors");
  if (!slugs.includes(slug)) notFound();
  const member = await getAdvisorMember(slug);
  if (!member) notFound();
  const { biography, image, job, location, name } = member;
  return (
    <Sheet
      returnPath="/advisors"
      animation={false}
      ariaLabel="Advisor details"
    >
      <div className="max-w-[970px] mx-auto pt-10 px-4 md:px-10">
        <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] mb-10">
          <Image
            src={image.url}
            alt={image.alt ?? name}
            fill
            preload
            sizes="(max-width: 639px) 160px, (max-width: 767px) 200px, (max-width: 1023px) 240px, 280px"
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
