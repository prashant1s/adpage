import Image from "next/image";
import Link from "next/link";

import heroAdsShot from "../../public/2.png";
import ClientLogos from "@/components/ClientLogos";
import DepthCarousel from "@/components/DepthCarousel";
import Faq from "@/components/Faq";
import GridBackdrop from "@/components/GridBackdrop";
import LeakCalculator from "@/components/LeakCalculator";
import MagneticButtons from "@/components/MagneticButtons";
import ProofWall from "@/components/ProofWall";
import Reveal from "@/components/Reveal";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import SiteFooter from "@/components/SiteFooter";
import StickyCta from "@/components/StickyCta";
import StrategyCallForm from "@/components/StrategyCallForm";
import Testimonials from "@/components/Testimonials";
import { BTS_SHOTS } from "@/content/bts";
import { CALL_AGENDA } from "@/content/call";
import { AD_SET_SHOTS, PROOF_STATS } from "@/content/proof";
import { hasCalendly } from "@/lib/calendly";
import { WHATSAPP_NUMBER } from "@/lib/site";
import {
  BUTTON_IN_CARD,
  BUTTON_LG,
  BUTTON_MD,
  BUTTON_PRIMARY,
  CARD,
  CTA_HREF,
  CTA_LABEL,
  CTA_LABEL_ONE_LINE,
  LABEL,
} from "@/lib/ui";

/* ─────────────────────────────────────────
   LAYOUT RULES
   Centred, single-column rhythm: every section opens with a blue
   kicker + Title Case headline, then its content, then (usually) the
   same gradient CTA. Content max width 1152px; text blocks 768px.
   Sections alternate ink / surface backgrounds.

   ORDER: hero → client logos → problem (+ leak calculator) → how it works → results →
   behind the scenes → testimonials → what you get (+ ad set results,
   fit check) → guarantee → FAQ →
   lead form (then Calendly) → final CTA.
───────────────────────────────────────── */
const CONTAINER = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const SECTION_Y = "py-12 sm:py-16 lg:py-20";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/* ─────────────────────────────────────────
   CONTENT
───────────────────────────────────────── */
const SYMPTOMS = [
  "Every new campaign feels like a guess.",
  "Your cost per order goes up every month.",
  "Your agency sends reports. Nothing changes.",
  "The same 2–3 ads have been running for weeks.",
  "You raised the budget. Sales stayed the same.",
  "Lots of clicks. Very few people actually buy.",
];

const REASONS = [
  {
    title: "Your ads are tired.",
    body: "People have seen them too many times. They scroll straight past.",
  },
  {
    title: "Nobody is testing.",
    body: "New ads go live on a hunch, not on data.",
  },
  {
    title: "Your tracking is off.",
    body: "Meta learns from the wrong numbers, so it shows your ads to the wrong people.",
  },
  {
    title: "Ad and page don't match.",
    body: "People click, land somewhere that feels different, and leave.",
  },
  {
    title: "Budget goes up too fast.",
    body: "Winning ads break when they're pushed too hard, too soon.",
  },
];

const STEPS = [
  {
    label: "Step 1: Find The Leak",
    when: "First 7 days",
    body: "We go through your ads, tracking and landing page, and show you exactly where money is being wasted. Most accounts have at least three of the five leaks above.",
  },
  {
    label: "Step 2: Test Every Week",
    when: "Every week",
    body: "Fresh hooks and angles go live weekly. Ads that don't sell are switched off within 72 hours, so your budget only feeds what works.",
  },
  {
    label: "Step 3: Scale The Winners",
    when: "Ongoing",
    body: "Budget moves up only on ads that are already selling, and slowly enough that they don't break. Growth you can repeat, not a lucky month.",
  },
];

/* Drafted from promises made elsewhere on the page — review before launch. */
const DELIVERABLES = [
  {
    icon: "🔍",
    title: "A full account audit in 7 days",
    body: "Ads, tracking and landing page, checked end to end. You see exactly where money is leaking.",
  },
  {
    icon: "🎬",
    title: "New ads tested every week",
    body: "Fresh hooks and angles, planned, shot and edited by our own team.",
  },
  {
    icon: "⛔",
    title: "Losing ads off within 72 hours",
    body: "Ads that don't sell are switched off fast, so your budget only feeds what works.",
  },
  {
    icon: "🎯",
    title: "Tracking Meta can trust",
    body: "Set up so Meta learns from your real sales and shows ads to the right people.",
  },
  {
    icon: "📈",
    title: "Careful scaling of winners",
    body: "Budget goes up only on ads already selling, slowly enough that they don't break.",
  },
];

