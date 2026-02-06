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
} from "@/features/resources";

export type ResourceFeedSectionRenderable = ResourceFeedSectionType & {
  cards?: ResourceCardType[];
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
  { type: "resource-feed" }
>;

export type PageBuilderSection =
  | NonResourceFeedSection
  | ResourceFeedSectionRenderable;

export type PageBuilderSectionType = PageBuilderSection["type"];

export type PageBuilderComponent<P> = (props: P) => ReactNode | Promise<ReactNode>;

export type PageBuilderRegistry = {
  [K in PageBuilderSectionType]: PageBuilderComponent<{
    section: Extract<PageBuilderSection, { type: K }>;
  }>;
};
