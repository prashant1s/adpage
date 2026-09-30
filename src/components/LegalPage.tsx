import Image from "next/image";
import Link from "next/link";

import footerLogo from "../../public/footer-logo.webp";
import {
  LEGAL_EMAIL,
  LEGAL_WEBSITE,
  type LegalDoc,
  type LegalItem,
} from "@/content/legal";
import { CARD, LABEL } from "@/lib/ui";

const CONTAINER = "mx-auto w-full max-w-6xl px-5 sm:px-8";

const DOCS = [
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

function Item({ item }: { item: LegalItem }) {
  if (typeof item === "string") return <>{item}</>;
  return (
    <>
      <strong className="font-semibold text-fg">{item.label}:</strong>{" "}
      {item.text}
    </>
  );
}

/* Shared shell for /terms-and-conditions and /privacy-policy: numbered
   sections, a sticky contents list on desktop and a collapsible one on
   phones. Server-rendered, no client JS. */
export default function LegalPage({
  doc,
  current,
}: {
  doc: LegalDoc;
  current: string;
}) {
  const toc = (
    <ol className="space-y-1 text-micro">
      {doc.sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className="flex gap-3 rounded-md px-2 py-1.5 text-muted transition-colors hover:bg-raised hover:text-fg"
          >
            <span className="w-5 shrink-0 tabular-nums text-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <header className="border-b border-line">
        <div className={`${CONTAINER} flex h-16 items-center justify-between`}>
          <Link href="/" aria-label="Whizoid Studio home">
            <Image
              src={footerLogo}
              alt="Whizoid Studio"
              sizes="144px"
              className="h-auto w-32 sm:w-36"
            />
          </Link>
          <Link
            href="/"
            className="text-micro font-medium text-muted transition-colors hover:text-fg"
          >
            <span aria-hidden>←</span> Back to home
          </Link>
        </div>
      </header>

      <main id="main">
        <section className="relative overflow-hidden border-b border-line py-14 sm:py-20">
          <div aria-hidden className="halo pointer-events-none absolute inset-0" />
          <div className={`relative ${CONTAINER} text-center`}>
            <p className={LABEL}>LEGAL</p>
            <h1 className="mt-4 text-h2 font-bold text-balance">{doc.title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-lead text-muted text-pretty">
              {doc.intro}
            </p>

            <nav
              aria-label="Legal documents"
              className="mt-8 inline-flex rounded-full border border-line bg-surface p-1"
            >
              {DOCS.map((d) => {
                const active = d.href === current;
                return (
                  <Link
                    key={d.href}
                    href={d.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-micro font-semibold transition-colors ${
                      active
                        ? "btn-gradient text-white"
                        : "text-muted hover:text-fg"
                    }`}
                  >
                    {d.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </section>

        <div
          className={`${CONTAINER} grid gap-10 py-12 sm:py-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16`}
        >
          {/* Contents: collapsible on phones, sticky sidebar on desktop. */}
          <aside>
            <details className={`${CARD} group lg:hidden`}>
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-micro font-semibold [&::-webkit-details-marker]:hidden">
                On this page
                <span
                  aria-hidden
                  className="text-subtle transition-transform group-open:rotate-180"
                >
                  ▾
                </span>
              </summary>
              <div className="border-t border-line p-2">{toc}</div>
            </details>

            <nav aria-label="On this page" className="sticky top-8 hidden lg:block">
              <p className="px-2 text-eyebrow font-semibold text-subtle">
                ON THIS PAGE
              </p>
              <div className="mt-3">{toc}</div>
            </nav>
          </aside>

          <article className="max-w-3xl">
            {doc.sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-heading`}
                className="scroll-mt-8 border-b border-line py-8 first:pt-0 last:border-b-0"
              >
                <h2
                  id={`${s.id}-heading`}
                  className="flex items-baseline gap-3 text-h3 font-semibold"
                >
                  <span className="text-micro font-semibold tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>

                <div className="mt-3 space-y-4 text-body text-muted text-pretty">
                  {s.body && <p>{s.body}</p>}

                  {s.items && (
                    <ul className="space-y-2.5">
                      {s.items.map((item, j) => (
                        <li key={j} className="flex gap-3">
                          <span
                            aria-hidden
                            className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent"
                          />
                          <span>
                            <Item item={item} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.after && <p>{s.after}</p>}

                  {s.contact && (
                    <div className={`${CARD} grid overflow-hidden sm:grid-cols-2`}>
                      <a
                        href={`mailto:${LEGAL_EMAIL}`}
                        className="block p-5 transition-colors hover:bg-surface"
                      >
                        <span className="block text-micro text-subtle">Email</span>
                        <span className="mt-1 block font-semibold text-accent-soft">
                          {LEGAL_EMAIL}
                        </span>
                      </a>
                      <a
                        href={LEGAL_WEBSITE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border-t border-line p-5 transition-colors hover:bg-surface sm:border-t-0 sm:border-l"
                      >
                        <span className="block text-micro text-subtle">Website</span>
                        <span className="mt-1 block font-semibold text-accent-soft">
                          www.whizoid.com
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </main>

      <footer className="border-t border-line py-8">
        <div
          className={`${CONTAINER} flex flex-col items-center gap-4 text-micro text-muted sm:flex-row sm:justify-between`}
        >
          <Link href="/" className="transition-colors hover:text-fg">
            <span aria-hidden>←</span> Back to home
          </Link>
          <nav aria-label="Legal" className="flex gap-6">
            {DOCS.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                aria-current={d.href === current ? "page" : undefined}
                className="transition-colors hover:text-fg aria-[current=page]:text-fg"
              >
                {d.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
