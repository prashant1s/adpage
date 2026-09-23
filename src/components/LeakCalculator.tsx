"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

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

export default function LeakCalculator() {
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

  const fill = ((spend - MIN_SPEND) / (MAX_SPEND - MIN_SPEND)) * 100;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-white/6 to-white/2 p-5 sm:p-8 lg:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-xl -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative">
        {/* ── Spend slider ───────────────────────────────── */}
        <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
          <label
            htmlFor="spend"
            className="text-eyebrow font-bold uppercase text-neutral-500"
          >
            Your monthly ad spend
          </label>
          <output
            htmlFor="spend"
            className="text-stat font-extrabold text-white tabular-nums"
          >
            {inr(spend)}
          </output>
        </div>

        <input
          id="spend"
          type="range"
          min={MIN_SPEND}
          max={MAX_SPEND}
          step={SPEND_STEP}
          value={spend}
          onChange={(event) => setSpend(Number(event.target.value))}
          style={{ ["--fill" as string]: `${fill}%` }}
          className="leak-range mt-3 sm:mt-4"
          aria-label="Your monthly ad spend"
        />

        <div className="flex justify-between text-micro font-medium text-neutral-600 tabular-nums">
          <span>{inr(MIN_SPEND)}</span>
          <span>{inr(MAX_SPEND)}</span>
        </div>

        {/* ── Mode toggle ────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Compare scenarios"
          className="mt-7 grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-black/40 p-1"
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
                className="relative min-h-11.5 rounded-xl px-3 py-3 text-body font-bold transition-colors sm:px-4"
              >
                {selected && (
                  <motion.span
                    layoutId="calc-mode"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl border border-emerald-500/40 bg-emerald-500/15"
                  />
                )}
                <span
                  className={`relative ${
                    selected ? "text-emerald-300" : "text-neutral-500"
                  }`}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Revenue + ROAS ─────────────────────────────── */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
          {[
            { label: "Revenue", value: inr(revenue) },
            { label: "ROAS", value: `${roas.toFixed(2)}x` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 sm:px-5 sm:py-5"
            >
              <p className="text-eyebrow font-bold uppercase text-neutral-500">
                {stat.label}
              </p>
              <p className="mt-2 text-stat font-extrabold tabular-nums text-emerald-400">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── The leak ───────────────────────────────────── */}
        <div
          aria-live="polite"
          className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/7 px-4 py-5 text-center sm:px-5 sm:py-6"
        >
          <p className="text-punch font-extrabold text-emerald-400 text-balance">
            You&apos;re losing{" "}
            <span className="tabular-nums">{inr(leak)}</span> every month.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <a
            href="#book"
            className="glow-btn inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-center text-body font-bold text-white transition-colors hover:bg-blue-500 sm:w-auto sm:px-8"
          >
            Get my real numbers checked
            <span aria-hidden>→</span>
          </a>
          <p className="text-micro text-neutral-500">
            Sample numbers. Your call shows your real ones.
          </p>
        </div>
      </div>
    </div>
  );
}
