import { CALENDLY_URL } from "@/lib/site";

/* Calendly's widget script, loaded on demand the first time the booking
   calendar nears the screen, so the rest of the page never pays for it. */

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const STYLE_HREF = "https://assets.calendly.com/assets/external/widget.css";

/** The booking page as embedded: Calendly's cookie banner hidden. */
export const CALENDLY_EMBED_URL = (() => {
  const url = new URL(CALENDLY_URL);
  url.searchParams.set("hide_gdpr_banner", "1");
  return url.toString();
})();

let loading: Promise<void> | null = null;

export function loadCalendly() {
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
