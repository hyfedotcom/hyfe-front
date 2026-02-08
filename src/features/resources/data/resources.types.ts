import { z } from "zod";

import {
  ResourceBlockContentSchema,
  ListSchema,
  ResourceCtaBlockDomainSchema,
  LandingSchema,
  ResourceBlockDomainSchema,
  ResourceRelatedCardsBlockDomainSchema,
  SeoDomainSchema,
  ResourceRelatedTypeSchema,
  ResourceAdditionalBlockDomainSchema,
  ResourceImageBlockDomainSchema,
} from "./resources.schema";
import type { getResource } from "./api/getResource";

export type ResourceCardListType = z.infer<typeof ListSchema>;
export type ResourceCardType = ResourceCardListType[number];

export type ResourceBlockType = z.infer<typeof ResourceBlockDomainSchema>;

export type ResourceBlocksType = z.infer<typeof ResourceBlockDomainSchema>;

export type ResourceBlockContentType = z.infer<
  typeof ResourceBlockContentSchema
>;
export type SeoType = z.infer<typeof SeoDomainSchema>;

/// BLOCKS
export type ResourceBlockContent = z.infer<typeof ResourceBlockContentSchema>;
export type ResourceBlockContentItem = ResourceBlockContent[number];
export type ResourceInlineNode = ResourceBlockContentItem["children"][number];

export type ResourceBlockCtaType = z.infer<typeof ResourceCtaBlockDomainSchema>;

export type LandingType = z.infer<typeof LandingSchema>;

export type ResourceRelatedType = z.infer<
  typeof ResourceRelatedCardsBlockDomainSchema
>;

export type ResourceType = z.infer<typeof ResourceRelatedTypeSchema>;

type RelatedBlock = Extract<
  ResourceBlockType,
  { type: "resource.related-resources" }
>;

export type ResourceRelatedBlockRenderable = RelatedBlock & {
  resolvedCards: ResourceCardType[];
};

export type ResourceBlockRenderable =
  | Exclude<ResourceBlockType, RelatedBlock>
  | ResourceRelatedBlockRenderable;

export type GetResourceResult = Awaited<ReturnType<typeof getResource>>;
export type ResourceDetail = NonNullable<GetResourceResult>;
export type AdditionlInfoType = z.infer<
  typeof ResourceAdditionalBlockDomainSchema
>;

export type ResourceImageType = z.infer<typeof ResourceImageBlockDomainSchema>;
