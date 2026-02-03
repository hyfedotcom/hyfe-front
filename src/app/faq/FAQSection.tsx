"use client";

import { FaqSectionType } from "@/features/faq/schema/faq.schema";
import FAQItem from "./FAQItem";
import { useState } from "react";

export function FAQSection({ section }: { section: FaqSectionType }) {
  const { faqs, title } = section;
  const [active, setActive] = useState<null | number>(null);

  function toggle(i: number) {
    setActive((prev) => (prev === i ? null : i));
  }

  return (
    <section
      id={title.replace(/ /g, "-").trim().toLowerCase()}
      className="w-full  space-y-5 "
    >
      <h3 className="mb-5">{title}</h3>

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
  );
}
