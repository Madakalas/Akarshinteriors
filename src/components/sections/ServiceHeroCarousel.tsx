"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Service hero carousel: large slide + thumbnail strip.
 * Clicking a thumbnail opens it in the main slide; arrows, swipe and ←/→ keys also navigate.
 * Auto-advances gently, pausing on hover/focus and when the visitor prefers reduced motion.
 */
export function ServiceHeroCarousel({ images, title, interval = 5000 }: { images: string[]; title: string; interval?: number }) {
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const stripRef = useRef<HTMLUListElement>(null);
  const n = images.length;

  const go = (next: number, d?: number) => setState(([cur]) => [((next % n) + n) % n, d ?? (next > cur ? 1 : -1)]);
  const step = (d: number) => setState(([cur]) => [(((cur + d) % n) + n) % n, d]);

  // auto-advance
  useEffect(() => {
    if (reduce || paused || n < 2) return;
    const t = setTimeout(() => step(1), interval);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, reduce, n, interval]);

  // keep the active thumbnail in view
  useEffect(() => {
    const el = stripRef.current?.children[index] as HTMLElement | undefined;
    const strip = stripRef.current;
    if (el && strip) strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }, [index, reduce]);

  if (!n) return null;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} photos`}
    >
      <div className="group relative aspect-[4/3] overflow-hidden rounded-[24px] bg-forest/10 shadow-[var(--shadow-lift)]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            custom={dir}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            initial={reduce ? { opacity: 0 } : { x: dir >= 0 ? "100%" : "-100%", opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { x: dir >= 0 ? "-30%" : "30%", opacity: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            drag={n > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 || info.velocity.x < -400) step(1);
              else if (info.offset.x > 60 || info.velocity.x > 400) step(-1);
            }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${n}`}
          >
            <Image
              src={images[index]}
              alt={`${title} — design ${index + 1}`}
              fill
              priority={index === 0}
              draggable={false}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="pointer-events-none select-none object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {n > 1 && (
          <>
            {(
              [
                [-1, "Previous photo", ChevronLeft, "left-3"],
                [1, "Next photo", ChevronRight, "right-3"],
              ] as const
            ).map(([d, label, Icon, pos]) => (
              <button
                key={label}
                type="button"
                onClick={() => step(d)}
                aria-label={label}
                className={cn(
                  "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-forest shadow-md backdrop-blur transition hover:bg-gold active:scale-90 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100",
                  pos,
                )}
              >
                <Icon className="size-5" aria-hidden />
              </button>
            ))}
            <span className="absolute bottom-4 right-4 z-10 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur" aria-live="polite">
              {index + 1} / {n}
            </span>
            {/* progress bar for auto-play */}
            {!reduce && !paused && (
              <motion.span
                key={`p${index}`}
                className="absolute bottom-0 left-0 z-10 h-1 bg-gold"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: interval / 1000, ease: "linear" }}
              />
            )}
          </>
        )}
      </div>

      {n > 1 && (
        <ul ref={stripRef} className="no-scrollbar relative mt-3 flex snap-x gap-3 overflow-x-auto scroll-smooth pb-1">
          {images.map((g, i) => (
            <li key={g} className="w-[calc((100%-2.25rem)/4)] shrink-0 snap-start">
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "relative block aspect-[4/3] w-full overflow-hidden rounded-xl outline-none transition focus-visible:ring-4 focus-visible:ring-gold",
                  i === index ? "ring-2 ring-gold ring-offset-2 ring-offset-beige-200" : "opacity-75 hover:opacity-100",
                )}
              >
                <Image src={g} alt="" fill sizes="15vw" className="object-cover transition-transform duration-500 hover:scale-105" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
