import { LocationsType } from "@/app/careers/components/LocationsType";
import { Sheet } from "@/components/layouts/sheet/Sheet";
import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { RichText } from "@/app/(resources + privacy)/components/details/detailsRender/RichText";
import { getSlugs } from "@/features/shared/api/getSlugs";
import { getMember } from "@/features/team/api/getMembers";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import FacebookIcon from "@/shared/icons/socialMedia/FacebookIcon";
import { RESOURCE_ICONS } from "@/app/(resources + privacy)/components/navigation/resourceNav.utils";
import { ICONS } from "@/shared/icons/resources";
import LinkedinIcon from "@/shared/icons/socialMedia/LinkedinIcon";

export const dynamic = "force-static";
export const revalidate = 86400;

type Props = {
  slug: string;
};

export async function generateStaticParams() {
  const slugs = await getSlugs("teams");
  return slugs.map((s) => ({ slug: s }));
}

export async function generateMetadata({ params }: { params: Props }) {
  const { slug } = await params;
  const fallback: Metadata = {
    title: "",
    description: "",
    robots: { index: false, follow: false },
  };

  const member = await getMember(slug);
  if (!member?.seo) return fallback;
  return getSeoMetadata(member.seo);
}

export default async function Member({ params }: { params: Props }) {
  const { slug } = await params;
  const member = await getMember(slug);
  if (!member) notFound();

  const { biography, image, job, location, name, linkedin, twitter } = member;

  const Linkedin = ICONS.Linkedin;
  const Twitter = ICONS.Twitter;

  return (
    <Sheet returnPath="/team" animation={false} ariaLabel="Team member details">
      <div className="max-w-[970px] mx-auto pt-10 md:pt-15 lg:pt-20 px-4 md:px-10">
        <div className="relative w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] lg:w-[300px] lg:h-[300px] mb-4">
          <Image
            src={image.url}
            alt={image.alt ?? name}
            fill
            preload
            quality={70}
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 400px"
            className="object-cover rounded-full border-2 border-border"
          />
        </div>
        <div className="space-y-5 md:space-y-8 lg:space-y-10">
          <div className="space-y-3 mb-5 md:mb-10">
            <h1 className="text-[28px]! md:text-[34px]! lg:text-[40px]!">
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
    </Sheet>
  );
}
