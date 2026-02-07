import type { ReactNode } from "react";
import type { PageSectionsType } from "../schema/pageBuilder";
import type {
  AccordionType,
  CardProductStepsType,
  ContentImageSplitType,
  ProblemInsightSolutionType,
  SectionsType,
  SolutionMapType,
  SolutionsHeroType,
  TestimonialsFeedType,
} from "@/features/solutions/schema/hero/strapi.schema";
import type {
  ResourceFeedSectionType,
  ResourceCardType,
  ResourceCardListType,
} from "@/features/resources";
import type { ResourceFeedManySectionType } from "../schema/pageBuilder";

export type ResourceFeedSectionRenderable = ResourceFeedSectionType & {
  cards?: ResourceCardType[];
};

export type ResourceFeedManySectionRenderable = ResourceFeedManySectionType & {
  resources?: ResourceCardListType[];
};

type PageBuilderBaseSection =
  | PageSectionsType[number]
  | SectionsType[number]
  | AccordionType
  | ProblemInsightSolutionType
  | SolutionsHeroType
  | SolutionMapType
  | CardProductStepsType
  | ContentImageSplitType
  | TestimonialsFeedType;

type NonResourceFeedSection = Exclude<
  PageBuilderBaseSection,
  { type: "resource-feed" } | { type: "resource-feed-many" }
>;

export type PageBuilderSection =
  | NonResourceFeedSection
  | ResourceFeedSectionRenderable
  | ResourceFeedManySectionRenderable;

export type PageBuilderSectionType = PageBuilderSection["type"];

export type PageBuilderComponent<P> = (props: P) => ReactNode | Promise<ReactNode>;

export type PageBuilderRegistry = {
  [K in PageBuilderSectionType]: PageBuilderComponent<{
    section: Extract<PageBuilderSection, { type: K }>;
  }>;
};
