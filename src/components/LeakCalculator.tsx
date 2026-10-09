"use client";

import { useId, useState } from "react";

import { CARD } from "@/lib/ui";

/* Spec from the content doc. t runs 0 → 1 across the slider.
     slider      ₹50,000 → ₹5,00,000 in ₹25,000 steps, starts at ₹1,00,000
     system off  ROAS 1.55 − 0.45t · 2 creatives  · frequency 2.4 + 4.2t
     system on   ROAS 2.85 − 0.25t · 14 creatives · frequency 1.7 + 0.5t
     leak = spend × (on ROAS − off ROAS)                                     */
const MIN_SPEND = 50_000;
const MAX_SPEND = 500_000;
const SPEND_STEP = 25_000;
const START_SPEND = 100_000;

const inr = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

function simulate(spend: number, systemOn: boolean) {
  const t = (spend - MIN_SPEND) / (MAX_SPEND - MIN_SPEND);
  return systemOn
    ? { roas: 2.85 - 0.25 * t, creatives: 14, frequency: 1.7 + 0.5 * t }
    : { roas: 1.55 - 0.45 * t, creatives: 2, frequency: 2.4 + 4.2 * t };
}

/* Both versions of a message sit in the same grid cell and the inactive one
   is only hidden, so the box keeps the taller one's height and nothing below
   jumps when the system is switched. Keep the two about the same length. */
function Swap({
  on,
  off,
  showOn,
}: {
  on: React.ReactNode;
  off: React.ReactNode;
  showOn: boolean;
}) {
  return (
    <>
      <span className={`[grid-area:1/1] ${showOn ? "invisible" : ""}`}>{off}</span>
      <span className={`[grid-area:1/1] ${showOn ? "" : "invisible"}`}>{on}</span>
    </>
  );
}

/* Leak calculator: drag the spend, then switch the system on to see the
   same account run properly. */
export default function LeakCalculator() {
  const uid = useId();
  const spendId = `${uid}-spend`;
  const verdictId = `${uid}-verdict`;
  const [spend, setSpend] = useState(START_SPEND);
  const [systemOn, setSystemOn] = useState(false);

  const { roas, creatives, frequency } = simulate(spend, systemOn);
  const leak = spend * (simulate(spend, true).roas - simulate(spend, false).roas);
  const fill = ((spend - MIN_SPEND) / (MAX_SPEND - MIN_SPEND)) * 100;

  /* Red while the account leaks (the site's loss colour), accent blue once
     the system is on. */
  const tone = systemOn ? "text-accent-soft" : "text-loss";
  const readouts = [
    { label: "Revenue from ads", value: inr(spend * roas), tone: "text-fg" },
    { label: "Return on ad spend", value: `${roas.toFixed(2)}x`, tone },
    { label: "New creatives tested this month", value: String(creatives), tone },
    { label: "Frequency on your top ad set", value: frequency.toFixed(1), tone },
    /* The section asks how much is leaking, so the answer shows before the
       system is switched on. */
    {
      label: systemOn ? "Recovered every month" : "Leaking every month",
      value: `${systemOn ? "+" : ""}${inr(leak)}`,
      tone,
    },
  ];

  return (
    <div className={`${CARD} p-4 sm:p-5`}>
      {/* ── Spend slider ───────────────────────────────── */}
      {/* No visible label: the section intro already says to set the spend,
          so the slider is named for screen readers only. */}
      <output
        htmlFor={spendId}
        className="block text-[2.1rem] leading-none font-extrabold tracking-[-0.01em] text-fg tabular-nums"
      >
        {inr(spend)}
      </output>
      <input
        id={spendId}
        type="range"
        min={MIN_SPEND}
        max={MAX_SPEND}
        step={SPEND_STEP}
        value={spend}
        onChange={(event) => setSpend(Number(event.target.value))}
        aria-label="Monthly ad spend"
        aria-valuetext={inr(spend)}
        aria-describedby={verdictId}
        style={{ ["--fill" as string]: `${fill}%` }}
        className="leak-range"
      />
      <div className="-mt-2.5 flex justify-between font-mono text-[0.72rem] text-subtle">
        <span>₹50k</span>
        <span>₹5L</span>
      </div>

      {/* ── Readouts ───────────────────────────────────── */}
      <dl aria-live="polite" className="mt-3 border-t border-line">
        {readouts.map((readout) => (
          <div
            key={readout.label}
            className="flex items-center justify-between gap-3.5 border-b border-line py-2.5"
          >
            <dt className="text-[0.94rem] text-muted">{readout.label}</dt>
            <dd
              className={`font-mono text-[1.06rem] font-medium whitespace-nowrap tabular-nums transition-colors ${readout.tone}`}
            >
              {readout.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* ── Verdict ────────────────────────────────────── */}
      <p
        id={verdictId}
        aria-live="polite"
        className={`mt-4 grid items-center rounded-r-lg border-l-4 px-3.5 py-3 text-[0.97rem] leading-relaxed transition-colors ${
          systemOn ? "border-accent bg-accent/10" : "border-loss bg-loss-deep"
        }`}
      >
        <Swap
          showOn={systemOn}
          off="Spend keeps climbing. Return keeps sliding. The same people are seeing the same ad more often, and the account has nothing new to serve them."
          on="Fourteen fresh creatives a month give Meta something new to test. Frequency stays low, new buyers keep coming, and the budget has somewhere to go."
        />
      </p>

      {/* ── System switch ──────────────────────────────── */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3.5 gap-y-2">
        <button
          type="button"
          onClick={() => setSystemOn((on) => !on)}
          className={`min-h-11 rounded-lg border px-4.5 py-2.5 text-[0.95rem] font-semibold transition-colors ${
            systemOn
              ? "border-accent/40 bg-accent/15 text-accent-soft"
              : "border-line-strong bg-ink text-fg hover:border-accent/60"
          }`}
        >
          {systemOn ? "Turn the system off" : "Turn the system on"}
        </button>
        <p className="grid text-[0.85rem] text-subtle">
          <Swap
            showOn={systemOn}
            off="Testing, tracking and post-click, all running weekly"
            on="This is what a weekly operating rhythm does to the same account."
          />
        </p>
      </div>
    </div>
  );
}
