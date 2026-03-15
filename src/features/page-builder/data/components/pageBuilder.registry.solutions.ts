import type { PageBuilderRegistry } from "./pageBuilder.types";

export const solutionsPageBuilderRegistry: Partial<PageBuilderRegistry> = {
  partners: () =>
    import("./sections/partners/Partners").then((mod) => mod.Partners),
  "feature-cards-right": () =>
    import("./sections/featureCardsRight/FeatureCardsRight").then(
      (mod) => mod.FeatureCardsRight,
    ),
  cta: () => import("./sections/cta/Cta").then((mod) => mod.Cta),
  "cards-grid": () =>
    import("./sections/CardsGrid").then((mod) => mod.CardsGrid),
  "content-image-split": () =>
    import(
      "@/features/solutions/components/sections/ContentImageSplit/ContentImageSplit"
    ).then((mod) => mod.default),
  accordion: () =>
    import("@/features/solutions/components/sections/accordion/Accordion").then(
      (mod) => mod.Accordion,
    ),
  "problem-insight-solution": () =>
    import(
      "@/features/solutions/components/sections/problemInsightSolution/ProblemInsightSolution"
    ).then((mod) => mod.ProblemInsightSolution),
  hero: () =>
    import("@/features/solutions/components/sections/hero/Hero").then(
      (mod) => mod.Hero,
    ),
  map: () =>
    import("@/features/solutions/components/sections/map/Map").then(
      (mod) => mod.Map,
    ),
  "resource-feed": () =>
    import("./sections/resourceFeed/ResourceFeed").then((mod) => mod.ResourceFeed),
  "card-product-steps": () =>
    import("./sections/CardProductSteps/CardProductSteps").then(
      (mod) => mod.CardProductSteps,
    ),
  "testimonials-feed": () =>
    import(
      "@/features/solutions/components/sections/testimonials/Testimonials"
    ).then((mod) => mod.Testimonials),
  "resource-feed-many": () =>
    import("./sections/resourceFeedMany/ResourceFeedMany").then(
      (mod) => mod.ResourceFeedMany,
    ),
  form_container: () =>
    import(
      "@/features/solutions/components/sections/formContainer/FormContainer"
    ).then((mod) => mod.FormContainer),
};
