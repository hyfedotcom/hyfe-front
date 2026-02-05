import { getTeam } from "@/features/team/api/getTeam";
import { MemberCard } from "./MemberCard";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TeamListPage() {
  const team = await getTeam();
  if (!team) return notFound();
  const { paragraph, sections, title } = team;
  return (
    <div className="px-4 md:px-10 lg:px-20">
      <div className="max-w-[1220px] mx-auto">
        <main className="pt-[240px] pb-[100px] space-y-5">
          <h1 className="mx-auto">{title}</h1>
          {paragraph && <p className="mx-auto">{paragraph}</p>}
        </main>
        <div className="space-y-20">
          {sections.map((section) => (
            <div className="space-y-5" key={section.title}>
              {section.title && <h3>{section.title}</h3>}
              <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {section.members?.map((item, index) => (
                  <Link key={index} href={`/team/${item.slug}`}>
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
