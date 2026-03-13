import { LocationsType } from "@/app/careers/components/LocationsType";
import { RichText } from "@/app/(resources + privacy)/components/details/detailsRender/RichText";
import { getMember } from "@/features/team/api/getMembers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ICONS } from "@/shared/icons/resources";

export const dynamic = "force-static";
export const revalidate = 86400;

type Props = {
  slug: string;
};

export default async function Member({ params }: { params: Props }) {
  const { slug } = await params;
  const member = await getMember(slug);
  if (!member) notFound();
  const { biography, image, job, location, name, linkedin, twitter } = member;

  const Linkedin = ICONS.Linkedin;
  const Twitter = ICONS.Twitter;

  return (
    <div className="max-w-[970px] mx-auto pt-10 md:pt-15 lg:pt-20 px-4 md:px-10">
      <div className="relative w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] lg:w-[300px] lg:h-[300px] mb-4">
        <Image
          src={image.url}
          alt={image.alt ?? name}
          fill
          preload
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 400px"
          className="object-cover rounded-full border-2 border-border"
        />
      </div>
      <div className="space-y-5 md:space-y-8 lg:space-y-10">
        <div className="space-y-3 mb-5 md:mb-10">
          <h1 className="text-[24px]! md:text-[28px]! lg:text-[32px] xl:text-[36px]! 2xl:text-[40px]!">
            {name}
          </h1>
          <h4 className="text-[16px]! md:text-[18px]! lg:text-[20px]! text-body!">
            {job}
          </h4>
          {linkedin || twitter ? (
            <div className="flex gap-3 items-center mt-4">
              {twitter && (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`${twitter}`}
                >
                  <Twitter className="w-7 h-7 md:w-9 md:h-9 text-black hover:text-black/70" />
                </a>
              )}
              {linkedin && (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`${linkedin}`}
                >
                  <Linkedin className="w-7 h-7 md:w-9 md:h-9 text-black hover:text-black/70" />
                </a>
              )}
            </div>
          ) : null}
        </div>

        {location && <LocationsType location_type={location} />}
        <RichText blocks={biography.content} />
      </div>
    </div>
  );
}
