"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowRight, Map as MapIcon, MapPin, Navigation } from "lucide-react";
import { apDistricts, apOutline, cityPoints, contextCities, hyderabadArea, MAP_SIZE, neighbourStates, project, serviceTowns } from "@/data/ap-map";
import { cn } from "@/lib/utils";

export interface MapCity {
  slug: string;
  city: string;
  intro: string;
  state?: string;
  region?: string;
}

type View = "all" | "Rayalaseema" | "Coastal Andhra" | "Telangana";
const VIEWS: { id: View; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Rayalaseema", label: "Rayalaseema" },
  { id: "Coastal Andhra", label: "Coastal Andhra" },
  { id: "Telangana", label: "Hyderabad" },
];

/** Where a pin's name tag sits, for pins that would otherwise overlap a neighbour. */
const LABEL_SIDE: Record<string, "left" | "below"> = { guntur: "left", kadapa: "below" };

interface Props {
  cities: MapCity[];
  /** Zoom to a single city (city pages). */
  focus?: string;
  /** Controlled highlight, e.g. synced with city cards. */
  active?: string | null;
  onActiveChange?: (slug: string | null) => void;
  variant?: "light" | "dark";
  className?: string;
  /** Hide the floating city panel (small embeds). */
  compact?: boolean;
}

const ASPECT = MAP_SIZE.width / MAP_SIZE.height;

function boxAround(xs: number[], ys: number[], pad: number, minW = 0) {
  const x0 = Math.min(...xs) - pad;
  const x1 = Math.max(...xs) + pad;
  const y0 = Math.min(...ys) - pad;
  const y1 = Math.max(...ys) + pad;
  let w = Math.max(x1 - x0, minW, (y1 - y0) * ASPECT);
  w = Math.min(w, MAP_SIZE.width);
  const h = w / ASPECT;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const x = Math.min(Math.max(cx - w / 2, 0), MAP_SIZE.width - w);
  const y = Math.min(Math.max(cy - h / 2, 0), MAP_SIZE.height - h);
  return { x, y, w, h };
}

const REGION_LABELS: { text: string; x: number; y: number; sea?: boolean }[] = [
  { text: "TELANGANA", ...project(79.1, 18.15) },
  { text: "KARNATAKA", ...project(77.0, 12.75) },
  { text: "TAMIL NADU", ...project(79.4, 12.6) },
  { text: "ODISHA", ...project(83.1, 19.3) },
  { text: "Bay of Bengal", ...project(83.0, 15.0), sea: true },
];
const STATE_LABEL = project(80.9, 15.25);
/** Town names drawn to the left of their dot to avoid a neighbour. */
const TOWN_LEFT = new Set(["Rajahmundry", "Proddatur", "Hindupur"]);

