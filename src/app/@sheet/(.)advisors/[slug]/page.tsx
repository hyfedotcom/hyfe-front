import { LocationsType } from "@/app/careers/components/LocationsType";
import { RichText } from "@/app/(resources + privacy)/components/details/detailsRender/RichText";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAdvisorMember } from "@/features/advisors/api/getAdvisorMembers";

export const dynamic = "force-static";
export const revalidate = 86400;

type Props = {
  slug: string;
};

export default async function Member({ params }: { params: Props }) {
  const { slug } = await params;
  const member = await getAdvisorMember(slug);
  if (!member) notFound();
  const { biography, image, job, location, name } = member;
  return (
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
          <h1 className="text-[24px]! md:text-[28px]! lg:text-[32px] xl:text-[36px]! 2xl:text-[40px]!">{name}</h1>
          <p className="body-large text-black! font-medium!">{job}</p>
        </div>
        {location && <LocationsType location_type={location} />}
        <RichText blocks={biography.content} />
      </div>
    </div>
  );
}
