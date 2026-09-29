"use client";

import { useEffect, useRef } from "react";

import StrategyCallForm from "@/components/StrategyCallForm";

/**
 * The booking form as a popup. Mounted once; it opens for EVERY link on
 * the page that points at `#book` (all the "Book My Free Strategy Call"
 * style buttons), so none of them need wiring individually. Without JS the
 * links still fall back to scrolling to the in-page form.
 *
 * Uses the native <dialog> element, which gives focus trapping, Esc to
 * close and a backdrop for free.
 */
export default function BookingModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onClick = (event: MouseEvent) => {
      // Let modified clicks (new tab etc.) behave normally.
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href="#book"]');
      if (!link) return;
      event.preventDefault();
      if (!dialog.open) dialog.showModal();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="booking-modal-title"
      // A click that lands on the dialog element itself (not its content) is
      // a click on the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="booking-modal m-auto w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-line bg-raised p-0 text-fg shadow-[0_30px_90px_-20px_rgb(37_99_235/0.45)]"
    >
      <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-eyebrow font-semibold text-accent">
              Free Strategy Call
            </p>
            <h2
              id="booking-modal-title"
              className="mt-2 text-h3 font-bold text-balance sm:text-punch"
            >
              Let&apos;s Find What&apos;s Broken In Your Ads.
            </h2>
            <p className="mt-2 text-micro text-muted text-pretty">
              30 minutes. No pitch. Takes under a minute to fill.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mt-1 -mr-1 grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-6">
          <StrategyCallForm plain />
        </div>
      </div>
    </dialog>
  );
}
