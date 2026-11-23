"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  src: string;
  alt: string;
  project: string;
  href: string;
}

const words = ["Design.", "Build.", "Transform."];
const DURATION = 6500;

export function HomeHero({ slides }: { slides: HeroSlide[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const paused = hovered || hidden;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);

  // Auto-advance; pauses on hover, when the tab is hidden, and for reduced motion.
  useEffect(() => {
    if (reduce || paused || slides.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, reduce, slides.length]);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const slide = slides[index];

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-forest lg:min-h-[calc(100svh-88px)]"
      aria-roledescription="carousel"
      aria-label="Featured designs"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: DURATION / 1000 + 1.5, ease: "linear" }}
            >
              <Image src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="100vw" className="object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest via-forest/80 to-forest/10" />
      <div className="absolute inset-0 -z-10 bg-forest/45 lg:hidden" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />

      <div className="container-x pb-36 pt-16 lg:pb-40">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow eyebrow-dark mb-6"
        >
          Beautiful Homes, Thoughtfully Designed
        </motion.p>
        <h1 className="font-serif text-[3.4rem] leading-[0.98] text-ivory sm:text-7xl lg:text-[6.2rem]">
          {words.map((w, i) => (
            <span key={w} className="-mb-[0.14em] block overflow-hidden pb-[0.2em]">
              <motion.span
                className={i === 2 ? "block italic text-gold" : "block"}
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/80 sm:text-xl">
            From modular kitchens to complete home interiors, we create functional, elegant spaces designed around your lifestyle.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/contact" size="lg" arrow>
              Get Free Quote
            </Button>
            <Button href="/projects" variant="outline-light" size="lg" icon={<PlayCircle className="size-5" aria-hidden />}>
              Explore Our Works
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Slide caption + progress */}
      {slides.length > 1 && (
        <div className="absolute bottom-28 right-0 hidden w-full lg:block" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <div className="container-x flex items-end justify-end gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.href}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href={slide.href}
                  className="group flex items-center gap-3 rounded-full border border-ivory/20 bg-forest/40 py-2 pl-4 pr-2 text-sm text-ivory backdrop-blur hover:border-gold"
                >
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-gold">Now showing · 3D design</span>
                    {slide.project}
                  </span>
                  <span className="grid size-8 place-items-center rounded-full bg-gold text-forest transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </Link>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-2 pb-4" role="tablist" aria-label="Choose slide">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show ${s.project}`}
                  onClick={() => setIndex(i)}
                  className="relative h-1 w-10 overflow-hidden rounded-full bg-ivory/25"
                >
                  <span
                    key={i === index ? `active-${index}` : `idle-${i}`}
                    className={cn("absolute inset-y-0 left-0 rounded-full bg-gold", i < index && "w-full")}
                    style={
                      i === index && !reduce
                        ? { animation: `hero-progress ${DURATION}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }
                        : i === index
                          ? { width: "100%" }
                          : undefined
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <a
        href="#highlights"
        className="absolute bottom-28 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-ivory/60 hover:text-gold xl:flex"
      >
        Scroll
        <ChevronDown className="size-4 animate-bounce motion-reduce:animate-none" aria-hidden />
      </a>
    </section>
  );
}
