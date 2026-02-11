import { isInternalHref, normalizeHref } from "@/shared/utils/resolveLink";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function LinkIndicator({
  href,
  className,
  internalClassName,
  externalClassName,
  forceInternal = false,
}: {
  href: string;
  className?: string;
  internalClassName?: string;
  externalClassName?: string;
  forceInternal?: boolean;
}) {
  const hrefNormalized = normalizeHref(href);
  const isInternal = forceInternal || isInternalHref(hrefNormalized);

  if (isInternal) {
    return (
      <svg
        width="8"
        height="16"
        viewBox="0 0 8 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cx(className, internalClassName)}
        aria-hidden
      >
        <path
          d="M1 1L6.44218 7.34921C6.76317 7.7237 6.76317 8.2763 6.44218 8.65079L1 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(className, externalClassName)}
      aria-hidden
    >
      <path
        d="M19 13V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H11V7H5V19H17V13H19ZM13 3V5H17.586L9.793 12.793L11.207 14.207L19 6.414V11H21V3H13Z"
        fill="currentColor"
      />
    </svg>
  );
}
