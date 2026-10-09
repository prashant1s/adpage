import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import footerLogo from "../../../public/footer-logo.webp";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import GridBackdrop from "@/components/GridBackdrop";
import SiteFooter from "@/components/SiteFooter";
import { CALL_AGENDA } from "@/content/call";
import { BUTTON_SECONDARY, CTA_LABEL, LABEL } from "@/lib/ui";

const CONTAINER = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export const metadata: Metadata = {
  title: CTA_LABEL,
  description:
    "30 minutes, no pitch. We open your Meta ad account with you and show you the 2–3 fixes that will move your ROAS first.",
  alternates: { canonical: "/book" },
};

/* Where every "Book Your Free Strategy Call" button on the site lands
   (CTA_HREF): the Calendly booking calendar on its own page. */
export default function BookPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-line bg-ink">
        <div className={`${CONTAINER} flex h-16 items-center justify-between`}>
          <Link href="/" aria-label="Whizoid Studio home">
            <Image
              src={footerLogo}
              alt="Whizoid Studio"
              sizes="144px"
              className="h-auto w-28 sm:w-32"
            />
          </Link>
          <Link href="/" className={`${BUTTON_SECONDARY} min-h-10 px-4 text-micro`}>
            <span aria-hidden>←</span> Back to home
          </Link>
        </div>
      </header>

      <main
        id="main"
        className="relative flex-1 overflow-hidden py-12 sm:py-16 lg:py-20"
      >
        <GridBackdrop />
        <div aria-hidden className="halo pointer-events-none absolute inset-0" />
        <div className={`relative ${CONTAINER}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className={LABEL}>Free Strategy Call</p>
            <h1 className="mt-4 text-h2 font-bold text-balance">
              Let&apos;s Find What&apos;s Broken{" "}
              <span className="text-gradient">Before You Spend Another Rupee.</span>
            </h1>
            <p className="mt-5 text-lead text-muted text-pretty">
              Pick a time that suits you. It takes under a minute.
            </p>
          </div>

          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
            {CALL_AGENDA.map((item) => (
              <li
                key={item}
                className="w-full rounded-xl border border-line bg-raised px-4 py-2 text-left text-micro text-muted sm:w-auto sm:rounded-full"
              >
                <span aria-hidden className="mr-1.5 text-accent-soft">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-10 max-w-5xl">
            <CalendlyEmbed />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