export function ServiceAreaMap({
  cities,
  focus,
  active: activeProp,
  onActiveChange,
  variant = "light",
  className,
  compact,
}: Props) {
  const reduce = useReducedMotion();
  const uid = useId();
  const [view, setView] = useState<View>("all");
  const [internalActive, setInternalActive] = useState<string | null>(focus ?? null);
  const active = activeProp !== undefined ? activeProp : internalActive;
  const setActive = (slug: string | null) => {
    if (activeProp === undefined) setInternalActive(slug);
    onActiveChange?.(slug);
  };

  const pts = cities.map((c) => ({ ...c, ...cityPoints[c.slug] })).filter((c) => c.x !== undefined);

  const box = useMemo(() => {
    if (focus && cityPoints[focus]) {
      const p = cityPoints[focus];
      return boxAround([p.x], [p.y], 0, 360);
    }
    const inView = pts.filter((p) => p.region === view);
    if (view !== "all" && inView.length) return boxAround(inView.map((p) => p.x), inView.map((p) => p.y), 130, 360);
    return { x: 0, y: 0, w: MAP_SIZE.width, h: MAP_SIZE.height };
  }, [focus, view, pts]);

  // Keep pins and labels a constant on-screen size while zooming.
  const k = box.w / MAP_SIZE.width;
  const dark = variant === "dark";
  const activeCity = pts.find((p) => p.slug === active) ?? null;
  const views = VIEWS.filter((v) => v.id === "all" || pts.some((p) => p.region === v.id));
  const gmaps = (c: MapCity) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.city}, ${c.state ?? "Andhra Pradesh"}`)}`;

  const transition = reduce ? { duration: 0 } : { duration: 1, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[24px] border",
        dark ? "border-ivory/10 bg-forest-700" : "border-line bg-[#f4efe6]",
        className,
      )}
    >
      {/* subtle dotted backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(${dark ? "rgba(248,245,239,.08)" : "rgba(16,45,39,.08)"} 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />

      <motion.svg
        viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
        animate={{ viewBox: `${box.x} ${box.y} ${box.w} ${box.h}` }}
        initial={false}
        transition={transition}
        className="relative block h-auto w-full"
        role="group"
        aria-labelledby={`${uid}-title ${uid}-desc`}
      >
        <title id={`${uid}-title`}>Akarsh Interiors service area: Andhra Pradesh and Hyderabad</title>
        <desc id={`${uid}-desc`}>{`Map of Andhra Pradesh and Hyderabad. We serve the whole area; cities with their own page: ${cities.map((c) => c.city).join(", ")}.`}</desc>

        {/* Neighbouring states */}
        <g>
          {neighbourStates.map((s) => (
            <path
              key={s.name}
              d={s.d}
              fill={dark ? "rgba(248,245,239,0.03)" : "rgba(255,255,255,0.55)"}
              stroke={dark ? "rgba(248,245,239,0.14)" : "rgba(16,45,39,0.14)"}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* Andhra Pradesh */}
        <motion.path
          d={apOutline}
          initial={reduce ? false : { pathLength: 0, fillOpacity: 0 }}
          whileInView={{ pathLength: 1, fillOpacity: 1 }}
          viewport={{ once: true }}
          transition={reduce ? { duration: 0 } : { pathLength: { duration: 2.2, ease: "easeInOut" }, fillOpacity: { duration: 0.8, delay: 1.2 } }}
          fill={dark ? "#1f4a40" : "#ede3d5"}
          stroke="#D6AE73"
          strokeWidth={1.6}
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />

        {/* Service area tint: all of Andhra Pradesh + greater Hyderabad */}
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, delay: 1.5 }}
          fill={dark ? "rgba(214,174,115,0.2)" : "rgba(214,174,115,0.36)"}
        >
          <path d={apOutline} />
          <path d={hyderabadArea} stroke="#D6AE73" strokeWidth={1.4} strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="map-dash">
            <title>Greater Hyderabad</title>
          </path>
        </motion.g>

        {/* District lines */}
        <g>
          {apDistricts.map((d) => (
            <path
              key={d.name}
              d={d.d}
              fill="transparent"
              stroke={dark ? "rgba(248,245,239,0.18)" : "rgba(255,255,255,0.95)"}
              strokeWidth={0.8}
              vectorEffect="non-scaling-stroke"
              className="transition-[fill] duration-300"
            >
              <title>{`${d.name} district`}</title>
            </path>
          ))}
        </g>

        {/* Region labels */}
        <g style={{ pointerEvents: "none" }}>
          {REGION_LABELS.map((l) => (
            <text
              key={l.text}
              x={l.x}
              y={l.y}
              fontSize={13 * k * 1.6}
              letterSpacing={l.sea ? 0 : 3 * k}
              fontStyle={l.sea ? "italic" : "normal"}
              fill={dark ? "rgba(248,245,239,0.35)" : "rgba(16,45,39,0.32)"}
              fontFamily="var(--font-manrope)"
              fontWeight={600}
              textAnchor="middle"
            >
              {l.text}
            </text>
          ))}
          <text
            x={STATE_LABEL.x}
            y={STATE_LABEL.y}
            fontSize={17 * k * 1.6}
            fill={dark ? "rgba(214,174,115,0.85)" : "#8c6531"}
            fontFamily="var(--font-playfair)"
            textAnchor="middle"
          >
            Andhra Pradesh
          </text>
        </g>

        {/* Other towns we serve: dots, names once zoomed in */}
        <g style={{ pointerEvents: "none" }}>
          {serviceTowns.map((t) => (
            <g key={t.name} transform={`translate(${t.x} ${t.y})`}>
              <circle r={2.6 * k * 1.6} fill={dark ? "rgba(214,174,115,0.75)" : "rgba(140,101,49,0.7)"} />
              {k < 0.9 && (
                <text
                  x={(TOWN_LEFT.has(t.name) ? -6 : 6) * k * 1.6}
                  y={3.5 * k * 1.6}
                  textAnchor={TOWN_LEFT.has(t.name) ? "end" : "start"}
                  fontSize={10 * k * 1.6}
                  fill={dark ? "rgba(248,245,239,0.6)" : "rgba(16,45,39,0.6)"}
                  fontFamily="var(--font-manrope)"
                >
                  {t.name}
                </text>
              )}
            </g>
          ))}
        </g>

        {/* Reference cities outside the service area */}
        <g style={{ pointerEvents: "none" }}>
          {contextCities.map((c) => (
            <g key={c.name} transform={`translate(${c.x} ${c.y})`}>
              <circle r={3.2 * k * 1.6} fill={dark ? "rgba(248,245,239,0.45)" : "rgba(16,45,39,0.35)"} />
              <text x={7 * k * 1.6} y={4 * k * 1.6} fontSize={11 * k * 1.6} fill={dark ? "rgba(248,245,239,0.5)" : "rgba(16,45,39,0.5)"} fontFamily="var(--font-manrope)">
                {c.name}
              </text>
            </g>
          ))}
        </g>

        {/* Service city pins */}
        {pts.map((p, i) => {
          const isActive = active === p.slug;
          const s = k * 1.6 * (isActive ? 1.22 : 1);
          const labelW = p.city.length * 8.2 + 22;
          const side = LABEL_SIDE[p.slug];
          const labelPos = side === "left" ? `translate(${-16 - labelW} -38)` : side === "below" ? `translate(${-labelW / 2} 6)` : "translate(16 -38)";
          return (
            <g key={p.slug} transform={`translate(${p.x} ${p.y})`}>
              {!reduce && (
                <motion.circle
                  r={4}
                  fill="none"
                  stroke="#D6AE73"
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                  animate={{ r: [4 * k * 1.6, 26 * k * 1.6], opacity: [0.8, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
                />
              )}
              <motion.g
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={reduce ? { duration: 0 } : { delay: 1.4 + i * 0.18, type: "spring", stiffness: 260, damping: 18 }}
              >
                <motion.g animate={{ scale: s }} initial={false} transition={transition} style={{ originX: "50%", originY: "100%" }}>
                  <a
                    href={`/locations/${p.slug}`}
                    aria-label={`${p.city} — interior design services`}
                    onMouseEnter={() => setActive(p.slug)}
                    onFocus={() => setActive(p.slug)}
                    className="cursor-pointer outline-none"
                  >
                    <ellipse cx={0} cy={0} rx={7} ry={2.6} fill="rgba(0,0,0,0.22)" />
                    <path
                      d="M0,0 C-4,-6 -13,-14 -13,-24 A13,13 0 1 1 13,-24 C13,-14 4,-6 0,0 Z"
                      fill={isActive ? "#D6AE73" : "#102D27"}
                      stroke={isActive ? "#102D27" : "#D6AE73"}
                      strokeWidth={1.6}
                      className="transition-[fill] duration-300"
                    />
                    <circle cx={0} cy={-24} r={4.6} fill={isActive ? "#102D27" : "#D6AE73"} />
                    <g transform={labelPos}>
                      <rect
                        width={labelW}
                        height={22}
                        rx={11}
                        fill={isActive ? "#102D27" : dark ? "#F8F5EF" : "#FFFFFF"}
                        stroke={dark ? "transparent" : "rgba(16,45,39,0.12)"}
                      />
                      <text
                        x={labelW / 2}
                        y={15}
                        textAnchor="middle"
                        fontSize={12}
                        fontWeight={700}
                        fontFamily="var(--font-manrope)"
                        fill={isActive ? "#D6AE73" : "#102D27"}
                      >
                        {p.city}
                      </text>
                    </g>
                  </a>
                </motion.g>
              </motion.g>
            </g>
          );
        })}
      </motion.svg>

      {/* Region views */}
      {!focus && views.length > 1 && (
        <div className="no-scrollbar absolute inset-x-3 top-3 flex justify-end sm:left-auto">
          <div className="flex max-w-full overflow-x-auto rounded-full border border-line bg-white/90 p-1 text-xs font-semibold shadow-sm backdrop-blur">
            {views.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setView(v.id)}
                aria-pressed={view === v.id}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 transition-colors",
                  view === v.id ? "bg-forest text-ivory" : "text-forest hover:bg-beige-200",
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div
        className={cn(
          "pointer-events-none absolute left-3 hidden items-center gap-3 rounded-full px-3 py-1.5 text-[0.68rem] font-semibold backdrop-blur lg:flex",
          focus ? "top-3" : "top-14",
          dark ? "bg-forest/70 text-ivory/80" : "bg-white/80 text-forest/80",
        )}
      >
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3.5 text-gold-700" aria-hidden /> City page
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-gold/60" /> We serve: all of AP + Hyderabad
        </span>
      </div>

      {/* City panel */}
      {!compact && (
        <AnimatePresence mode="wait">
          {activeCity ? (
            <motion.div
              key={activeCity.slug}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-3 bottom-3 rounded-2xl border border-line bg-white/95 p-4 shadow-[var(--shadow-lift)] backdrop-blur sm:left-auto sm:right-3 sm:w-80"
            >
              <p className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gold-700">
                <MapPin className="size-3.5" aria-hidden /> We serve
              </p>
              <p className="mt-1 font-serif text-2xl text-forest">{activeCity.city}</p>
              <p className="mt-1 text-sm text-muted">{activeCity.intro}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {!focus && (
                  <Link
                    href={`/locations/${activeCity.slug}`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-forest px-4 text-xs font-semibold text-ivory hover:bg-forest-700"
                  >
                    Explore <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                )}
                <Link
                  href={`/contact?city=${activeCity.city}`}
                  className="inline-flex h-9 items-center rounded-full bg-gold px-4 text-xs font-semibold text-forest hover:bg-gold-300"
                >
                  Book site visit
                </Link>
                <a
                  href={gmaps(activeCity)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-semibold text-forest hover:border-forest"
                >
                  <Navigation className="size-3.5" aria-hidden /> Google Maps
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur",
                dark ? "bg-forest/70 text-ivory/80" : "bg-white/85 text-forest/80",
              )}
            >
              <MapIcon className="size-3.5" aria-hidden /> We serve every town in AP &amp; Hyderabad — tap a pin
            </motion.p>
          )}
        </AnimatePresence>
      )}

      <figcaption className="sr-only">Service area map</figcaption>
    </figure>
  );
}

export function MapAttribution({ dark }: { dark?: boolean }) {
  return (
    <p className={cn("mt-2 text-[0.68rem]", dark ? "text-ivory/45" : "text-muted/80")}>
      Map data:{" "}
      <a href="https://www.geoboundaries.org" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
        geoBoundaries
      </a>{" "}
      (DataMeet / ECI, CC BY 2.5 IN; districts ODbL). District lines are indicative.
    </p>
  );
}
