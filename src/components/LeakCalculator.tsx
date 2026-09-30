"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { BUTTON_PRIMARY, CTA_LABEL } from "@/lib/ui";

/* Spec from the content doc:
   slider ₹50,000 → ₹5,00,000, steps of ₹25,000, starts at ₹1,50,000
   t = (spend − 50,000) ÷ 4,50,000
   now ROAS     = 1.55 − (0.45 × t)
   Whizoid ROAS = 2.85 − (0.25 × t)
   leak = spend × (Whizoid ROAS − now ROAS)                                  */
const MIN_SPEND = 50_000;
const MAX_SPEND = 500_000;
const SPEND_STEP = 25_000;
const START_SPEND = 150_000;

const inr = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

type Mode = "now" | "whizoid";

const MODES: { id: Mode; label: string }[] = [
  { id: "now", label: "Your ads now" },
  { id: "whizoid", label: "With Whizoid" },
];

type LeakCalculatorProps = {
  /* Tighter layout for the hero column: smaller readouts, and the CTA only
     shows on desktop (on mobile the hero's own CTA sits right above). */
  compact?: boolean;
};

export default function LeakCalculator({
  compact = false,
}: LeakCalculatorProps) {
  /* The calculator renders twice on the page (hero + its own section), so
     ids and the toggle's layoutId must be unique per instance. */
  const uid = useId();
  const spendId = `${uid}-spend`;
  const [spend, setSpend] = useState(START_SPEND);
  const [mode, setMode] = useState<Mode>("now");

  const { roas, revenue, leak } = useMemo(() => {
    const t = (spend - MIN_SPEND) / (MAX_SPEND - MIN_SPEND);
    const roasNow = 1.55 - 0.45 * t;
    const roasWhizoid = 2.85 - 0.25 * t;
    const active = mode === "now" ? roasNow : roasWhizoid;

    return {
      roas: active,
      revenue: spend * active,
      leak: spend * (roasWhizoid - roasNow),
    };
  }, [spend, mode]);

  /* Shared by the leak callout and the CTA so they match. */
  const ctaSize = "min-h-12 px-4 py-3 text-body leading-snug sm:px-6";

  const fill = ((spend - MIN_SPEND) / (MAX_SPEND - MIN_SPEND)) * 100;

  return (
    <div className="relative rounded-2xl border border-line bg-raised p-4 min-[360px]:p-5 sm:p-6">
      {/* ── Spend slider ───────────────────────────────── */}
      {/* Compact always stacks: side-by-side, wider amounts (₹1,00,000+)
          wrapped under the label while ₹50,000 didn't, so the header jumped. */}
      <div
        className={`flex flex-col gap-2 ${
          compact
            ? ""
            : "sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4"
        }`}
      >
        <label
          htmlFor={spendId}
          className="text-micro font-medium text-muted"
        >
          Monthly ad spend
        </label>
        <output
          htmlFor={spendId}
          className={`${compact ? "text-punch" : "text-stat"} font-semibold text-fg tabular-nums`}
        >
          {inr(spend)}
        </output>
      </div>

      <input
        id={spendId}
        type="range"
        min={MIN_SPEND}
        max={MAX_SPEND}
        step={SPEND_STEP}
        value={spend}
        onChange={(event) => setSpend(Number(event.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
        className="leak-range mt-2 sm:mt-3"
        aria-label="Your monthly ad spend"
      />

      <div className="flex justify-between text-micro text-subtle tabular-nums">
        <span>{inr(MIN_SPEND)}</span>
        <span>{inr(MAX_SPEND)}</span>
      </div>

      {/* ── Mode toggle ────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Compare scenarios"
        className={`${compact ? "mt-5" : "mt-6"} grid grid-cols-2 gap-1 rounded-xl border border-line bg-ink p-1`}
      >
        {MODES.map((option) => {
          const selected = option.id === mode;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setMode(option.id)}
              className="relative min-h-11 rounded-lg px-3 py-2.5 text-micro font-semibold transition-colors sm:px-4 sm:text-body"
            >
              {selected && (
                <motion.span
                  layoutId={`${uid}-calc-mode`}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-lg border border-accent/40 bg-accent/15"
                />
              )}
              <span
                className={`relative ${selected ? "text-accent-soft" : "text-subtle hover:text-muted"}`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Revenue + ROAS ─────────────────────────────── */}
      {/* Two cells split by a hairline instead of two separate boxes.
          ROAS is always short ("1.45x"), so revenue gets the rest of the
          width — ₹13,00,000 needs it on small phones. */}
      <dl className="mt-5 grid grid-cols-[1fr_auto] divide-x divide-line border-y border-line">
        {[
          { label: "Revenue", value: inr(revenue) },
          { label: "ROAS", value: `${roas.toFixed(2)}x` },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={`min-w-0 py-4 sm:py-5 ${index === 0 ? "pr-3 sm:pr-4" : "pl-3 sm:pl-6"}`}
          >
            <dt className="text-micro font-medium text-muted">
              {stat.label}
            </dt>
            <dd
              className={`mt-2 ${compact ? "text-punch" : "text-[1.5rem] min-[360px]:text-stat"} font-bold whitespace-nowrap tabular-nums text-accent-soft`}
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* ── Leak callout ───────────────────────────────── */}
      {/* Sized like the CTA below; fixed min-height so swapping messages
          doesn't shift it. */}
      <div className={`${compact ? "mt-5 min-h-12" : "mt-6 min-h-14"}`}>
        <AnimatePresence mode="wait" initial={false}>
          {mode === "now" ? (
            <motion.button
              key="now"
              type="button"
              onClick={() => setMode("whizoid")}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={`group flex w-full items-center justify-center gap-2 rounded-lg border border-loss/30 bg-loss-deep text-center font-semibold text-loss transition-colors hover:border-loss/60 ${ctaSize}`}
            >
              See what you&apos;re missing
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </motion.button>
          ) : (
            <motion.p
              key="whizoid"
              aria-live="polite"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={`flex w-full items-center justify-center rounded-lg border border-loss/30 bg-loss-deep text-center font-medium text-fg ${ctaSize}`}
            >
              {/* One text child, so it flows as a single line instead of
                  wrapping as separate flex items. */}
              <span>
                You&apos;re missing{" "}
                <span className="whitespace-nowrap font-bold tabular-nums text-loss">
                  {inr(leak)}
                </span>{" "}
                every month
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <a
        href="#book"
        className={`mt-3 w-full ${BUTTON_PRIMARY} ${compact ? "hidden lg:flex" : "flex"} ${ctaSize}`}
      >
        {/* Wrapped so the label centres (and balances) if it breaks on
            narrow screens instead of hugging the left edge. */}
        <span className="text-center text-balance">
          {CTA_LABEL}
        </span>
        <span aria-hidden>→</span>
      </a>

      <p className="mt-4 text-center text-micro text-subtle">
        Sample numbers. Your call shows your real ones.
      </p>
    </div>
  );
}
