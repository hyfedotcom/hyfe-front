import { LocationsType } from "@/app/careers/components/LocationsType";
import { Sheet } from "@/components/layouts/sheet/Sheet";
import { RichText } from "@/features/resources/components/details/detailsRender/RichText";
import { getMember } from "@/features/team/api/getMembers";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  slug: string;
};

export default async function Member({ params }: { params: Props }) {
  const { slug } = await params;
  const member = await getMember(slug);
  if (!member) notFound();
  const { biography, image, job, linkedin, location, name, twitter } = member;
  return (
    <Sheet returnPath="/team">
      <div className="max-w-[970px] mx-auto pt-10 px-4 md:px-10">
        <div className="relative w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] lg:w-[400px] lg:h-[400px] mb-10">
          <Image
            src={image.url}
            alt={image.alt ?? name}
            fill
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 400px"
            className="object-cover rounded-full "
          />
        </div>
        <div className="space-y-15">
          <div className="space-y-3 mb-10">
            <h1>{name}</h1>
            <h4>{job}</h4>
          </div>
          {location && <LocationsType location_type={location} />}
          <RichText blocks={biography.content} />
        </div>
      </div>
    </Sheet>
  );
}
