"use client";

import { useEffect } from "react";

/* Primary buttons only (not the gradient pill label in the hero). */
const SELECTOR = "a.btn-gradient, button.btn-gradient";

/* How far a button leans toward the cursor, as a share of the cursor's
   distance from its centre, capped in px. */
const PULL_X = 0.25;
const PULL_Y = 0.35;
const MAX_X = 10;
const MAX_Y = 6;

const clamp = (value: number, max: number) => Math.max(-max, Math.min(max, value));

/**
 * "Magnetic" primary buttons: while the mouse is over one, it leans slightly
 * toward the cursor and springs back when the cursor leaves. Writes the
 * --mag-x / --mag-y variables that `.btn-float` composes into its transform.
 *
 * One delegated listener for the whole page, so every primary button —
 * including ones added later — gets it. Mouse only: touch devices and
 * reduced-motion visitors never attach the listener. Renders nothing.
 */
export default function MagneticButtons() {
  // iOS Safari only applies :active (the tap glow) when a touch listener exists.
  useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!canHover.matches) return;

    let current: HTMLElement | null = null;
    let frame = 0;
    let x = 0;
    let y = 0;

    const release = (el: HTMLElement) => {
      el.style.removeProperty("--mag-x");
      el.style.removeProperty("--mag-y");
      el.removeAttribute("data-magnet");
    };

    // One style write per frame, however fast the mouse reports.
    const apply = () => {
      frame = 0;
      if (!current) return;
      const rect = current.getBoundingClientRect();
      const dx = x - (rect.left + rect.width / 2);
      const dy = y - (rect.top + rect.height / 2);
      current.style.setProperty("--mag-x", `${clamp(dx * PULL_X, MAX_X).toFixed(1)}px`);
      current.style.setProperty("--mag-y", `${clamp(dy * PULL_Y, MAX_Y).toFixed(1)}px`);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const el = (event.target as Element | null)?.closest?.<HTMLElement>(SELECTOR) ?? null;
      if (el !== current) {
        if (current) release(current);
        current = el;
        current?.setAttribute("data-magnet", "");
      }
      if (!current) return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    // Cursor left the window entirely.
    const onLeaveWindow = () => {
      if (current) release(current);
      current = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      cancelAnimationFrame(frame);
      if (current) release(current);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, []);

  return null;
}
