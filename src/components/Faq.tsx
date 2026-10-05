"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FAQ_PREVIEW_COUNT, FAQS } from "@/content/faqs";
import { BUTTON_MD, BUTTON_SECONDARY } from "@/lib/ui";

export default function Faq() {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);
  /* The first FAQ_PREVIEW_COUNT questions show up front; the rest are
     rendered but hidden until "View more" is pressed. */
  const [showAll, setShowAll] = useState(false);
  const firstExtraRef = useRef<HTMLButtonElement>(null);
  const extraCount = FAQS.length - FAQ_PREVIEW_COUNT;

  const showRest = () => {
    setShowAll(true);
    // Keyboard users land on the first newly shown question, not the
    // now-removed button.
    requestAnimationFrame(() => firstExtraRef.current?.focus());
  };

  return (
    <div>
      <div className="space-y-2">
        {FAQS.map((item, index) => {
          const isOpen = open === index;
          const panelId = `${uid}-faq-${index}`;

          return (
            <div
              key={item.q}
              hidden={!showAll && index >= FAQ_PREVIEW_COUNT}
              className="rounded-lg border border-line bg-raised px-4 sm:px-5"
            >
              <h3>
                <button
                  ref={index === FAQ_PREVIEW_COUNT ? firstExtraRef : undefined}
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group flex w-full items-center justify-between gap-4 py-3.5 text-left sm:py-4"
                >
                  <span className="text-micro font-semibold text-fg sm:text-body">
                    {item.q}
                  </span>
                  {/* Plus that turns into a minus: the vertical bar collapses.
                      2px bars centred in a 14px box: thick enough that no
                      screen density or sub-pixel position can thin one bar
                      out or drop it (1px bars did both), arms equal. */}
                  <svg
                    aria-hidden
                    viewBox="0 0 14 14"
                    className="h-3.5 w-3.5 shrink-0 fill-current text-accent-soft"
                  >
                    <rect x="1" y="6" width="12" height="2" rx="1" />
                    <rect
                      x="6"
                      y="1"
                      width="2"
                      height="12"
                      rx="1"
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      className={`transition-transform duration-200 ${isOpen ? "scale-y-0" : ""}`}
                    />
                  </svg>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-4 text-micro text-muted text-pretty">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {!showAll && extraCount > 0 && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={showRest}
            className={`${BUTTON_SECONDARY} ${BUTTON_MD}`}
          >
            View more
          </button>
        </div>
      )}
    </div>
  );
}
