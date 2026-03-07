import { SheetLink } from "@/app/@sheet/components/navigation/SheetLink";
import { ButtonArrow } from "@/components/ui/buttons/ButtonArrow";
import type {
  ResourceBlockCtaType,
  ResourceType,
} from "@/features/resources/data/resources.types";
import { isInternalHref, normalizeHref } from "@/shared/utils/resolveLink";

type LinkPolicy = "close" | "swap" | "auto";

const DETAIL_TYPES = new Set([
  "news",
  "insights",
  "white-papers",
  "publications",
  "cough-news",
  "team",
  "advisors",
  "careers",
]);

function parseDetailTarget(href: string) {
  const clean = href.split("#")[0].split("?")[0];
  const seg = clean.split("/").filter(Boolean);
  if (seg.length < 2) return null;
  const [type, slug] = seg;
  if (!DETAIL_TYPES.has(type) || !slug) return null;
  return { type, slug };
}

function resolveMode(
  policy: LinkPolicy,
  currentType: ResourceType,
  href: string,
): "close" | "swap" {
  if (policy === "close" || policy === "swap") return policy;
  const target = parseDetailTarget(href);
  if (!target) return "close";
  return target.type === currentType ? "swap" : "close";
}

export function ResourceCta({
  block,
  currentType,
  linkPolicy,
}: {
  block: ResourceBlockCtaType;
  currentType: ResourceType;
  linkPolicy: LinkPolicy;
}) {
  return (
    <div className="space-y-5 mb-15">
      {block.title && <h3 className="mt-20">{block.title}</h3>}
      <div className={`space-y-4  ${!block.title && "-mt-8"}`}>
        {block.cta.map((e: { url: string; label: string }, i: number) => {
          const href = normalizeHref(e.url);
          const isInternal = isInternalHref(href);
          const target = parseDetailTarget(href);
          const mode = resolveMode(linkPolicy, currentType, href);
          const fallbackPath =
            mode === "close" && target ? `/${target.type}` : undefined;

          const content = (
            <div className="flex flex-row justify-between items-center flex-1 h-full w-full ">
              <span className="text-balance text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] font-medium ">
                {e.label}
              </span>
              <ButtonArrow className="bg-black text-white ml-auto " />
            </div>
          );

          return (
            <span
              key={i}
              className="p-4 md:p-5 w-full flex group  text-black! bg-primary-100 border border-border hover:bg-primary-200 hover:border-primary duration-300 rounded-[20px] hover:shadow-hover"
            >
              {isInternal ? (
                <SheetLink
                  mode={mode}
                  href={href}
                  fallbackPath={fallbackPath}
                  className="flex h-full w-full"
                >
                  {content}
                </SheetLink>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full"
                >
                  {content}
                </a>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
