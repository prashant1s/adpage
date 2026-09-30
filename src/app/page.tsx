import Image from "next/image";
import Link from "next/link";

import footerLogo from "../../public/footer-logo.avif";
import heroAdsShot from "../../public/2.png";
import BookingModal from "@/components/BookingModal";
import DepthCarousel from "@/components/DepthCarousel";
import Faq from "@/components/Faq";
import GridBackdrop from "@/components/GridBackdrop";
import LeakCalculator from "@/components/LeakCalculator";
import MagneticButtons from "@/components/MagneticButtons";
import ProofWall from "@/components/ProofWall";
import Reveal from "@/components/Reveal";
import StickyCta from "@/components/StickyCta";
import StrategyCallForm from "@/components/StrategyCallForm";
import Testimonials from "@/components/Testimonials";
import { BTS_SHOTS } from "@/content/bts";
import { PROOF_STATS } from "@/content/proof";
import { WHATSAPP_NUMBER } from "@/lib/site";
import { BUTTON_LG, BUTTON_PRIMARY, CARD, LABEL } from "@/lib/ui";

/* ─────────────────────────────────────────
   LAYOUT RULES
   Centred, single-column rhythm: every section opens with a blue
   kicker + Title Case headline, then its content, then (usually) the
   same gradient CTA. Content max width 1152px; text blocks 768px.
───────────────────────────────────────── */
const CONTAINER = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const SECTION_Y = "py-16 sm:py-24 lg:py-28";
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

const CALL_AGENDA = [
  "Look at your ad account with you, live",
  "Show you the 2–3 biggest places you're losing money",
  "Tell you what to fix first, even if you don't work with us",
];

