"use client";

import { ResourceTag } from "@/features/resources/client";
import { isResourceType } from "@/features/resources/data/api/resourceType";
import {
  hasResourceListStateInSearchParams,
  readResourceListUrlState,
  saveResourceListUrlState,
  subscribeResourceListUrlState,
} from "@/features/resources/utils/resourceListUrlState";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function Tags({ tags, scrollToCardsStart }: { tags: string[], scrollToCardsStart: () => void }) {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const [storageVersion, setStorageVersion] = useState(0);

  const pathSegments = useMemo(() => path.split("/").filter(Boolean), [path]);
  const resourceType = useMemo(() => {
    if (pathSegments.length === 0) return null;
    return isResourceType(pathSegments[0]) ? pathSegments[0] : null;
  }, [pathSegments]);

  const isResourceDetailPath = Boolean(resourceType && pathSegments.length === 2);
  const hasListStateInUrl = hasResourceListStateInSearchParams(searchParams);
  const canUseStoredListState = isResourceDetailPath && !hasListStateInUrl;

  const storedListState = useMemo(() => {
    void storageVersion;
    if (!resourceType || !canUseStoredListState) return null;
    return readResourceListUrlState(resourceType);
  }, [canUseStoredListState, resourceType, storageVersion]);

  const tagsParams = canUseStoredListState
    ? storedListState?.tags ?? []
    : searchParams.getAll("tag") ?? [];

  useEffect(() => {
    if (!resourceType || !isResourceDetailPath) return;

    return subscribeResourceListUrlState((detail) => {
      if (detail.type !== resourceType) return;
      setStorageVersion((prev) => prev + 1);
    });
  }, [isResourceDetailPath, resourceType]);

  const onChangeTag = (tag: string) => {
    if (resourceType && canUseStoredListState) {
      const currentState =
        storedListState ?? { search: "", tags: [], page: undefined };
      const currentTags = currentState.tags;
      const nextTags = currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : [...currentTags, tag];

      saveResourceListUrlState(resourceType, {
        ...currentState,
        tags: nextTags,
        page: undefined,
      });
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    const currentTags = params.getAll("tag");

    const nextTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    params.delete("tag");

    nextTags.forEach((t) => {
      params.append("tag", t);
    });

    const query = params.toString();
    const nextUrl = query ? `${path}?${query}` : path;

    router.replace(nextUrl, { scroll: true });
  };

  return (
    <div className="flex max-md:flex-wrap gap-3 md:pl-3.5">
      {tags.map((tag, index) => (
        <ResourceTag
          key={`${tag}-${index}`}
          active={tagsParams.includes(tag)}
          glass
          tag={tag}
          onClick={() => { onChangeTag(tag); if (scrollToCardsStart) { scrollToCardsStart() } }}
        />
      ))}
    </div>
  );
}
