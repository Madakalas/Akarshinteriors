"use client";

import Link from "next/link";
import Image from "next/image";

export interface MarqueeItem {
  src: string;
  alt: string;
  href: string;
  label: string;
}

/** Endless, hover-to-pause strip of design visuals. */
export function ImageMarquee({ items }: { items: MarqueeItem[] }) {
  const loop = [...items, ...items];
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <ul className="flex w-max animate-marquee-slow gap-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {loop.map((it, i) => (
          <li key={i} aria-hidden={i >= items.length} className="shrink-0">
            <Link
              href={it.href}
              tabIndex={i >= items.length ? -1 : undefined}
              className="group/item relative block h-56 w-80 overflow-hidden rounded-2xl sm:h-64 sm:w-96"
            >
              <Image src={it.src} alt={it.alt} fill sizes="384px" className="object-cover transition-transform duration-700 group-hover/item:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-0 transition-opacity group-hover/item:opacity-100" />
              <span className="absolute bottom-3 left-4 translate-y-2 text-sm font-semibold text-ivory opacity-0 transition-all group-hover/item:translate-y-0 group-hover/item:opacity-100">
                {it.label} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
