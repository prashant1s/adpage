import { CALENDLY_URL, SITE_URL } from "@/lib/site";

/** The booking page as Calendly's inline embed loads it, but as a plain
 *  iframe URL: no widget.js round trip before the calendar can start
 *  loading. Cookie banner hidden. */
export const CALENDLY_EMBED_URL = (() => {
  const url = new URL(CALENDLY_URL);
  url.searchParams.set("embed_domain", new URL(SITE_URL).host);
  url.searchParams.set("embed_type", "Inline");
  url.searchParams.set("hide_gdpr_banner", "1");
  return url.toString();
})();

/* Calendly's page itself (calendly.com) and the ~2.7 MB of CSS/JS it pulls
   from assets.calendly.com. Connecting to both early saves two handshakes. */
export const CALENDLY_ORIGINS = [
  "https://calendly.com",
  "https://assets.calendly.com",
];
