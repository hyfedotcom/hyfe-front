import { getTeam } from "@/features/team/api/getTeam";
import { MemberCard } from "./MemberCard";
import Link from "next/link";
import { toSlug } from "@/shared/utils/toSlug";
import { notFound } from "next/navigation";

export default async function TeamListPage() {
  const team = await getTeam();
  if (!team) return notFound();
  const { paragraph, sections, title } = team;
  return (
    <div className="">
      <div className="max-w-[1220px] mx-auto">
        <main className="pt-[240px] pb-[100px] space-y-5">
          <h1>{title}</h1>
          {paragraph && <p>{paragraph}</p>}
        </main>
        <div className="space-y-20">
          {sections.map((section) => (
            <div className="space-y-5" key={section.title}>
              {section.title && <h3>{section.title}</h3>}
              <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {section.members?.map((item, index) => (
                  <Link key={index} href={`/team/${toSlug(item.name)}`}>
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
