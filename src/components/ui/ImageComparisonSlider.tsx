"use client";

import Image from "next/image";
import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
  /** Applies a sketch-like filter to the "before" image (used for illustrative concept vs render). */
  sketchBefore?: boolean;
  className?: string;
}

export function ImageComparisonSlider({ before, after, beforeLabel = "Before", afterLabel = "After", alt, sketchBefore, className }: Props) {
  const [pos, setPos] = useState(50);
  return (
    <div
      className={cn("relative select-none overflow-hidden rounded-[24px] bg-beige touch-pan-y", className)}
    >
      <Image src={after} alt={`${alt} — ${afterLabel}`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={before}
          alt={`${alt} — ${beforeLabel}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className={cn("object-cover", sketchBefore && "contrast-[1.5] grayscale brightness-[1.15] sepia-[.15]")}
          draggable={false}
        />
        {sketchBefore && <div className="absolute inset-0 bg-[linear-gradient(#fff6_1px,transparent_1px),linear-gradient(90deg,#fff6_1px,transparent_1px)] bg-[size:32px_32px]" />}
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-forest">{beforeLabel}</span>
      <span className="absolute right-4 top-4 rounded-full bg-forest/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold-300">{afterLabel}</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgb(0_0_0/0.4)]" style={{ left: `${pos}%` }} />
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
        className="peer absolute inset-x-0 bottom-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <span
        className="pointer-events-none absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-forest shadow-lg peer-focus-visible:ring-4 peer-focus-visible:ring-gold"
        style={{ left: `${pos}%` }}
      >
        <MoveHorizontal className="size-5" aria-hidden />
      </span>
    </div>
  );
}
