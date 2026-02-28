"use client"

import { useSearchParams } from "next/navigation";
import { FAQSection } from "./FAQSection";
import { FaqSectionType } from "@/features/faq/schema/domain";
import { normalize } from "path";
import FAQItem from "./FAQItem";
import { useState } from "react";

export default function FAQContainer({
  sections,
}: {
  sections: FaqSectionType[];
}) {
  const [active, setActive] = useState<null | number>(null);

  function toggle(i: number) {
    setActive((prev) => (prev === i ? null : i));
  }
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const tokens = search != null ? search.split(/\s+/).filter(Boolean) : [];

  const faqs =
    tokens.length > 0
      ? sections.flatMap((s) =>
          s.faqs.filter((f) => {
            const key = normalize(f.question);

            return tokens.every((t) => key.includes(t));
          }),
        )
      : [];

  return (
    <div className="space-y-25">
      {faqs.length === 0 ? (
        sections.map((s, i) => <FAQSection key={i} section={s}></FAQSection>)
      ) : (
        <section className="w-full  space-y-5 ">
          <h2 className="mb-5 text-[22px]! md:text-[32px]! lg:min-w-[600px] xl:min-w-[800px] 2xl:min-w-[1000px]">
            {`Finded: FAQ`}
          </h2>

          <div className="space-y-4 w-full ">
            {faqs?.map((f, i) => (
              <FAQItem
                key={i}
                answer={f.answer}
                question={f.question}
                active={active === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
