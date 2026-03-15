import type { PageBuilderRegistry } from "./pageBuilder.types";

export const aboutPageBuilderRegistry: Partial<PageBuilderRegistry> = {
  "hero-content": () =>
    import("./sections/HeroContent/HeroContent").then((mod) => mod.HeroContent),
  "content-image-split": () =>
    import(
      "@/features/solutions/components/sections/ContentImageSplit/ContentImageSplit"
    ).then((mod) => mod.default),
  timeline: () => import("./sections/Timeline/Timeline").then((mod) => mod.default),
};
