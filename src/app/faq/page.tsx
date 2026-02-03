import { getFaqPage } from "@/features/faq/api/getFaq";
import { notFound } from "next/navigation";
import { FAQClient } from "./FAQClient";

export default async function FAQ({}) {
  const data = await getFaqPage();

  if (!data) return notFound();
  const { paragraph, sections, title } = data;

  return (
    <div className="px-4 md:px-10 xl:px-20">
      <div className=" gap-10 w-full 2xl:w-[80%] mx-auto">
        <main className="pt-[260px] pb-[60px] lg:ml-[340px]">
          <div className="space-y-5">
            <h1>{title}</h1>
            <p>{paragraph}</p>
          </div>
        </main>
        <FAQClient sections={sections} />
      </div>
    </div>
  );
}
