import { CALENDLY_URL } from "@/lib/site";

/* Calendly's popup widget, loaded on demand the first time it's needed so
   the page itself never pays for it. */

type CalendlyPrefill = {
  name?: string;
  email?: string;
  customAnswers?: Record<string, string>;
};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string; prefill?: CalendlyPrefill }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const STYLE_HREF = "https://assets.calendly.com/assets/external/widget.css";

let loading: Promise<void> | null = null;

function loadCalendly() {
  if (window.Calendly) return Promise.resolve();
  loading ??= new Promise<void>((resolve, reject) => {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = STYLE_HREF;
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      reject(new Error("Calendly failed to load"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

export const hasCalendly = CALENDLY_URL.length > 0;

/** Opens the booking popup, pre-filled with what the visitor already typed.
 *  Resolves false if Calendly isn't configured or couldn't load. */
export async function openCalendly(prefill: CalendlyPrefill) {
  if (!hasCalendly) return false;
  try {
    await loadCalendly();
    window.Calendly?.initPopupWidget({ url: CALENDLY_URL, prefill });
    return true;
  } catch {
    return false;
  }
}
