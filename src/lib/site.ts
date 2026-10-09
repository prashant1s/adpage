/**
 * Single source of truth for everything SEO needs an absolute URL or a
 * canonical string for.
 *
 * ⚠️ Set NEXT_PUBLIC_SITE_URL to the real production origin (no trailing
 * slash) before going live. The fallback below is a placeholder — leaving it
 * wrong makes canonical tags, OG images and the sitemap point at a domain
 * you don't own.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.whizoidstudio.com"
).replace(/\/$/, "");

export const SITE_NAME = "Whizoid Studio";

export const SITE_TITLE =
  "Stuck at 1.5x ROAS on Meta Ads? | Whizoid Studio";

export const SITE_DESCRIPTION =
  "For D2C brands spending ₹1–3L a month on Meta ads. Your product isn't the problem and neither is your budget — the way your ads are run is. Book a free 30-minute strategy call.";

/** og:locale / <html lang> — Indian English, matching the ₹ pricing. */
export const SITE_LOCALE = "en_IN";

/**
 * Calendly event that strategy calls are booked on, embedded inline on the
 * home page and /book. NEXT_PUBLIC_CALENDLY_URL overrides it.
 */
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ||
  "https://calendly.com/udit-whizoidstudio/new-meeting";
