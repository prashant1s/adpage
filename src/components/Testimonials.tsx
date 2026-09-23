"use client";

import { useRef } from "react";

import { TESTIMONIALS } from "@/content/testimonials";

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
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
      >
        {TESTIMONIALS.map((item) => (
          <figure
            key={item.id}
            className="flex min-w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-white/10 bg-white/4 p-5 sm:min-w-[20rem] sm:p-6 lg:min-w-[22rem]"
          >
            <span aria-hidden className="text-h2 leading-none text-blue-500/50">
              &ldquo;
            </span>
            <blockquote className="mt-1 flex-1 text-body font-medium text-white text-pretty">
              {item.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-white/10 pt-4">
              <p className="text-body font-bold text-white">{item.name}</p>
              <p className="mt-1 text-micro text-neutral-400 text-pretty">
                {item.role} · {item.company}
              </p>
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
