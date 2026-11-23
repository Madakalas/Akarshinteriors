"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { processSteps } from "@/data/content";
import { cn } from "@/lib/utils";

/** Compact horizontal steps (home page). */
export function ProcessSteps() {
  return (
    <ol className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
      {processSteps.map((s, i) => (
        <li key={s.n} className="relative flex flex-col items-center text-center">
          {i < processSteps.length - 1 && (
            <ArrowRight className="absolute -right-3 top-6 hidden size-4 text-gold-700 lg:block" aria-hidden />
          )}
          <span className="relative grid size-14 place-items-center rounded-full border-2 border-gold bg-white text-forest">
            <Icon name={s.icon} className="size-6" />
            <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-forest text-[0.65rem] font-bold text-gold">{s.n}</span>
          </span>
          <h3 className="mt-4 font-sans text-base font-bold">{s.title}</h3>
          <p className="mt-1 text-sm text-muted">{s.short}</p>
        </li>
      ))}
    </ol>
  );
}

/** Interactive timeline (process page). */
export function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const step = processSteps[active];
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <ol className="relative">
        <span className="absolute bottom-6 left-7 top-6 w-px bg-line" aria-hidden />
        <motion.span
          className="absolute bottom-6 left-7 top-6 w-px origin-top bg-gold"
          initial={false}
          animate={{ scaleY: active / (processSteps.length - 1) }}
          transition={{ duration: 0.5 }}
          aria-hidden
        />
        {processSteps.map((s, i) => (
          <li key={s.n}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-current={active === i ? "step" : undefined}
              className={cn(
                "relative flex w-full gap-5 rounded-2xl p-3 text-left transition-colors",
                active === i ? "bg-white shadow-[var(--shadow-card)]" : "hover:bg-white/60",
              )}
            >
              <span
                className={cn(
                  "relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-2 transition-colors",
                  i <= active ? "border-gold bg-forest text-gold" : "border-line bg-ivory text-forest",
                )}
              >
                <Icon name={s.icon} className="size-6" />
              </span>
              <span className="pt-1">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">Step {s.n}</span>
                <span className="block font-serif text-xl text-forest">{s.title}</span>
                <span className={cn("block text-sm text-muted transition-all", active === i ? "mt-1" : "line-clamp-1")}>{s.text}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div className="relative min-h-[320px] overflow-hidden rounded-[24px] lg:sticky lg:top-28 lg:h-[560px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.n}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image src={step.image} alt={step.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <span className="font-serif text-6xl text-gold/80">0{step.n}</span>
              <h3 className="mt-2 text-3xl text-ivory">{step.title}</h3>
              <p className="mt-2 max-w-md text-ivory/80">{step.text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
