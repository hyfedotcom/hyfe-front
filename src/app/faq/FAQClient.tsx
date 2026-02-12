"use client";

import { JumpLinks } from "@/components/navigation/JumpLinks";
import { FAQSection } from "./FAQSection";
import { FaqSectionType } from "@/features/faq/schema/faq.schema";
import { useMemo } from "react";
import { useActiveSection } from "./useActiveSection";

export function FAQClient({ sections }: { sections: FaqSectionType[] }) {
  const slugify = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "-");

  const items = useMemo(
    () => sections.map((s) => ({ id: slugify(s.title), label: s.title })),
    [sections],
  );

  const { activeId, setActiveId } = useActiveSection(
    items.map((x) => x.id),
    280,
  );

  const onSelect = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const targetTop = section.getBoundingClientRect().top + window.scrollY - 200;

    setTimeout(() => setActiveId(id), 500);
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="flex gap-10 justify-center">
      <div className="hidden lg:block mt-[40px] h-full w-full max-w-[300px] sticky top-40">
        <JumpLinks items={items} activeId={activeId} onSelect={onSelect} />
      </div>
      <div className="space-y-25">
        {sections.map((s, i) => (
          <FAQSection key={i} section={s}></FAQSection>
        ))}
      </div>
    </div>
  );
}
