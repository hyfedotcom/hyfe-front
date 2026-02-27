export type SubmitState = "idle" | "submitting" | "success" | "error";

export const FORM_SUPPORT_EMAIL = "press@hyfe.com";

export const FORM_MESSAGES = {
  emailInvalid: "Please enter a valid email address.",
  requiredField: "Please fill out this field.",
  requiredConsent: "Please confirm this checkbox before submitting.",
  submitting: "Submitting your request...",
  fallbackSubmitError:
    "We couldn't submit your request right now. Please try again or email press@hyfe.com.",
  successRequestTitle: "Request submitted",
  successRequestBody: "Thanks for your request",
  successNewsletterTitle: "You're subscribed",
  successNewsletterBodyPrefix:
    "Thanks for subscribing. We'll send updates to ",
} as const;
