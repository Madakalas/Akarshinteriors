"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, ExternalLink, Flame, Heart, Search, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";
import { FINISH_FILTERS, finishes, isTile, type Finish } from "@/data/finishes";
import { FluteBoard } from "./FluteBoard";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type Key = keyof typeof FINISH_FILTERS;
type Selected = Record<Key, string[]>;

const GROUPS: { key: Key; label: string }[] = [
  { key: "collection", label: "Collection" },
  { key: "product", label: "Product" },
  { key: "family", label: "Decor Family" },
  { key: "finish", label: "Finish" },
];

const KINDS = [
  { id: "all", label: "All" },
  { id: "laminates", label: "Laminates" },
  { id: "tiles", label: "Tiles" },
] as const;
type Kind = (typeof KINDS)[number]["id"];

const SORTS = {
  featured: "Featured",
  "name-asc": "Name, A–Z",
  "name-desc": "Name, Z–A",
  code: "Code",
} as const;
type Sort = keyof typeof SORTS;

/** Close-up of the laminate as it appears in the PDF design presentation. */
function Swatch({ f, variant, className }: { f: Finish; variant?: string; className?: string }) {
  return (
    <span className={cn("relative block", className)}>
      {f.board && !f.image && <FluteBoard code={f.code} board={f.board} className="size-full" />}
      {f.image && (
        <Image
          src={f.image}
          alt={`${f.name} laminate – from the ${f.seenIn?.title ?? ""} design presentation`}
          fill
          sizes="(min-width:1280px) 20vw, (min-width:640px) 33vw, 50vw"
          className={variant === "detail" ? "object-contain" : "object-cover"}
        />
      )}
    </span>
  );
}

const EMPTY: Selected = { collection: [], product: [], family: [], finish: [] };
const STORE = "akarsh-finish-shortlist";

