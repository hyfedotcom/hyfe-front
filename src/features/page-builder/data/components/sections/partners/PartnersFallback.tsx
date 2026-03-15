import { PartnersCard } from "./PartnersCard";
import type { PartnersSectionType } from "../../../schema/pageBuilder";

export function PartnersFallback({
  section,
}: {
  section: PartnersSectionType;
}) {
  const { logos } = section;

  return (
    <div className="overflow-hidden w-screen px-0! -translate-x-4 md:-translate-x-10 xl:-translate-x-20">
      <div className="flex gap-10 md:gap-20 lg:gap-30 w-max items-center">
        <div className="flex shrink-0 gap-10 md:gap-20 lg:gap-30 items-center">
          {logos.map((partner, index) => (
            <PartnersCard
              key={`${partner.url}-fallback-primary-${index}`}
              partner={partner}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
