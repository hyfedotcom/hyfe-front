import Image from "next/image";
import { RichText } from "./detailsRender/RichText";
import { ResourceCta } from "./detailsRender/ResourceCta";
import { ResourcesRelated } from "./detailsRender/ResourcesRelated";
import { ResourceQuote } from "./detailsRender/ResourceQuote";
import { getResource } from "@/features/resources/data/api/getResource";
import { getResourcesList } from "@/features/resources/data/api/getResourcesList";
import type {
  ResourceBlocksType,
  ResourceCardType,
  ResourceDetail,
  ResourceType,
  ResourceBlockType,
} from "@/features/resources/data/resources.types";
import React, { JSX } from "react";
import { ResourceIFrame } from "./detailsRender/ResourceIFrame";
import { NewsSubscription } from "@/features/page-builder/data/components/sections/newsSubscription/NewsSubscription";
import { ResourceAdditionalInfo } from "./detailsRender/ResourceAdditionalInfo/ResourceAdditionalInfo";
import { ResourceImage } from "./ResourceImage";

type RelatedBlock = Extract<
  ResourceBlockType,
  { type: "resource.related-resources" }
>;

const toCard = (r: ResourceDetail): ResourceCardType => ({
  cover: r.cover,
  title: r.title,
  date: r.date,
  excerpt: r.excerpt,
  slug: r.slug,
  tags: r.tags,
  type: r.type,
});

async function resolveRelatedCards(
  block: RelatedBlock,
  resourceType: ResourceType,
): Promise<ResourceCardType[]> {
  const picked = block.cards.filter((c) => c.slug);
  const shouldAuto = !!block.auto_mode || picked.length === 0;

  if (shouldAuto) {
    return (await getResourcesList({ type: resourceType }))?.list ?? [];
  }

  const ready = await Promise.all(
    picked.map(async (c) => {
      const r = await getResource({
        type: c.resource_type,
        slug: c.slug!,
      });
      return r ? toCard(r) : null;
    }),
  );

  return ready.filter((x): x is ResourceCardType => x != null);
}

export async function ResourceDetails({
  data,
  resourceType,
}: {
  data: ResourceBlocksType[];
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

async function renderBlock(
  block: ResourceBlockType,
  index: number,
  resourceType: ResourceType,
): Promise<JSX.Element | undefined> {
  switch (block.type) {
    case "resource.rich-text":
      return <RichText key={index} blocks={block.content} />;
    case "resource.image":
      return <ResourceImage key={index} block={block} />;
    case "resource.cta":
      return <ResourceCta key={index} block={block} />;
    case "resource.related-resources":
      const cards = await resolveRelatedCards(block, resourceType);
      return (
        <ResourcesRelated
          key={index}
          block={block}
          resourceType={resourceType}
          cards={cards.splice(0, 4)}
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
