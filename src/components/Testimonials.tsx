"use client";

import { useRef } from "react";

/* Placeholders are intentional: the content doc says to fill these only with
   each client's real words and numbers, approved by them.                    */
const TESTIMONIALS = [
  { brand: "11:11", quote: "[one-line quote]", result: "ROAS [X]x → [Y]x" },
  { brand: "Wankies", quote: "[one-line quote]", result: "Cost per order ₹[X] → ₹[Y]" },
  { brand: "Rhino Cult", quote: "[one-line quote]", result: "[real Meta ads result]" },
  { brand: "[Client]", quote: "[one-line quote]", result: "[real result]" },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {TESTIMONIALS.map((item) => (
          <figure
            key={item.brand}
            className="flex min-w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:min-w-[17rem] lg:min-w-0 lg:shrink lg:flex-1"
          >
            <span aria-hidden className="text-3xl leading-none text-blue-500/60">
              &ldquo;
            </span>
            <blockquote className="mt-2 flex-1 text-lg font-medium leading-snug text-white">
              {item.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-4">
              <p className="text-sm font-bold text-white">{item.brand}</p>
              <p className="mt-1 text-sm font-semibold text-emerald-400">
                {item.result}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-neutral-400 transition-colors hover:border-white/40 hover:text-white"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-neutral-400 transition-colors hover:border-white/40 hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}
