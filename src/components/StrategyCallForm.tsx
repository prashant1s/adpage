"use client";

import { useState } from "react";

import { WHATSAPP_NUMBER } from "@/lib/site";

const SPEND_BANDS = ["Under ₹1L", "₹1–2L", "₹2–3L", "₹3L+"];

const FIELD_CLASS =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-body text-white placeholder:text-neutral-600 transition-colors focus:border-blue-500 focus:outline-none";

const LABEL_CLASS = "mb-2 block text-body font-semibold text-neutral-300";

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

export default function StrategyCallForm() {
  const [chatUrl, setChatUrl] = useState<string | null>(null);

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
        className="rounded-3xl border border-emerald-500/30 bg-emerald-500/7 p-6 text-center sm:p-8"
      >
        <span
          aria-hidden
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-stat text-emerald-400"
        >
          ✓
        </span>
        <h3 className="mt-5 text-h2 font-extrabold text-white">
          WhatsApp is opening.
        </h3>
        <p className="mt-2 text-body text-neutral-400 text-pretty">
          Your details are already typed out — just hit send and we&apos;ll
          reply within 24 hours.
        </p>
        <a
          href={chatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 px-6 py-3.5 text-body font-bold text-emerald-300 transition-colors hover:bg-emerald-500/10"
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
      className="rounded-3xl border border-white/10 bg-white/4 p-5 sm:p-7"
    >
      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className={LABEL_CLASS}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor="website" className={LABEL_CLASS}>
            Brand website
          </label>
          <input
            id="website"
            name="website"
            required
            inputMode="url"
            autoComplete="url"
            placeholder="yourbrand.com"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className={LABEL_CLASS}>
            WhatsApp number
          </label>
          <input
            id="whatsapp"
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

        <fieldset>
          <legend className={LABEL_CLASS}>Monthly ad spend</legend>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {SPEND_BANDS.map((band, index) => (
              <label
                key={band}
                className="flex min-h-11.5 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-black/40 px-2 py-2.5 text-center text-body font-semibold text-neutral-400 transition-colors has-checked:border-blue-500 has-checked:bg-blue-500/15 has-checked:text-white"
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
        className="glow-btn mt-7 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-body font-bold text-white transition-colors hover:bg-blue-500"
      >
        Book my free strategy call
        <span aria-hidden>→</span>
      </button>

      <p className="mt-4 text-center text-micro text-neutral-500 text-pretty">
        No pitch. No pressure. We&apos;ll WhatsApp you within 24 hours.
      </p>
    </form>
  );
}