const GUARANTEE_TERMS = [
  "We agree on one clear target with you on day one.",
  "Miss it inside 90 days and you don't pay our fee.",
  "Ad spend goes straight to Meta, so that part isn't covered.",
];

const FIT = {
  yes: [
    "You run a D2C brand that sells online",
    "You spend ₹1–3L a month on Meta ads",
    "You want more sales without wasting more money",
  ],
  no: [
    "You're just starting and have no sales yet",
    "You're looking for the cheapest agency",
    "You want reports, not changes to your account",
  ],
};

/* Titles kept short so all three cards stay one line each, same height. */
const NEXT_STEPS = [
  { title: "Fill in 5 details", note: "Takes under a minute" },
  {
    title: "Pick a time",
    note: hasCalendly ? "Any slot on Calendly" : "Whenever suits you",
  },
  { title: "Get your fix list", note: "Live, on a 30-min call" },
];

/* ─────────────────────────────────────────
   BUILDING BLOCKS
───────────────────────────────────────── */
function SectionIntro({
  id,
  kicker,
  title,
  wide = false,
  children,
}: {
  id: string;
  kicker: string;
  title: React.ReactNode;
  /** Wider block and a smaller title (24px → 34px) for long headlines. */
  wide?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className={`mx-auto ${wide ? "max-w-5xl" : "max-w-3xl"} text-center`}>
      <p className={LABEL}>{kicker}</p>
      <h2
        id={id}
        className={`mt-4 font-bold text-balance ${
          wide
            ? "text-[clamp(1.5rem,1.241rem+1.105vw,2.125rem)] leading-[1.2] tracking-[-0.02em]"
            : "text-h2"
        }`}
      >
        {title}
      </h2>
      {children && (
        <div className="mt-5 space-y-4 text-lead text-muted text-pretty">
          {children}
        </div>
      )}
    </Reveal>
  );
}

/* The main CTA. Always the same label — see CTA_LABEL. */
function Cta({ note, className = "" }: { note?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
      <Link
        href={CTA_HREF}
        className={`w-full sm:w-auto ${BUTTON_PRIMARY} ${BUTTON_LG}`}
      >
        {/* Balanced, so a label that wraps on small phones splits evenly
            instead of leaving one word on its own line. */}
        <span className="text-balance">{CTA_LABEL}</span>
        <span aria-hidden>→</span>
      </Link>
      {note && <p className="text-micro text-subtle">{note}</p>}
    </div>
  );
}

