"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section";
}

/** Fades content up when it scrolls into view. Disabled for reduced-motion users. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) {
    const T = as;
    return <T className={className}>{children}</T>;
  }
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </M>
  );
}
