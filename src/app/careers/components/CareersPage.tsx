import getCareers from "@/features/careers/api/getCareers";
import Image from "next/image";
import { notFound } from "next/navigation";

import Link from "next/link";
import { VacancyItem } from "./VacancyItem";
import { SeoStructuredData } from "@/components/seo/SeoStructuredData";

export default async function CareersPage() {
  const careers = await getCareers();
  if (!careers) notFound();
  const { images, paragraph, title, vacancies } = careers;
  return (
    <div className="mx-auto w-full max-w-[950px] px-4 md:px-10 pb-[100px] md:pb-[140px]">
      <SeoStructuredData seo={careers.seo} id="careers-seo-jsonld" />
      <main className="space-y-11  pb-[100px] ">
        <div className="pt-[240px] text-center space-y-6">
          <h1>{title}</h1>
          <p className="body-large">{paragraph}</p>
        </div>
        {images &&
          images.map((image, i) => (
            <Image
              key={i}
              src={image.url}
              alt={image.alt ?? "hyfe team"}
              width={image.width}
              height={image.height}
            />
          ))}
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
