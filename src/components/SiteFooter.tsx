import Image from "next/image";
import Link from "next/link";

import footerLogo from "../../public/footer-logo.webp";

const CONTAINER = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const FOOTER_LINK =
  "inline-flex items-center gap-1.5 transition-colors hover:text-fg";

/* Site footer, shared by the home page and /book. Section links point at
   "/#…" so they work from any page; on the home page they just scroll.
   id="footer" is in StickyCta's HIDE_OVER list, so the sticky bar steps
   aside instead of covering the disclaimer. */
export default function SiteFooter() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-line bg-ink"
    >
      <div aria-hidden className="footer-glow pointer-events-none absolute inset-0" />
      <div aria-hidden className="footer-rule pointer-events-none absolute inset-x-0 top-0 h-px" />

      <div
        className={`relative ${CONTAINER} pt-14 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pt-20`}
      >
        <div className="text-center">
          <Image
            src={footerLogo}
            alt="Whizoid Studio"
            sizes="208px"
            className="mx-auto h-auto w-44 sm:w-52"
          />
          <p className="mt-4 text-body text-muted">
            Meta ads for D2C brands.{" "}
            <span className="whitespace-nowrap">Stop guessing. Start scaling.</span>
          </p>
        </div>

        <nav aria-label="Footer" className="mt-8">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-body text-muted">
            {[
              { href: "/#how", label: "How It Works" },
              { href: "/#results", label: "Results" },
              { href: "/#faq", label: "FAQ" },
            ].map((item) => (
              <li key={item.href}>
                <a href={item.href} className={FOOTER_LINK}>
                  {item.label}
                </a>
              </li>
            ))}
            {[
              { href: "/terms-and-conditions", label: "Terms & Conditions" },
              { href: "/privacy-policy", label: "Privacy Policy" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={FOOTER_LINK}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-10 border-t border-line pt-6 text-center text-[0.6875rem] leading-relaxed text-subtle text-pretty">
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

        <div className="mt-8 flex flex-col-reverse items-center gap-4 border-t border-line pt-6 text-micro text-subtle sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} Whizoid Studio. All rights reserved.
          </p>
          <a href="#top" className={`group ${FOOTER_LINK}`}>
            Back to top
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:-translate-y-0.5"
            >
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
