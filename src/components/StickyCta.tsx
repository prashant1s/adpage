"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { BUTTON_MD, BUTTON_PRIMARY, CTA_LABEL } from "@/lib/ui";

/* Sections that already have the form or a big CTA of their own. The bar
   steps aside while any of them is on screen so it never doubles up or
   covers the form. */
const HIDE_OVER = ["book", "final-cta"];

/* Bottom CTA, visible from the moment the page loads. Full-width bar on
   phones, a floating card on larger screens. */
export default function StickyCta() {
  const [covered, setCovered] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const targets = HIDE_OVER.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const observer = new IntersectionObserver((entries) => {
      setCovered((current) => {
        const next = new Set(current);
        for (const entry of entries) {
          if (entry.isIntersecting) next.add(entry.target.id);
          else next.delete(entry.target.id);
        }
        return next;
      });
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const visible = covered.size === 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 140 }}
          animate={{ y: 0 }}
          exit={{ y: 140 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 md:pointer-events-none md:bottom-5 md:flex md:justify-center"
        >
          <div
            className="border-t border-line bg-ink/95 px-4 pt-2.5 md:pointer-events-auto md:w-auto md:rounded-2xl md:border md:bg-raised/95 md:px-5 md:pt-3 md:shadow-[0_20px_50px_-15px_rgb(0_0_0/0.8)]"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <p className="text-center text-micro font-medium whitespace-nowrap text-muted">
              What are you waiting for?{" "}
              <span aria-hidden className="inline-block animate-bounce [animation-duration:1.6s]">
                👇
              </span>
            </p>
            <a
              href="#book"
              className={`cta-attention mt-2 w-full md:px-8 ${BUTTON_PRIMARY} ${BUTTON_MD}`}
            >
              {CTA_LABEL}
              <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
