import Image from "next/image";
import Link from "next/link";

import footerLogo from "../../public/footer-logo.webp";
import GridBackdrop from "@/components/GridBackdrop";
import LegalToc from "@/components/LegalToc";
import {
  LEGAL_EMAIL,
  LEGAL_WEBSITE,
  type LegalDoc,
  type LegalItem,
  type LegalSection,
} from "@/content/legal";
import { BUTTON_SECONDARY, LABEL } from "@/lib/ui";

const CONTAINER = "mx-auto w-full max-w-6xl px-5 sm:px-8";

const DOCS = [
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

/* Plain text, with the contact email (where the copy mentions it) as a link. */
function Text({ children }: { children: string }) {
  const parts = children.split(LEGAL_EMAIL);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && (
            <a
              href={`mailto:${LEGAL_EMAIL}`}
              className="font-medium text-accent-soft underline-offset-4 hover:underline"
            >
              {LEGAL_EMAIL}
            </a>
          )}
          {part}
        </span>
      ))}
    </>
  );
}

function wordCount(doc: LegalDoc) {
  const text = doc.sections
    .flatMap((s) => [
      s.title,
      s.body ?? "",
      s.after ?? "",
      ...(s.items ?? []).map((item) =>
        typeof item === "string" ? item : `${item.label} ${item.text}`,
      ),
    ])
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/* "Label: text" points read better as small tiles; plain points stay a list. */
function Items({ items }: { items: LegalItem[] }) {
  const labeled = items.filter(
    (item): item is Exclude<LegalItem, string> => typeof item !== "string",
  );
  if (labeled.length === items.length) {
    return (
      <ul className="grid gap-3 sm:grid-cols-2">
        {labeled.map((item) => (
          <li
            key={item.label}
            className="rounded-xl border border-line bg-ink/50 p-4 sm:odd:last:col-span-2"
          >
            <p className="text-micro font-semibold text-fg">{item.label}</p>
            <p className="mt-1 text-micro text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2.5">
      {items.map((item, j) => (
        <li key={j} className="flex gap-3">
          <span
            aria-hidden
            className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent"
          />
          <span>
            {typeof item === "string" ? (
              item
            ) : (
              <>
                <strong className="font-semibold text-fg">{item.label}:</strong>{" "}
                {item.text}
              </>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

const ICON = "h-5 w-5";

function MailIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={ICON}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={ICON}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3M3.6 9h16.8M3.6 15h16.8"
      />
    </svg>
  );
}

function ContactCards() {
  const cards = [
    {
      href: `mailto:${LEGAL_EMAIL}`,
      label: "Email",
      value: LEGAL_EMAIL,
      icon: <MailIcon />,
      external: false,
    },
    {
      href: LEGAL_WEBSITE,
      label: "Website",
      value: "www.whizoid.com",
      icon: <GlobeIcon />,
      external: true,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cards.map((card) => (
        <a
          key={card.label}
          href={card.href}
          {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex items-center gap-4 rounded-xl border border-line bg-ink/50 p-4 transition-colors hover:border-accent/50"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-soft">
            {card.icon}
          </span>
          <span className="min-w-0">
            <span className="block text-micro text-subtle">{card.label}</span>
            <span className="block truncate font-semibold text-fg">{card.value}</span>
          </span>
          <span
            aria-hidden
            className="ml-auto text-subtle transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-accent-soft"
          >
            {card.external ? "↗" : "→"}
          </span>
        </a>
      ))}
    </div>
  );
}

function Section({ section, index }: { section: LegalSection; index: number }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="rounded-2xl border border-line bg-raised/50 p-5 sm:p-7"
    >
      <h2
        id={`${section.id}-heading`}
        className="flex items-start gap-3 text-h3 font-semibold"
      >
        <span
          aria-hidden
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-[0.75rem] font-bold tabular-nums text-accent-soft ring-1 ring-accent/25 ring-inset"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="pt-px">{section.title}</span>
      </h2>

      {/* Indented under the title (badge 28px + gap 12px) from sm up. */}
      <div className="mt-4 space-y-4 text-body text-muted text-pretty sm:pl-10">
        {section.body && (
          <p>
            <Text>{section.body}</Text>
          </p>
        )}
        {section.items && <Items items={section.items} />}
        {section.after && <p>{section.after}</p>}
        {section.contact && <ContactCards />}
      </div>
    </section>
  );
}

/* Shared shell for /terms-and-conditions and /privacy-policy: a sticky
   header, numbered section cards, and a contents list that tracks the
   section being read (sticky sidebar on desktop, collapsible on phones). */
export default function LegalPage({
  doc,
  current,
}: {
  doc: LegalDoc;
  current: string;
}) {
  const toc = doc.sections.map(({ id, title }) => ({ id, title }));
  const minutes = Math.max(1, Math.round(wordCount(doc) / 200));
  const other = DOCS.find((d) => d.href !== current)!;

  return (
    <>
      {/* .legal-header: globals.css offsets anchor jumps by its height. */}
      <header className="legal-header sticky top-0 z-40 border-b border-line bg-ink/90 md:bg-ink/75 md:backdrop-blur-md">
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

      <main id="main">
        <section className="relative overflow-hidden border-b border-line py-14 sm:py-20">
          <GridBackdrop />
          <div aria-hidden className="halo pointer-events-none absolute inset-0" />
          <div className={`relative ${CONTAINER} text-center`}>
            <p className={LABEL}>LEGAL</p>
            <h1 className="mt-4 text-display font-bold text-balance">{doc.title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-lead text-muted text-pretty">
              {doc.intro}
            </p>

            <p className="mt-5 flex items-center justify-center gap-2 text-micro text-subtle">
              <span>{doc.sections.length} sections</span>
              <span aria-hidden>·</span>
              <span>{minutes} min read</span>
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
                      active ? "btn-gradient text-white" : "text-muted hover:text-fg"
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
          className={`${CONTAINER} grid gap-6 py-10 sm:py-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12`}
        >
          <aside>
            <details className="group rounded-2xl border border-line bg-raised lg:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-micro font-semibold [&::-webkit-details-marker]:hidden">
                On this page
                <span
                  aria-hidden
                  className="text-subtle transition-transform group-open:rotate-180"
                >
                  ▾
                </span>
              </summary>
              <div className="border-t border-line p-2">
                <LegalToc sections={toc} />
              </div>
            </details>

            {/* Capped to the viewport so a long list still scrolls on short screens. */}
            <nav
              aria-label="On this page"
              className="sticky top-24 hidden max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl border border-line bg-surface/60 p-3 lg:block"
            >
              <p className="px-3 pt-1 pb-2 text-eyebrow font-semibold text-subtle">
                ON THIS PAGE
              </p>
              <LegalToc sections={toc} />
            </nav>
          </aside>

          <article className="min-w-0 max-w-3xl space-y-4">
            {doc.sections.map((section, i) => (
              <Section key={section.id} section={section} index={i} />
            ))}

            <div className="flex flex-col-reverse items-center gap-3 pt-4 text-micro sm:flex-row sm:justify-between">
              <a href="#main" className="text-muted transition-colors hover:text-fg">
                <span aria-hidden>↑</span> Back to top
              </a>
              <Link
                href={other.href}
                className="font-semibold text-accent-soft transition-colors hover:text-fg"
              >
                Read our {other.label} <span aria-hidden>→</span>
              </Link>
            </div>
          </article>
        </div>
      </main>

      <footer className="border-t border-line py-8">
        <div
          className={`${CONTAINER} flex flex-col items-center gap-4 text-micro text-subtle sm:flex-row sm:justify-between`}
        >
          <p>© {new Date().getFullYear()} Whizoid Studio. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/" className="transition-colors hover:text-fg">
              Home
            </Link>
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
