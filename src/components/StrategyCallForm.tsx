"use client";

import { useId, useState } from "react";

import { WHATSAPP_NUMBER } from "@/lib/site";
import { BUTTON_LG, BUTTON_PRIMARY, BUTTON_SECONDARY, BUTTON_MD } from "@/lib/ui";

const SPEND_BANDS = ["Under ₹1L", "₹1–2L", "₹2–3L", "₹3L+"];

const FIELD_CLASS =
  "w-full rounded-lg border border-line bg-ink px-4 py-3 text-body text-fg placeholder:text-subtle/70 transition-colors hover:border-line-strong focus:border-accent focus:outline-none";

const LABEL_CLASS = "mb-2 block text-micro font-medium text-muted";

/** Formats the lead as the opening WhatsApp message the founder will send. */
function buildChatUrl(form: FormData) {
  const field = (name: string) => String(form.get(name) ?? "").trim();

  const message = [
    "Hi Whizoid, I'd like to book a free strategy call.",
    "",
    `Name: ${field("name")}`,
    `Brand website: ${field("website")}`,
    `WhatsApp: ${field("whatsapp")}`,
    `Monthly ad spend: ${field("spend")}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function StrategyCallForm({
  plain = false,
}: {
  /** Drop the card border/background, for use inside the booking popup. */
  plain?: boolean;
}) {
  const [chatUrl, setChatUrl] = useState<string | null>(null);
  /* The form renders twice (page section + popup), so field ids must be
     unique per instance for labels to stay linked to their inputs. */
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;
  const shell = plain ? "" : "rounded-2xl border border-line bg-raised";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const url = buildChatUrl(new FormData(event.currentTarget));
    setChatUrl(url);

    // Opened synchronously inside the submit handler so the browser still
    // counts it as user-initiated and doesn't block it. If a blocker catches
    // it anyway, fall back to navigating this tab.
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  }

  if (chatUrl) {
    return (
      <div
        role="status"
        className={`${shell} ${plain ? "" : "p-6 sm:p-10"}`}
      >
        <p className="text-eyebrow font-semibold uppercase text-accent">
          Request ready
        </p>
        <h3 className="mt-4 text-h2 font-semibold text-fg">
          WhatsApp is opening.
        </h3>
        <p className="mt-3 max-w-md text-body text-muted text-pretty">
          Your details are already typed out. Hit send and we&apos;ll reply
          within 24 hours.
        </p>
        <a
          href={chatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-8 ${BUTTON_SECONDARY} ${BUTTON_MD}`}
        >
          Didn&apos;t open? Tap here
          <span aria-hidden>→</span>
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${shell} ${plain ? "" : "p-5 sm:p-8"}`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className={LABEL_CLASS}>
            Your name
          </label>
          <input
            id={fieldId("name")}
            name="name"
            required
            autoComplete="name"
            placeholder="Priya Sharma"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor={fieldId("whatsapp")} className={LABEL_CLASS}>
            WhatsApp number
          </label>
          <input
            id={fieldId("whatsapp")}
            name="whatsapp"
            required
            type="tel"
            inputMode="tel"
            pattern="[0-9+\s-]{10,15}"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={FIELD_CLASS}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={fieldId("website")} className={LABEL_CLASS}>
            Brand website
          </label>
          <input
            id={fieldId("website")}
            name="website"
            required
            inputMode="url"
            autoComplete="url"
            placeholder="yourbrand.com"
            className={FIELD_CLASS}
          />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={LABEL_CLASS}>Monthly Meta ad spend</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {SPEND_BANDS.map((band, index) => (
              <label
                key={band}
                className="flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-line bg-ink px-2 py-2.5 text-center text-micro font-medium text-muted transition-colors hover:border-line-strong has-checked:border-accent has-checked:bg-accent/15 has-checked:text-fg has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
              >
                <input
                  type="radio"
                  name="spend"
                  value={band}
                  required
                  defaultChecked={index === 1}
                  className="sr-only"
                />
                {band}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        className={`mt-8 w-full ${BUTTON_PRIMARY} ${BUTTON_LG}`}
      >
        Book my free strategy call
        <span aria-hidden>→</span>
      </button>

      <p className="mt-4 text-center text-micro text-subtle text-pretty">
        Opens WhatsApp with your details filled in. We reply within 24 hours.
      </p>
    </form>
  );
}
