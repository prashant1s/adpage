"use client";

import { useState } from "react";

const SPEND_BANDS = ["Under ₹1L", "₹1–2L", "₹2–3L", "₹3L+"];

const FIELD_CLASS =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white placeholder:text-neutral-600 transition-colors focus:border-blue-500 focus:outline-none";

type Status = "idle" | "sending" | "sent";

export default function StrategyCallForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const lead = Object.fromEntries(new FormData(event.currentTarget));

    // TODO: send `lead` to the real destination (CRM / sheet / WhatsApp API).
    // Nothing is transmitted yet — the browser console is the only sink.
    console.log("Strategy call request", lead);

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.07] p-8 text-center">
        <span
          aria-hidden
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-2xl text-emerald-400"
        >
          ✓
        </span>
        <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-white">
          Got it.
        </h3>
        <p className="mt-2 text-neutral-400">
          We&apos;ll WhatsApp you within 24 hours to lock a time.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8"
    >
      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-neutral-300">
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
          <label htmlFor="website" className="mb-2 block text-sm font-semibold text-neutral-300">
            Brand website
          </label>
          <input
            id="website"
            name="website"
            required
            inputMode="url"
            placeholder="yourbrand.com"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-neutral-300">
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

        <div>
          <span className="mb-2 block text-sm font-semibold text-neutral-300">
            Monthly ad spend
          </span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {SPEND_BANDS.map((band, index) => (
              <label
                key={band}
                className="cursor-pointer rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-center text-sm font-semibold text-neutral-400 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500/15 has-[:checked]:text-white"
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
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="glow-btn mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-blue-500 disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Book my free strategy call"}
        {status === "idle" && <span aria-hidden>→</span>}
      </button>

      <p className="mt-4 text-center text-sm text-neutral-500">
        No pitch. No pressure. We&apos;ll WhatsApp you within 24 hours.
      </p>
    </form>
  );
}
