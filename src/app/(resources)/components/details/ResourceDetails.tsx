import { RichText } from "./detailsRender/RichText";
import { ResourceCta } from "./detailsRender/ResourceCta";
import { ResourcesRelated } from "./detailsRender/ResourcesRelated";
import { ResourceQuote } from "./detailsRender/ResourceQuote";
import type {
  ResourceType,
  ResourceBlockRenderable,
} from "@/features/resources/data/resources.types";
import React, { JSX } from "react";
import { ResourceIFrame } from "./detailsRender/ResourceIFrame";
import { NewsSubscription } from "@/features/page-builder/data/components/sections/newsSubscription/NewsSubscription";
import { ResourceAdditionalInfo } from "./detailsRender/ResourceAdditionalInfo/ResourceAdditionalInfo";
import { ResourceImage } from "./ResourceImage";

export function ResourceDetails({
  data,
  resourceType,
}: {
  data: ResourceBlockRenderable[];
  resourceType: ResourceType;
}) {
  const prelastIndex = data.length - 2;
  return (
    <div className=" max-w-[870px] mx-auto pb-15">
      {data.map((block, i) => (
        <React.Fragment key={i}>
          {renderBlock(block, i, resourceType)}
          {prelastIndex === i && <NewsSubscription />}
        </React.Fragment>
      ))}
    </div>
  );
}

function renderBlock(
  block: ResourceBlockRenderable,
  index: number,
  resourceType: ResourceType,
): JSX.Element | undefined {
  switch (block.type) {
    case "resource.rich-text":
      return <RichText key={index} blocks={block.content} />;
    case "resource.image":
      return <ResourceImage key={index} block={block} />;
    case "resource.cta":
      return <ResourceCta key={index} block={block} />;
    case "resource.related-resources":
      return (
        <ResourcesRelated
          key={index}
          block={block}
          resourceType={resourceType}
          cards={block.resolvedCards}
        />
      );
    case "resource.quote":
      return <ResourceQuote key={index} block={block} />;
    case "resource.video":
      return <ResourceIFrame key={index} block={block} />;
    case "resource.additional-info":
      return <ResourceAdditionalInfo key={index} block={block} />;
  }
}
