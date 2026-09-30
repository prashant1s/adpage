"use client";

import { useId, useRef, useState } from "react";

import { hasCalendly, openCalendly } from "@/lib/calendly";
import { WHATSAPP_NUMBER } from "@/lib/site";
import {
  BUTTON_MD,
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  CTA_LABEL,
} from "@/lib/ui";

/* Starts at ₹1L on purpose: the form filters out accounts too small to help. */
const SPEND_BANDS = ["₹1–2L", "₹2–3L", "₹3L+"];

const FIELD_CLASS =
  "w-full rounded-lg border bg-ink px-4 py-2.5 text-body text-fg placeholder:text-subtle/70 transition-colors focus:outline-none";
const FIELD_OK = "border-line hover:border-line-strong focus:border-accent";
const FIELD_BAD = "border-loss/70 focus:border-loss";

const LABEL_CLASS = "mb-1.5 block text-micro font-medium text-muted";

/* ── Validation ───────────────────────────────────────────────────── */

type Values = {
  name: string;
  whatsapp: string;
  email: string;
  website: string;
  spend: string;
};
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: "", whatsapp: "", email: "", website: "", spend: "" };

/* Letters (any script), spaces, dots, apostrophes and hyphens. */
const NAME_RE = /^[\p{L}][\p{L} .'-]*$/u;
/* Indian mobile numbers: 10 digits, starting 6–9. */
const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE =
  /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9_%+-])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
/* A domain with a real-looking TLD, optional protocol and path. Covers
   "brand.in", "https://www.brand.com/shop" and "instagram.com/brand". */
