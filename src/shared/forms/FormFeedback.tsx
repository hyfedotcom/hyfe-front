import { type ReactNode, type CSSProperties } from "react";
import { FORM_MESSAGES, FORM_SUPPORT_EMAIL } from "./constants";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function FormSubmittingStatus({
  className,
  text = FORM_MESSAGES.submitting,
  align = "left",
}: {
  className?: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cx(
        "inline-flex items-center gap-2 text-[14px] text-black/70",
        align === "center" && "mx-auto",
        className,
      )}
    >
      <span className="h-4 w-4 rounded-full border-2 border-black/20 border-t-black/70 animate-spin" />
      {text}
    </div>
  );
}

export function FormErrorAlert({
  id,
  message,
  className,
  align = "left",
}: {
  id?: string;
  message?: string | null;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      id={id}
      role="alert"
      className={cx(
        "rounded-[14px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[14px] leading-[140%] text-[#991B1B]",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {message || FORM_MESSAGES.fallbackSubmitError}{" "}
      <a
        className="underline underline-offset-2 font-medium"
        href={`mailto:${FORM_SUPPORT_EMAIL}`}
      >
        {FORM_SUPPORT_EMAIL}
      </a>
      .
    </div>
  );
}

export function FormSuccessStatus({
  title,
  message,
  className,
  align = "center",
  style,
}: {
  title: string;
  message: ReactNode;
  className?: string;
  align?: "left" | "center";
  style?: CSSProperties;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={style}
      className={cx(
        "rounded-[20px] border border-[#1F7A4D]/20  p-6 md:p-8",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <div
        className={cx(
          "inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1F7A4D] text-white",
          align === "center" && "mx-auto",
        )}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M4 9.5L7.1 12.6L14 5.7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h4 className="mt text-[24px] leading-[120%] font-semibold text-[#0F5132]">
        {title}
      </h4>
      <p className="text-[16px] text-[#17603C]">{message}</p>
    </div>
  );
}
