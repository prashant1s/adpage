"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

import type { ProofShot } from "@/content/proof";
import { CARD } from "@/lib/ui";

/* How long each slide holds before the carousel moves on. */
const STEP_MS = 3000;

/**
 * Sideways carousel for screenshots of mixed shapes (wide and tall ad set
 * cards). Desktop: every slide is the same height and its width follows the
 * image, so nothing is cropped and text stays at its captured size. Phones
 * and tablets: every slide is the same width, height follows the image.
 *
 * Auto-advances one slide every few seconds while on screen, and loops by
 * rendering the list twice and jumping back one pass when the second copy
 * lines up with the first (invisible, both look the same). Pauses on hover,
 * touch and focus; reduced-motion visitors get a manual carousel.
 */
export default function ScreenshotCarousel({
  items,
  label,
}: {
  items: ProofShot[];
  label: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const step = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const slides = Array.from(track.children) as HTMLElement[];
      if (slides.length <= items.length) return;
      // Scroll position that puts each slide at the track's start edge.
      const base = slides[0].offsetLeft;
      const offsets = slides.map((slide) => slide.offsetLeft - base);
      const cycle = offsets[items.length];

      let pos = track.scrollLeft;
      if (direction === 1 && pos >= cycle - 1) {
        pos -= cycle;
        track.scrollTo({ left: pos, behavior: "instant" });
      } else if (direction === -1 && pos <= 1) {
        pos += cycle;
        track.scrollTo({ left: pos, behavior: "instant" });
      }

      const target =
        direction === 1
          ? offsets.find((offset) => offset > pos + 1)
          : offsets.findLast((offset) => offset < pos - 1);
      if (target !== undefined) track.scrollTo({ left: target, behavior: "smooth" });
    },
    [items.length],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only auto-advance while on screen, so it never competes with page scroll.
    let inView = false;
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    visibility.observe(track);

    const timer = window.setInterval(() => {
      if (inView && !pausedRef.current && !document.hidden) step(1);
    }, STEP_MS);

    return () => {
      window.clearInterval(timer);
      visibility.disconnect();
    };
  }, [step]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  /* The second pass is hidden from assistive tech to avoid duplicates. */
  const loop = [...items, ...items];

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
        onPointerDown={pause}
        onPointerUp={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        /* Phones: each slide spans the whole track and the gap is wider
           than the side padding, so exactly one shows, no neighbours
           peeking in. Tablet up: several slides in view. */
        className="no-scrollbar relative -mx-5 flex snap-x snap-mandatory scroll-px-5 items-center gap-6 overflow-x-auto px-5 sm:-mx-8 sm:scroll-px-8 sm:gap-4 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:gap-5 lg:px-0"
      >
        {loop.map((shot, index) => {
          const isClone = index >= items.length;
          return (
            <div
              key={`${shot.alt}-${index}`}
              aria-hidden={isClone || undefined}
              className="flex w-full shrink-0 snap-center justify-center sm:block sm:w-[34%] sm:snap-start lg:w-auto"
            >
              <figure className={`${CARD} w-full max-w-72 p-2 sm:max-w-none lg:w-auto`}>
                <Image
                  src={shot.src}
                  alt={isClone ? "" : shot.alt}
                  quality={85}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 34vw, 288px"
                  className="block h-auto w-full rounded-xl lg:h-75 lg:w-auto"
                />
              </figure>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous screenshot"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next screenshot"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
        >
          →
        </button>
      </div>
    </div>
  );
}
