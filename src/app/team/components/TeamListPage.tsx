import { getTeam } from "@/features/team/api/getTeam";
import { MemberCard } from "./MemberCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";

export default async function TeamListPage() {
  const team = await getTeam();
  if (!team) return notFound();
  const { paragraph, sections, title } = team;
  return (
    <div className="px-4 md:px-10 xl:px-20  pb-[100px] md:pb-[140px]">
      <SeoStructuredData seo={team.seo} id="team-seo-jsonld" />
      <div className="max-w-[1220px] mx-auto">
        <main className="pt-[240px] pb-[100px] space-y-5">
          <h1 className="mx-auto">{title}</h1>
          {paragraph && <p className="mx-auto">{paragraph}</p>}
        </main>
        <div className="space-y-20">
          {sections.map((section) => (
            <div className="space-y-5" key={section.title}>
              {section.title && <h3>{section.title}</h3>}
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 md:mx-0 md:pb-0 md:grid md:gap-5 md:grid-cols-3 lg:grid-cols-4 md:overflow-visible">
                {section.members?.map((item, index) => (
                  <Link
                    key={index}
                    href={`/team/${item.slug}`}
                    scroll={false}
                    className="block flex-none w-[70vw] max-w-[280px] h-full first:ml-4 last:mr-4 md:w-auto md:max-w-none md:first:ml-0 md:last:mr-0"
                  >
                    <MemberCard member={item} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
