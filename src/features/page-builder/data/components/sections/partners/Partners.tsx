import { ContentContainer } from "@/components/content/ContentContainer";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { PartnersSectionType } from "../../../schema/pageBuilder";
import { PartnersCard } from "./PartnersCard";

export function Partners({ section }: { section: PartnersSectionType }) {
  const { logos } = section;

  function getCols(n: number) {
    // Tailwind классы должны быть статичными (выбираем из фиксированного списка)
    if (n <= 1) return "xl:grid-cols-1";
    if (n === 2) return "xl:grid-cols-2";
    if (n === 3) return "xl:grid-cols-3";
    if (n === 4) return "xl:grid-cols-4";
    if (n === 5) return "xl:grid-cols-5";
    // 6+ — потолок 6, дальше в несколько рядов (выглядит адекватно)
    return "xl:grid-cols-6";
  }

  return (
    <SectionContainer>
      <div className="space-y-10 md:space-y-15 bg-white">
        <ContentContainer content={section} width="max-w-[900px]" />
        <div
          className={`${getCols(logos.length)} grid items-center justify-center gap-3 md:gap-5 w-full mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 `}
        >
          {logos.map((p, i) => (
            <PartnersCard key={i} partner={p} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
