"use client";

import { useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";

import { CALENDLY_EMBED_URL, CALENDLY_ORIGINS } from "@/lib/calendly";
import { CALENDLY_URL } from "@/lib/site";

/* Inline Calendly booking calendar, as a plain iframe.
   Calendly's own page is heavy (~4.5 MB from a dozen hosts), so the only
   speed we control is how early it starts:
   - eager (/book): the iframe is in the server HTML, so it starts loading
     before this page's JavaScript runs, and the head preconnects to Calendly.
   - lazy (home page): it starts about three screens before the visitor
     reaches it, so it's usually ready by the time they arrive.
   A spinner sits under the iframe and shows until Calendly paints over it.
   Phones: runs edge to edge, since Calendly needs at least 320px of width. */
export default function CalendlyEmbed({ eager = false }: { eager?: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(eager);

  if (eager) CALENDLY_ORIGINS.forEach((origin) => preconnect(origin));

  useEffect(() => {
    const box = boxRef.current;
    if (started || !box) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setStarted(true);
      },
      { rootMargin: "3000px 0px" },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, [started]);

  return (
    <div>
      <div
        ref={boxRef}
        className="relative h-175 min-w-80 overflow-hidden border-y border-line bg-raised max-sm:-mx-5 sm:rounded-2xl sm:border"
      >
        <div
          aria-hidden
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-micro text-subtle"
        >
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
          Loading the calendar…
        </div>
        {started && (
          <iframe
            src={CALENDLY_EMBED_URL}
            title="Book a time for your free strategy call"
            /* Calendly's page is light; matching its colour scheme keeps the
               iframe see-through (spinner visible) until it paints. */
            style={{ colorScheme: "light" }}
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
      <p className="mt-3 text-center text-micro text-subtle">
        Calendar not showing?{" "}
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
