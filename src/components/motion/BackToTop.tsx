"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-24 right-6 z-40 hidden size-11 place-items-center rounded-full border border-line bg-white text-forest shadow-[var(--shadow-card)] transition-colors hover:bg-forest hover:text-gold sm:right-8 sm:grid"
        >
          <ArrowUp className="size-4" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
