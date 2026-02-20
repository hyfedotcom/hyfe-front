import { notFound } from "next/navigation";
import { LocationsType } from "../components/LocationsType";
import { TimeZone } from "../components/TimeZone";
import { EmploymentType } from "../components/EmploymentType";
import { RichText } from "@/app/(resources)/components/details/detailsRender/RichText";
import { Button } from "@/components/ui/buttons/Button";
import { Sheet } from "@/components/layouts/sheet/Sheet";
import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { getSlugs } from "@/features/shared/api/getSlugs";
import getVacancy from "@/features/careers/api/getVacancy";

export const dynamic = "force-static";
export const revalidate = 86400;

type Props = {
  slug: string;
};

export async function generateStaticParams() {
  const slugs = await getSlugs("vacancies-items");
  return slugs.map((s) => ({ slug: s }));
}

export async function generateMetadata({ params }: { params: Props }) {
  try {
    const { slug } = await params;
    const vacancy = await getVacancy(slug);

    if (!vacancy.seo) {
      return {
        title: "Page not found",
        description: "This page does not exist.",
        robots: { index: false, follow: false },
      };
    }

    if (!vacancy) {
      return {
        title: "Page",
        description: "Default description",
        robots: { index: false, follow: false },
      };
    }

    return getSeoMetadata(vacancy.seo);
  } catch (e) {
    console.error(`SEO error on slug (metadata):`, e);
    return {
      title: "Resource Page",
      description: "Default description",
      robots: { index: false, follow: false },
    };
  }
}

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
    <Sheet returnPath="/careers">
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
    </Sheet>
  );
}