const WEBSITE_RE =
  /^(?:https?:\/\/)?(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}(?:[/?#]\S*)?$/;

function validate(field: Field, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "name": {
      if (!value) return "Please enter your name.";
      const letters = value.replace(/[^\p{L}]/gu, "");
      if (!NAME_RE.test(value) || letters.length < 2)
        return "Use letters only, e.g. Priya Sharma.";
      if (/(.)\1{3,}/iu.test(letters) || value.length > 60)
        return "That doesn't look like a real name.";
      return;
    }
    case "whatsapp":
      if (!value) return "Please enter your WhatsApp number.";
      if (value.length !== 10) return "Enter exactly 10 digits.";
      if (!PHONE_RE.test(value) || /^(\d)\1{9}$/.test(value))
        return "Enter a valid Indian mobile number (starts with 6, 7, 8 or 9).";
      return;
    case "email":
      if (!value) return "Please enter your email.";
      if (!EMAIL_RE.test(value) || value.includes(".."))
        return "Enter a valid email, e.g. priya@yourbrand.com.";
      return;
    case "website":
      if (!value) return "Please enter your brand's website.";
      if (/\s/.test(value) || !WEBSITE_RE.test(value))
        return "Enter a valid link, e.g. yourbrand.com.";
      return;
    case "spend":
      if (!SPEND_BANDS.includes(value)) return "Pick your monthly ad spend.";
      return;
  }
}

function validateAll(values: Values): Errors {
  const errors: Errors = {};
  for (const field of Object.keys(values) as Field[]) {
    const message = validate(field, values[field]);
    if (message) errors[field] = message;
  }
  return errors;
}

/* Keeps the WhatsApp field to 10 bare digits, even when a number is pasted
   as "+91 98765 43210" or "098765 43210". */
function normalisePhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length > 10 && digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

/** Formats the lead as the opening WhatsApp message the founder will send. */
function buildChatUrl(values: Values) {
  const message = [
    "Hi Whizoid, I'd like to book a free strategy call.",
    "",
    `Name: ${values.name.trim()}`,
    `WhatsApp: +91 ${values.whatsapp}`,
    `Email: ${values.email.trim()}`,
    `Brand website: ${values.website.trim()}`,
    `Monthly ad spend: ${values.spend}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ── Form ─────────────────────────────────────────────────────────── */

export default function StrategyCallForm({
  plain = false,
}: {
  /** Drop the card border/background, for use inside the booking popup. */
  plain?: boolean;
}) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<Values | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  /* The form renders twice (page section + popup), so field ids must be
     unique per instance for labels to stay linked to their inputs. */
  const uid = useId();
  const fieldId = (name: Field) => `${uid}-${name}`;
  const errorId = (name: Field) => `${uid}-${name}-error`;
  const shell = plain ? "" : "rounded-2xl border border-line bg-raised";

  const update = (field: Field, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Once a field has shown an error, re-check it as the visitor fixes it.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: validate(field, value) }));
  };

  const check = (field: Field) =>
    setErrors((current) => ({ ...current, [field]: validate(field, values[field]) }));

  const bookCall = (lead: Values) =>
    openCalendly({
      name: lead.name.trim(),
      email: lead.email.trim(),
      customAnswers: { a1: `+91 ${lead.whatsapp}` },
    });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateAll(values);
    setErrors(found);
    const firstBad = (Object.keys(found) as Field[])[0];
    if (firstBad) {
      const target =
        firstBad === "spend"
          ? formRef.current?.querySelector<HTMLInputElement>('input[name="spend"]')
          : document.getElementById(fieldId(firstBad));
      target?.focus();
      return;
    }

    // 1. Capture the lead first: WhatsApp opens with every detail typed out.
    //    Opened synchronously inside the submit handler so the browser counts
    //    it as user-initiated and doesn't block it.
    const url = buildChatUrl(values);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    setSent(values);

    // 2. Then the booking. Calendly's popup can't sit above the booking
    //    <dialog> (top layer), so close that first.
    event.currentTarget.closest("dialog")?.close();
    if (hasCalendly) void bookCall(values);
    else if (!opened) window.location.href = url;
  }

  if (sent) {
    const chatUrl = buildChatUrl(sent);
    return (
      <div role="status" className={`${shell} ${plain ? "" : "p-6 sm:p-10"}`}>
        <p className="text-eyebrow font-semibold uppercase text-accent">
          {hasCalendly ? "Step 2 of 2" : "Request ready"}
        </p>
        <h3 className="mt-4 text-h2 font-semibold text-fg text-balance">
          {hasCalendly ? "Now pick a time for your call." : "WhatsApp is opening."}
        </h3>
        <p className="mt-3 max-w-md text-body text-muted text-pretty">
          Your details are typed out in WhatsApp. Hit send so we have them,
          {hasCalendly
            ? " then choose a slot that suits you."
            : " and we'll reply within 24 hours."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {hasCalendly && (
            <button
              type="button"
              onClick={() => void bookCall(sent)}
              className={`${BUTTON_PRIMARY} ${BUTTON_MD}`}
            >
              Pick a time
              <span aria-hidden>→</span>
            </button>
          )}
          <a
            href={chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${BUTTON_SECONDARY} ${BUTTON_MD}`}
          >
            Open WhatsApp again
          </a>
        </div>
      </div>
    );
  }

  const fieldClass = (field: Field) =>
    `${FIELD_CLASS} ${errors[field] ? FIELD_BAD : FIELD_OK}`;

  const describedBy = (field: Field) => (errors[field] ? errorId(field) : undefined);

  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={errorId(field)} className="mt-1.5 text-micro text-loss">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className={`${shell} ${plain ? "" : "p-5 sm:p-6"}`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className={LABEL_CLASS}>
            Your name
          </label>
          <input
            id={fieldId("name")}
            name="name"
            required
            maxLength={60}
            autoComplete="name"
            autoCapitalize="words"
            placeholder="Priya Sharma"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            onBlur={() => check("name")}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={fieldClass("name")}
          />
          {errorText("name")}
        </div>

        <div>
          <label htmlFor={fieldId("whatsapp")} className={LABEL_CLASS}>
            WhatsApp number
          </label>
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-body text-muted"
            >
              +91
            </span>
            <input
              id={fieldId("whatsapp")}
              name="whatsapp"
              required
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98765 43210"
              value={values.whatsapp}
              onChange={(event) => update("whatsapp", normalisePhone(event.target.value))}
              onBlur={() => check("whatsapp")}
              aria-invalid={!!errors.whatsapp}
              aria-describedby={describedBy("whatsapp")}
              className={`${fieldClass("whatsapp")} pl-13 tabular-nums`}
            />
          </div>
          {errorText("whatsapp")}
        </div>

        <div>
          <label htmlFor={fieldId("email")} className={LABEL_CLASS}>
            Email
          </label>
          <input
            id={fieldId("email")}
            name="email"
            required
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={120}
            placeholder="priya@yourbrand.com"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            onBlur={() => check("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={fieldClass("email")}
          />
          {errorText("email")}
        </div>

        <div>
          <label htmlFor={fieldId("website")} className={LABEL_CLASS}>
            Brand website
          </label>
          <input
            id={fieldId("website")}
            name="website"
            required
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={200}
            placeholder="yourbrand.com"
            value={values.website}
            onChange={(event) => update("website", event.target.value)}
            onBlur={() => check("website")}
            aria-invalid={!!errors.website}
            aria-describedby={describedBy("website")}
            className={fieldClass("website")}
          />
          {errorText("website")}
        </div>

        <fieldset
          className="sm:col-span-2"
          aria-invalid={!!errors.spend}
          aria-describedby={describedBy("spend")}
        >
          <legend className={LABEL_CLASS}>Monthly Meta ad spend</legend>
          <div className="grid grid-cols-3 gap-2">
            {SPEND_BANDS.map((band) => (
              <label
                key={band}
                className={`flex min-h-11 cursor-pointer items-center justify-center rounded-lg border bg-ink px-2 py-2 text-center text-micro font-medium text-muted transition-colors hover:border-line-strong has-checked:border-accent has-checked:bg-accent/15 has-checked:text-fg has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent ${
                  errors.spend ? "border-loss/70" : "border-line"
                }`}
              >
                <input
                  type="radio"
                  name="spend"
                  value={band}
                  required
                  checked={values.spend === band}
                  onChange={() => update("spend", band)}
                  className="sr-only"
                />
                {band}
              </label>
            ))}
          </div>
          {errorText("spend")}
        </fieldset>
      </div>

      <button type="submit" className={`mt-6 w-full ${BUTTON_PRIMARY} ${BUTTON_MD} font-semibold`}>
        <span className="text-balance">{CTA_LABEL}</span>
        <span aria-hidden>→</span>
      </button>

      <p className="mt-4 text-center text-micro text-subtle text-pretty">
        {hasCalendly
          ? "Your details go to us on WhatsApp first, then you pick a time on Calendly."
          : "Opens WhatsApp with your details filled in. We reply within 24 hours."}
      </p>
    </form>
  );
}
