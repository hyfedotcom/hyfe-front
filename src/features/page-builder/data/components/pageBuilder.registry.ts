import type { PageBuilderRegistry } from "./pageBuilder.types";
import { HeroStats } from "./sections/heroStats/HeroStats";
import { CardsGrid } from "./sections/CardsGrid";
import { Partners } from "./sections/partners/Partners";
import { ProductsCards } from "./sections/productsCards/ProductsCards";
import { ResourceLinks } from "./sections/resourceLinks/ResourceLinks";
import { FeatureCardsRight } from "./sections/featureCardsRight/FeatureCardsRight";
import { Cta } from "./sections/cta/Cta";
import { TabbedResourceFeed } from "./sections/TabbedResourceFeed/TabbedResourceFeed";
import { ResourceFeed } from "./sections/resourceFeed/ResourceFeed";
import { ResourceFeedMany } from "./sections/resourceFeedMany/ResourceFeedMany";
import { Accordion } from "@/features/solutions/components/sections/accordion/Accordion";
import { ProblemInsightSolution } from "@/features/solutions/components/sections/problemInsightSolution/ProblemInsightSolution";
import { Hero } from "@/features/solutions/components/sections/hero/Hero";
import { Map } from "@/features/solutions/components/sections/map/Map";
import { CardProductSteps } from "./sections/CardProductSteps/CardProductSteps";
import ContentImageSplit from "@/features/solutions/components/sections/ContentImageSplit/ContentImageSplit";
import { Testimonials } from "@/features/solutions/components/sections/testimonials/Testimonials";
import { FromContainer } from "@/features/solutions/components/sections/formContainer/FromContainer";

export const pageBuilderRegistry: PageBuilderRegistry = {
  "hero-stats": HeroStats,
  "cards-grid": CardsGrid,
  partners: Partners,
  "products-cards": ProductsCards,
  "resource-links": ResourceLinks,
  "feature-cards-right": FeatureCardsRight,
  cta: Cta,
  "tabbed-resource-feed": TabbedResourceFeed,
  "resource-feed": ResourceFeed,
  "resource-feed-many": ResourceFeedMany,
  accordion: Accordion,
  "problem-insight-solution": ProblemInsightSolution,
  hero: Hero,
  map: Map,
  "card-product-steps": CardProductSteps,
  "content-image-split": ContentImageSplit,
  "testimonials-feed": Testimonials,
  form_container: FromContainer,
};
