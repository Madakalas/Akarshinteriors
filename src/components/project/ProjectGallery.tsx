"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FadeImage } from "@/components/motion/FadeImage";
import { useCallback, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { roomLabel } from "@/data/rooms";
import type { ProjectMedia, RoomKey } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectGallery({ media }: { media: ProjectMedia[] }) {
  const images = useMemo(() => media.filter((m) => m.type === "image").sort((a, b) => a.sortOrder - b.sortOrder), [media]);
  const roomsInGallery = useMemo(() => Array.from(new Set(images.map((m) => m.room))), [images]);
  const [room, setRoom] = useState<RoomKey | "all">("all");
  const [index, setIndex] = useState<number | null>(null);

  const shown = room === "all" ? images : images.filter((m) => m.room === room);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + shown.length) % shown.length)),
    [shown.length],
  );

  const current = index !== null ? shown[index] : null;

  return (
    <div>
      {roomsInGallery.length > 1 && (
        <div role="tablist" aria-label="Filter gallery by room" className="no-scrollbar mb-6 flex gap-2 overflow-x-auto">
          {(["all", ...roomsInGallery] as const).map((r) => (
            <button
              key={r}
              role="tab"
              type="button"
              aria-selected={room === r}
              onClick={() => setRoom(r)}
              className={cn(
                "h-10 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors",
                room === r ? "bg-forest text-ivory" : "border border-line bg-white text-forest hover:border-forest",
              )}
            >
              {r === "all" ? "All" : roomLabel[r]}
            </button>
          ))}
        </div>
      )}

      <ul className="grid grid-flow-dense auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-3 lg:gap-4">
        {shown.map((m, i) => (
          <li key={m.id} className={cn(i % 5 === 0 && "row-span-2", i % 5 === 3 && "md:col-span-2")}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group img-zoom relative block size-full overflow-hidden rounded-2xl"
              aria-label={`Open image: ${m.altText}`}
            >
              <FadeImage src={m.url} alt={m.altText} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-forest">{roomLabel[m.room]}</span>
              <Expand className="absolute right-3 top-3 size-5 text-white opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/90" />
          <Dialog.Content
            className="fixed inset-0 z-[90] flex flex-col"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
          >
            <Dialog.Title className="sr-only">Project gallery</Dialog.Title>
            <Dialog.Description className="sr-only">Use the arrow keys to move between images.</Dialog.Description>
            <div className="flex items-center justify-between p-4 text-white">
              <span className="text-sm text-white/70">
                {index !== null && `${index + 1} / ${shown.length}`} {current && `· ${roomLabel[current.room]}`}
              </span>
              <Dialog.Close className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Close gallery">
                <X className="size-5" aria-hidden />
              </Dialog.Close>
            </div>
            <div className="relative flex-1">
              <AnimatePresence mode="wait">
                {current && (
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) go(1);
                      if (info.offset.x > 60) go(-1);
                    }}
                  >
                    <Image src={current.url} alt={current.altText} fill sizes="100vw" className="object-contain" />
                  </motion.div>
                )}
              </AnimatePresence>
              {shown.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/25"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-6" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/25"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-6" aria-hidden />
                  </button>
                </>
              )}
            </div>
            {current && <p className="p-4 text-center text-sm text-white/80">{current.caption ?? current.altText}</p>}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