/* ─────────────────────────────────────────
   BUILDING BLOCKS
───────────────────────────────────────── */
function SectionIntro({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <p className={LABEL}>{kicker}</p>
      <h2 id={id} className="mt-4 text-h2 font-bold text-balance">
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

function Cta({
  children = "Book My Free Strategy Call",
  note,
  className = "",
}: {
  children?: React.ReactNode;
  note?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
      <a
        href="#book"
        className={`w-full sm:w-auto ${BUTTON_PRIMARY} ${BUTTON_LG}`}
      >
        {/* Balanced, so a label that wraps on small phones splits evenly
            instead of leaving one word on its own line. */}
        <span className="text-balance">{children}</span>
        <span aria-hidden>→</span>
      </a>
      {note && <p className="text-micro text-subtle">{note}</p>}
    </div>
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
        className={`sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 ${BUTTON_PRIMARY} min-h-11 px-5`}
      >
        Skip to content
      </a>

      <main id="main">
        {/* ── HERO ───────────────────────────── */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden pt-10 pb-20 sm:pt-14 sm:pb-24"
        >
          <GridBackdrop />
          <div aria-hidden className="halo pointer-events-none absolute inset-0" />

          <div className={`relative ${CONTAINER} flex flex-col items-center text-center`}>
            <p
              className="intro btn-gradient rounded-full px-3.5 py-1.5 text-[0.75rem] font-semibold text-balance text-white sm:px-4 sm:text-micro"
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
              className="intro mt-12 w-full max-w-3xl rounded-3xl border border-line bg-surface p-2 shadow-[0_30px_90px_-30px_rgb(37_99_235/0.45)]"
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
              <figcaption className="px-3 pt-3 pb-1 text-micro text-muted">
                <span className="font-semibold text-accent-soft">
                  $7,665 spent → 5.1 lakh impressions
                </span>{" "}
                · Meta Ads Manager
              </figcaption>
            </figure>

            <Cta
              className="intro mt-10 w-full"
              note="Free 30-min call · No pitch · Reply within 24 hours"
            />
          </div>
        </section>

        {/* ── PROOF ──────────────────────────── */}
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

            {/* Stat row, read straight off the screenshots above. */}
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
              {PROOF_STATS.map((stat, index) => (
                <li
                  key={stat.label}
                  className={`reveal ${CARD} px-4 py-5 text-center ${
                    index === PROOF_STATS.length - 1 ? "col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <p className="text-stat font-bold text-accent-soft tabular-nums">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-micro text-muted">{stat.label}</p>
                </li>
              ))}
            </ul>

            <Cta className="mt-14" />
          </div>
        </section>

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
            >
              <p>
                You&apos;ve got a product people love. You&apos;re spending
                real money on Meta. But every month looks the same.
              </p>
            </SectionIntro>

            <Reveal className="mx-auto mt-10 max-w-3xl">
              <ul className="grid gap-3 sm:grid-cols-2">
                {SYMPTOMS.map((symptom) => (
                  <li
                    key={symptom}
                    className="flex items-start gap-3 rounded-xl border border-line bg-ink px-4 py-3.5 text-body text-fg/90"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-loss/15 text-[0.7rem] font-bold text-loss"
                    >
                      ✕
                    </span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mx-auto mt-16 max-w-3xl text-center">
              <p className="text-punch font-bold text-balance">
                That&apos;s not a product problem. It&apos;s a system problem.{" "}
                <span className="text-muted">
                  Here&apos;s what&apos;s actually breaking down:
                </span>
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2">
              {REASONS.map((reason, index) => (
                <Reveal key={reason.title} className={`${CARD} p-6 sm:p-7`}>
                  <p className="text-eyebrow font-semibold text-accent">
                    Leak {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-h3 font-bold">{reason.title}</h3>
                  <p className="mt-2 text-body text-muted text-pretty">
                    {reason.body}
                  </p>
                </Reveal>
              ))}
              {/* Fills the empty sixth cell on md+ with the punchline. */}
              <Reveal className="flex items-center rounded-2xl border border-accent/30 bg-accent/10 p-6 sm:p-7">
                <p className="text-h3 font-bold text-balance">
                  Putting more money into this only makes the loss{" "}
                  <span className="text-gradient">bigger</span>.
                </p>
              </Reveal>
            </div>

            <Cta className="mt-14">Check Which Ones I Have</Cta>
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

            <Reveal className="mx-auto mt-12 max-w-md">
              <LeakCalculator />
            </Reveal>
          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────── */}
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

            {/* The weekly update, shown rather than described. */}
            <Reveal className={`mt-5 grid items-center gap-8 ${CARD} p-6 sm:p-8 lg:grid-cols-2`}>
              <div>
                <p className="text-eyebrow font-bold uppercase text-accent">
                  Every Week You Get
                </p>
                <h3 className="mt-3 text-punch font-bold text-balance">
                  One Short WhatsApp Update. Not A 20-Page Report.
                </h3>
                <p className="mt-3 text-body text-muted text-pretty">
                  What we tested, what worked, what&apos;s next. Readable in
                  thirty seconds.
                </p>
              </div>
              <figure>
                <div className="ml-auto max-w-md rounded-2xl rounded-tr-sm bg-[#144d37] px-4 py-3 text-body leading-relaxed text-white">
                  <p className="font-semibold">Weekly update 📊</p>
                  <p className="mt-2">✅ Tested 4 new hooks</p>
                  <p>🏆 Before/after angle is now the best performer</p>
                  <p>⛔ Switched off 3 ads that weren&apos;t selling</p>
                  <p>➡️ Next: +20% budget on the winner, 2 new videos</p>
                </div>
                <figcaption className="mt-2 text-right text-[0.75rem] text-subtle">
                  Example message
                </figcaption>
              </figure>
            </Reveal>

            <Cta className="mt-14">Fix My Ads</Cta>
          </div>
        </section>

        {/* ── BEHIND THE SCENES ──────────────── */}
        <section
          id="bts"
          aria-labelledby="bts-heading"
          className={`border-t border-line ${SECTION_Y}`}
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
            <div className="reveal relative mt-12 h-[min(calc(124vw+38px),520px)] overflow-x-clip sm:h-150 md:h-170">
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
                blur={6}
                tint="#05060a"
                duration={1300}
                ease="power3.out"
                autoplay
                autoplayDelay={1500}
                loop
                showControls
                showIndicators
              />
            </div>
          </div>
        </section>

        {/* ── GUARANTEE ──────────────────────── */}
        <section
          aria-labelledby="guarantee-heading"
          className="border-t border-line py-14 sm:py-16"
        >
          <div className={CONTAINER}>
            <Reveal className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-accent/30 bg-raised px-6 py-8 text-center sm:px-8 sm:py-10">
              <GridBackdrop cell={36} />
              <div aria-hidden className="halo pointer-events-none absolute inset-0" />
              <div className="relative">
                <p className={LABEL}>Our Guarantee</p>
                <h2
                  id="guarantee-heading"
                  className="mt-3 text-h2 font-bold text-balance"
                >
                  No Results In 90 Days?{" "}
                  <span className="text-gradient">You Don&apos;t Pay Us.</span>
                </h2>
                <ul className="mx-auto mt-6 max-w-md space-y-2 text-left">
                  {GUARANTEE_TERMS.map((term) => (
                    <li key={term} className="flex items-start gap-2.5 text-micro text-fg/90 sm:text-body">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[0.7rem] font-bold text-accent-soft"
                      >
                        ✓
                      </span>
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── TESTIMONIALS ───────────────────── */}
        <section
          aria-labelledby="testimonials-heading"
          className={`border-t border-line bg-surface ${SECTION_Y}`}
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

        {/* ── FIT ────────────────────────────── */}
        <section
          aria-labelledby="fit-heading"
          className={`border-t border-line ${SECTION_Y}`}
        >
          <div className={CONTAINER}>
            <SectionIntro
              id="fit-heading"
              kicker="Fit Check"
              title="Is This For You?"
            />

            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:gap-5 md:grid-cols-2">
              <Reveal className="rounded-2xl border border-accent/30 bg-accent/5 p-6 sm:p-7">
                <h3 className="text-h3 font-bold">This Is For You If</h3>
                <ul className="mt-5 space-y-4">
                  {FIT.yes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-body text-fg/90">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[0.7rem] font-bold text-accent-soft"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className={`${CARD} p-6 sm:p-7`}>
                <h3 className="text-h3 font-bold">
                  This Is <span className="text-loss">NOT</span> For You If
                </h3>
                <ul className="mt-5 space-y-4">
                  {FIT.no.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-body text-muted">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-loss/15 text-[0.7rem] font-bold text-loss"
                      >
                        ✕
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── BOOK (form) ────────────────────── */}
        <section
          id="book"
          aria-labelledby="book-heading"
          className={`relative overflow-hidden border-t border-line bg-surface ${SECTION_Y}`}
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
            />

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

            <Reveal className="mx-auto mt-10 max-w-2xl">
              <StrategyCallForm />
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────── */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className={`border-t border-line ${SECTION_Y}`}
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
      </main>

      {/* Every "#book" button on the page opens this instead of scrolling. */}
      <BookingModal />
      <MagneticButtons />

      {/* ── FOOTER ─────────────────────────── */}
      {/* Extra bottom padding on phones so the sticky CTA never covers
          the disclaimer. */}
      <footer className="border-t border-line pt-14 pb-32 text-center md:pb-12">
        <div className={CONTAINER}>
          <Image
            src={footerLogo}
            alt="Whizoid Studio"
            sizes="224px"
            className="mx-auto h-auto w-44 sm:w-56"
          />
          <p className="mt-3 text-body text-muted">
            Meta ads for D2C brands.{" "}
            {/* Own line on phones, same line from sm up. */}
            <br className="sm:hidden" />
            <span className="whitespace-nowrap">Stop guessing. Start scaling.</span>
          </p>
          <nav aria-label="Footer" className="mt-8">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-micro text-muted">
              {[
                { href: "#results", label: "Results" },
                { href: "#how", label: "How It Works" },
                { href: "#book", label: "Book A Call" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-fg">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-fg"
                >
                  WhatsApp
                </a>
              </li>
              {[
                { href: "/terms-and-conditions", label: "Terms & Conditions" },
                { href: "/privacy-policy", label: "Privacy Policy" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-10 border-t border-line pt-6 text-[0.6875rem] leading-relaxed text-subtle text-pretty">
            This site is not a part of the Facebook™ website or Facebook™ Inc.
            Additionally, this site is NOT endorsed by Facebook™ in any way.
            FACEBOOK™ is a trademark of FACEBOOK™, Inc. As stipulated by law, we
            cannot and do not make any guarantees about your ability to get
            results or earn any money with our ideas, information, tools, or
            strategies. We are here to help you by giving great content,
            direction, and strategies that have worked for us and our clients,
            and that we believe can help you move forward. All terms, privacy
            policies, and disclaimers for this program and website can be
            accessed via the links provided. We believe in transparency and
            integrity, and we hold ourselves (and you) to a high standard of
            honesty.
          </p>
        </div>
      </footer>

      <StickyCta />
    </>
  );
}
