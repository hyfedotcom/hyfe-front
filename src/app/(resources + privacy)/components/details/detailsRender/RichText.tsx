import React from "react";
import type {
  ResourceBlockContent,
  ResourceBlockContentItem,
  ResourceInlineNode,
} from "@/features/resources";
import { isInternalHref, normalizeHref } from "@/shared/utils/resolveLink";
import { SheetLink } from "@/app/@sheet/components/navigation/SheetLink";

type Block = ResourceBlockContentItem;
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
  currentType: string | undefined,
  href: string,
): "close" | "swap" {
  if (policy === "close" || policy === "swap") return policy;
  if (!currentType) return "close";

  const target = parseDetailTarget(href);
  if (!target) return "close"; // /about, /news (list), внешние и т.д.
  return target.type === currentType ? "swap" : "close";
}

export function RichText({
  blocks,
  bodySize = "body-large",
  linkPolicy = "close",
  currentType,
}: {
  blocks: ResourceBlockContent;
  bodySize?: "body-large" | "body-medium" | "body-small";
  linkPolicy?: LinkPolicy;
  currentType?: string;
}) {
  const linkContext = { linkPolicy, currentType };

  const cleaned = blocks
    .map((block) => ({
      ...block,
      children: block.children?.filter((ch) => ch.text?.trim() !== "") ?? [],
    }))
    .filter((block) => block.children.length > 0);

  return (
    <>
      {cleaned.map((block, i) => {
        const prev = cleaned[i - 1];
        const next = cleaned[i + 1];
        switch (block.type) {
          case "heading":
            return (
              <Heading
                key={i}
                level={block.level}
                className={spaceClass(prev, block, next)}
                linkContext={linkContext}
              >
                {block.children ?? []}
              </Heading>
            );

          case "paragraph":
            return (
              <Paragraph
                key={i}
                className={spaceClass(prev, block, next)}
                nodes={block.children ?? []}
                bodySize={bodySize}
                linkContext={linkContext}
              />
            );

          case "list":
            return (
              <List
                key={i}
                className={spaceClass(prev, block, next)}
                format={block.format ?? "unordered"}
                items={block.children ?? []}
                linkContext={linkContext}
                bodySize={bodySize}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}

/* ------------------------- blocks ------------------------- */

function Heading({
  level,
  children,
  className,
  linkContext,
}: {
  level?: number;
  children: ResourceInlineNode[];
  className: string;
  linkContext: { linkPolicy: LinkPolicy; currentType?: string };
}) {
  let lvl = (level ?? 2) as 1 | 2 | 3 | 4 | 5 | 6;
  lvl = lvl === 1 ? 2 : lvl;
  const Tag = `h${lvl}` as const;

  const inline = renderInline(children, "", linkContext);
  if (inline.length === 0) return null;

  const classNameByTitle =
    lvl === 2
      ? "text-3xl font-semibold "
      : lvl === 3
        ? "text-xl font-semibold "
        : "text-lg font-semibold ";

  return <Tag className={`${className} ${classNameByTitle}`}>{inline}</Tag>;
}

function Paragraph({
  nodes,
  className,
  bodySize,
  linkContext,
}: {
  nodes: ResourceInlineNode[];
  className: string;
  bodySize: "body-large" | "body-medium" | "body-small";
  linkContext: { linkPolicy: LinkPolicy; currentType?: string };
}) {
  const inline = renderInline(nodes, "", linkContext);
  if (inline.length === 0) return null;

  return (
    <p
      className={`${className} ${bodySize} text-body-main whitespace-pre-line`}
    >
      {inline}
    </p>
  );
}

function List({
  items,
  format,
  className,
  linkContext,
  bodySize = "body-large",
}: {
  format?: string;
  items: Array<{ children?: ResourceInlineNode[] }>;
  className: string;
  linkContext: { linkPolicy: LinkPolicy; currentType?: string };
  bodySize?: "body-large" | "body-medium" | "body-small";
}) {
  const Tag = `${format === "ordered" ? "ol" : "ul"}` as const;
  const classNameBylist = `${
    format === "ordered" ? "list-decimal " : "list-disc "
  }`;
  return (
    <Tag className={`${className} ${classNameBylist}  space-y-3 ml-6`}>
      {items.map((c, i) => {
        if (!c.children) return;
        const children = renderInline(c.children, "", linkContext);

        return c.children ? (
          <li className={bodySize} key={i}>
            {children}
          </li>
        ) : null;
      })}
    </Tag>
  );
}

function renderInline(
  nodes: ResourceInlineNode[],
  keyPrefix = "",
  linkContext?: { linkPolicy: LinkPolicy; currentType?: string },
): React.ReactNode[] {
  if (!Array.isArray(nodes)) return [];

  return nodes
    .map((n, i) => {
      const key = `${keyPrefix}${i}`;

      if (!n) return null;

      // LINK
      if (n.type === "link") {
        const href = normalizeHref(n.url);

        if (!href) return null;

        const labelNodes =
          Array.isArray(n.children) && n.children.length > 0
            ? renderInline(n.children, `${key}-`, linkContext)
            : [];

        const target = parseDetailTarget(href);
        const mode = resolveMode(
          linkContext?.linkPolicy ?? "close",
          linkContext?.currentType,
          href,
        );

        const fallbackPath =
          mode === "close" && target ? `/${target.type}` : undefined;

        // если children есть, но текста нет — показываем href (или hostname)
        const label = labelNodes;

        if (isInternalHref(href))
          return (
            <SheetLink
              key={key}
              href={href}
              mode={mode}
              fallbackPath={fallbackPath}
              className="underline text-blue-400 underline-offset-4 hover:opacity-80"
            >
              {label}
            </SheetLink>
          );

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400 underline-offset-4 hover:opacity-80"
          >
            {label}
          </a>
        );
      }

      // TEXT
      const t = n.text ?? "";
      if (t === "") return null;

      const isBold = Boolean(n.bold ?? n.bold); // поддержка опечатки
      // const isItalic = Boolean((n as any).italic);
      // const isUnderline = Boolean((n as any).underline);

      let out: React.ReactNode = t;

      if (isBold) {
        out = <strong className="font-semibold text-black!">{out}</strong>;
      }
      // if (isItalic) out = <em>{out}</em>;
      // if (isUnderline) out = <u>{out}</u>;

      return <React.Fragment key={key}>{out}</React.Fragment>;
    })
    .filter((x): x is React.ReactElement => x !== null);
}

function spaceClass(prev: Block | undefined, cur: Block, next?: Block) {
  const t = cur.type;
  if (!next) return "mb-15";

  if (t === "paragraph") {
    if (next?.type === "heading") {
      const mb =
        next?.level === 2
          ? "mb-15"
          : next?.level === 3
            ? "mb-12"
            : next?.level === 4
              ? "mb-10"
              : "mb-6";
      return `${mb}`;
    }
    if (next?.type === "paragraph") {
      return "mb-5";
    }

    if (next?.type === "list") {
      return "mb-5";
    }
    return "mb-15";
  }
  if (t === "list") {
    const mb =
      next?.type === "heading" && next?.level === 2
        ? "mb-15"
        : next?.type === "heading" && next?.level === 4
          ? "mb-10"
          : next?.type === "paragraph"
            ? "mb-5"
            : "mb-15";
    return `${mb}`;
  }
  if (t === "quote") return "mb-6";
  if (cur.type === "image") return "mb-10";

  if (t === "heading") {
    const lvl = cur.level ?? 4;

    if (lvl === 2) {
      const mb = next?.type === "heading" ? "mb-6" : "mb-8";
      return `${mb} font-semibold!`;
    }

    if (lvl === 3) {
      const mb = next?.type === "heading" ? "mb-8" : "mb-6";
      return `${mb} `;
    }

    if (lvl === 4) {
      const mb = next?.type === "paragraph" ? "mb-5" : "mb-4";
      return `${mb}`;
    }
  }

  return "mb-10";
}
