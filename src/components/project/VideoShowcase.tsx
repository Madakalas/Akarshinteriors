import type { ShowcaseVideo } from "@/data/videos";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "./VideoPlayer";

/** Grid of click-to-play 3D walkthrough videos. */
export function VideoShowcase({ items, dark, className }: { items: ShowcaseVideo[]; dark?: boolean; className?: string }) {
  return (
    <ul className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((v) => (
        <li key={v.slug}>
          <VideoPlayer src={v.src} poster={v.poster} title={v.title} aspect={v.orientation} />
          <p className={cn("mt-3 text-sm font-semibold", dark ? "text-ivory" : "text-forest")}>{v.title}</p>
          <p className={cn("text-xs", dark ? "text-ivory/60" : "text-muted")}>3D design visual</p>
        </li>
      ))}
    </ul>
  );
}
