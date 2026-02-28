"use client";

import { FaqSectionType } from "@/features/faq/schema/faq.schema";
import FAQItem from "./FAQItem";
import { useState } from "react";

export function FAQSection({ section }: { section: FaqSectionType }) {
  const [active, setActive] = useState<null | number>(null);

  function toggle(i: number) {
    setActive((prev) => (prev === i ? null : i));
  }

  return (
    <section
      id={section ? section.title.replace(/ /g, "-").trim().toLowerCase() : "1"}
      className="w-full  space-y-5 "
    >
      <h2 className="mb-5 text-[22px]! md:text-[32px]! lg:min-w-[600px] xl:min-w-[800px] 2xl:min-w-[1000px]">
        {section ? section.title : `Finded: FAQ`}
      </h2>

      <div className="space-y-4 w-full ">
        {section.faqs?.map((f, i) => (
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
  );
}
