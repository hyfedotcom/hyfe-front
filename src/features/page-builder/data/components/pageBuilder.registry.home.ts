import type { PageBuilderRegistry } from "./pageBuilder.types";

export const homePageBuilderRegistry: Partial<PageBuilderRegistry> = {
  "hero-stats": () =>
    import("./sections/heroStats/HeroStats").then((mod) => mod.HeroStats),
  "cards-grid": () =>
    import("./sections/CardsGrid").then((mod) => mod.CardsGrid),
  partners: () =>
    import("./sections/partners/Partners").then((mod) => mod.Partners),
  "products-cards": () =>
    import("./sections/productsCards/ProductsCards").then(
      (mod) => mod.ProductsCards,
    ),
  "resource-links": () =>
    import("./sections/resourceLinks/ResourceLinks").then(
      (mod) => mod.ResourceLinks,
    ),
  "feature-cards-right": () =>
    import("./sections/featureCardsRight/FeatureCardsRight").then(
      (mod) => mod.FeatureCardsRight,
    ),
  cta: () => import("./sections/cta/Cta").then((mod) => mod.Cta),
  "resource-feed-many": () =>
    import("./sections/resourceFeedMany/ResourceFeedMany").then(
      (mod) => mod.ResourceFeedMany,
    ),
};
