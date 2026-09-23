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

  const isNow = mode === "now";
  const fill = ((spend - MIN_SPEND) / (MAX_SPEND - MIN_SPEND)) * 100;
  const valueColor = isNow ? "text-rose-400" : "text-emerald-400";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative">
        {/* ── Spend slider ───────────────────────────────── */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <label
            htmlFor="spend"
            className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500"
          >
            Your monthly ad spend
          </label>
          <output
            htmlFor="spend"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white tabular-nums"
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
          className="leak-range mt-6"
          aria-label="Your monthly ad spend"
        />

        <div className="mt-3 flex justify-between text-xs font-medium text-neutral-600 tabular-nums">
          <span>{inr(MIN_SPEND)}</span>
          <span>{inr(MAX_SPEND)}</span>
        </div>

        {/* ── Mode toggle ────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Compare scenarios"
          className="mt-8 grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-black/40 p-1"
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
                className="relative rounded-xl px-4 py-3 text-sm font-bold transition-colors"
              >
                {selected && (
                  <motion.span
                    layoutId="calc-mode"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className={`absolute inset-0 rounded-xl ${
                      option.id === "now" ? "bg-rose-500/15 border border-rose-500/40" : "bg-emerald-500/15 border border-emerald-500/40"
                    }`}
                  />
                )}
                <span
                  className={`relative ${
                    selected
                      ? option.id === "now"
                        ? "text-rose-300"
                        : "text-emerald-300"
                      : "text-neutral-500"
                  }`}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Revenue + ROAS ─────────────────────────────── */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            { label: "Revenue", value: inr(revenue) },
            { label: "ROAS", value: `${roas.toFixed(2)}x` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-black/30 px-5 py-5"
            >
              <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-neutral-500">
                {stat.label}
              </p>
              <p
                className={`mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums transition-colors duration-300 ${valueColor}`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── The leak ───────────────────────────────────── */}
        <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/[0.07] px-5 py-6 text-center">
          <p className="text-xl sm:text-3xl font-extrabold tracking-tight text-rose-400">
            You&apos;re losing{" "}
            <span className="tabular-nums">{inr(leak)}</span> every month.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <a
            href="#book"
            className="glow-btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-blue-500 sm:w-auto"
          >
            Get my real numbers checked
            <span aria-hidden>→</span>
          </a>
          <p className="text-xs text-neutral-500">
            Sample numbers. Your call shows your real ones.
          </p>
        </div>
      </div>
    </div>
  );
}
