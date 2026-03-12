"use client";

import { isResourceType } from "@/features/resources/data/api/resourceType";
import {
  hasResourceListStateInSearchParams,
  readResourceListUrlState,
  saveResourceListUrlState,
  subscribeResourceListUrlState,
} from "@/features/resources/utils/resourceListUrlState";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export function SearchInput({
  placeholder,
  className,
}: {
  placeholder: string;
  className: string;
}) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
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

  const value =
    (searchParams.get("search") ?? "") || (storedListState?.search ?? "");
  const draftValueRef = useRef(value);
  const inputId = useId();

  useEffect(() => {
    if (!resourceType || !isResourceDetailPath) return;

    return subscribeResourceListUrlState((detail) => {
      if (detail.type !== resourceType) return;
      setStorageVersion((prev) => prev + 1);
    });
  }, [isResourceDetailPath, resourceType]);

  const syncUrl = (nextValue: string) => {
    draftValueRef.current = nextValue;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      if (resourceType && canUseStoredListState) {
        const currentState =
          storedListState ?? { search: "", tags: [], page: undefined };

        saveResourceListUrlState(resourceType, {
          ...currentState,
          search: nextValue,
          page: undefined,
        });
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      if (nextValue.trim()) params.set("search", nextValue);
      else params.delete("search");

      const query = params.toString();
      const hash = window.location.hash;
      const nextUrl = `${query ? `${path}?${query}` : path}${hash}`;
      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (currentUrl !== nextUrl) {
        router.replace(nextUrl, { scroll: false });
      }
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (draftValueRef.current === value) return;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }

    draftValueRef.current = value;
  }, [value]);

  return (
    <label
      htmlFor={inputId}
      className={` ${className}  resources-glass-search-shell group relative  mr-2 my-2 flex h-11 w-[250px] shrink-0 items-center px-3 transition-colors md:mr-3 md:my-3 resources-glass-search-open resources-glass-search-idle backdrop-blur-sm`}
    >
      <svg
        className="pointer-events-none h-5 w-5 shrink-0 text-black/55"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M21 21l-4.35-4.35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        ref={inputRef}
        id={inputId}
        className="h-full w-full bg-transparent pl-2 pr-1 text-[13px] leading-[100%] text-black outline-none placeholder:text-black/45"
        type="search"
        placeholder={placeholder}
        defaultValue={value}
        onChange={(e) => syncUrl(e.target.value)}
      />
    </label>
  );
}
