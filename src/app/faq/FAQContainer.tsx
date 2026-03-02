"use client";

import { filterFaqSections } from "@/features/faq/utils/filterSections";
import { FaqSectionType } from "@/features/faq/schema/domain";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { FAQSection } from "./FAQSection";
import Link from "next/link";

export default function FAQContainer({
  sections,
}: {
  sections: FaqSectionType[];
}) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const filteredSections = useMemo(
    () => filterFaqSections(sections, search),
    [sections, search],
  );

  return (
    <div className="space-y-25 max-w-[1000px]">
      {filteredSections.length > 0 ? (
        filteredSections.map((s) => (
          <FAQSection key={s.title} section={s}></FAQSection>
        ))
      ) : (
        <div className="w-full max-w-[1000px] h-[300px] p-4 md:p-10 xl:p-20 bg-gradient-to-bl rounded-2xl from-primary-100/40 via-primary-100/40 to-primary-100/40 flex items-center justify-center">
          <div className="flex items-center flex-col gap-5 text-center!">
            <h4>
              No results for{" "}
              <span className="text-black font-bold">&quot;{search}&quot;</span>
            </h4>
            <Link
              href="/faq"
              scroll={false}
              className="py-2 px-4 mx-auto bg-black text-white font-medium rounded-2xl"
            >
              Clear Search
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
