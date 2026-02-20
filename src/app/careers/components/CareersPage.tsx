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
      <main className="space-y-7 md:space-y-11 pb-12 md:pb-[60px] ">
        <div className="pt-[120px] md:pt-[140px] text-center space-y-3 md:space-y-6">
          <h1 className="text-left md:text-center ">{title}</h1>
          <p className="body-large text-balance text-left md:text-center">{paragraph}</p>
        </div>
        {images &&
          images.map((image, i) => (
            <Image
              key={i}
              src={image.url}
              alt={image.alt ?? "hyfe team"}
              width={image.width}
              height={image.height}
              className="mx-auto rounded-[8px] object-cover max-h-[300px] md:max-h-[400px] lg:max-h-[450px]"
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
