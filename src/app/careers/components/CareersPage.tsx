import getCareers from "@/features/careers/api/getCareers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { VacancyItem } from "./VacancyItem";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";

export default async function CareersPage() {
  const careers = await getCareers();
  if (!careers) notFound();
  const {  paragraph, title, vacancies } = careers;
  return (
    <div className="mx-auto w-full max-w-[950px] px-4 md:px-10 pb-[100px] md:pb-[140px]">
      <SeoStructuredData seo={careers.seo} id="careers-seo-jsonld" />
      <main className="space-y-7 md:space-y-11 pb-12 md:pb-[60px] ">
        <div className="pt-[100px] md:pt-[160px] text-center space-y-3 md:space-y-6">
          <h1 className="text-left md:text-center font-medium!">{title}</h1>
          <p className="body-large text-balance text-left md:text-center">{paragraph}</p>
        </div>
      </main>
      {vacancies.length > 0 && (
        <section className="flex flex-col gap-5">
          {vacancies.map((v, i) => (
            <Link key={i} href={`/careers/${v.slug}`} scroll={false}>
              <VacancyItem vacancy={v} />
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
