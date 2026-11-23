"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MapPinned } from "lucide-react";
import { CityCard } from "@/components/sections/CityCard";
import { Reveal } from "@/components/ui/Reveal";
import { REGIONS, SERVICE_AREA } from "@/data/locations";
import type { Location } from "@/lib/types";
import { MapAttribution, ServiceAreaMap } from "./ServiceAreaMap";

/** Map + city cards (grouped by region), kept in sync: hovering a card highlights its pin and vice versa. */
export function LocationsExplorer({
  locations,
  intro,
  mapFirst = false,
}: {
  locations: Location[];
  /** Optional content shown beside the map (heading, text, perks). */
  intro?: React.ReactNode;
  mapFirst?: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);
  const cities = locations.map((l) => ({ slug: l.slug, city: l.city, intro: l.intro, state: l.state, region: l.region }));
  const groups = REGIONS.map((r) => ({ region: r, items: locations.filter((l) => l.region === r) })).filter((g) => g.items.length);

  return (
    <div>
      <div className={intro ? "grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14" : ""}>
        {intro && <div className={mapFirst ? "lg:order-2" : ""}>{intro}</div>}
        <Reveal>
          <ServiceAreaMap cities={cities} active={active} onActiveChange={setActive} />
          <MapAttribution />
        </Reveal>
      </div>

      <div className="mt-12 grid gap-12">
        {groups.map((g) => (
          <div key={g.region}>
            <Reveal className="mb-5 flex items-center gap-3">
              <h3 className="text-xl sm:text-2xl">{g.region === "Telangana" ? "Hyderabad, Telangana" : `${g.region}, Andhra Pradesh`}</h3>
              <span className="h-px flex-1 bg-line" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {g.items.length} {g.items.length === 1 ? "city" : "cities"}
              </span>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((l, i) => (
                <Reveal key={l.slug} delay={(i % 3) * 0.08}>
                  <div onMouseEnter={() => setActive(l.slug)} onFocusCapture={() => setActive(l.slug)} className="h-full">
                    <CityCard location={l} active={active === l.slug} />
                  </div>
                </Reveal>
              ))}
              {g.region === "Telangana" && (
                <Reveal delay={0.08} className="sm:col-span-1 lg:col-span-2">
                  <AnyTownCard />
                </Reveal>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Makes clear that the listed cities are examples, not limits. */
function AnyTownCard() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] bg-forest p-7 text-ivory sm:p-9">
      <div className="absolute -right-16 -top-16 size-64 rounded-full bg-gold/10" aria-hidden />
      <div className="relative">
        <span className="grid size-12 place-items-center rounded-2xl bg-gold text-forest">
          <MapPinned className="size-6" strokeWidth={1.6} aria-hidden />
        </span>
        <h3 className="mt-5 text-2xl text-ivory sm:text-3xl">Don&apos;t see your town?</h3>
        <p className="mt-3 max-w-lg text-ivory/75">
          We take up projects in {SERVICE_AREA.long} — every district, not just the cities listed here. Tell us where your home is
          and we&apos;ll plan a site visit.
        </p>
      </div>
      <div className="relative mt-6 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-semibold text-forest transition hover:bg-gold-300 active:scale-[0.97]"
        >
          Book a site visit <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
