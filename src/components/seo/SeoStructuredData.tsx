import type { ReactElement } from "react";
import type { SeoType } from "@/features/resources";
import { JsonLd } from "./JsonLd";

export function SeoStructuredData({
  seo,
  id,
}: {
  seo?: SeoType;
  id?: string;
}): ReactElement | null {
  if (!seo?.structuredData) return null;

  let data: Record<string, unknown> | Array<Record<string, unknown>>;
  try {
    data = JSON.parse(seo.structuredData) as
      | Record<string, unknown>
      | Array<Record<string, unknown>>;
  } catch {
    return null;
  }

  return <JsonLd data={data} id={id} />;
}
