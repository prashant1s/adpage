"use client";

import { useRef } from "react";

import { TESTIMONIALS } from "@/content/testimonials";

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
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
      >
        {TESTIMONIALS.map((item) => (
          <figure
            key={item.id}
            /* Two per view from md up rather than three, so each card is wide
               enough to read as a landscape rectangle instead of a column. */
            className="flex w-[85%] max-w-full shrink-0 grow-0 basis-auto snap-center flex-col rounded-2xl border border-white/10 bg-white/4 p-5 sm:p-6 md:w-[calc((100%-1rem)/2)] md:snap-start"
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
        ))}
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
