import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Location } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Decorative arches — used only when a city has no photo. */
function ArchArt() {
  return (
    <svg viewBox="0 0 320 200" className="absolute inset-x-6 top-8 h-[60%] w-[calc(100%-3rem)] text-gold/50" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.3">
        <path d="M20 200V120a40 40 0 0 1 80 0v80" />
        <path d="M120 200V90a40 40 0 0 1 80 0v110" />
        <path d="M220 200V120a40 40 0 0 1 80 0v80" />
        <path d="M160 50v-22M150 36h20" />
        <circle cx="160" cy="58" r="6" />
      </g>
    </svg>
  );
}

export function CityCard({ location, active }: { location: Location; active?: boolean }) {
  const credit = location.coverCredit;
  return (
    <article
      className={cn(
        "group card relative flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        active && "-translate-y-1 shadow-[var(--shadow-lift)] ring-2 ring-gold",
      )}
    >
      <div className="img-zoom relative aspect-[16/10] overflow-hidden bg-forest">
        {location.coverImage ? (
          <Image src={location.coverImage} alt={location.coverCaption ?? location.city} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#2b5a4d_0%,#102d27_70%)]" />
            <ArchArt />
          </>
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 py-1.5 pl-3 pr-1.5 text-sm font-bold text-forest shadow-sm">
          {location.city}
          <span className="grid size-6 place-items-center rounded-full bg-gold transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </span>
        {location.coverCaption && (
          <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[0.65rem] font-medium text-white backdrop-blur">
            {location.coverCaption}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
          <MapPin className="size-3.5" aria-hidden /> {location.state}
        </p>
        <h3 className="mt-1.5 text-2xl">
          {/* Stretched link: the whole card opens the city page */}
          <Link href={`/locations/${location.slug}`} className="after:absolute after:inset-0 after:content-['']">
            Interiors in {location.city}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm text-muted">{location.intro}</p>
        <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-5">
          <Link
            href={`/locations/${location.slug}`}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-forest px-4 text-sm font-semibold text-ivory hover:bg-forest-700"
          >
            Explore <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href={`/contact?city=${location.city}`}
            className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm font-medium text-forest hover:border-forest"
          >
            Request Site Visit
          </Link>
        </div>
        {credit && (
          <p className="relative z-10 mt-4 text-[0.65rem] text-muted/80">
            Photo:{" "}
            <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {credit.author}
            </a>
            ,{" "}
            <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {credit.license}
            </a>
            , via Wikimedia Commons
          </p>
        )}
      </div>
    </article>
  );
}
