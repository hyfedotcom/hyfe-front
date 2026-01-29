import {
  CardsGridSectionType,
  CTASectionSchemaType,
  FeatureCardsRightSectionType,
  HeroStatsSectionType,
  PageSectionsType,
  PartnersSectionType,
  ProductsCardsSectionType,
  ResourceFeedSectionType,
  ResourceLinksSectionType,
  TabbedResourceFeedSectionType,
} from "../schema/pageBuilder";
import { HeroStats } from "./sections/heroStats/HeroStats";
import { CardsGrid } from "./sections/CardsGrid";
import { Partners } from "./sections/partners/Partners";
import { ProductsCards } from "./sections/productsCards/ProductsCards";
import { ResourceLinks } from "./sections/resourceLinks/ResourceLinks";
import { FeatureCardsRight } from "./sections/featureCardsRight/FeatureCardsRight";
import { Cta } from "./sections/cta/Cta";
import { TabbedResourceFeed } from "./sections/TabbedResourceFeed/TabbedResourceFeed";
import { NewsSubscription } from "./sections/newsSubscription/NewsSubscription";
import { ResourceFeed } from "./sections/resourceFeed/ResourceFeed";

export function PageBuilder({ sections }: { sections: PageSectionsType }) {
  return (
    <>
      {sections.map((s, i) => {
        switch (s.type) {
          case "hero-stats":
            return <HeroStats key={i} section={s as HeroStatsSectionType} />;
          case "cards-grid":
            return <CardsGrid key={i} section={s as CardsGridSectionType} />;
          case "partners":
            return <Partners key={i} section={s as PartnersSectionType} />;
          case "products-cards":
            return (
              <ProductsCards key={i} section={s as ProductsCardsSectionType} />
            );
          case "resource-links":
            return (
              <ResourceLinks key={i} section={s as ResourceLinksSectionType} />
            );
          case "feature-cards-right":
            return (
              <FeatureCardsRight
                key={i}
                section={s as FeatureCardsRightSectionType}
              />
            );
          case "cta":
            return <Cta key={i} section={s as CTASectionSchemaType} />;
          case "tabbed-resource-feed":
            return (
              <TabbedResourceFeed
                key={i}
                section={s as TabbedResourceFeedSectionType}
              />
            );
          case "resource-feed":
            return (
              <ResourceFeed key={i} section={s as ResourceFeedSectionType} />
            );
          default:
            break;
        }
      })}
    </>
  );
}
