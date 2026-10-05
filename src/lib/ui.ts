/* Shared control styles so every CTA on the page matches. */

/* The one main CTA label, used everywhere. Don't add variations. */
export const CTA_LABEL = "Book Your Free Strategy Call";

/* Where every CTA goes: the booking form on its own page (app/book). */
export const CTA_HREF = "/book";

/* btn-float: hover lift, arrow nudge and press feedback (globals.css). */
const BUTTON_BASE =
  "btn-float inline-flex items-center justify-center gap-2 rounded-lg font-semibold";

/* Blue gradient with glow — the one "click me" style on the page. */
export const BUTTON_PRIMARY = `${BUTTON_BASE} btn-gradient text-white`;

export const BUTTON_SECONDARY = `${BUTTON_BASE} border border-line bg-raised text-fg hover:border-line-strong`;

/* Sizes: md for inline CTAs, lg for the hero and the form. 44px+ tall
   either way, so both clear the touch-target minimum. */
export const BUTTON_MD = "min-h-11 px-5 py-2.5 text-body";
export const BUTTON_LG = "min-h-13 px-4 py-3.5 text-body sm:px-8 sm:text-lead";

/* Full-width CTA inside a card on phones (the form, the final CTA). The
   card's padding leaves the button ~82px narrower than the screen, so below
   sm it gets tighter padding and its label scales down on the narrowest
   phones (≈14px at 320px, full size from ~360px) instead of wrapping.
   BUTTON_IN_CARD goes on the button, CTA_LABEL_ONE_LINE on the label span. */
export const BUTTON_IN_CARD = "max-sm:gap-1.5 max-sm:px-3";
export const CTA_LABEL_ONE_LINE = "whitespace-nowrap max-sm:text-[min(1rem,7.2vw-9.2px)]";

/* Letter-spaced blue kicker above section headings. */
export const LABEL = "text-eyebrow font-semibold text-accent";

/* Bordered card on a raised surface. */
export const CARD = "rounded-2xl border border-line bg-raised";
