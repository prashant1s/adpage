"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

import Faq from "@/components/Faq";
import LeakCalculator from "@/components/LeakCalculator";
import StickyCta from "@/components/StickyCta";
import StrategyCallForm from "@/components/StrategyCallForm";
import Testimonials from "@/components/Testimonials";

const GhostFibers = dynamic(() => import("@/components/GhostFibers"), { ssr: false });

/* ─────────────────────────────────────────
   REUSABLE fade-in wrapper
───────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SECTION SHELL
───────────────────────────────────────── */
function Section({
  id,
  eyebrow,
  heading,
  children,
  className = "",
  width = "max-w-4xl",
}: {
  id?: string;
  eyebrow?: string;
  heading?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  width?: string;
}) {
  return (
    <section id={id} className={`px-6 py-20 sm:py-24 ${className}`}>
      <div className={`mx-auto ${width}`}>
        {(eyebrow || heading) && (
          <FadeIn className="mb-12">
            {eyebrow && (
              <span className="mb-4 block text-xs font-bold tracking-[0.2em] uppercase text-blue-500">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white text-balance sm:text-4xl xl:text-5xl">
                {heading}
              </h2>
            )}
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA BUTTON — every CTA points at the form
───────────────────────────────────────── */
function Cta({
  children,
  variant = "solid",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold transition-colors";
  const styles =
    variant === "solid"
      ? "glow-btn bg-blue-600 text-white hover:bg-blue-500"
      : "border border-white/15 text-neutral-300 hover:border-white/40 hover:text-white";

  return (
    <a href="#book" className={`${base} ${styles} ${className}`}>
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

/* ─────────────────────────────────────────
   CONTENT
───────────────────────────────────────── */
const SYMPTOMS = [
  "You raised the budget. Sales stayed the same.",
  "The same 2–3 ads have been running for weeks.",
  "Your cost per order goes up every month.",
  "Lots of clicks. Very few people actually buy.",
  "One ad works, then dies in a week. Nobody knows why.",
  "Every new campaign feels like a guess.",
  "Your agency sends reports. Nothing changes.",
];

const REASONS = [
  {
    title: "Your ads are tired.",
    body: "People have seen them too many times. They scroll past.",
  },
  {
    title: "Nobody is testing.",
    body: "New ads go live on hope, not on data.",
  },
  {
    title: "Your tracking is off.",
    body: "Meta learns from wrong numbers, so it shows your ads to the wrong people.",
  },
  {
    title: "Ad and page don’t match.",
    body: "People click, land somewhere confusing, and leave.",
  },
  {
    title: "Budget goes up too fast.",
    body: "Winning ads break when you push them too hard, too soon.",
  },
];

const STEPS = [
  {
    step: 1,
    title: "Find the leak",
    meta: "First 7 days",
    body: "We go through your ads, tracking and landing page, and show you exactly where money is being wasted.",
  },
  {
    step: 2,
    title: "Test new ads every week",
    meta: "Every week",
    body: "Fresh hooks and angles every week. Ads that don’t sell are switched off within 72 hours.",
  },
  {
    step: 3,
    title: "Scale only the winners",
    meta: "Ongoing",
    body: "Budget goes up only on ads that are actually selling. Slowly, so they don’t break.",
  },
];

const FIT = {
  yes: [
    "You run a D2C brand that sells online",
    "You spend ₹1–3L a month on Meta ads",
    "You want to grow sales without wasting more money",
  ],
  no: [
    "You’re just starting and have no sales yet",
    "You’re looking for the cheapest agency",
  ],
};

const CALL_AGENDA = [
  "Look at your ad account with you, live",
  "Show you the 2–3 biggest places you’re losing money",
  "Tell you what to fix first, even if you don’t work with us",
];

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white selection:bg-blue-600/40">
      {/* ── 1. HERO ────────────────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[#07070b]">
        <div className="absolute inset-0 z-0">
          <GhostFibers
            lineColor="#1a1040"
            glowColor="#3b82f6"
            speed={0.18}
            scale={2.2}
            rotation={-15}
            rotationSpeed={0.12}
            layers={6}
            waveAmplitude={0.018}
            waveFrequency={3.5}
            waveSpeed={0.12}
            layerSpeed={0.06}
            twist={0.12}
            twistFrequency={5}
            twistSpeed={1.0}
            lineFrequency={5}
            lineSpacing={2}
            lineSharpness={18}
            glowFalloff={8}
            glowIntensity={2.0}
            brightness={2.2}
            blueBoost={1.4}
            vignette={0.6}
            grain={0.03}
            dpr={1}
            fps={60}
          />
        </div>

        {/* Readability veils */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#07070b] via-[#07070b]/80 via-[40%] to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#07070b]/70 via-transparent to-[#07070b]/90" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
              For D2C brands spending ₹1–3L a month on Meta ads
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl xl:text-6xl"
            >
              Spending lakhs on Meta ads.{" "}
              <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                Still stuck at 1.5x ROAS?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mb-9 text-lg leading-relaxed text-neutral-400 sm:text-xl"
            >
              Your product isn&apos;t the problem. Your budget isn&apos;t the
              problem.{" "}
              <span className="font-medium text-white">
                The way your ads are being run is.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4 }}
            >
              <Cta className="w-full sm:w-auto">Book my free strategy call</Cta>
              <p className="mt-4 text-sm text-neutral-500">
                Free 30-min call · No pitch
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. THE PROBLEM ─────────────────── */}
      <Section
        id="problem"
        eyebrow="Sound familiar?"
        heading="If this is your ad account, keep reading."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {SYMPTOMS.map((symptom, index) => (
            <FadeIn key={symptom} delay={index * 0.05}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-sm font-bold text-rose-400"
                >
                  ✕
                </span>
                <p className="text-[0.975rem] leading-snug text-neutral-300">
                  {symptom}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1} className="mt-10">
          <p className="border-l-2 border-rose-500 pl-5 text-xl font-bold leading-snug text-white text-balance sm:text-2xl">
            Putting more money into this only makes the loss bigger.
          </p>
          <Cta variant="outline" className="mt-8 w-full sm:w-auto">
            Find where my money is going
          </Cta>
        </FadeIn>
      </Section>

      {/* ── 3. WHY IT HAPPENS ──────────────── */}
      <Section
        eyebrow="The root cause"
        heading="Why this keeps happening"
        className="border-y border-white/[0.07] bg-white/[0.015]"
      >
        <div className="space-y-px overflow-hidden rounded-2xl border border-white/10">
          {REASONS.map((reason, index) => (
            <FadeIn key={reason.title} delay={index * 0.06}>
              <div className="flex gap-5 bg-white/[0.03] p-5 sm:gap-7 sm:p-7">
                <span
                  aria-hidden
                  className="text-2xl font-extrabold tabular-nums text-white/15 sm:text-3xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {reason.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-neutral-400">
                    {reason.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <Cta variant="outline" className="mt-10 w-full sm:w-auto">
            Check which one is hurting me
          </Cta>
        </FadeIn>
      </Section>

      {/* ── 4. CALCULATOR ──────────────────── */}
      <Section
        id="calculator"
        eyebrow="The leak"
        heading="How much are your ads leaking?"
        width="max-w-2xl"
      >
        <FadeIn>
          <LeakCalculator />
        </FadeIn>
      </Section>

      {/* ── 5. THE FIX ─────────────────────── */}
      <Section
        eyebrow="The system"
        heading="Here’s how we fix it"
        className="border-y border-white/[0.07] bg-white/[0.015]"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <FadeIn key={step.step} delay={index * 0.1} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {step.step}
                  </span>
                  <span className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-neutral-500">
                    {step.meta}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-400">
                  {step.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1} className="mt-4">
          <div className="rounded-2xl border border-blue-500/25 bg-blue-500/[0.07] p-6">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-400">
              Every week you get
            </p>
            <p className="mt-3 text-lg font-bold text-white">
              A short WhatsApp update.
            </p>
            <p className="mt-1 text-neutral-400">
              What we tested, what worked, what&apos;s next. No 20-page reports.
            </p>
          </div>
          <Cta className="mt-10 w-full sm:w-auto">Fix my ads</Cta>
        </FadeIn>
      </Section>

      {/* ── 6. GUARANTEE ───────────────────── */}
      <FadeIn>
        <div className="border-b border-white/[0.07] bg-gradient-to-r from-emerald-500/[0.06] via-emerald-500/[0.12] to-emerald-500/[0.06]">
          <p className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 px-6 py-7 text-center text-lg font-extrabold tracking-tight text-white sm:text-2xl">
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-base text-emerald-400"
            >
              ✓
            </span>
            No results in 90 days? You don&apos;t pay us.
          </p>
        </div>
      </FadeIn>

      {/* ── 7. TESTIMONIALS ────────────────── */}
      <Section eyebrow="Proof" heading="Founders who stopped guessing" width="max-w-5xl">
        <FadeIn>
          <Testimonials />
        </FadeIn>
      </Section>

      {/* ── 8. IS THIS FOR YOU? ────────────── */}
      <Section
        eyebrow="Fit check"
        heading="Is this for you?"
        className="border-y border-white/[0.07] bg-white/[0.015]"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FadeIn className="h-full">
            <div className="h-full rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.05] p-6 sm:p-7">
              <p className="text-sm font-bold tracking-[0.15em] uppercase text-emerald-400">
                This is for you if
              </p>
              <ul className="mt-5 space-y-4">
                {FIT.yes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400"
                    >
                      ✓
                    </span>
                    <span className="text-neutral-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="h-full">
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <p className="text-sm font-bold tracking-[0.15em] uppercase text-neutral-500">
                Not for you if
              </p>
              <ul className="mt-5 space-y-4">
                {FIT.no.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-xs font-bold text-rose-400"
                    >
                      ✕
                    </span>
                    <span className="text-neutral-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── 9. FORM ────────────────────────── */}
      <section id="book" className="relative overflow-hidden px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(59,130,246,0.12),transparent)]" />

        <div className="relative mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <span className="mb-4 block text-xs font-bold tracking-[0.2em] uppercase text-blue-500">
              Free strategy call
            </span>
            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white text-balance sm:text-4xl">
              Spending ₹1 to ₹3 lakhs a month on ads?
            </h2>
            <p className="mt-5 text-lg text-neutral-400">
              Let&apos;s find what&apos;s broken before you spend another rupee.
            </p>

            <p className="mt-10 text-sm font-bold tracking-[0.15em] uppercase text-neutral-500">
              On this call we
            </p>
            <ul className="mt-5 space-y-4">
              {CALL_AGENDA.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400"
                  >
                    ✓
                  </span>
                  <span className="text-neutral-300">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.15}>
            <StrategyCallForm />
          </FadeIn>
        </div>
      </section>

      {/* ── 10. FAQ ────────────────────────── */}
      <Section
        eyebrow="Questions"
        heading="Before you book"
        className="border-t border-white/[0.07] bg-white/[0.015]"
        width="max-w-3xl"
      >
        <FadeIn>
          <Faq />
        </FadeIn>
      </Section>

      {/* ── FOOTER ─────────────────────────── */}
      <footer className="border-t border-white/[0.07] px-6 py-10 pb-24 text-center text-sm text-neutral-600 md:pb-10">
        <p>
          Whizoid Studio · Meta ads for D2C brands.{" "}
          <span className="text-blue-500">Stop guessing. Start scaling.</span>
        </p>
      </footer>

      {/* ── 11. STICKY MOBILE BUTTON ───────── */}
      <StickyCta />
    </main>
  );
}
