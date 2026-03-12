"use client";

import { isResourceType } from "@/features/resources/data/api/resourceType";

const STORAGE_KEY_PREFIX = "hyfe:resource-list-state:v1";
const RESOURCE_LIST_URL_STATE_EVENT = "hyfe:resource-list-url-state-change";
const RESOURCE_LIST_STATE_TTL_MS = 1000 * 60 * 60 * 12;

type SearchParamsLike = Pick<
  URLSearchParams,
  "get" | "getAll" | "has" | "toString"
>;

export type ResourceListQueryState = {
  search: string;
  tags: string[];
  page?: number;
};

type ResourceListUrlStateChangeDetail = {
  type: string;
};

type StoredResourceListQueryState = ResourceListQueryState & {
  updatedAt: number;
};

const memoryStore = new Map<string, StoredResourceListQueryState>();

function storageKey(type: string) {
  return `${STORAGE_KEY_PREFIX}:${type}`;
}

function isExpired(updatedAt: number) {
  return Date.now() - updatedAt > RESOURCE_LIST_STATE_TTL_MS;
}

function normalizeTags(tags: string[]) {
  const unique = new Set<string>();

  for (const tag of tags) {
    const normalized = tag.trim();
    if (normalized) unique.add(normalized);
  }

  return Array.from(unique);
}

function normalizePage(value: unknown): number | undefined {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return undefined;

  const page = Math.floor(parsed);
  return page > 1 ? page : undefined;
}

function normalizeState(state: ResourceListQueryState): ResourceListQueryState {
  return {
    search: state.search.trim(),
    tags: normalizeTags(state.tags),
    page: normalizePage(state.page),
  };
}

function parseStoredState(raw: string): StoredResourceListQueryState | null {
  try {
    const parsed = JSON.parse(raw) as Partial<StoredResourceListQueryState>;

    if (typeof parsed !== "object" || parsed === null) return null;

    return {
      ...normalizeState({
        search: typeof parsed.search === "string" ? parsed.search : "",
        tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        page: parsed.page,
      }),
      updatedAt:
        typeof parsed.updatedAt === "number" && Number.isFinite(parsed.updatedAt)
          ? parsed.updatedAt
          : Date.now(),
    };
  } catch {
    return null;
  }
}

export function hasResourceListStateInSearchParams(searchParams: SearchParamsLike) {
  return (
    searchParams.has("search") ||
    searchParams.has("tag") ||
    searchParams.has("page")
  );
}

export function getResourceListStateFromSearchParams(
  searchParams: SearchParamsLike,
): ResourceListQueryState {
  return normalizeState({
    search: searchParams.get("search") ?? "",
    tags: searchParams.getAll("tag"),
    page: normalizePage(searchParams.get("page") ?? undefined),
  });
}

export function saveResourceListUrlState(type: string, state: ResourceListQueryState) {
  if (!isResourceType(type)) return;

  const normalized = normalizeState(state);
  const next: StoredResourceListQueryState = {
    ...normalized,
    updatedAt: Date.now(),
  };

  memoryStore.set(type, next);

  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(storageKey(type), JSON.stringify(next));
  } catch {
    // Ignore storage quota/private mode errors.
  }

  window.dispatchEvent(
    new CustomEvent<ResourceListUrlStateChangeDetail>(
      RESOURCE_LIST_URL_STATE_EVENT,
      {
        detail: { type },
      },
    ),
  );
}

export function readResourceListUrlState(type: string): ResourceListQueryState | null {
  if (!isResourceType(type)) return null;

  const fromMemory = memoryStore.get(type);
  if (fromMemory) {
    if (isExpired(fromMemory.updatedAt)) {
      memoryStore.delete(type);
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(storageKey(type));
      }
      return null;
    }

    return {
      search: fromMemory.search,
      tags: fromMemory.tags,
      page: fromMemory.page,
    };
  }

  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(storageKey(type));
    if (!raw) return null;

    const parsed = parseStoredState(raw);
    if (!parsed || isExpired(parsed.updatedAt)) {
      window.sessionStorage.removeItem(storageKey(type));
      memoryStore.delete(type);
      return null;
    }

    memoryStore.set(type, parsed);

    return {
      search: parsed.search,
      tags: parsed.tags,
      page: parsed.page,
    };
  } catch {
    return null;
  }
}

export function resolveResourceListHrefFromStorage(href: string): string {
  if (typeof window === "undefined") return href;

  let url: URL;

  try {
    url = new URL(href, window.location.origin);
  } catch {
    return href;
  }

  if (url.origin !== window.location.origin) return href;

  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length !== 1) return href;

  const [type] = segments;
  if (!isResourceType(type)) return href;

  const savedState = readResourceListUrlState(type);
  if (!savedState) return href;

  const params = new URLSearchParams(url.searchParams);
  const hasExplicitListState =
    params.has("search") || params.has("tag") || params.has("page");

  if (hasExplicitListState) {
    return href;
  }

  if (savedState.search) {
    params.set("search", savedState.search);
  }

  for (const tag of savedState.tags) {
    params.append("tag", tag);
  }

  if (savedState.page) {
    params.set("page", String(savedState.page));
  }

  const query = params.toString();
  return `${url.pathname}${query ? `?${query}` : ""}${url.hash}`;
}

export function subscribeResourceListUrlState(
  onChange: (detail: ResourceListUrlStateChangeDetail) => void,
) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<ResourceListUrlStateChangeDetail>;
    if (!customEvent.detail?.type) return;
    onChange(customEvent.detail);
  };

  window.addEventListener(RESOURCE_LIST_URL_STATE_EVENT, handler as EventListener);

  return () => {
    window.removeEventListener(
      RESOURCE_LIST_URL_STATE_EVENT,
      handler as EventListener,
    );
  };
}
