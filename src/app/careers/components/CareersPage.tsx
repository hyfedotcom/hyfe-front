import getCareers from "@/features/careers/api/getCareers";
import { CareersType } from "@/features/careers/schema/careers.schema";
import Image from "next/image";
import { notFound } from "next/navigation";

import Link from "next/link";
import { VacancyItem } from "./VacancyItem";

export default async function CareersPage() {
  const careers = await getCareers();
  if (!careers) notFound();
  const { images, paragraph, title, vacancies } = careers as CareersType;
  return (
    <div className="mx-auto w-full max-w-[950px] px-4 md:px-10">
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
            <Link key={i} href={`/careers/${v.slug}`}>
              <VacancyItem vacancy={v} />
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
