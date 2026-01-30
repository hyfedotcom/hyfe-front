import {
  CardsGridSectionType,
  CTASectionSchemaType,
  FeatureCardsRightSectionType,
  HeroStatsSectionType,
  PageSectionsType,
  PartnersSectionType,
  ProductsCardsSectionType,
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
import { ResourceFeed } from "./sections/resourceFeed/ResourceFeed";
import { Accordion } from "@/app/solutions/sections/accordion/Accordion";
import {
  AccordionType,
  CardProductStepsType,
  ContentImageSplitType,
  ProblemInsightSolutionType,
  ResourceFeedType,
  SectionsType,
  SolutionMapType,
  SolutionsHeroType,
  TestimonialsFeedType,
} from "@/features/solutions/schema/hero/strapi.schema";
import { ProblemInsightSolution } from "@/app/solutions/sections/problemInsightSolution/ProblemInsightSolution";
import { Hero } from "@/app/solutions/sections/hero/Hero";
import { Map } from "@/app/solutions/sections/map/Map";
import { CardProductSteps } from "./sections/CardProductSteps/CardProductSteps";
import ContentImageSplit from "@/app/solutions/sections/ContentImageSplit/ContentImageSplit";
import { Testimonials } from "@/app/solutions/sections/testimonials/Testimonials";

type PageBuilderSection =
  | PageSectionsType[number]
  | SectionsType[number]
  | AccordionType
  | ProblemInsightSolutionType;

export function PageBuilder({ sections }: { sections: PageBuilderSection[] }) {
  if (!sections) return;
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
            return <ResourceFeed key={i} section={s as ResourceFeedType} />;
          case "accordion":
            return <Accordion key={i} section={s as AccordionType} />;
          case "problem-insight-solution":
            return (
              <ProblemInsightSolution
                key={i}
                section={s as ProblemInsightSolutionType}
              />
            );
          case "hero":
            return <Hero key={i} section={s as SolutionsHeroType} />;
          case "map":
            return <Map key={i} section={s as SolutionMapType} />;
          case "card-product-steps":
            return (
              <CardProductSteps key={i} section={s as CardProductStepsType} />
            );
          case "content-image-split":
            return (
              <ContentImageSplit key={i} section={s as ContentImageSplitType} />
            );
          case "testimonials-feed":
            return <Testimonials key={i} section={s as TestimonialsFeedType} />;

          default:
            break;
        }
      })}
    </>
  );
}
