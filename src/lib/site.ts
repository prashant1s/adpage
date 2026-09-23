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
 * Business WhatsApp number that strategy-call requests are sent to.
 * wa.me needs full international format, digits only — no "+", spaces or
 * dashes. 91 is the India country code prefixed to 89621 77924.
 */
export const WHATSAPP_NUMBER = "918962177924";
