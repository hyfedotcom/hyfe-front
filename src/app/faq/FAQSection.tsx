"use client";

import { FaqSectionType } from "@/features/faq/schema/faq.schema";
import FAQItem from "./FAQItem";
import { useState } from "react";

export function FAQSection({ section }: { section: FaqSectionType }) {
  const [active, setActive] = useState<null | string>(null);

  function toggle(i: string) {
    setActive((prev) => (prev === i ? null : i));
  }

  return (
    <section
      id={section.title.replace(/\s+/g, "-").trim().toLowerCase()}
      className="w-full  space-y-5 "
    >
      <h2 className="mb-5 text-[22px]! md:text-[32px]! w-full max-w-[1000px]">
        {section.title}
      </h2>

      <div className="space-y-4 w-full ">
        {section.faqs?.map((f) => (
          <FAQItem
            key={f.id}
            answer={f.answer}
            question={f.question}
            active={active === f.id}
            onToggle={() => toggle(f.id)}
          />
        ))}
      </div>
    </section>
  );
}
