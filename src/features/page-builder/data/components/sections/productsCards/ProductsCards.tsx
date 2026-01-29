import { SectionContainer } from "@/components/layouts/SectionContainer";
import { ProductsCardsSectionType } from "../../../schema/pageBuilder";
import { ContentContainer } from "@/components/content/ContentContainer";
import { ProductCard } from "./ProductCard";
import Link from "next/link";

export function ProductsCards({
  section,
}: {
  section: ProductsCardsSectionType;
}) {
  const { cards } = section;
  return (
    <SectionContainer>
      <div className="space-y-10 md:space-y-15 bg-white">
        <ContentContainer content={section} width="max-w-[1000px]"/>
        <div className="max-w-[1220px] mx-auto space-y-5">
          {cards.map((c, i) => (
            <Link href={c.cta[0].url} key={i} className="block">
              <ProductCard card={c} />
            </Link>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
