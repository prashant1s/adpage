"use client";

import { useEffect, useRef } from "react";

/**
 * Faint grid behind a section. On devices with a mouse, the grid lines
 * near the cursor light up blue and follow it. Touch devices and visitors who
 * prefer reduced motion get the static grid only — no listeners at all.
 *
 * Place it as the first child of a `relative overflow-hidden` section and
 * give the section's content `relative` so it sits above the grid.
 */
export default function GridBackdrop({
  cell = 56,
  className = "",
}: {
  /** Grid square size in px. */
  cell?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!canHover.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    // Coalesce pointer moves into one style write per frame.
    const apply = () => {
      frame = 0;
      el.style.setProperty("--grid-x", `${x}px`);
      el.style.setProperty("--grid-y", `${y}px`);
    };
    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onEnter = () => el.setAttribute("data-active", "");
    const onLeave = () => el.removeAttribute("data-active");

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`grid-backdrop pointer-events-none absolute inset-0 ${className}`}
      style={{ ["--grid-cell" as string]: `${cell}px` }}
    >
      <div className="grid-backdrop__lines" />
      <div className="grid-backdrop__glow" />
    </div>
  );
}