function Tick({ tone = "accent" }: { tone?: "accent" | "loss" }) {
  return (
    <span
      aria-hidden
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-bold ${
        tone === "accent" ? "bg-accent/20 text-accent-soft" : "bg-loss/15 text-loss"
      }`}
    >
      {tone === "accent" ? "✓" : "✕"}
    </span>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className={`sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:overflow-hidden focus:px-5 ${BUTTON_PRIMARY} min-h-11`}
      >
        Skip to content
      </a>

      <main id="main">
        {/* ── HERO ───────────────────────────── */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-24"
        >
          <GridBackdrop />
          <div aria-hidden className="halo pointer-events-none absolute inset-0" />

          <div className={`relative ${CONTAINER} flex flex-col items-center text-center`}>
            <p
              className="intro btn-gradient gradient-flow rounded-full px-3.5 py-1.5 text-[0.75rem] font-semibold text-balance text-white sm:px-4 sm:text-micro"
              style={{ ["--delay" as string]: "0.05s" }}
            >
              D2C Brands Spending{" "}
              <span className="whitespace-nowrap">₹1–3L/Month</span> On Meta
              Ads
            </p>

            <h1
              id="hero-heading"
              className="intro mt-6 max-w-[32ch] text-display font-bold text-balance"
              style={{ ["--delay" as string]: "0.1s" }}
            >
              Spending Lakhs On Meta Ads. Still Stuck At{" "}
              <span className="text-gradient">1.5x ROAS?</span>
            </h1>

            <p
              className="intro mt-6 max-w-2xl text-lead text-muted text-pretty"
              style={{ ["--delay" as string]: "0.15s" }}
            >
              Your product isn&apos;t the problem. Your budget isn&apos;t the
              problem. The way your ads are being run is.
            </p>

            {/* Framed like the reference site's hero video: a real Ads
                Manager screenshot as the hero visual. */}
            <figure
              className="intro mt-10 w-full max-w-3xl rounded-3xl border border-line bg-surface p-2 shadow-[0_30px_90px_-30px_rgb(37_99_235/0.45)] sm:mt-12"
              style={{ ["--delay" as string]: "0.2s" }}
            >
              <div className="overflow-hidden rounded-2xl bg-white">
                <Image
                  src={heroAdsShot}
                  alt="Meta Ads Manager table showing $7,665.42 total spent, 511,612 impressions and 179,733 accounts reached."
                  placeholder="blur"
                  preload
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </figure>

            {/* Phones get the sticky CTA from the first screen, so the hero
                shows only the reassurance line there, not a second button. */}
            <div
              className="intro mt-10 hidden w-full md:block"
              style={{ ["--delay" as string]: "0.25s" }}
            >
              <Cta note="Free 30-min call · No pitch · Reply within 24 hours" />
            </div>
            <p className="intro mt-6 text-micro text-subtle md:hidden">
              Free 30-min call · No pitch · Reply within 24 hours
            </p>
          </div>
        </section>

        {/* ── CLIENT LOGOS ───────────────────── */}
        <ClientLogos />

        {/* ── PROBLEM ────────────────────────── */}
        <section
          aria-labelledby="problem-heading"
          className={`border-t border-line bg-surface ${SECTION_Y}`}
        >
          <div className={CONTAINER}>
            <SectionIntro
              id="problem-heading"
              kicker="Sound Familiar?"
              title="Our Clients Are Usually In One Of These Situations Before Working With Us."
              wide
            >
              <p>
                You&apos;ve got a product people love. You&apos;re spending
                real money on Meta. But every month looks the same.
              </p>
            </SectionIntro>

            {/* Symptoms and leaks share one grid: same width, columns, gap,
                card and padding, so the section reads as one system. */}
            <Reveal className="mx-auto mt-10 max-w-4xl">
              <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                {SYMPTOMS.map((symptom) => (
                  <li
                    key={symptom}
                    className={`${CARD} flex items-start gap-3 p-4 text-body text-fg/90 sm:p-5`}
                  >
                    <Tick tone="loss" />
                    {symptom}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mx-auto mt-14 max-w-3xl text-center">
              <p className="text-punch font-bold text-balance">
                That&apos;s not a product problem. It&apos;s a system problem.{" "}
                <span className="text-muted">
                  Here&apos;s what&apos;s actually breaking down:
                </span>
              </p>
            </Reveal>

            <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 sm:gap-4">
              {REASONS.map((reason, index) => (
                <Reveal key={reason.title} className={`${CARD} p-4 sm:p-5`}>
                  <p className="text-eyebrow font-semibold text-accent">
                    Leak {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1.5 text-body font-bold">{reason.title}</h3>
                  <p className="mt-1 text-micro text-muted text-pretty">
                    {reason.body}
                  </p>
                </Reveal>
              ))}
              {/* Fills the empty sixth cell on md+ with the punchline. */}
              <Reveal className="flex items-center rounded-2xl border border-accent/30 bg-accent/10 p-4 sm:p-5">
                <p className="text-lead font-bold text-balance">
                  Putting more money into this only makes the loss{" "}
                  <span className="text-gradient">bigger</span>.
                </p>
              </Reveal>
            </div>

            <Cta className="mt-14" />
          </div>
        </section>

        {/* ── CALCULATOR ─────────────────────── */}
        <section
          id="calculator"
          aria-labelledby="calculator-heading"
          className={`relative overflow-hidden border-t border-line ${SECTION_Y}`}
        >
          <GridBackdrop />
          <div className={`relative ${CONTAINER}`}>
            <SectionIntro
              id="calculator-heading"
              kicker="The Leak"
              title="How Much Are Your Ads Leaking Every Month?"
            >
              <p>
                Set your monthly spend. We compare what a typical account your
                size gets with what our system is built to reach.
              </p>
            </SectionIntro>

            <Reveal className="mx-auto mt-12 max-w-100">
              <LeakCalculator />
            </Reveal>
          </div>
        </section>

        {/* ── HOW IT WORKS (the system) ──────── */}
        <section
          id="how"
          aria-labelledby="how-heading"
          className={`border-t border-line bg-surface ${SECTION_Y}`}
        >
          <div className={CONTAINER}>
            <SectionIntro
              id="how-heading"
              kicker="How It Works"
              title="One Broken Step Kills Everything, So We Fix All Three."
            >
              <p>
                Most brands try more budget. It doesn&apos;t work. So they blame
                Meta. The problem is almost never the platform. It&apos;s how the
                account is run, week after week.
              </p>
            </SectionIntro>

            <ol className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-3">
              {STEPS.map((step) => (
                <Reveal as="li" key={step.label} className={`${CARD} flex flex-col p-6 sm:p-7`}>
                  <p className="text-eyebrow font-bold uppercase text-accent">
                    {step.label}
                  </p>
                  <p className="mt-2 text-micro text-subtle">{step.when}</p>
                  <p className="mt-4 text-body text-muted text-pretty">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </ol>

            <Cta className="mt-14" />
          </div>
        </section>

        {/* ── RESULTS ────────────────────────── */}
        <section
          id="results"
          aria-labelledby="results-heading"
          className={`border-t border-line ${SECTION_Y}`}
        >
          <div className={CONTAINER}>
            <SectionIntro
              id="results-heading"
              kicker="Real Accounts. Real Numbers."
              title="Here's What Happens When The System Goes Live."
            />

            <div className="mt-14">
              <ProofWall />
            </div>

            {/* Stat row, read straight off the screenshots above. Same 12px
                padding on every side, and on desktop the row is only as wide
                as five boxes hugging their content, so the side padding
                matches the top/bottom instead of stretching. Equal gaps both
                ways, and the same 56px above as the CTA has below. */}
            <ul className="mx-auto mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:max-w-3xl lg:grid-cols-5">
              {PROOF_STATS.map((stat, index) => (
                <li
                  key={stat.label}
                  className={`reveal ${CARD} p-3 text-center ${
                    index === PROOF_STATS.length - 1 ? "col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <p className="text-stat font-bold text-accent-soft tabular-nums">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs whitespace-nowrap text-muted">{stat.label}</p>
                </li>
              ))}
            </ul>

            <Cta className="mt-14" />
          </div>
        </section>

        {/* ── BEHIND THE SCENES ──────────────── */}
        <section
          id="bts"
          aria-labelledby="bts-heading"
          className={`border-t border-line bg-surface ${SECTION_Y}`}
        >
          <div className={CONTAINER}>
            <SectionIntro
              id="bts-heading"
              kicker="Behind The Scenes"
              title="Real People. Real Shoots. Real Ads."
            >
              <p>
                A look at how our ads get made, from planning and shoots to the
                final edit.
              </p>
            </SectionIntro>

            {/* Phones: height follows the width-scaled 9:16 card (plus
                room for the dots), so narrow screens don't get a gap. */}
            <div className="relative mt-12 h-[min(calc(124vw+38px),520px)] overflow-x-clip sm:h-150 md:h-170">
              <DepthCarousel
                label="Behind the scenes photos and videos"
                captionPlacement="overlay"
                items={BTS_SHOTS.map((shot) => ({
                  image: shot.src,
                  video: shot.video,
                  poster: shot.poster,
                  alt: shot.alt,
                  title: shot.title,
                  caption: shot.caption,
                }))}
                /* 9:16, like Reels and Shorts. */
                cardWidth={360}
                cardHeight={640}
                radius={18}
                depth={220}
                spread={110}
                tilt={22}
                tiltDirection="right"
                perspective={1400}
                visibleCards={3}
                symmetric
                falloff={0.2}
                /* No blur: re-blurring every card on each frame of a slide
                   change made page scrolling stutter. The tint does the depth. */
                blur={0}
                tint="#05060a"
                /* 1.3s with a long ease-out tail felt sluggish. */
                duration={800}
                ease="power3.out"
                autoplay
                /* Counts from when a slide starts moving: 0.8s move + ~1.5s rest. */
                autoplayDelay={2300}
                loop
                showControls
                showIndicators
              />
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ───────────────────── */}
        <section
          aria-labelledby="testimonials-heading"
          className={`border-t border-line ${SECTION_Y}`}
        >
          <div className={CONTAINER}>
            <SectionIntro
              id="testimonials-heading"
              kicker="Real Clients. Real Words."
              title="Founders Who Stopped Guessing."
            />
            <div className="mt-14">
              <Testimonials />
            </div>
            <Cta className="mt-14" />
          </div>
        </section>

        {/* ── WHAT YOU GET ───────────────────── */}
        <section
          id="what-you-get"
          aria-labelledby="get-heading"
          className={`border-t border-line bg-surface ${SECTION_Y}`}
        >
          <div className={CONTAINER}>
            <SectionIntro
              id="get-heading"
              kicker="What You Actually Get"
              title="Everything Your Ad Account Needs. Nothing It Doesn't."
            />

            <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {DELIVERABLES.map((item) => (
                <Reveal as="li" key={item.title} className={`${CARD} p-4 sm:p-5`}>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-[1.125rem]"
                  >
                    {item.icon}
                  </span>
                  <h3 className="mt-3 text-h3 font-bold">{item.title}</h3>
                  <p className="mt-2 text-body text-muted text-pretty">
                    {item.body}
                  </p>
                </Reveal>
              ))}
              {/* Sixth cell: the weekly report, shown rather than described. */}
              <Reveal
                as="li"
                className="rounded-2xl border border-accent/30 bg-accent/5 p-4 sm:col-span-2 sm:p-5 lg:col-span-1"
              >
                <h3 className="text-h3 font-bold">
                  One WhatsApp update a week. Not a 20-page report.
                </h3>
                <figure className="mt-3">
                  <div className="rounded-2xl rounded-tr-sm bg-[#144d37] px-3.5 py-2.5 text-micro leading-relaxed text-white sm:text-body">
                    <p className="font-semibold">Weekly update 📊</p>
                    <p className="mt-1.5">✅ Tested 4 new hooks</p>
                    <p>🏆 Before/after angle is now the best performer</p>
                    <p>⛔ Switched off 3 ads that weren&apos;t selling</p>
                    <p>➡️ Next: +20% budget on the winner, 2 new videos</p>
                  </div>
                  <figcaption className="mt-2 text-right text-[0.75rem] text-subtle">
                    Example message
                  </figcaption>
                </figure>
              </Reveal>
            </ul>

            {/* Real ad set results from the Meta Ads app: what the work above
                looks like inside an account. */}
            <Reveal className="mt-10">
              <ScreenshotCarousel items={AD_SET_SHOTS} label="Ad set results" />
            </Reveal>

            {/* Fit check: who this is (and isn't) for, right before the CTA. */}
            <section aria-labelledby="fit-heading" className="mt-16 sm:mt-20">
              <SectionIntro
                id="fit-heading"
                kicker="Fit Check"
                title="Is This For You?"
              />

              <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:gap-5 md:grid-cols-2">
                <Reveal className="rounded-2xl border border-accent/40 bg-accent/5 p-6 sm:p-7">
                  <h3 className="flex items-center gap-3 text-h3 font-bold">
                    <span aria-hidden className="text-[1.75rem] leading-none">
                      😍
                    </span>
                    This Is For You If
                  </h3>
                  <ul className="mt-5 space-y-4">
                    {FIT.yes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-body text-fg/90">
                        <Tick />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal className="rounded-2xl border border-loss/25 bg-loss-deep/40 p-6 sm:p-7">
                  <h3 className="flex items-center gap-3 text-h3 font-bold">
                    <span aria-hidden className="text-[1.75rem] leading-none">
                      😔
                    </span>
                    <span>
                      This Is <span className="text-loss">NOT</span> For You If
                    </span>
                  </h3>
                  <ul className="mt-5 space-y-4">
                    {FIT.no.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-body text-muted">
                        <Tick tone="loss" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </section>

            <Cta className="mt-14" />
          </div>
        </section>

        {/* ── GUARANTEE ──────────────────────── */}
        <section
          aria-labelledby="guarantee-heading"
          className={`border-t border-line ${SECTION_Y}`}
        >
          <div className={CONTAINER}>
            <Reveal className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-accent/30 bg-raised px-6 py-8 text-center sm:px-8 sm:py-10">
              <GridBackdrop cell={36} />
              <div aria-hidden className="halo pointer-events-none absolute inset-0" />
              <div className="relative">
                <p className={LABEL}>Our Guarantee</p>
                <h2
                  id="guarantee-heading"
                  className="mt-3 text-h2 font-bold text-balance max-sm:text-[min(var(--text-h2),6.6vw)]"
                >
                  <span className="max-sm:block max-sm:whitespace-nowrap">
                    No Results In 90 Days?
                  </span>{" "}
                  <span className="text-gradient max-sm:block">You Don&apos;t Pay Us.</span>
                </h2>
                <ul className="mx-auto mt-6 max-w-md space-y-2 text-left">
                  {GUARANTEE_TERMS.map((term) => (
                    <li
                      key={term}
                      className="flex items-start gap-2.5 text-micro text-fg/90 sm:text-body"
                    >
                      <Tick />
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────── */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className={`border-t border-line bg-surface ${SECTION_Y}`}
        >
          <div className={CONTAINER}>
            <SectionIntro
              id="faq-heading"
              kicker="Questions"
              title="Before You Book."
            >
              <p>
                Something else on your mind?
                <br />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold whitespace-nowrap text-accent-soft underline underline-offset-4"
                >
                  Ask us on WhatsApp
                </a>
                .
              </p>
            </SectionIntro>
            <Reveal className="mx-auto mt-10 max-w-2xl">
              <Faq />
            </Reveal>
          </div>
        </section>

        {/* ── BOOK (lead form → Calendly) ────── */}
        <section
          id="book"
          aria-labelledby="book-heading"
          className={`relative overflow-hidden border-t border-line ${SECTION_Y}`}
        >
          <GridBackdrop />
          <div aria-hidden className="halo pointer-events-none absolute inset-0" />
          <div className={`relative ${CONTAINER}`}>
            <SectionIntro
              id="book-heading"
              kicker="Free Strategy Call"
              title={
                <>
                  Let&apos;s Find What&apos;s Broken{" "}
                  <span className="text-gradient">Before You Spend Another Rupee.</span>
                </>
              }
            >
              <p>
                {hasCalendly
                  ? "Tell us about your brand, then pick a time that suits you."
                  : "Tell us about your brand. We reply on WhatsApp within 24 hours."}
              </p>
            </SectionIntro>

            <Reveal className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
              {CALL_AGENDA.map((item) => (
                <span
                  key={item}
                  className="w-full rounded-xl border border-line bg-raised px-4 py-2 text-left text-micro text-muted sm:w-auto sm:rounded-full"
                >
                  <span aria-hidden className="mr-1.5 text-accent-soft">
                    ✓
                  </span>
                  {item}
                </span>
              ))}
            </Reveal>

            <Reveal className="mx-auto mt-10 max-w-xl">
              <StrategyCallForm />
            </Reveal>
          </div>
        </section>

        {/* ── FINAL CTA ──────────────────────── */}
        <section
          id="final-cta"
          aria-labelledby="final-cta-heading"
          className="relative overflow-hidden border-t border-line bg-surface py-12 sm:py-16"
        >
          <GridBackdrop />
          <div aria-hidden className="halo pointer-events-none absolute inset-0" />
          <div className={`relative ${CONTAINER}`}>
            <Reveal className="mx-auto max-w-2xl rounded-2xl border border-accent/40 bg-raised/90 px-5 py-8 text-center shadow-[0_24px_70px_-30px_rgb(37_99_235/0.55)] sm:px-8 sm:py-10">
              <p className={LABEL}>Your Next Step</p>
              <h2
                id="final-cta-heading"
                className="mt-3 text-punch font-bold text-balance"
              >
                Stop Guessing.{" "}
                <span className="text-gradient">
                  Book Your Free Strategy Call.
                </span>
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-body text-muted text-pretty">
                30 minutes, one call. We open your ad account with you and
                show you the 2–3 fixes that will move your ROAS first, even if
                you never work with us.
              </p>

              <ol className="mx-auto mt-6 grid gap-2.5 text-left md:grid-cols-3 md:gap-3">
                {NEXT_STEPS.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex items-center gap-3 rounded-xl border border-line bg-ink/60 px-3.5 py-2.5 md:flex-col md:items-start md:gap-1.5"
                  >
                    <span
                      aria-hidden
                      className="btn-gradient flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-bold text-white"
                    >
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-micro font-semibold text-fg">
                        {step.title}
                      </span>
                      <span className="block text-[0.75rem] leading-snug text-subtle">
                        {step.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <Link
                href={CTA_HREF}
                className={`mt-7 w-full sm:w-auto sm:px-8 ${BUTTON_PRIMARY} ${BUTTON_MD} ${BUTTON_IN_CARD}`}
              >
                <span className={CTA_LABEL_ONE_LINE}>{CTA_LABEL}</span>
                <span aria-hidden>→</span>
              </Link>
              <p className="mt-3 text-[0.75rem] text-subtle sm:text-micro">
                Free · 30 minutes · No pitch · 90-day results guarantee
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <MagneticButtons />

      <SiteFooter />

      <StickyCta />
    </>
  );
}
