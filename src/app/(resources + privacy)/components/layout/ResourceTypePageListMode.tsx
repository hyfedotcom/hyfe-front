"use client";

import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { RecourcesListDispatcher } from "@/features/resources/list";
import type {
  LandingType,
  ResourceCardType,
} from "@/features/resources/data/resources.types";

export function ResourceTypePageListMode({
  landing,
  list,
  tags,
  type,
}: {
  landing: LandingType;
  list: ResourceCardType[];
  tags: string[];
  type: string;
}) {
  const pathname = usePathname();
  const childSegment = useSelectedLayoutSegment();
  const parts = pathname.split("/").filter(Boolean);
  const isResourceDetailPath = parts.length === 2 && parts[0] === type;
  const isCanonicalDetail = childSegment !== null;

  const renderMode = isResourceDetailPath
    ? isCanonicalDetail
      ? "detail-canonical"
      : "detail-sheet"
    : "full";

  return (
    <RecourcesListDispatcher
      landing={landing}
      list={list}
      tags={tags}
      type={type}
      renderMode={renderMode}
    />
  );
}
