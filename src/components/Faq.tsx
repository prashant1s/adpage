"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FAQS } from "@/content/faqs";

export default function Faq() {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {FAQS.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${uid}-faq-${index}`;

        return (
          <div key={item.q} className="rounded-lg border border-line bg-raised px-4 sm:px-5">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-center justify-between gap-4 py-3.5 text-left sm:py-4"
              >
                <span className="text-micro font-semibold text-fg sm:text-body">
                  {item.q}
                </span>
                {/* Plus that turns into a minus: the vertical bar collapses. */}
                <span
                  aria-hidden
                  className="relative h-3 w-3 shrink-0 text-accent-soft"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                  <span
                    className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-200 ${
                      isOpen ? "scale-y-0" : ""
                    }`}
                  />
                </span>
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
  );
}
