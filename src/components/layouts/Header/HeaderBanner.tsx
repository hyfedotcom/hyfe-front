import Link from "next/link";
import { isInternalHref, normalizeHref } from "@/shared/utils/resolveLink";

export function HeaderBanner({
  label,
  url,
}: {
  label: string;
  url?: string;
}) {
  const trimmedLabel = label.trim();
  if (!trimmedLabel) return null;

  const href = url ? normalizeHref(url) : "";
  const isInternal = href ? isInternalHref(href) : false;

  const content = (
    <span className="truncate text-center text-[13px] md:text-[14px] leading-none font-medium">
      {trimmedLabel}
    </span>
  );

  return (
    <div className="h-10 border-b border-black/20 bg-gradient-to-r from-[#212838] via-[#2A3040] to-[#212838] text-white">
      <div className="h-full w-full px-4 md:px-10 lg:px-20">
        {!href && (
          <div className="mx-auto flex h-full max-w-[1400px] items-center justify-center">
            {content}
          </div>
        )}
        {href && isInternal && (
          <Link
            href={href}
            className="mx-auto flex h-full max-w-[1400px] items-center justify-center hover:opacity-90 transition-opacity"
          >
            {content}
          </Link>
        )}
        {href && !isInternal && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="mx-auto flex h-full max-w-[1400px] items-center justify-center hover:opacity-90 transition-opacity"
          >
            {content}
          </a>
        )}
      </div>
    </div>
  );
}
