"use client";

import { useId, useRef } from "react";
import { motion, useInView } from "framer-motion";

import Faq from "@/components/Faq";
import HeroBackground from "@/components/HeroBackground";
import LeakCalculator from "@/components/LeakCalculator";
import StickyCta from "@/components/StickyCta";
import StrategyCallForm from "@/components/StrategyCallForm";
import Testimonials from "@/components/Testimonials";

/* Every section shares this gutter + max width so headings line up down the
   whole page. */
const CONTAINER = "mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8";

/* The hero gets a wider box so its headline starts further left than the
   sections below it, and has room to stay on two lines at full size. */
const HERO_CONTAINER = "mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8";

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
  inner = "",
}: {
  id?: string;
  eyebrow?: string;
  heading?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  inner?: string;
}) {
  const headingId = useId();

  return (
    <section
      id={id}
      aria-labelledby={heading ? headingId : undefined}
      className={`scroll-mt-8 py-16 sm:py-20 lg:py-28 ${className}`}
    >
      <div className={CONTAINER}>
        {(eyebrow || heading) && (
          <FadeIn className="mb-10 sm:mb-12">
            {eyebrow && (
              <span className="mb-3 block text-eyebrow font-bold uppercase text-blue-400">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2
                id={headingId}
                className="text-h2 font-extrabold text-white text-balance"
              >
                {heading}
              </h2>
            )}
          </FadeIn>
        )}
        <div className={inner}>{children}</div>
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
    "inline-flex min-h-13 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-center text-body font-bold transition-colors sm:px-8";
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
    <main className="min-h-svh bg-[#07070b] text-white selection:bg-blue-600/40">
      {/* ── 1. HERO ────────────────────────── */}
      <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-[#07070b] py-14 sm:min-h-svh sm:py-24">
        <HeroBackground />

        {/* Readability veils. Mobile reads bottom-to-top and stays light so the
            gradient behind it is still visible; desktop veils left-to-right to
            clear the shader off the copy. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-[#07070b] via-[#07070b]/70 via-45% to-transparent md:bg-linear-to-r md:from-[#07070b] md:via-[#07070b]/85 md:via-55% md:to-transparent"
        />
        {/* Desktop-only: anchors the shader top and bottom. On mobile it
            stacked with the veil above and flattened the hero to plain black. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-1 hidden bg-linear-to-b from-[#07070b]/70 via-transparent to-[#07070b]/90 md:block"
        />

        <div className={`relative z-10 ${HERO_CONTAINER}`}>
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-start gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-3.5 py-2 text-left text-eyebrow font-semibold uppercase text-blue-300 sm:items-center sm:rounded-full sm:px-4"
            >
              <span
                aria-hidden
                className="mt-1.5 h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-blue-400 sm:mt-0"
              />
              For D2C brands spending ₹1–3L a month on Meta ads
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="mb-5 text-display font-extrabold text-white text-balance"
            >
              Spending lakhs on Meta ads.{" "}
              {/* Always its own line. On mobile the sentence is too long to fit
                  either way, and without this the break orphans "Still" at the
                  end of line 2, splitting the coloured phrase. */}
              <span className="block bg-linear-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                Still stuck at 1.5x ROAS?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mb-8 max-w-xl text-lead text-neutral-400 text-pretty"
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
              <p className="mt-4 text-micro text-neutral-500">
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
            <FadeIn
              key={symptom}
              delay={index * 0.05}
              /* 7 items in 2 columns leaves an orphan — let it span the row. */
              className={
                index === SYMPTOMS.length - 1 ? "sm:col-span-2" : undefined
              }
            >
              <div className="flex h-full items-start gap-3 rounded-xl border border-white/10 bg-white/3 p-4">
                <span
                  aria-hidden
                  className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-micro font-bold text-rose-400"
                >
                  ✕
                </span>
                <p className="text-body text-neutral-300 text-pretty">
                  {symptom}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1} className="mt-10">
          <p className="border-l-2 border-rose-500 pl-4 text-punch font-bold text-white text-balance sm:pl-5">
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
        className="border-y border-white/7 bg-white/1.5"
      >
        <ol className="space-y-px overflow-hidden rounded-2xl border border-white/10">
          {REASONS.map((reason, index) => (
            <li key={reason.title}>
              <FadeIn delay={index * 0.06}>
                <div className="flex gap-4 bg-white/3 p-5 sm:gap-7 sm:p-7">
                  <span
                    aria-hidden
                    className="text-h2 font-extrabold tabular-nums leading-none text-white/15"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-h3 font-bold text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-1.5 text-body text-neutral-400 text-pretty">
                      {reason.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>

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
        inner="mx-auto max-w-2xl"
      >
        <FadeIn>
          <LeakCalculator />
        </FadeIn>
      </Section>

      {/* ── 5. THE FIX ─────────────────────── */}
      <Section
        eyebrow="The system"
        heading="Here’s how we fix it"
        className="border-y border-white/7 bg-white/1.5"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <FadeIn key={step.step} delay={index * 0.1} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-micro font-bold text-white">
                    {step.step}
                  </span>
                  <span className="text-eyebrow font-bold uppercase text-neutral-500">
                    {step.meta}
                  </span>
                </div>
                <h3 className="mt-5 text-h3 font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-body text-neutral-400 text-pretty">
                  {step.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1} className="mt-4">
          <div className="rounded-2xl border border-blue-500/25 bg-blue-500/7 p-5 sm:p-6">
            <p className="text-eyebrow font-bold uppercase text-blue-400">
              Every week you get
            </p>
            <p className="mt-3 text-h3 font-bold text-white">
              A short WhatsApp update.
            </p>
            <p className="mt-1 text-body text-neutral-400 text-pretty">
              What we tested, what worked, what&apos;s next. No 20-page reports.
            </p>
          </div>
          <Cta className="mt-10 w-full sm:w-auto">Fix my ads</Cta>
        </FadeIn>
      </Section>

      {/* ── 6. GUARANTEE ───────────────────── */}
      <FadeIn>
        <div className="border-b border-white/7 bg-linear-to-r from-emerald-500/6 via-emerald-500/12 to-emerald-500/6">
          <p
            className={`${CONTAINER} flex items-center justify-center gap-3 py-6 text-center text-punch font-extrabold text-white text-balance sm:py-7`}
          >
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-micro text-emerald-400"
            >
              ✓
            </span>
            No results in 90 days? You don&apos;t pay us.
          </p>
        </div>
      </FadeIn>

      {/* ── 7. TESTIMONIALS ────────────────── */}
      <Section eyebrow="Proof" heading="Founders who stopped guessing">
        <FadeIn>
          <Testimonials />
        </FadeIn>
      </Section>

      {/* ── 8. IS THIS FOR YOU? ────────────── */}
      <Section
        eyebrow="Fit check"
        heading="Is this for you?"
        className="border-y border-white/7 bg-white/1.5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FadeIn className="h-full">
            <div className="h-full rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5 sm:p-7">
              <h3 className="text-eyebrow font-bold uppercase text-emerald-400">
                This is for you if
              </h3>
              <ul className="mt-5 space-y-4">
                {FIT.yes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-micro font-bold text-emerald-400"
                    >
                      ✓
                    </span>
                    <span className="text-body text-neutral-200 text-pretty">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="h-full">
            <div className="h-full rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-7">
              <h3 className="text-eyebrow font-bold uppercase text-neutral-500">
                Not for you if
              </h3>
              <ul className="mt-5 space-y-4">
                {FIT.no.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-micro font-bold text-rose-400"
                    >
                      ✕
                    </span>
                    <span className="text-body text-neutral-400 text-pretty">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── 9. FORM ────────────────────────── */}
      <section
        id="book"
        aria-labelledby="book-heading"
        className="relative scroll-mt-8 overflow-hidden py-16 sm:py-20 lg:py-28"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(59,130,246,0.12),transparent)]"
        />

        <div
          className={`relative ${CONTAINER} grid gap-10 lg:grid-cols-2 lg:gap-14`}
        >
          <FadeIn>
            <span className="mb-3 block text-eyebrow font-bold uppercase text-blue-400">
              Free strategy call
            </span>
            <h2
              id="book-heading"
              className="text-h2 font-extrabold text-white text-balance"
            >
              Spending ₹1 to ₹3 lakhs a month on ads?
            </h2>
            <p className="mt-4 text-lead text-neutral-400 text-pretty">
              Let&apos;s find what&apos;s broken before you spend another rupee.
            </p>

            <h3 className="mt-9 text-eyebrow font-bold uppercase text-neutral-500">
              On this call we
            </h3>
            <ul className="mt-5 space-y-4">
              {CALL_AGENDA.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-micro font-bold text-blue-400"
                  >
                    ✓
                  </span>
                  <span className="text-body text-neutral-300 text-pretty">
                    {item}
                  </span>
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
        className="border-t border-white/7 bg-white/1.5"
        inner="mx-auto max-w-3xl"
      >
        <FadeIn>
          <Faq />
        </FadeIn>
      </Section>

      {/* ── FOOTER ─────────────────────────── */}
      <footer className="border-t border-white/7 py-8 pb-28 text-center text-micro text-neutral-600 md:pb-8">
        <div className={CONTAINER}>
          <p className="text-pretty">
            Whizoid Studio · Meta ads for D2C brands.{" "}
            <span className="text-blue-500">Stop guessing. Start scaling.</span>
          </p>
        </div>
      </footer>

      {/* ── 11. STICKY MOBILE BUTTON ───────── */}
      <StickyCta />
    </main>
  );
}
