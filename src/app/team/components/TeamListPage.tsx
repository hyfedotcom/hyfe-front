import { getTeam } from "@/features/team/api/getTeam";
import { MemberCard } from "./MemberCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";
import { HorizontalRailClient } from "@/components/ui/rail/HorizontalRailClient";

export default async function TeamListPage() {
  const team = await getTeam();
  if (!team) return notFound();
  const { paragraph, sections, title } = team;
  return (
    <div className="px-4 md:px-10 xl:px-20 pb-[100px] md:pb-[140px]">
      <SeoStructuredData seo={team.seo} id="team-seo-jsonld" />
      <div className="max-w-[1220px] mx-auto">
        <main className="pt-[100px] md:pt-[160px] pb-[40px] md:pb-[80px]  space-y-5">
          <h1 className="mx-auto">{title}</h1>
          {paragraph && <p className="mx-auto">{paragraph}</p>}
        </main>
        <div className="space-y-20">
          {sections.map((section) => (
            <div className="space-y-5" key={section.title}>
              {section.title && (
                <h3 className=" text-[22px]! md:text-[32px]!">
                  {section.title}
                </h3>
              )}
              <HorizontalRailClient
                hasManyCards={false}
                className="  max-md:w-screen! max-md:-translate-x-4"
                classScoll="overflow-x-auto md:overflow-x-visible"
                classNameBtn="md:hidden"
              >
                <div className="items-stretch flex gap-3 md:gap-4 max-md:w-screen! pb-2 max-md:px-4  md:mx-0 md:pb-0 md:grid md:gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {section.members?.map((item, index) => (
                    <Link
                      key={index}
                      href={`/team/${item.slug}`}
                      scroll={false}
                      data-card
                      className="flex self-stretch flex-none  w-[60vw] max-w-[280px]   md:w-auto md:max-w-none"
                    >
                      <MemberCard member={item} />
                    </Link>
                  ))}
                </div>
              </HorizontalRailClient>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
