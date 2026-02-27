"use client";

import Link from "next/link";
import { Button } from "@/components/ui/buttons/Button";
import type { FormType } from "@/features/solutions/schema/hero/raw";
import { Input } from "./Input";
import { FormEvent, useRef, useState } from "react";
import type { SubmitState } from "@/shared/forms/constants";
import { FORM_MESSAGES } from "@/shared/forms/constants";
import {
  FormErrorAlert,
  FormSubmittingStatus,
  FormSuccessStatus,
} from "@/shared/forms/FormFeedback";
import {
  validateEmailField,
  validateRequiredField,
} from "@/shared/forms/validation";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function sanitizeIdPart(value: string) {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const trimmed = normalized.replace(/^-+|-+$/g, "");
  return trimmed || "field";
}

export function Form({ form }: { form: FormType }) {
  const { consent, cta_label, inputs, cough_news_subscription } = form;
  const formRef = useRef<HTMLFormElement | null>(null);
  const [values, setValues] = useState<string[]>(() => inputs.map(() => ""));
  const [consentValues, setConsentValues] = useState<boolean[]>(() =>
    consent.map(() => false),
  );
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [touchedInputs, setTouchedInputs] = useState<boolean[]>(() =>
    inputs.map(() => false),
  );
  const [touchedConsents, setTouchedConsents] = useState<boolean[]>(() =>
    consent.map(() => false),
  );
  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(
    null,
  );
  const [focusedConsentIndex, setFocusedConsentIndex] = useState<number | null>(
    null,
  );
  const [website, setWebsite] = useState("");
  const [surfaceHeight, setSurfaceHeight] = useState<number | null>(null);
  const formStatusId = `solution-form-status-${sanitizeIdPart(form.formId?.trim() || "default")}`;

  const isSubmitting = submitState === "submitting";
  const emailValue =
    inputs
      .flatMap((input, i) =>
        input.type === "email" ? [values[i]?.trim() ?? ""] : [],
      )
      .find(Boolean) || "";
  const inputErrorMessages = inputs.map((input, i) => {
    const value = values[i]?.trim() ?? "";
    if (input.type === "email") {
      return validateEmailField(value, Boolean(input.required));
    }
    return validateRequiredField(value, Boolean(input.required));
  });
  const showInputError = inputErrorMessages.map(
    (message, i) =>
      (submitAttempted || touchedInputs[i]) &&
      Boolean(message) &&
      focusedInputIndex !== i,
  );
  const requiredConsentErrors = consent.map(
    (item, i) => item.required && !consentValues[i],
  );
  const showConsentError = requiredConsentErrors.map(
    (isError, i) =>
      (submitAttempted || touchedConsents[i]) &&
      isError &&
      focusedConsentIndex !== i,
  );
  const hasRequiredConsent = consent.some((item) => item.required);
  const hasValidationErrors =
    inputErrorMessages.some(Boolean) || requiredConsentErrors.some(Boolean);
  // CMS can provide newsletter consent with privacy_link=true; only requiredness
  // should decide whether this checkbox is treated as newsletter opt-in.
  const subscribeToNewsletter =
    cough_news_subscription &&
    consent.some((item, i) => consentValues[i] && !item.required);
  const surfaceClassName =
    "space-y-5 max-w-[650px] w-full md:w-1/2 resources-glass-surface rounded-[40px] p-4 py-6 md:p-10 bg-gradient-to-br from-white via-white/10 to-primary-100 overflow-visible!";
  const shouldLockSurfaceHeight =
    surfaceHeight !== null && (isSubmitting || submitState === "error");
  const lockedSurfaceStyle = shouldLockSurfaceHeight
    ? { height: `${surfaceHeight}px` }
    : undefined;
  const successSurfaceStyle = surfaceHeight
    ? { minHeight: `${surfaceHeight}px` }
    : undefined;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);
    setServerError(null);
    const currentHeight = formRef.current?.getBoundingClientRect().height;
    if (currentHeight) setSurfaceHeight(currentHeight);

    if (hasValidationErrors) return;

    const formId = form.formId?.trim();
    if (!formId) {
      setSubmitState("error");
      setServerError("Missing form id from API.");
      return;
    }

    const fields: Array<{ name: string; value: string }> = [];
    for (let i = 0; i < inputs.length; i += 1) {
      const input = inputs[i];
      const value = values[i]?.trim();
      if (!value) continue;
      const hbName = input.hb_name?.trim();

      if (!hbName) {
        setSubmitState("error");
        setServerError(`Missing hb_name for "${input.label}".`);
        return;
      }

      fields.push({ name: hbName, value });
    }
    const newsletterEmail = emailValue || undefined;

    if (!fields.length) {
      setSubmitState("error");
      setServerError("Fill at least one field before submitting.");
      return;
    }

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/hubspot/submitForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId,
          fields,
          website,
          subscribeToNewsletter,
          newsletterEmail,
          consent: hasRequiredConsent
            ? consent.every((item, i) => !item.required || consentValues[i])
            : undefined,
        }),
      });

      if (!response.ok) {
        const payload = await response
          .json()
          .catch(() => ({ error: "Submission failed" }));
        throw new Error(payload?.error || "Submission failed");
      }

      setSubmitState("success");
      setServerError(null);
    } catch (error) {
      setSubmitState("error");
      setServerError(
        error instanceof Error ? error.message : FORM_MESSAGES.fallbackSubmitError,
      );
    }
  }

  if (submitState === "success") {
    return (
      <FormSuccessStatus
        style={successSurfaceStyle}
        align="center"
        title={FORM_MESSAGES.successRequestTitle}
        message={FORM_MESSAGES.successRequestBody}
        className={`${surfaceClassName} flex items-center flex-col text-center! justify-center`}
      />
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      style={lockedSurfaceStyle}
      className={`${surfaceClassName} ${shouldLockSurfaceHeight ? "overflow-y-auto" : ""} w-screen md:w-auto flex flex-col gap-[3px]`}
    >
      <div aria-hidden="true" className="resources-glass-overlay" />
      <div aria-hidden="true" className="resources-glass-highlight" />
      {inputs.map((input, i) => {
        const inputBaseId =
          input.hb_name?.trim() ||
          input.label?.trim() ||
          `${input.type || "text"}-${i + 1}`;
        const inputId = `solution-form-input-${sanitizeIdPart(inputBaseId)}-${i + 1}`;

        return (
          <div
            key={i}
            className={cx(
              "relative overflow-visible  ",
              showInputError[i] && "z-[130]",
            )}
          >
            <Input
              inputId={inputId}
              input={input}
              value={values[i] ?? ""}
              disabled={isSubmitting}
              hasError={showInputError[i]}
              onFocus={() => setFocusedInputIndex(i)}
              onBlur={() => {
                setFocusedInputIndex((prev) => (prev === i ? null : prev));
                setTouchedInputs((prev) => {
                  const nextValues = [...prev];
                  nextValues[i] = true;
                  return nextValues;
                });
              }}
              onChange={(next) => {
                setValues((prev) => {
                  const nextValues = [...prev];
                  nextValues[i] = next;
                  return nextValues;
                });
                if (submitState === "error") {
                  setSubmitState("idle");
                  setServerError(null);
                }
              }}
            />

            {showInputError[i] ? (
              <div
                className={cx(
                  "absolute z-[120] inline-flex items-center rounded-full  text-[12px] leading-[120%] text-[#B42318] ",
                  // "before:content-[''] before:absolute before:-top-[5px] before:right-4 before:w-2.5 before:h-2.5 before:bg-[#FFF2F0] before:border-l before:border-t before:border-[#FECACA] before:rotate-45",
                  "left-[14px] top-[50px]",
                )}
              >
                {inputErrorMessages[i]}
              </div>
            ) : null}
          </div>
        );
      })}
      <div className="space-y-2"> 
        {consent.map((consentItem, i) => (
          <label
            key={i}
            className={cx(
              "relative z-10 flex items-start gap-3 overflow-visible",
              showConsentError[i] && "z-[130]",
            )}
          >
            <input
              type="checkbox"
              disabled={isSubmitting}
              checked={consentValues[i] ?? false}
              onFocus={() => setFocusedConsentIndex(i)}
              onBlur={() => {
                setFocusedConsentIndex((prev) => (prev === i ? null : prev));
                setTouchedConsents((prev) => {
                  const nextValues = [...prev];
                  nextValues[i] = true;
                  return nextValues;
                });
              }}
              onChange={(event) => {
                setConsentValues((prev) => {
                  const nextValues = [...prev];
                  nextValues[i] = event.target.checked;
                  return nextValues;
                });
                if (submitState === "error") {
                  setSubmitState("idle");
                  setServerError(null);
                }
              }}
              className={cx(
                "h-4 w-4 rounded border mt-1 accent-black transition-[border-color,box-shadow,background-color] duration-200",
                "border-black/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10",
                "disabled:opacity-70 disabled:cursor-not-allowed",
                showConsentError[i] &&
                  "border-[#B42318]! ring-2 ring-[#B42318]/40 ring-offset-1 ring-offset-white focus-visible:border-[#B42318]! focus-visible:ring-[#B42318]/25!",
              )}
            />
            <span className="text-[14px] text-left! leading-[150%] text-black">
              {consentItem.label}{" "}
              {consentItem.privacy_link ? (
                <Link href="/privacy" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
              ) : null}
              {consentItem.required ? (
                <span className="text-[#B42318]"> *</span>
              ) : null}
            </span>

            {showConsentError[i] ? (
              <div
                className={cx(
                  "absolute z-[120] inline-flex items-center rounded-full bg-[#FFF2F0] border border-[#FECACA] px-3 py-1.5 text-[12px] leading-[120%] text-[#B42318] shadow-[0_8px_24px_rgba(0,0,0,0.10)]",
                  "before:content-[''] before:absolute before:-top-[5px] before:left-4 -translate-x-3.5 before:w-2.5 before:h-2.5 before:bg-[#FFF2F0] before:border-l before:border-t before:border-[#FECACA] before:rotate-45",
                  "left-0 top-[calc(100%+6px)]",
                )}
              >
                {FORM_MESSAGES.requiredConsent}
              </div>
            ) : null}
          </label>
        ))}
      </div>
      <input
        type="text"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      {isSubmitting ? <FormSubmittingStatus /> : null}

      {submitState === "error" ? (
        <FormErrorAlert
          id={formStatusId}
          message={serverError}
        />
      ) : null}

      <Button
        label={isSubmitting ? "Sending..." : cta_label}
        type={"submit"}
        tag="button"
        arrow={false}
        classNameProp="w-full! items-center! justify-center mt-4"
        disabled={isSubmitting}
      />
    </form>
  );
}
