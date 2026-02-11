import Link from "next/link";
import { isInternalHref, normalizeHref } from "@/shared/utils/resolveLink";
import { LinkIndicator } from "./LinkIndicator";

export function Button({
  label,
  url,
  version = "black",
  color = "white",
  arrow = true,
  tag = "Link",
  classNameProp,
  type = "button",
  indicatorInternalClassName,
  indicatorExternalClassName,
  disabled = false,
}: {
  label: string;
  url: string;
  version?: "black" | "white";
  color?: "white" | "black" | "yellow";
  arrow?: boolean;
  tag?: "Link" | "button" | "a";
  classNameProp?: string;
  type?: "button" | "submit";
  indicatorInternalClassName?: string;
  indicatorExternalClassName?: string;
  disabled?: boolean;
}) {
  const hrefNormalized = normalizeHref(url);
  const isInternal = isInternalHref(hrefNormalized);

  const className = `${classNameProp ?? ""} h-max uppercase border border-transparent group/cta ${
    arrow ? "flex" : "inline-flex"
  } gap-5 items-center px-5 py-3.5 rounded-[20px] leading-[120%] text-[18px] font-semibold touch-manipulation transition-[color,background-color,border-color,box-shadow,transform] duration-300 ${
    disabled
      ? "cursor-not-allowed opacity-65 pointer-events-none"
      : "cursor-pointer hover:shadow-hover active:shadow-hover hover:border-primary active:border-primary active:scale-[0.98]"
  } ${
    version === "black"
      ? "bg-black hover:bg-white active:bg-white"
      : "bg-white hover:bg-black active:bg-black"
  } ${
    color === "white"
      ? "text-white hover:text-black active:text-black"
      : color === "yellow"
        ? "text-primary"
        : "text-black hover:text-white active:text-white"
  }`;

  const svgClassName = `${
    version === "black"
      ? "text-white group-hover/cta:text-black group-active/cta:text-black"
      : "text-black group-hover/cta:text-white group-active/cta:text-white"
  } duration-300 transition-colors`;
  const content = (
    <>
      {label}
      {arrow && (
        <span className="inline-flex" aria-hidden>
          <LinkIndicator
            href={hrefNormalized}
            className={svgClassName}
            internalClassName={indicatorInternalClassName}
            externalClassName={indicatorExternalClassName}
          />
        </span>
      )}
    </>
  );

  if (tag === "button") {
    return (
      <button type={type} className={className} disabled={disabled}>
        {content}
      </button>
    );
  }

  if (tag === "a") {
    if (isInternal) {
      return (
        <Link href={hrefNormalized} className={className}>
          {content}
        </Link>
      );
    }

    return (
      <a
        href={hrefNormalized}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  if (!isInternal) {
    return (
      <a
        href={hrefNormalized}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={hrefNormalized} className={className}>
      {content}
    </Link>
  );
}
