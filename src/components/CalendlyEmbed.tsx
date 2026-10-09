"use client";

import { useEffect, useRef, useState } from "react";

import { CALENDLY_EMBED_URL, loadCalendly } from "@/lib/calendly";
import { CALENDLY_URL } from "@/lib/site";

/* Inline Calendly booking calendar. Calendly's script and iframe only load
   once the box is about a screen away, so nothing above it waits on them.
   Phones: runs edge to edge, since Calendly needs at least 320px of width. */
export default function CalendlyEmbed() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        loadCalendly()
          .then(() => {
            if (cancelled || !window.Calendly) return;
            // Clear first, so a remount never leaves two calendars.
            box.replaceChildren();
            window.Calendly.initInlineWidget({
              url: CALENDLY_EMBED_URL,
              parentElement: box,
            });
          })
          .catch(() => {
            if (!cancelled) setFailed(true);
          });
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(box);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Calendly fills this box itself, so React never renders into it. */}
      <div
        ref={boxRef}
        aria-label="Book a time for your free strategy call"
        role="region"
        className="relative h-175 min-w-80 overflow-hidden border-y border-line bg-raised max-sm:-mx-5 sm:rounded-2xl sm:border"
      />
      <p className="mt-3 text-center text-micro text-subtle">
        {failed ? "The calendar couldn't load here. " : "Calendar not showing? "}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent-soft underline underline-offset-4"
        >
          Book on Calendly
        </a>
      </p>
    </div>
  );
}
