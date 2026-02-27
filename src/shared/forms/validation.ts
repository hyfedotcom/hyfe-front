import { FORM_MESSAGES } from "./constants";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRequiredField(value: string, required: boolean) {
  if (!required) return null;
  return value.trim() ? null : FORM_MESSAGES.requiredField;
}

export function validateEmailField(value: string, required: boolean) {
  const normalized = value.trim();

  if (required && !normalized) {
    return FORM_MESSAGES.emailInvalid;
  }

  if (normalized && !EMAIL_RE.test(normalized)) {
    return FORM_MESSAGES.emailInvalid;
  }

  return null;
}
