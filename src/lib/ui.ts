/* Shared control styles so every CTA on the page matches. */

/* btn-float: hover lift, arrow nudge and press feedback (globals.css). */
const BUTTON_BASE =
  "btn-float inline-flex items-center justify-center gap-2 rounded-lg font-semibold";

/* Blue gradient with glow — the one "click me" style on the page. */
export const BUTTON_PRIMARY = `${BUTTON_BASE} btn-gradient text-white`;

export const BUTTON_SECONDARY = `${BUTTON_BASE} border border-line bg-raised text-fg hover:border-line-strong`;

/* Sizes: md for inline CTAs, lg for the hero and the form. 44px+ tall
   either way, so both clear the touch-target minimum. */
export const BUTTON_MD = "min-h-11 px-5 py-2.5 text-body";
export const BUTTON_LG = "min-h-13 px-8 py-3.5 text-lead";

/* Letter-spaced blue kicker above section headings. */
export const LABEL = "text-eyebrow font-semibold text-accent";

/* Bordered card on a raised surface. */
export const CARD = "rounded-2xl border border-line bg-raised";
