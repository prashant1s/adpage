"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { BUTTON_MD, BUTTON_PRIMARY } from "@/lib/ui";

/* Phone-only bar that appears once the hero CTA has scrolled away, and
   hides again when the booking form itself is on screen. */
export default function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.getElementById("book");
    const observer = form
      ? new IntersectionObserver(([entry]) =>
          setFormVisible(entry.isIntersecting),
        )
      : null;
    if (form) observer?.observe(form);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = pastHero && !formVisible;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 px-4 pt-3 md:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <a href="#book" className={`w-full ${BUTTON_PRIMARY} ${BUTTON_MD}`}>
            Book a free strategy call
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
