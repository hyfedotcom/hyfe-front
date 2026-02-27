"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/buttons/Button";
import { FORM_MESSAGES, type SubmitState } from "@/shared/forms/constants";
import {
  FormErrorAlert,
  FormSubmittingStatus,
  FormSuccessStatus,
} from "@/shared/forms/FormFeedback";
import { validateEmailField } from "@/shared/forms/validation";

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
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isConsentTouched, setIsConsentTouched] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isConsentFocused, setIsConsentFocused] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const isSubmitting = submitState === "submitting";
  const isCentered = align === "center";

  const emailTrimmed = email.trim();
  const emailErrorMessage = validateEmailField(emailTrimmed, true);
  const consentErrorMessage = consent ? null : FORM_MESSAGES.requiredConsent;
  const showEmailError =
    (submitAttempted || isEmailTouched) &&
    Boolean(emailErrorMessage) &&
    !isEmailFocused;
  const showConsentError =
    (submitAttempted || isConsentTouched) &&
    Boolean(consentErrorMessage) &&
    !isConsentFocused;
  const hasValidationErrors =
    Boolean(emailErrorMessage) || Boolean(consentErrorMessage);
  const statusCardWidthClass = isCentered
    ? "w-full max-w-[680px] mx-auto"
    : "w-full max-w-[620px]";

  const emailId = `newsletter-email-${idSuffix}`;
  const consentId = `newsletter-consent-${idSuffix}`;
  const helpId = `newsletter-help-${idSuffix}`;
  const emailErrorId = `newsletter-email-error-${idSuffix}`;
  const formStatusId = `newsletter-status-${idSuffix}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitAttempted(true);
    setServerError(null);

    if (hasValidationErrors) return;

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
      setServerError(
        error instanceof Error
          ? error.message
          : FORM_MESSAGES.fallbackSubmitError,
      );
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <FormSuccessStatus
        title={FORM_MESSAGES.successNewsletterTitle}
        message={
          <>
            {FORM_MESSAGES.successNewsletterBodyPrefix}
            <strong>{emailTrimmed}</strong>.
          </>
        }
        align={isCentered ? "center" : "left"}
        className={cx(statusCardWidthClass, isCentered ? "mx-auto" : "")}
      />
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
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => {
              setIsEmailFocused(false);
              setIsEmailTouched(true);
            }}
            placeholder="Your email"
            aria-invalid={showEmailError}
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
                "absolute w-max z-30 text-nowrap inline-flex items-center rounded-full bg-[#FFF2F0] border border-[#FECACA] px-2.5 py-1 text-[12px] leading-[120%] text-[#B42318] shadow-[0_8px_24px_rgba(0,0,0,0.10)]",
                "before:content-[''] before:absolute before:-top-[5px] before:left-4 before:w-2.5 before:h-2.5 before:bg-[#FFF2F0] before:border-l before:border-t before:border-[#FECACA] before:rotate-45",
                " max-lg:mt-2 ",
                isCentered
                  ? "translate-x-4 -bottom-2"
                  : "top-12 lg:left-0 lg:ml-0 lg:top-[90%] lg:-translate-y-1/2",
              )}
            >
              {FORM_MESSAGES.emailInvalid}
            </div>
          ) : null}
        </div>

        <div className="self-start max-md:w-full">
          <Button
            label={isSubmitting ? "Sending..." : ctaLabel}
            url=""
            type="submit"
            tag="button"
            color="white"
            classNameProp={cx(
              "h-12 sm:w-full shrink-0 text-center justify-center",
              isSubmitting && "pointer-events-none opacity-70",
            )}
            arrow={false}
            disabled={isSubmitting}
          />
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
          onFocus={() => setIsConsentFocused(true)}
          onBlur={() => {
            setIsConsentFocused(false);
            setIsConsentTouched(true);
          }}
          onChange={(event) => {
            setConsent(event.target.checked);
            if (submitState === "error") {
              setSubmitState("idle");
              setServerError(null);
            }
          }}
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

        <label htmlFor={consentId} className="text-sm opacity-90 text-left!">
          {consentLabel}{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          <span className="text-red-500"> *</span>
        </label>

        {showConsentError ? (
          <div
            className={cx(
              "absolute z-30 text-nowrap inline-flex items-center rounded-full bg-[#FFF2F0] border border-[#FECACA] px-3 py-1.5 text-[12px] leading-[120%] text-[#B42318] shadow-[0_8px_24px_rgba(0,0,0,0.10)]",
              "before:content-[''] before:absolute before:-top-[5px] before:left-4 before:w-2.5 before:h-2.5 before:bg-[#FFF2F0] before:border-l before:border-t before:border-[#FECACA] before:rotate-45",
              "",
              isCentered
                ? "-bottom-9 -translate-x-3.5"
                : "-bottom-9 -translate-x-3.5",
            )}
          >
            {FORM_MESSAGES.requiredConsent}
          </div>
        ) : null}
      </div>

      {isSubmitting ? (
        <FormSubmittingStatus align={isCentered ? "center" : "left"} />
      ) : null}

      {submitState === "error" ? (
        <FormErrorAlert
          id={formStatusId}
          message={serverError}
          align={isCentered ? "center" : "left"}
          className={cx(statusCardWidthClass)}
        />
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
