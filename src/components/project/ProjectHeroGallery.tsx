"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { ProjectMedia } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  images: ProjectMedia[];
  badge?: React.ReactNode;
  /** How many photos sit in the side column (desktop). */
  slots?: number;
}

/**
 * Project hero: one large image plus a column of thumbnails.
 * Clicking a thumbnail swaps it into the main image (and the previous main image takes its place).
 */
export function ProjectHeroGallery({ images, badge, slots = 3 }: Props) {
  const reduce = useReducedMotion();
  // order[0] is the main image, order[1..slots] are the side thumbnails
  const [order, setOrder] = useState(() => images.slice(0, slots + 1).map((_, i) => i));
  const main = images[order[0]];
  const extra = images.length - (slots + 1);

  const swap = (slot: number) =>
    setOrder((o) => {
      const next = [...o];
      [next[0], next[slot]] = [next[slot], next[0]];
      return next;
    });

  // Mobile strip: every photo, tapping one makes it the main image.
  const show = (idx: number) =>
    setOrder((o) => {
      const at = o.indexOf(idx);
      if (at > 0) {
        const next = [...o];
        [next[0], next[at]] = [next[at], next[0]];
        return next;
      }
      return at === 0 ? o : [idx, ...o.slice(1)];
    });

  if (!main) return null;

  return (
    <div>
      <div className="grid gap-3 lg:grid-cols-[3fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-forest/10 lg:aspect-auto lg:h-[560px]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={main.id}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={main.url} alt={main.altText} fill priority sizes="(min-width: 1024px) 75vw, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          {badge}
          <span className="absolute bottom-4 right-4 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur" aria-live="polite">
            {order[0] + 1} / {images.length}
          </span>
        </div>

        {/* Desktop: side thumbnails */}
        <div className="hidden gap-3 lg:grid lg:grid-rows-4">
          {order.slice(1).map((idx, i) => {
            const m = images[idx];
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => swap(i + 1)}
                aria-label={`Show ${m.altText} as the main image`}
                className="group relative overflow-hidden rounded-2xl outline-none ring-gold transition focus-visible:ring-4"
              >
                <Image src={m.url} alt="" fill sizes="25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-forest/0 transition-colors group-hover:bg-forest/15" />
              </button>
            );
          })}
          <a href="#gallery" className="grid place-items-center rounded-2xl bg-forest text-center text-ivory transition-colors hover:bg-forest-700">
            <span>
              <span className="block font-serif text-3xl text-gold">{extra > 0 ? `+${extra}` : images.length}</span>
              <span className="text-xs uppercase tracking-[0.16em]">{extra > 0 ? "More Photos" : "Photos"}</span>
            </span>
          </a>
        </div>
      </div>

      {/* Mobile: scrollable strip of every photo */}
      <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 lg:hidden">
        {images.map((m, idx) => (
          <button
            key={m.id}
            type="button"
            onClick={() => show(idx)}
            aria-label={`Show ${m.altText}`}
            aria-current={order[0] === idx}
            className={cn(
              "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl transition",
              order[0] === idx ? "ring-2 ring-gold ring-offset-2 ring-offset-beige-200" : "opacity-80",
            )}
          >
            <Image src={m.url} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
