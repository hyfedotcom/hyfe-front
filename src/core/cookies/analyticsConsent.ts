export const ANALYTICS_CONSENT_COOKIE_NAME = "analytics_consent";
export const ANALYTICS_CONSENT_GRANTED_VALUE = "granted";
export const ANALYTICS_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 183; // ~6 months
export const ANALYTICS_CONSENT_GRANTED_EVENT = "analytics-consent-granted";
export const COOKIE_BANNER_DISMISSED_COOKIE_NAME = "cookie_banner_dismissed";
export const COOKIE_BANNER_DISMISSED_VALUE = "1";

function getCookieValue(nameToFind: string) {
  if (typeof document === "undefined") return null;

  const entries = document.cookie.split(";").map((item) => item.trim());

  for (const entry of entries) {
    if (!entry) continue;
    const separatorIndex = entry.indexOf("=");
    if (separatorIndex < 0) continue;

    const name = entry.slice(0, separatorIndex).trim();
    const value = entry.slice(separatorIndex + 1);

    if (name === nameToFind) return decodeURIComponent(value);
  }

  return null;
}

export function hasAnalyticsConsentInDocument() {
  return (
    getCookieValue(ANALYTICS_CONSENT_COOKIE_NAME) ===
    ANALYTICS_CONSENT_GRANTED_VALUE
  );
}

export function hasCookieBannerDismissedInDocument() {
  return (
    getCookieValue(COOKIE_BANNER_DISMISSED_COOKIE_NAME) ===
    COOKIE_BANNER_DISMISSED_VALUE
  );
}
