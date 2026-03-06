import { ResourceCard } from "../../ui/ResourceCard";
import type {
  ResourceCardType,
  ResourceType,
  ResourceBlockType,
} from "@/features/resources/data/resources.types";
import { Button } from "@/components/ui/buttons/Button";
import { formatResourceTypeLabel } from "@/shared/utils/formatResourceTypeLabel";
import { SheetLink } from "@/app/@sheet/components/navigation/SheetLink";
import { HorizontalRailClient } from "@/components/ui/rail/HorizontalRailClient";

type RelatedBlock = Extract<
  ResourceBlockType,
  { type: "resource.related-resources" }
>;

const RELATED_RESOURCE_CTA_COPY: Record<ResourceType, string> = {
  "cough-news":
    "See what you've been missing. Explore past editions of Cough Science News",
  publications: "Dive into the science. Explore our publications.",
  "white-papers":
    "See what you've been missing. Browse our latest white papers",
  insights: "Fresh perspectives on cough. Read our latest insights.",
  news: "See what's happening. Read the latest from Hyfe.",
};

export function ResourcesRelated({
  block,
  resourceType,
  cards,
  closeMode,
}: {
  block: RelatedBlock;
  resourceType: ResourceType;
  cards: ResourceCardType[];
  closeMode: "close" | "swap";
}) {
  const { paragraph, title } = block;
  const resourceTypeLabel = formatResourceTypeLabel(resourceType);
  const relatedCtaCopy = RELATED_RESOURCE_CTA_COPY[resourceType];

  if (cards.length === 0) return null;

  return (
    <div className="space-y-10 mt-20">
      <div className="flex gap-5 flex-col md:flex-row justify-between">
        <div className="space-y-6 md:block">
          <h2>{title ?? `Latest in ${resourceTypeLabel}`}</h2>
          {paragraph && <p className="body-small">{paragraph}</p>}
        </div>
      </div>

      <HorizontalRailClient
        className="relative left-1/2 -translate-x-1/2 w-screen"
        classNameBtn="lg:max-w-[20%]! lg:w-full!"
        hasManyCards
      >
        <div
          className="w-full flex items-stretch gap-3 md:gap-5 
                pl-[max(1rem,calc((100vw-870px)/2))]
                pr-[max(1rem,calc((100vw-870px)/2))]"
        >
          {cards.map((card, index) => (
            <div data-card key={card.slug}>
              <SheetLink
                mode={closeMode}
                className="block w-[85vw] self-stretch shrink-0 h-full sm:w-[50vw] md:w-full md:min-w-[425px] md:max-w-[425px]"
                href={`/${resourceType}/${card.slug}`}
                fallbackPath={
                  closeMode === "close" ? `/${resourceType}` : undefined
                }
              >
                <ResourceCard card={card} />
              </SheetLink>
            </div>
          ))}
          <SheetLink
            className="group flex w-[85vw] shrink-0 flex-col justify-between rounded-[20px] bg-primary p-5 transition-colors duration-300 hover:bg-black sm:w-[50vw] md:w-full md:min-w-[425px] md:max-w-[425px]"
            href={`/${resourceType}`}
            mode="close"
            fallbackPath={`/${resourceType}`}
          >
            <h3 className="text-black group-hover:text-primary! font-medium!  duration-300 transition-colors">
              {relatedCtaCopy}
            </h3>
            <Button
              tag="span"
              label="READ MORE"
              url={`/${resourceType}`}
              color="yellow"
              arrow={false}
              classNameProp="ml-auto flex group-hover:bg-primary group-hover:text-black"
            />
          </SheetLink>
        </div>
      </HorizontalRailClient>
    </div>
  );
}
