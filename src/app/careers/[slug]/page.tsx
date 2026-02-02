import getCareers from "@/features/careers/api/getCareers";
import { CareersType } from "@/features/careers/schema/careers.schema";
import { notFound } from "next/navigation";
import { LocationsType } from "../components/LocationsType";
import { TimeZone } from "../components/TimeZone";
import { EmploymentType } from "../components/EmploymentType";
import { RichText } from "@/features/resources/components/details/detailsRender/RichText";
import { Button } from "@/components/ui/buttons/Button";
import { Sheet } from "@/components/layouts/sheet/Sheet";
import Link from "next/link";

type Props = {
  slug: string;
};

export default async function Vacancysingle({ params }: { params: Props }) {
  const { slug } = await params;
  const careerData = await getCareers();
  const vacanci = careerData.vacancies.find((e) => e.slug === slug);
  if (!vacanci) return notFound();
  const {
    apply_link,
    employment_type,
    location_type,
    rich_text,
    time_zone,
    title,
  } = vacanci;
  return (
    <Sheet returnPath="/careers">
      <div className="max-w-[950px] space-y-10 md:space-y-16 mx-auto py-10 md:py-14 px-4 md:px-10">
        <main className="space-y-6 md:space-y-10">
          <h1 className="text-[28px]! md:text-[52px]!">{title}</h1>
          <div className="flex gap-3 md:gap-5 flex-wrap">
            <LocationsType location_type={location_type} />
            <TimeZone time_zone={time_zone} />
            <EmploymentType employment_type={employment_type} />
          </div>
        </main>
        <section>
          <RichText blocks={rich_text.content} />
          <Button label="APPLY NOW" url={apply_link} arrow={false} classNameProp="w-full flex items-center justify-center"></Button>
        </section>
      </div>
    </Sheet>
  );
}
