"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RoomItem {
  key: string;
  label: string;
  image: string;
  count: number;
}

export function RoomCarousel({ rooms }: { rooms: RoomItem[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = track.current;
    const frame = requestAnimationFrame(update);
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 600), behavior: "smooth" });
  };

  const buttons = [
    { dir: -1 as const, Icon: ArrowLeft, label: "Previous rooms", disabled: edges.start },
    { dir: 1 as const, Icon: ArrowRight, label: "Next rooms", disabled: edges.end },
  ];

  return (
    <div className="relative">
      <div ref={track} className="scroller-pad no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {rooms.map((r) => (
          <Link
            key={r.key}
            href={`/projects?room=${r.key}`}
            className="group img-zoom relative aspect-[3/4] w-[62vw] shrink-0 snap-start overflow-hidden rounded-[var(--radius-card)] sm:w-[260px]"
          >
            <Image src={r.image} alt={r.label} fill sizes="260px" className="object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/10 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-5">
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-gold-300">{r.count} designs</span>
              <span className="mt-1 flex items-center justify-between">
                <span className="font-serif text-xl text-ivory">{r.label}</span>
                <span className="grid size-9 place-items-center rounded-full bg-ivory/15 text-ivory backdrop-blur transition-all duration-300 group-hover:rotate-45 group-hover:bg-gold group-hover:text-forest">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </span>
            </span>
          </Link>
        ))}
      </div>
      <div className="container-x mt-4 flex justify-end gap-2">
        {buttons.map(({ dir, Icon, label, disabled }) => (
          <button
            key={label}
            type="button"
            onClick={() => scroll(dir)}
            disabled={disabled}
            aria-label={label}
            className={cn(
              "grid size-11 place-items-center rounded-full border border-forest/20 text-forest transition-all hover:bg-forest hover:text-ivory",
              disabled && "pointer-events-none opacity-30",
            )}
          >
            <Icon className="size-4" aria-hidden />
          </button>
        ))}
      </div>
    </div>
  );
}
