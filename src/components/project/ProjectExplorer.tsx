"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Project, RoomKey } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

const PAGE = 6;

const NAMED_TYPES = ["2 BHK", "3 BHK", "4 BHK", "Villa"];
const typeLabel: Record<string, string> = { Villa: "Villas" };

const roomFilters: { value: "all" | RoomKey; label: string }[] = [
  { value: "all", label: "All Rooms" },
  { value: "living-room", label: "Living Room" },
  { value: "kitchen", label: "Kitchen" },
  { value: "bedroom", label: "Bedroom" },
  { value: "wardrobe", label: "Wardrobe" },
  { value: "tv-unit", label: "TV Unit" },
  { value: "pooja", label: "Pooja Room" },
  { value: "dining", label: "Dining" },
];

interface Props {
  projects: Project[];
  cities: { slug: string; city: string }[];
}

export function ProjectExplorer({ projects, cities }: Props) {
  const [property, setProperty] = useState("all");
  const [room, setRoom] = useState("all");
  const [city, setCity] = useState("all");
  const [style, setStyle] = useState("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);

  // Only offer property types that exist in the data.
  const propertyFilters = useMemo(() => {
    const present = new Set(projects.map((p) => p.propertyType));
    return [
      { value: "all", label: "All" },
      ...NAMED_TYPES.filter((t) => present.has(t as Project["propertyType"])).map((t) => ({ value: t, label: typeLabel[t] ?? t })),
      ...(projects.some((p) => !NAMED_TYPES.includes(p.propertyType)) ? [{ value: "other", label: "Other Homes" }] : []),
    ];
  }, [projects]);

  const styles = useMemo(() => Array.from(new Set(projects.map((p) => p.style).filter(Boolean))) as string[], [projects]);

  // Read filters from the URL (e.g. links from "Explore by Room" and city pages).
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from URL */
    if (qs.get("room")) setRoom(qs.get("room")!);
    if (qs.get("city")) setCity(qs.get("city")!);
    if (qs.get("type")) setProperty(qs.get("type")!);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Keep the URL shareable.
  useEffect(() => {
    const qs = new URLSearchParams();
    if (room !== "all") qs.set("room", room);
    if (city !== "all") qs.set("city", city);
    if (property !== "all") qs.set("type", property);
    const next = qs.toString() ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", next);
  }, [room, city, property]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (property !== "all") {
        if (property === "other" ? NAMED_TYPES.includes(p.propertyType) : p.propertyType !== property) return false;
      }
      if (room !== "all" && !p.rooms.includes(room as RoomKey)) return false;
      if (city !== "all" && p.city !== city) return false;
      if (style !== "all" && p.style !== style) return false;
      if (q) {
        const hay = `${p.title} ${p.category} ${p.city ?? ""} ${p.propertyType} ${p.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [projects, property, room, city, style, query]);

  const active = property !== "all" || room !== "all" || city !== "all" || style !== "all" || query !== "";
  const reset = () => {
    setProperty("all");
    setRoom("all");
    setCity("all");
    setStyle("all");
    setQuery("");
  };

  return (
    <div>
      <div className="card mb-10 grid grid-cols-[minmax(0,1fr)] gap-5 p-4 sm:p-6">
        <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Chips label="Property type" options={propertyFilters} value={property} onChange={(v) => { setProperty(v); setVisible(PAGE); }} />
          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <label htmlFor="project-search" className="sr-only">Search projects</label>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisible(PAGE); }}
              placeholder="Search projects"
              className="field rounded-full pl-11"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-line pt-5 md:flex-row md:items-center">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
            <SlidersHorizontal className="size-3.5" aria-hidden /> Refine
          </span>
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Select label="Room" value={room} onChange={(v) => { setRoom(v); setVisible(PAGE); }} options={roomFilters} />
            <Select
              label="City"
              value={city}
              onChange={(v) => { setCity(v); setVisible(PAGE); }}
              options={[{ value: "all", label: "All Cities" }, ...cities.map((c) => ({ value: c.slug, label: c.city }))]}
            />
            {styles.length > 0 ? (
              <Select
                label="Style"
                value={style}
                onChange={setStyle}
                options={[{ value: "all", label: "All Styles" }, ...styles.map((s) => ({ value: s, label: s }))]}
              />
            ) : null}
          </div>
          {active && (
            <button type="button" onClick={reset} className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-gold-700 hover:text-forest md:ml-auto md:self-center">
              <X className="size-4" aria-hidden /> Clear filters
            </button>
          )}
        </div>
      </div>

      <p className="mb-5 text-sm text-muted" aria-live="polite">
        Showing {Math.min(visible, filtered.length)} of {filtered.length} project{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title="No projects match these filters"
          text="Try a different room or city, or clear the filters to see all our work."
          action={
            <button type="button" onClick={reset} className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory">
              Clear filters
            </button>
          }
        />
      ) : (
        <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.slice(0, visible).map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard project={p} priority={i < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {visible < filtered.length && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="inline-flex h-12 items-center rounded-full border border-forest/25 px-8 font-semibold text-forest hover:bg-forest hover:text-ivory"
          >
            Load more projects
          </button>
        </div>
      )}
    </div>
  );
}

function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "relative h-10 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors",
            value === o.value ? "text-ivory" : "border border-line text-forest hover:border-forest",
          )}
        >
          {value === o.value && <motion.span layoutId={`chip-${label}`} className="absolute inset-0 -z-0 rounded-full bg-forest" />}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block w-full sm:w-60">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field h-11 py-0">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
