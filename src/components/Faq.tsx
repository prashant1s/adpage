"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  {
    q: "Is the call really free?",
    a: "Yes. 30 minutes, no strings.",
  },
  {
    q: "Should I just increase my budget?",
    a: "Not yet. Fix what\u2019s broken first, then scale.",
  },
  {
    q: "My ads look good. Why aren\u2019t they selling?",
    a: "Good-looking ads don\u2019t always sell. We check what\u2019s actually working in your numbers.",
  },
  {
    q: "I already have an agency.",
    a: "Take the call anyway. You\u2019ll know exactly what\u2019s being missed.",
  },
  {
    q: "How soon will I see changes?",
    a: "First fixes go live in week one. We\u2019ll tell you honestly on the call what to expect for your account.",
  },
  {
    q: "What if I don\u2019t see results in 90 days?",
    a: "You don\u2019t pay our fee. We agree on one clear target on day one. Ad spend goes to Meta, so that\u2019s not covered.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      {FAQS.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
            >
              <span className="text-base font-bold text-white sm:text-lg">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg leading-none text-blue-400"
                aria-hidden
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-neutral-400 sm:px-6">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
