"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/buttons/Button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = "idle" | "submitting" | "success" | "error";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function NewsletterSignupForm({
  ctaLabel,
  consentLabel,
  idSuffix,
  className,
  align = "left",
}: {
  ctaLabel: string;
  consentLabel: string;
  idSuffix: string;
  className?: string;
  align?: "left" | "center";
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [isTouched, setIsTouched] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [hideEmailError, setHideEmailError] = useState(false);

  const isSubmitting = submitState === "submitting";
  const isCentered = align === "center";

  const emailTrimmed = email.trim();
  const emailValid = useMemo(() => EMAIL_RE.test(emailTrimmed), [emailTrimmed]);
  const showEmailInvalidState = isTouched && !emailValid;
  const showEmailError = showEmailInvalidState && !hideEmailError;
  const showConsentError = isTouched && !consent;
  const canSubmit = emailValid && consent && !isSubmitting;
  const statusCardWidthClass = isCentered
    ? "w-full max-w-[680px] mx-auto"
    : "w-full max-w-[620px]";
  const submitHint =
    !emailValid && !consent
      ? "Enter a valid email and confirm consent."
      : !emailValid
        ? "Enter a valid email address."
        : "Confirm consent to continue.";

  const emailId = `newsletter-email-${idSuffix}`;
  const consentId = `newsletter-consent-${idSuffix}`;
  const helpId = `newsletter-help-${idSuffix}`;
  const emailErrorId = `newsletter-email-error-${idSuffix}`;
  const formStatusId = `newsletter-status-${idSuffix}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsTouched(true);
    setServerError(null);

    if (!emailValid || !consent) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    setSubmitState("submitting");

    try {
      const res = await fetch("/api/hubspot/submitEmail", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const payload = await res
          .json()
          .catch(() => ({ error: "Subscription failed" }));
        throw new Error(payload?.error || "Subscription failed");
      }

      setSubmitState("success");
    } catch (error) {
      const fallback =
        "We couldn't submit your request right now. Please try again or email press@hyfe.com.";
      setServerError(error instanceof Error ? error.message : fallback);
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cx(
          "rounded-[20px] border border-[#1F7A4D]/20 bg-[#ECFDF3] p-6 md:p-8",
          statusCardWidthClass,
          isCentered ? "text-center" : "text-left",
        )}
      >
        <div
          className={cx(
            "inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1F7A4D] text-white",
            isCentered && "mx-auto",
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
        <h4 className="mt-4 text-[24px] leading-[120%] font-semibold text-[#0F5132]">
          You&apos;re subscribed
        </h4>
        <p className="mt-2 text-[16px] text-[#17603C]">
          Thanks for subscribing. We&apos;ll send updates to{" "}
          <strong>{emailTrimmed}</strong>.
        </p>
      </div>
    );
  }

  const describedBy = [helpId, showEmailError ? emailErrorId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <form className={className} onSubmit={onSubmit} noValidate>
      <div className="flex gap-3 flex-col sm:flex-row sm:items-start">
        <label className="sr-only" htmlFor={emailId}>
          Email
        </label>

        <div className="relative flex flex-col gap-1 w-full md:w-max md:min-w-[380px]">
          <input
            id={emailId}
            name="email"
            required
            autoComplete="email"
            inputMode="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (submitState === "error") {
                setSubmitState("idle");
                setServerError(null);
              }
            }}
            onFocus={() => setHideEmailError(true)}
            onBlur={() => {
              setIsTouched(true);
              setHideEmailError(false);
            }}
            placeholder="Your email"
            aria-invalid={showEmailInvalidState}
            aria-describedby={describedBy}
            disabled={isSubmitting}
            className={cx(
              "w-full sm:max-w-[520px] bg-white rounded-full px-5 h-12 outline-none border-2 transition-[border-color,box-shadow,background-color] duration-200",
              "border-black/25 placeholder:text-black/45",
              "focus-visible:border-black focus-visible:ring-4 focus-visible:ring-black/10",
              "disabled:opacity-70 disabled:cursor-not-allowed",
              showEmailError &&
                "border-[#B42318]! focus-visible:border-[#B42318]! focus-visible:ring-[#B42318]/15!",
            )}
          />

          <span
            id={helpId}
            className={cx(
              "body-small text-black!",
              isCentered ? "text-center" : "ml-4.5",
            )}
          >
            No spam. Unsubscribe anytime.
          </span>

          {showEmailError ? (
            <div
              id={emailErrorId}
              className={cx(
                "absolute w-max z-30 inline-flex items-center rounded-full bg-[#FFF2F0] border border-[#FECACA] px-2.5 py-1 text-[12px] leading-[120%] text-[#B42318] shadow-[0_8px_24px_rgba(0,0,0,0.10)]",
                "before:content-[''] before:absolute before:-top-[5px] before:left-4 before:w-2.5 before:h-2.5 before:bg-[#FFF2F0] before:border-l before:border-t before:border-[#FECACA] before:rotate-45",
                "max-lg:top-full max-lg:left-0 max-lg:mt-2 ",
                isCentered
                  ? "lg:left-15 lg:ml-0 lg:top-[95%] lg:-translate-y-1/2"
                  : "lg:left-0 lg:ml-0 lg:top-[90%] lg:-translate-y-1/2",
              )}
            >
              Please enter a valid email address.
            </div>
          ) : null}
        </div>

        <div className="relative group/submit self-start w-full">
          <Button
            label={isSubmitting ? "Sending..." : ctaLabel}
            url=""
            type="submit"
            tag="button"
            color="white"
            classNameProp={cx(
              "h-12 sm:w-max shrink-0 text-center justify-center",
              isSubmitting && "pointer-events-none opacity-70",
            )}
            arrow={false}
            disabled={!canSubmit}
          />

          {!canSubmit && !isSubmitting ? (
            <div
              className={cx(
                "pointer-events-none absolute z-30 bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2",
                "rounded-[10px] bg-black text-white text-[12px] leading-[120%] px-3 py-2 whitespace-nowrap",
                "opacity-0 translate-y-1 transition-all duration-200",
                "group-hover/submit:opacity-100 group-hover/submit:translate-y-0",
                "group-focus-within/submit:opacity-100 group-focus-within/submit:translate-y-0",
              )}
            >
              {submitHint}
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={cx(
          "relative flex items-center gap-3 w-fit",
          isCentered && "mx-auto",
        )}
      >
        <input
          id={consentId}
          name="consent"
          required
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          disabled={isSubmitting}
          aria-invalid={showConsentError}
          className={cx(
            "h-4 w-4 rounded border accent-black transition-[border-color,box-shadow,background-color] duration-200",
            "border-black/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10",
            "disabled:opacity-70 disabled:cursor-not-allowed",
            showConsentError &&
              "border-[#B42318]! focus-visible:border-[#B42318]! focus-visible:ring-[#B42318]/15!",
          )}
        />

        <label htmlFor={consentId} className="text-sm opacity-90">
          {consentLabel}{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          <span className="text-red-500"> *</span>
        </label>

        {showConsentError ? (
          <div
            className={cx(
              "absolute z-30 inline-flex items-center rounded-full bg-[#FFF2F0] border border-[#FECACA] px-3 py-1.5 text-[12px] leading-[120%] text-[#B42318] shadow-[0_8px_24px_rgba(0,0,0,0.10)]",
              "before:content-[''] before:absolute before:-top-[5px] before:left-4 before:w-2.5 before:h-2.5 before:bg-[#FFF2F0] before:border-l before:border-t before:border-[#FECACA] before:rotate-45",
              "",
              isCentered
                ? "lg:left-0 lg:ml-0 lg:top-[220%] lg:-translate-y-1/2"
                : "lg:left-0 lg:ml-0 lg:top-[220%] lg:-translate-y-1/2",
            )}
          >
            Please confirm consent before subscribing.
          </div>
        ) : null}
      </div>

      {isSubmitting ? (
        <div
          role="status"
          aria-live="polite"
          className={cx(
            "inline-flex items-center gap-2 text-[14px] text-black/70",
            isCentered && "mx-auto",
          )}
        >
          <span className="h-4 w-4 rounded-full border-2 border-black/20 border-t-black/70 animate-spin" />
          Submitting your request...
        </div>
      ) : null}

      {submitState === "error" ? (
        <div
          id={formStatusId}
          role="alert"
          className={cx(
            "rounded-[14px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[14px] leading-[140%] text-[#991B1B]",
            statusCardWidthClass,
            isCentered ? "text-center" : "text-left",
          )}
        >
          {serverError ||
            "We could not submit your request right now. Please try again or email press@hyfe.com."}{" "}
          <a
            className="underline underline-offset-2 font-medium"
            href="mailto:press@hyfe.com"
          >
            press@hyfe.com
          </a>
          .
        </div>
      ) : null}

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
        readOnly
      />
    </form>
  );
}
