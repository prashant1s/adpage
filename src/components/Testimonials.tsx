"use client";

import { useCallback, useEffect, useRef } from "react";

import { TESTIMONIALS } from "@/content/testimonials";

/* Drift speed of the auto-scroll, in pixels per second. Slow enough that a
   card stays readable while it moves. */
const SPEED = 40;

/* Initials for the caption avatar — first letter of the first two words. */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  /* Width of one full pass through the list. Once the track has drifted this
     far we subtract it, which is invisible because the list is rendered twice
     and the two positions are identical. */
  const cycleRef = useRef(0);

  const measureCycle = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.children;
    const first = cards[0] as HTMLElement | undefined;
    const wrapPoint = cards[TESTIMONIALS.length] as HTMLElement | undefined;
    // offsetLeft difference covers card widths *and* the gaps between them.
    cycleRef.current =
      first && wrapPoint ? wrapPoint.offsetLeft - first.offsetLeft : 0;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Motion-sensitive visitors get a plain, manually scrolled carousel.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    measureCycle();
    const observer = new ResizeObserver(measureCycle);
    observer.observe(track);

    let frame = 0;
    let last = performance.now();

    const step = (now: number) => {
      const delta = now - last;
      last = now;

      if (!pausedRef.current && cycleRef.current > 0) {
        let next = track.scrollLeft + (SPEED * delta) / 1000;
        if (next >= cycleRef.current) next -= cycleRef.current;
        track.scrollLeft = next;
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);

    // Don't accumulate a huge time delta while the tab is in the background.
    const onVisibility = () => {
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [measureCycle]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  /* Rendered twice so the leftward drift can loop without a visible jump. The
     second pass is hidden from assistive tech to avoid duplicate quotes. */
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
        onPointerDown={pause}
        onPointerUp={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="no-scrollbar -mx-5 flex items-stretch gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
      >
        {loop.map((item, index) => {
          const isClone = index >= TESTIMONIALS.length;
          return (
            <figure
              key={`${item.id}-${index}`}
              aria-hidden={isClone || undefined}
              /* Two per view from md up rather than three, so each card is wide
                 enough to read as a landscape rectangle instead of a column. */
              className="flex w-[85%] max-w-full shrink-0 grow-0 basis-auto flex-col rounded-2xl border border-white/10 bg-white/4 p-5 sm:p-6 md:w-[calc((100%-1rem)/2)]"
            >
              <span aria-hidden className="text-h2 leading-none text-blue-500/50">
                &ldquo;
              </span>
              <blockquote className="mt-1 line-clamp-6 flex-1 min-h-24 text-body font-medium text-white text-pretty">
                {item.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-micro font-bold text-white"
                >
                  {initials(item.name)}
                </span>
                <div className="min-w-0">
                  <p className="text-body font-bold text-white">{item.name}</p>
                  <p className="mt-0.5 text-micro text-neutral-400 text-pretty">
                    {item.role} · {item.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-neutral-400 transition-colors hover:border-white/40 hover:text-white"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-neutral-400 transition-colors hover:border-white/40 hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}
