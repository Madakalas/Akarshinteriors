"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Reveals a heading word by word as it scrolls into view. Falls back to plain text for reduced motion. */
export function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ staggerChildren: 0.06 }}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} className="-mb-[0.1em] inline-block overflow-hidden pb-[0.18em] align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "105%", opacity: 0 }, show: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
