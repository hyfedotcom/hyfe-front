import { MemberCard } from "./MemberCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdvisors } from "@/features/advisors/api/getAdvisors";

export default async function AdvisorsListPage() {
  const team = await getAdvisors();
  if (!team) return notFound();
  const { paragraph, advisors, title } = team;
  return (
    <div className="px-4 md:px-10 lg:px-20  pb-[100px] md:pb-[140px]">
      <div className="max-w-[1220px] mx-auto">
        <main className="pt-[240px] pb-[100px] space-y-5">
          <h1 className="mx-auto">{title}</h1>
          {paragraph && <p className="mx-auto">{paragraph}</p>}
        </main>
        <div className="space-y-20">
          <div className="space-y-5">
            <div className="grid gap-4 md:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {advisors.map((item, index) => (
                <Link
                  key={index}
                  href={`/advisors/${item.slug}`}
                  scroll={false}
                  className="block h-full"
                >
                  <MemberCard member={item} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
