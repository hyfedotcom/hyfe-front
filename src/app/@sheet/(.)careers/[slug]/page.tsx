import { notFound } from "next/navigation";
import { RichText } from "@/app/(resources + privacy)/components/details/detailsRender/RichText";
import { Button } from "@/components/ui/buttons/Button";
import getVacancy from "@/features/careers/api/getVacancy";
import { LocationsType } from "@/app/careers/components/LocationsType";
import { TimeZone } from "@/app/careers/components/TimeZone";
import { EmploymentType } from "@/app/careers/components/EmploymentType";

export const dynamic = "force-static";
export const revalidate = 86400;

type Props = {
  slug: string;
};
export default async function VacancySingle({ params }: { params: Props }) {
  const { slug } = await params;
  const vacancy = await getVacancy(slug);
  if (!vacancy) return notFound();
  const {
    apply_link,
    employment_type,
    location_type,
    rich_text,
    time_zone,
    title,
  } = vacancy;
  return (
    <div className="max-w-[950px] mt-10 space-y-10 md:space-y-16 mx-auto py-10 md:py-14 px-4 md:px-10">
      <main className="space-y-6 md:space-y-10">
        <div className="space-y-4 md:space-y-6">
          <div className="flex gap-3 md:gap-5 flex-wrap">
            <LocationsType location_type={location_type} />
            <TimeZone time_zone={time_zone} />
            <EmploymentType employment_type={employment_type} />
          </div>
          <h1 className="text-[22px]! md:text-[42px]! lg:text-[52px]!">
            {title}
          </h1>
        </div>
        <Button
          label="APPLY NOW"
          url={apply_link}
          arrow={true}
          tag="a"
          classNameProp=" justify-between px-5"
        ></Button>
      </main>
      <section>
        <RichText blocks={rich_text.content} />
        <Button
          label="APPLY NOW"
          url={apply_link}
          arrow={true}
          tag="a"
          classNameProp=" justify-between px-5"
        ></Button>
      </section>
    </div>
  );
}
