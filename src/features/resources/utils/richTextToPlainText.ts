import type { ResourceBlockContent } from "@/features/resources";

export function richTextToPlainText(blocks: ResourceBlockContent) {
  if (!blocks?.length) return "";
  const parts: string[] = [];

  const visit = (node: {
    text?: string;
    children?: { text?: string; children?: { text?: string }[] }[];
  }) => {
    if (node.text) parts.push(node.text);
    if (node.children?.length) {
      node.children.forEach((child) => visit(child));
    }
  };

  blocks.forEach((block) => {
    if (!block?.children?.length) return;
    block.children.forEach((child) => visit(child));
    parts.push("\n");
  });

  return parts
    .join(" ")
    .replace(/\s+/g, " ")
    .replace(/\s+\n/g, "\n")
    .trim();
}
