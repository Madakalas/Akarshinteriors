"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Gentle fade/rise for each new page (used by app/template.tsx). */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}
