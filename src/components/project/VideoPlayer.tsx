"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  poster?: string;
  title: string;
  captionsSrc?: string;
  /** Non-landscape videos are letterboxed inside the 16:9 frame over a blurred backdrop. */
  aspect?: "landscape" | "portrait" | "square";
}

/** Click-to-play player. The video file only downloads after the visitor presses play. */
export function VideoPlayer({ src, poster, title, captionsSrc, aspect = "landscape" }: Props) {
  const [started, setStarted] = useState(false);
  const fit = aspect === "landscape" ? "object-cover" : "object-contain";

  return (
    <figure className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-forest shadow-[var(--shadow-card)]">
      {aspect !== "landscape" && poster && (
        <Image src={poster} alt="" fill sizes="10vw" className="scale-110 object-cover opacity-60 blur-xl" aria-hidden />
      )}
      {started ? (
        <video src={src} poster={poster} controls autoPlay playsInline className={cn("relative size-full", fit)}>
          {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />}
        </video>
      ) : (
        <button type="button" onClick={() => setStarted(true)} className="group absolute inset-0" aria-label={`Play video: ${title}`}>
          {poster && <Image src={poster} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className={fit} />}
          <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
          <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-forest shadow-xl transition-transform group-hover:scale-110">
            <Play className="ml-1 size-6 fill-current" aria-hidden />
          </span>
        </button>
      )}
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
}
