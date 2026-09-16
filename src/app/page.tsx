"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

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
   MARQUEE
───────────────────────────────────────── */
const MARQUEE_ITEMS = [
  "guessing = wasting money",
  "no more random testing",
  "data > gut feeling",
  "ROAS isn't always the problem",
  "More money ≠ better performance",
  "Find the real problem",
  "guessing = wasting money",
  "no more random testing",
  "data > gut feeling",
  "ROAS isn't always the problem",
  "More money ≠ better performance",
  "Find the real problem",
];

function Marquee() {
  return (
    <div className="w-full overflow-hidden border-y border-neutral-800 py-4 bg-neutral-950">
      <div className="marquee-track">
        {MARQUEE_ITEMS.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-semibold tracking-widest uppercase text-blue-400 whitespace-nowrap"
          >
            {i % 2 === 0 ? (
              <>
                <span className="text-purple-400 mr-2">◆</span>
                {item}
              </>
            ) : (
              <>
                <span className="text-blue-500 mr-2">◆</span>
                {item}
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────
   PROBLEM CARD
───────────────────────────────────────── */
function ProblemCard({
  tag,
  title,
  body,
  caption,
  accent,
  delay,
}: {
  tag: string;
  title: string;
  body: string;
  caption: string;
  accent: string;
  delay: number;
}) {
  return (
    <FadeIn delay={delay} className="h-full">
      <motion.div
        whileHover={{ scale: 1.025, y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm p-8 overflow-hidden cursor-default"
      >
        {/* Hover glow */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${accent}`}
        />
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-neutral-500 mb-4">
          {tag}
        </span>
        <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
          {title}
        </h3>
        
        {/* flex-1 makes the text take up the remaining space */}
        <p className="text-neutral-400 text-base leading-relaxed mb-6 flex-1">
          {body}
        </p>
        
        {/* mt-auto pushes the caption to the bottom, self-start keeps it from stretching horizontally */}
        <div className="mt-auto self-start rounded-full bg-neutral-800 border border-neutral-700 px-4 py-1.5 text-xs font-bold tracking-wider text-blue-400 uppercase">
          {caption}
        </div>
      </motion.div>
    </FadeIn>
  );
}



/* ─────────────────────────────────────────
   TIMELINE STEP
───────────────────────────────────────── */
function TimelineStep({
  step,
  title,
  body,
  delay,
  isLast,
}: {
  step: number;
  title: string;
  body: string;
  delay: number;
  isLast: boolean;
}) {
  return (
    <FadeIn delay={delay} className="relative flex gap-6">
      {/* Connector line */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-blue-400 flex items-center justify-center text-white font-bold text-sm shrink-0 z-10">
          {step}
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-blue-500/60 to-transparent mt-2" />
        )}
      </div>
      {/* Content */}
      <div className="pb-12">
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-neutral-400 leading-relaxed">{body}</p>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-blue-600/40">
      {/* ── HERO ───────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f]">
        {/* GhostFibers WebGL background */}
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

        {/* Left-side vignette so text stays readable */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 via-[40%] to-transparent pointer-events-none" />
        {/* Top/bottom anchors */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0f]/70 via-transparent to-[#0a0a0f]/80 pointer-events-none" />

        {/* Text content fixed left */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Meta Ads Intelligence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight text-white mb-6"
            >
              If you&apos;re{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                guessing
              </span>{" "}
              which ads will work, you&apos;re already{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                losing money.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-neutral-400 text-lg sm:text-xl leading-relaxed mb-8"
            >
              Right audience. Right budget. Still bad ROAS?{" "}
              <span className="text-white font-medium">
                Here&apos;s what Meta won&apos;t tell you.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#cta"
                className="glow-btn inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors px-8 py-4 text-white font-bold text-base"
              >
                Book a Free Strategy Call
                <span className="text-lg">→</span>
              </a>
              <a
                href="#problem"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-colors px-8 py-4 text-neutral-300 font-semibold text-base backdrop-blur-sm"
              >
                See the problem
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-600 z-10"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-neutral-600 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── MARQUEE ─────────────────────────── */}
      <Marquee />

   {/* ── THE PROBLEM ─────────────────────── */}
      <section id="problem" className="px-6 py-24 max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-500 mb-4">
              Why Ads Fail
            </span>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white leading-tight">
              Two problems D2C brands{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                keep ignoring
              </span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-6">
          <ProblemCard
            tag="Stop Guessing"
            title="The Guesswork Trap"
            body="Imagine launching an ad, holding your breath for the numbers, tweaking one random thing, and trying again. Without a real testing framework, you never actually know why one creative prints money while another bleeds it dry. Every new campaign becomes just another expensive roll of the dice."
            caption="guessing = wasting money"
            accent="bg-[radial-gradient(ellipse_at_top-left,rgba(239,68,68,0.08),transparent_70%)]"
            delay={0}
          />
          <ProblemCard
            tag="Beyond The Metrics"
            title="The ROAS Illusion"
            body="You’ve nailed the audience targeting and set a healthy budget, yet your returns are still tanking. Here is the harsh truth Meta won’t tell you: if your creative isn't capturing attention or your funnel is leaking clicks, the algorithm can't save you. Blindly throwing more ad spend at a broken system just makes your failures more expensive."
            caption="More money ≠ better performance"
            accent="bg-[radial-gradient(ellipse_at_top-right,rgba(168,85,247,0.08),transparent_70%)]"
            delay={0.1}
          />
        </div>
      </section>

      {/* ── MARQUEE (second) ────────────────── */}
      <Marquee />

      {/* ── THE SOLUTION ────────────────────── */}
      <section className="px-6 py-24 max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-500 mb-4">
              How We Fix It
            </span>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white leading-tight">
              We take the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                guesswork out
              </span>
            </h2>
          </div>
        </FadeIn>

        <div className="mt-4">
          <TimelineStep
            step={1}
            title="Structure Creative Testing Around Data"
            body="We structure creative testing around hooks, angles, formats and actual performance data. Then we know what deserves more budget and what needs to be stopped."
            delay={0}
            isLast={false}
          />
          <TimelineStep
            step={2}
            title="Find & Fix the Real Problem First"
            body="We look at the entire system account structure, creatives, funnel and data. Then we identify exactly where the performance issue is, and we fix that first. Once the system is working, that's when scaling actually makes sense."
            delay={0.15}
            isLast={false}
          />
          <TimelineStep
            step={3}
            title="Scale with Confidence, Not Guesses"
            body="Once the system is proven to work, scaling makes sense. Budget decisions are data-driven not gut-driven. We know what deserves more spend and what needs to be cut. No more expensive guesses."
            delay={0.3}
            isLast={true}
          />
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────── */}
      <FadeIn>
        <div className="border-y border-neutral-800 bg-neutral-900/40">
          <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "3×", label: "Average ROAS improvement" },
              { value: "₹2–4L", label: "Monthly ad spend managed" },
              { value: "100%", label: "Data-backed decisions" },
              { value: "0", label: "Random guesses" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                  {s.value}
                </p>
                <p className="text-sm text-neutral-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ── CTA ─────────────────────────────── */}
      <section
        id="cta"
        className="relative px-6 py-32 overflow-hidden text-center"
      >
        {/* Background glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(168,85,247,0.07),transparent)] pointer-events-none" />

        <FadeIn className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-500 mb-6">
            👇 Free Strategy Call
          </span>

          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6">
            Spending{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              ₹2 to ₹4 lakhs
            </span>{" "}
            a month on ads?
          </h2>

          <p className="text-neutral-400 text-lg sm:text-xl mb-4 max-w-2xl mx-auto">
            If you&apos;re spending 2 to 4 lakhs a month on ads or if your ROAS isn&apos;t where it should be book a free strategy call with us.
          </p>
          <p className="text-white font-medium text-base sm:text-lg mb-10 max-w-xl mx-auto">
            Let&apos;s replace guessing with a system. Let&apos;s find the actual problem before you spend another rupee.
          </p>

          {/* Caption flash pills all 6 from both scripts */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              "guessing = wasting money",
              "no more random testing",
              "data > gut feeling",
              "ROAS isn't always the problem",
              "More money ≠ better performance",
              "Find the real problem",
            ].map((cap, i) => (
              <motion.span
                key={cap}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-full border border-neutral-700 bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-neutral-300 tracking-wide"
              >
                {cap}
              </motion.span>
            ))}
          </div>

          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="glow-btn inline-flex items-center gap-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-colors px-10 py-5 text-white font-extrabold text-lg tracking-wide"
          >
            👇 Book a Free Strategy Call
            <span className="text-2xl">→</span>
          </motion.a>

          <p className="mt-4 text-neutral-500 text-sm">
            Link below. No pitch. No pressure. Just clarity on what&apos;s actually broken.
          </p>
        </FadeIn>
      </section>

      {/* ── FOOTER ──────────────────────────── */}
      <footer className="border-t border-neutral-800 py-8 text-center text-neutral-600 text-sm">
        <p>
          Built for D2C brands serious about performance.{" "}
          <span className="text-blue-500">Replace guessing with a system.</span>
        </p>
      </footer>
    </main>
  );
}
