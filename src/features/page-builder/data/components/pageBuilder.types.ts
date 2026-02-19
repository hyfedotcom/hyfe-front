import type { ReactNode } from "react";
import type {
  HeroStatsSectionmodifiedType,
  PageSectionsType,
  TabbedResourceFeedSectionType,
} from "../schema/pageBuilder";
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
import { HeroContentType } from "@/features/about/schema/domain";

export type ResourceFeedSectionRenderable = ResourceFeedSectionType & {
  cards?: ResourceCardType[];
};

export type ResourceFeedManySectionRenderable = ResourceFeedManySectionType & {
  resources?: ResourceCardListType[];
};

export type TabbedResourceFeedSectionRenderable =
  TabbedResourceFeedSectionType & {
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
  | TestimonialsFeedType
  | HeroContentType
  | HeroStatsSectionmodifiedType;

type NonResourceFeedSection = Exclude<
  PageBuilderBaseSection,
  | { type: "resource-feed" }
  | { type: "resource-feed-many" }
  | { type: "tabbed-resource-feed" }
>;

export type PageBuilderSection =
  | NonResourceFeedSection
  | ResourceFeedSectionRenderable
  | ResourceFeedManySectionRenderable
  | TabbedResourceFeedSectionRenderable
  | HeroStatsSectionmodifiedType;

export type PageBuilderSectionType = PageBuilderSection["type"];

export type PageBuilderComponent<P> = (
  props: P,
) => ReactNode | Promise<ReactNode>;

type PageBuilderSectionByType<K extends PageBuilderSectionType> =
  K extends "hero-stats"
    ? HeroStatsSectionmodifiedType
    : Extract<PageBuilderSection, { type: K }>;

export type PageBuilderRegistry = {
  [K in PageBuilderSectionType]: PageBuilderComponent<{
    section: PageBuilderSectionByType<K>;
  }>;
};