export function FinishCatalogue() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState<Selected>(EMPTY);
  const [sort, setSort] = useState<Sort>("featured");
  const [open, setOpen] = useState<Record<Key, boolean>>({ collection: true, product: true, family: false, finish: false });
  const [drawer, setDrawer] = useState(false);
  const [active, setActive] = useState<Finish | null>(null);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [limit, setLimit] = useState(24);
  const [onlyTrending, setOnlyTrending] = useState(false);
  const [kind, setKind] = useState<Kind>("all");

  // Shortlist is a per-visitor convenience, so browser storage is fine (and optional).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) ?? "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore once after hydration
      if (Array.isArray(saved)) setShortlist(saved.filter((c) => finishes.some((f) => f.code === c)));
    } catch {}
  }, []);
  const toggleShort = (code: string) =>
    setShortlist((s) => {
      const next = s.includes(code) ? s.filter((c) => c !== code) : [...s, code];
      try {
        localStorage.setItem(STORE, JSON.stringify(next));
      } catch {}
      return next;
    });

  const q = query.trim().toLowerCase();
  const matches = (f: Finish, skip?: Key) =>
    (kind === "all" || (kind === "tiles") === isTile(f)) &&
    (!onlyTrending || !!f.trending) &&
    (!q || `${f.name} ${f.code} ${f.family} ${f.finish} ${f.product}`.toLowerCase().includes(q)) &&
    GROUPS.every(({ key }) => key === skip || !sel[key].length || sel[key].includes(f[key] ?? ""));

  const list = useMemo(() => {
    const r = finishes.filter((f) => matches(f));
    if (sort === "name-asc") r.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") r.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "code") r.sort((a, b) => a.code.localeCompare(b.code));
    if (sort === "featured")
      r.sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || Number(!!b.featured) - Number(!!a.featured) || Number(!!a.brand) - Number(!!b.brand));
    else r.sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned));
    return r;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, sel, sort, onlyTrending, kind]);

  const count = (key: Key, v: string) => finishes.filter((f) => f[key] === v && matches(f, key)).length;
  const toggle = (key: Key, v: string) => {
    setLimit(24);
    setSel((s) => ({ ...s, [key]: s[key].includes(v) ? s[key].filter((x) => x !== v) : [...s[key], v] }));
  };
  const chips = GROUPS.flatMap(({ key }) => sel[key].map((v) => ({ key, v })));
  const anyFilter = chips.length > 0 || onlyTrending;
  const clear = () => {
    setSel(EMPTY);
    setQuery("");
    setOnlyTrending(false);
    setKind("all");
  };

  const filters = (
    <div>
      {GROUPS.map(({ key, label }) => (
        <div key={key} className="border-t border-line py-4">
          <button
            type="button"
            onClick={() => setOpen((o) => ({ ...o, [key]: !o[key] }))}
            aria-expanded={open[key]}
            className="flex w-full items-center justify-between text-left font-bold text-forest"
          >
            {label}
            <span className={cn("grid size-7 place-items-center rounded-full transition", open[key] ? "bg-forest text-ivory" : "bg-beige-200 text-forest")}>
              <ChevronDown className={cn("size-4 transition-transform", open[key] && "rotate-180")} aria-hidden />
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open[key] && (
              <motion.ul
                initial={reduce ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduce ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                {(FINISH_FILTERS[key] as string[]).map((v) => {
                  const on = sel[key].includes(v);
                  const n = count(key, v);
                  if (n === 0 && !on && kind !== "all" && !finishes.some((f) => f[key] === v && (kind === "tiles") === isTile(f))) return null;
                  return (
                    <li key={v} className="pt-3">
                      <label className={cn("flex cursor-pointer items-center gap-3 text-[0.95rem]", n === 0 && !on && "opacity-40")}>
                        <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggle(key, v)} />
                        <span
                          className={cn(
                            "grid size-5 place-items-center rounded-[5px] border transition peer-focus-visible:ring-2 peer-focus-visible:ring-gold",
                            on ? "border-forest bg-forest text-ivory" : "border-line bg-white",
                          )}
                        >
                          {on && <Check className="size-3.5" strokeWidth={3} aria-hidden />}
                        </span>
                        <span className="flex-1 text-charcoal">{v}</span>
                        <span className="text-xs text-muted">{n}</span>
                      </label>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );

  const shortItems = finishes.filter((f) => shortlist.includes(f.code));
  const shortMsg = `Hi Akarsh Interiors, I've shortlisted these finishes:\n${shortItems.map((f) => `• ${f.name} – ${f.code}`).join("\n")}\nPlease share samples and details.`;

  return (
    <div>
      {/* Laminates / Tiles */}
      <div className="mb-8 flex justify-center">
        <div role="tablist" aria-label="Material type" className="inline-flex rounded-full border border-line bg-white p-1">
          {KINDS.map((k) => {
            const n = finishes.filter((f) => k.id === "all" || (k.id === "tiles") === isTile(f)).length;
            const on = kind === k.id;
            return (
              <button
                key={k.id}
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setKind(k.id);
                  setSel(EMPTY);
                  setLimit(24);
                }}
                className={cn("relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:px-7", on ? "text-ivory" : "text-forest hover:bg-beige-200")}
              >
                {on && <motion.span layoutId="kind-pill" className="absolute inset-0 rounded-full bg-forest" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="relative">
                  {k.label} <span className={cn("ml-1 text-xs", on ? "text-gold" : "text-muted")}>{n}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <label className="relative mx-auto block max-w-xl">
        <span className="sr-only">Search finishes</span>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLimit(24);
          }}
          placeholder="Search for…"
          className="w-full border-b-2 border-line bg-transparent pb-3 pr-10 font-sans text-2xl font-bold text-forest outline-none transition placeholder:text-muted/60 focus:border-gold-700 sm:text-[2rem]"
        />
        <Search className="absolute right-1 top-2 size-6 text-forest" aria-hidden />
      </label>

      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <p className="mb-4 flex items-center gap-2 font-semibold text-forest">
            <SlidersHorizontal className="size-4" aria-hidden /> Filters
          </p>
          {filters}
          {anyFilter && (
            <button onClick={clear} className="mt-2 text-sm font-semibold text-gold-700 underline-offset-4 hover:underline">
              Clear all filters
            </button>
          )}
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-forest lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden /> Filters
              {chips.length > 0 && <span className="grid size-5 place-items-center rounded-full bg-gold text-[0.7rem]">{chips.length}</span>}
            </button>
            <p className="text-sm text-muted" aria-live="polite">
              {list.length} {list.length === 1 ? "item" : "items"}
            </p>
            <label className="ml-auto flex items-center gap-2 text-sm">
              <span className="font-bold text-forest">Sort by:</span>
              <span className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="appearance-none rounded-full bg-beige-200 py-2 pl-3 pr-8 text-charcoal outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {Object.entries(SORTS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-forest" aria-hidden />
              </span>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(
              [
                [onlyTrending, setOnlyTrending, "Trending now", Flame],
              ] as const
            ).map(([on, set, label, I]) => (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  set(!on);
                  setLimit(24);
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition",
                  on ? "border-gold bg-gold text-forest" : "border-line bg-white text-forest hover:border-gold",
                )}
              >
                <I className="size-4" aria-hidden /> {label}
              </button>
            ))}
          </div>

          {chips.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map(({ key, v }) => (
                <button
                  key={key + v}
                  onClick={() => toggle(key, v)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-ivory"
                >
                  {v} <X className="size-3.5" aria-label="Remove filter" />
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <AnimatePresence initial={false} mode="popLayout">
              {list.slice(0, limit).map((f) => {
                const liked = shortlist.includes(f.code);
                return (
                  <motion.li
                    key={f.code}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="group relative"
                  >
                    <button type="button" onClick={() => setActive(f)} className="block w-full text-left" aria-label={`${f.name} – ${f.code}: view details`}>
                      <span className="relative block overflow-hidden rounded-xl bg-[#f0efed]">
                        <Swatch f={f} className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.05]" />
                        <span className="absolute left-2 top-2 flex flex-col items-start gap-1">
                          {f.pinned && <span className="rounded-full bg-forest px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-gold">Must-see</span>}
                          {f.trending && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-forest">
                              <Flame className="size-3" aria-hidden /> Trending
                            </span>
                          )}
                        </span>
                        {f.brand && (
                          <span className="absolute right-2 bottom-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-forest">
                            {f.brand}
                          </span>
                        )}
                        {f.image && (
                          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2.5 pb-2 pt-6 text-[0.65rem] font-semibold text-white">
                            From the {f.seenIn?.title} presentation
                          </span>
                        )}
                      </span>
                      <span className="mt-3 block text-[0.95rem] font-extrabold leading-snug text-forest">
                        {f.name} – {f.code}
                      </span>
                      <span className="mt-1 block text-sm text-muted">
                        {f.finish} · {f.product}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleShort(f.code)}
                      aria-pressed={liked}
                      aria-label={liked ? `Remove ${f.name} from shortlist` : `Shortlist ${f.name}`}
                      className={cn(
                        "absolute right-2 top-2 grid size-9 place-items-center rounded-full shadow-sm transition active:scale-90",
                        liked ? "bg-forest text-gold" : "bg-white/90 text-forest opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100",
                      )}
                    >
                      <Heart className={cn("size-4", liked && "fill-current")} aria-hidden />
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          {list.length === 0 && (
            <div className="rounded-2xl border border-dashed border-line p-10 text-center">
              <p className="text-muted">No finishes match your search.</p>
              <button onClick={clear} className="mt-3 font-semibold text-forest underline">
                Clear search and filters
              </button>
            </div>
          )}
          {list.length > limit && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setLimit((l) => l + 24)}
                className="inline-flex h-12 items-center rounded-full border border-forest/25 px-6 font-semibold text-forest transition hover:bg-forest hover:text-ivory"
              >
                Load more ({list.length - limit} more)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <Dialog.Root open={drawer} onOpenChange={setDrawer}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-forest/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-[61] flex w-[min(340px,88vw)] flex-col bg-ivory shadow-2xl" aria-describedby={undefined}>
            <div className="flex items-center justify-between p-5">
              <Dialog.Title className="flex items-center gap-2 text-xl">
                <SlidersHorizontal className="size-5" aria-hidden /> Filters
              </Dialog.Title>
              <Dialog.Close className="grid size-10 place-items-center rounded-full bg-beige-200" aria-label="Close filters">
                <X className="size-5" />
              </Dialog.Close>
            </div>
            <div className="flex-1 overflow-y-auto px-5">{filters}</div>
            <div className="flex gap-3 border-t border-line p-5">
              <button onClick={clear} className="h-12 flex-1 rounded-full border border-line font-semibold text-forest">
                Clear
              </button>
              <Dialog.Close className="h-12 flex-[2] rounded-full bg-forest font-semibold text-ivory">Show {list.length} items</Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Detail */}
      <Dialog.Root open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-forest/60 backdrop-blur-sm" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed inset-x-0 bottom-0 z-[61] max-h-[90vh] overflow-y-auto rounded-t-3xl bg-ivory shadow-2xl outline-none sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[min(860px,calc(100vw-2rem))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
          >
            {active && (
              <div className="grid sm:grid-cols-2">
                <div className="bg-[#f0efed] sm:rounded-l-3xl">
                  <Swatch f={active} variant="detail" className="aspect-square w-full" />
                </div>
                <div className="relative p-6 sm:p-8">
                  <Dialog.Close className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-beige-200 text-forest hover:bg-gold" aria-label="Close">
                    <X className="size-5" />
                  </Dialog.Close>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{active.product}</p>
                  <Dialog.Title className="mt-2 pr-10 text-3xl">{active.name}</Dialog.Title>
                  <p className="mt-1 font-mono text-sm text-muted">{active.code}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    {[
                      ...(active.brand ? [["Brand", active.brand]] : []),
                      ...(active.profile ? [["Flute profile", active.profile]] : []),
                      ["Decor family", active.family],
                      ["Finish", active.finish],
                      ...(isTile(active) ? [] : [["Typical thickness", active.thickness], ["Sheet size", active.size]]),
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{k}</dt>
                        <dd className="font-semibold text-forest">{v}</dd>
                      </div>
                    ))}
                    <div className="col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Suitable for</dt>
                      <dd className="font-semibold text-forest">{active.uses.join(" · ")}</dd>
                    </div>
                    {active.seenIn && (
                      <div className="col-span-2">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-muted">From the design presentation</dt>
                        <dd>
                          <Link href={`/projects/${active.seenIn.slug}`} className="font-semibold text-gold-700 underline-offset-4 hover:underline">
                            {active.seenIn.title} →
                          </Link>
                        </dd>
                      </div>
                    )}
                    {active.sourceUrl && (
                      <div className="col-span-2">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Official product page</dt>
                        <dd>
                          <a href={active.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-gold-700 underline-offset-4 hover:underline">
                            View {active.name} {active.code} on {active.brand} <ExternalLink className="size-3.5" aria-hidden />
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={whatsappLink(`Hi Akarsh Interiors, I'm interested in ${active.name} – ${active.code}. Please share a sample and details.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1a7a43] px-5 font-semibold text-white transition hover:bg-[#145f34]"
                    >
                      <WhatsAppGlyph className="size-5" /> Enquire
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleShort(active.code)}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-forest/25 px-5 font-semibold text-forest transition hover:border-forest"
                    >
                      <Heart className={cn("size-4", shortlist.includes(active.code) && "fill-current text-gold-700")} aria-hidden />
                      {shortlist.includes(active.code) ? "Shortlisted" : "Add to shortlist"}
                    </button>
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-muted">
                    {active.board
                      ? `Drawn preview for colour reference — see the official ${active.brand} page for the exact shade.`
                      : "Close-up from the 3D design presentation, for colour reference — actual shades and textures vary."} We show physical samples during material
                    selection; brand and exact shade code are confirmed in your quotation.
                  </p>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Shortlist bar */}
      <AnimatePresence>
        {shortItems.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed inset-x-3 bottom-[calc(72px+env(safe-area-inset-bottom))] z-40 mx-auto flex max-w-xl items-center gap-3 rounded-full bg-forest p-2 pl-5 text-ivory shadow-2xl sm:bottom-6"
          >
            <Heart className="size-4 shrink-0 fill-gold text-gold" aria-hidden />
            <span className="flex-1 truncate text-sm font-semibold">
              {shortItems.length} {shortItems.length === 1 ? "finish" : "finishes"} shortlisted
            </span>
            <button onClick={() => { setShortlist([]); try { localStorage.removeItem(STORE); } catch {} }} className="hidden px-2 text-xs text-ivory/70 hover:text-ivory sm:block">
              Clear
            </button>
            <a
              href={whatsappLink(shortMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-gold px-4 text-sm font-semibold text-forest hover:bg-gold-300"
            >
              <WhatsAppGlyph className="size-4" /> Send list
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
