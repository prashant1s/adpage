"use client";

import { useEffect, useState } from "react";

/* Contents list for the legal pages. Highlights the section being read
   (the last one whose top has scrolled past the sticky header, or the
   final one once the page bottom is reached). Inside the phones'
   <details>, picking a section also folds the list away. */
export default function LegalToc({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      // 120px: just under the 64px sticky header plus the anchor offset.
      const current = atBottom
        ? els[els.length - 1]
        : els.findLast((el) => el.getBoundingClientRect().top <= 120) ?? els[0];
      setActive(current.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <ol className="space-y-0.5 text-micro">
      {sections.map((s, i) => {
        const isActive = s.id === active;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(event) =>
                event.currentTarget.closest("details")?.removeAttribute("open")
              }
              className={`relative flex gap-3 rounded-lg px-3 py-1.5 transition-colors ${
                isActive
                  ? "bg-accent/10 text-fg"
                  : "text-muted hover:bg-white/5 hover:text-fg"
              }`}
            >
              <span
                aria-hidden
                className={`absolute inset-y-1.5 left-0 w-0.5 rounded-full transition-colors ${
                  isActive ? "bg-accent" : "bg-transparent"
                }`}
              />
              <span
                className={`w-5 shrink-0 tabular-nums ${
                  isActive ? "text-accent-soft" : "text-subtle"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
