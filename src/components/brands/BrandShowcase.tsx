"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BrickWall,
  Cable,
  CookingPot,
  DoorOpen,
  Droplets,
  ExternalLink,
  GlassWater,
  Grip,
  Layers,
  LampCeiling,
  Lightbulb,
  PaintRoller,
  Search,
  ShowerHead,
  Sparkles,
  Star,
  ToggleRight,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { brandDirectory, getBrandCategories, type BrandCategory, type BrandInfo } from "@/data/brands";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  plywood: Layers,
  hardware: Wrench,
  handles: Grip,
  paints: PaintRoller,
  lighting: Lightbulb,
  wiring: Cable,
  ceiling: LampCeiling,
  glass: GlassWater,
  adhesives: Droplets,
  surfaces: Sparkles,
  "glass-doors": DoorOpen,
  switches: ToggleRight,
  laminates: Layers,
  "kitchen-appliances": CookingPot,
  bath: ShowerHead,
  tiles: BrickWall,
};

type Selected = { brand: BrandInfo; category: BrandCategory } | null;

export function BrandShowcase() {
  const categories = useMemo(() => getBrandCategories(), []);
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Selected>(null);
  const reduce = useReducedMotion();
  const topRef = useRef<HTMLDivElement>(null);

  // Keep the list in view when a filter shrinks it (otherwise you can end up at the footer).
  const choose = (id: string) => {
    setActive(id);
    const el = topRef.current;
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  const q = query.trim().toLowerCase();
  const visible = categories
    .filter((c) => active === "all" || c.id === active)
    .map((c) => ({
      category: c,
      brands: c.brands
        .map((id) => brandDirectory[id])
        .filter(Boolean)
        .filter((b) => !q || b.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.products.some((p) => p.toLowerCase().includes(q))),
    }))
    .filter((g) => g.brands.length > 0);

  const total = new Set(categories.flatMap((c) => c.brands)).size;

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Toolbar */}
      <div className="below-header sticky z-20 -mx-4 mb-10 border-y border-line bg-ivory/92 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative block lg:w-72 lg:shrink-0">
            <span className="sr-only">Search brands or products</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${total} brands or products…`}
              className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-4 text-sm text-charcoal outline-none transition focus:border-gold-700 focus:shadow-[0_0_0_3px_rgb(214_174_115/0.35)]"
            />
          </label>
          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1" role="tablist" aria-label="Material categories">
            {[{ id: "all", short: "All" }, ...categories].map((c) => {
              const on = active === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => choose(c.id)}
                  className={cn(
                    "relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    on ? "text-ivory" : "text-forest hover:bg-beige-200",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="brand-chip"
                      className="absolute inset-0 -z-0 rounded-full bg-forest"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{c.short}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid gap-14 lg:gap-20">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map(({ category: c, brands }) => {
            const I = icons[c.id] ?? Layers;
            const n = categories.indexOf(c) + 1;
            return (
              <motion.section
                key={c.id}
                layout={!reduce}
                id={`brands-${c.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                aria-labelledby={`brands-${c.id}-title`}
                className="scroll-mt-40 grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-12"
              >
                <header className="lg:sticky lg:top-44 lg:self-start">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl bg-forest text-gold">
                      <I className="size-5" strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="font-serif text-3xl text-gold-700">{String(n).padStart(2, "0")}</span>
                  </div>
                  <h3 id={`brands-${c.id}-title`} className="mt-4 text-2xl leading-tight sm:text-[1.75rem]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Products">
                    {c.products.map((p) => (
                      <li key={p} className="rounded-full bg-beige-200 px-2.5 py-1 text-xs font-medium text-forest">
                        {p}
                      </li>
                    ))}
                  </ul>
                  {c.specification && (
                    <p className="mt-4 rounded-2xl border border-gold/50 bg-gold/10 p-3.5 text-sm text-forest">
                      <span className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-gold-700">
                        <Star className="size-3.5 fill-current" aria-hidden /> Preferred specification
                      </span>
                      {c.specification}
                    </p>
                  )}
                  {c.note && <p className="mt-3 text-xs leading-relaxed text-muted">{c.note}</p>}
                </header>

                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  {brands.map((b, i) => {
                    const preferred = c.preferred?.includes(b.id);
                    return (
                      <motion.li
                        key={b.id}
                        initial={{ opacity: 0, y: 16, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : Math.min(i, 8) * 0.05 }}
                      >
                        <button
                          type="button"
                          onClick={() => setSelected({ brand: b, category: c })}
                          aria-label={`${b.name}${preferred ? " (preferred)" : ""} — view details`}
                          className={cn(
                            "group relative flex h-full min-h-[132px] w-full flex-col items-center justify-between gap-3 rounded-2xl border bg-white p-4 text-forest transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] focus-visible:-translate-y-1",
                            preferred ? "border-gold ring-1 ring-gold/60" : "border-line hover:border-gold",
                          )}
                        >
                          {preferred && (
                            <span className="absolute -top-2.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-gold px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-forest shadow-sm">
                              <Star className="size-3 fill-current" aria-hidden /> Preferred
                            </span>
                          )}
                          <span
                            className={cn(
                              "grid w-full flex-1 place-items-center rounded-xl px-2 py-3 transition duration-500",
                              b.darkLogo ? "bg-forest" : "",
                              b.logo && !b.darkLogo && "opacity-85 grayscale-[35%] group-hover:opacity-100 group-hover:grayscale-0",
                            )}
                          >
                            <BrandLogo brand={b} className={cn(b.darkLogo && "text-ivory", "transition-transform duration-500 group-hover:scale-105")} />
                          </span>
                          <span className="flex w-full items-center justify-between gap-2 border-t border-line pt-2.5 text-left">
                            <span className="truncate text-[0.8rem] font-semibold">{b.name}</span>
                            <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-gold-700 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                              Details
                            </span>
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.section>
            );
          })}
        </AnimatePresence>
        {visible.length === 0 && (
          <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
            No brands match “{query}”.{" "}
            <button className="font-semibold text-forest underline" onClick={() => setQuery("")}>
              Clear search
            </button>
          </p>
        )}
      </div>

      <BrandDialog selected={selected} onClose={() => setSelected(null)} categories={categories} />
    </div>
  );
}

