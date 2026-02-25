export const ANALYTICS_CONSENT_COOKIE_NAME = "analytics_consent";
export const ANALYTICS_CONSENT_GRANTED_VALUE = "granted";
export const ANALYTICS_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 183; // ~6 months
export const ANALYTICS_CONSENT_GRANTED_EVENT = "analytics-consent-granted";

export function hasAnalyticsConsentInDocument() {
  if (typeof document === "undefined") return false;

  const entries = document.cookie.split(";").map((item) => item.trim());

  for (const entry of entries) {
    if (!entry) continue;
    const separatorIndex = entry.indexOf("=");
    if (separatorIndex < 0) continue;

    const name = entry.slice(0, separatorIndex).trim();
    const value = entry.slice(separatorIndex + 1);

    if (name === ANALYTICS_CONSENT_COOKIE_NAME) {
      return decodeURIComponent(value) === ANALYTICS_CONSENT_GRANTED_VALUE;
    }
  }

  return false;
}
