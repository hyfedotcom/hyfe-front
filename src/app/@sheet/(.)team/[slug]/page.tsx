import { LocationsType } from "@/app/careers/components/LocationsType";
import { RichText } from "@/app/(resources + privacy)/components/details/detailsRender/RichText";
import { getMember } from "@/features/team/api/getMembers";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 86400;

type Props = {
  slug: string;
};

export default async function Member({ params }: { params: Props }) {
  const { slug } = await params;
  const member = await getMember(slug);
  if (!member) notFound();
  const { biography, image, job, location, name } = member;
  return (
    <div className="max-w-[970px] mx-auto pt-10 px-4 md:px-10">
      <div className="relative w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] lg:w-[320px] lg:h-[320px] mb-10">
        <Image
          src={image.url}
          alt={image.alt ?? name}
          fill
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 400px"
          className="object-cover rounded-full border-2 border-border"
        />
      </div>
      <div className="space-y-10">
        <div className="space-y-3 mb-10">
          <h1 className="text-[28px]! md:text-[52px]!">{name}</h1>
          <h4>{job}</h4>
        </div>
        {location && <LocationsType location_type={location} />}
        <RichText blocks={biography.content} />
      </div>
    </div>
  );
}