function BrandDialog({ selected, onClose, categories }: { selected: Selected; onClose: () => void; categories: BrandCategory[] }) {
  const reduce = useReducedMotion();
  const b = selected?.brand;
  const inCats = b ? categories.filter((c) => c.brands.includes(b.id)) : [];
  const applications = [...new Set(inCats.flatMap((c) => c.applications))];
  const preferredIn = b ? inCats.filter((c) => c.preferred?.includes(b.id)) : [];

  return (
    <Dialog.Root open={!!selected} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {b && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[60] bg-forest/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <div
                className="fixed inset-0 z-[61] flex items-end justify-center outline-none sm:items-center sm:p-4"
                onClick={(e) => e.target === e.currentTarget && onClose()}
              >
              <motion.div
                className="max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-ivory shadow-2xl sm:w-[min(640px,100%)] sm:rounded-3xl"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={cn("relative grid place-items-center px-8 pb-8 pt-10", b.darkLogo ? "bg-forest" : "bg-white")}>
                  <span className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-line sm:hidden" aria-hidden />
                  <BrandLogo brand={b} size="lg" className={cn("max-w-[280px]", b.darkLogo ? "text-ivory" : "text-forest")} />
                  <Dialog.Close
                    className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-beige-200 text-forest transition hover:bg-gold"
                    aria-label="Close"
                  >
                    <X className="size-5" />
                  </Dialog.Close>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <Dialog.Title className="text-3xl">{b.name}</Dialog.Title>
                    {preferredIn.length > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-forest">
                        <Star className="size-3 fill-current" aria-hidden /> Our preferred choice
                      </span>
                    )}
                  </div>
                  <p className="mt-3 leading-relaxed text-muted">{b.description}</p>

                  <dl className="mt-6 grid gap-5 text-sm">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.12em] text-gold-700">Product categories</dt>
                      <dd className="mt-2 grid gap-2">
                        {inCats.map((c) => (
                          <div key={c.id} className="rounded-2xl border border-line bg-white p-3">
                            <p className="font-semibold text-forest">{c.title}</p>
                            <p className="mt-1 text-muted">{c.products.join(" · ")}</p>
                          </div>
                        ))}
                        {b.products && (
                          <div className="flex flex-wrap gap-1.5">
                            {b.products.map((p) => (
                              <span key={p} className="rounded-full bg-beige-200 px-2.5 py-1 text-xs font-medium text-forest">
                                {p}
                              </span>
                            ))}
                          </div>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.12em] text-gold-700">Where we use it</dt>
                      <dd className="mt-1.5 text-forest">{applications.join(" · ")}</dd>
                    </div>
                  </dl>

                  {b.needsConfirmation && <p className="mt-5 text-xs text-muted">{b.needsConfirmation}</p>}

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    {b.website && (
                      <a
                        href={b.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-forest px-6 font-semibold text-ivory transition hover:bg-forest-700 active:scale-[0.97]"
                      >
                        Visit official website <ExternalLink className="size-4" aria-hidden />
                      </a>
                    )}
                    <a
                      href={whatsappLink(`Hi Akarsh Interiors, I'd like to know more about using ${b.name} in my home.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center rounded-full border border-forest/25 px-6 font-semibold text-forest transition hover:border-forest hover:bg-forest hover:text-ivory active:scale-[0.97]"
                    >
                      Ask about this brand
                    </a>
                  </div>
                  <p className="mt-5 text-[0.7rem] leading-relaxed text-muted">
                    {b.name} and its logo are trademarks of their owner, shown to identify the brand. No official partnership is implied. Final
                    brand and specification are confirmed in your quotation.
                  </p>
                </div>
              </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
