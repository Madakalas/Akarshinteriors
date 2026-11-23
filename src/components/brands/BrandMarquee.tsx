import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { brandDirectory, featuredBrandIds } from "@/data/brands";
import { cn } from "@/lib/utils";

/** Auto-scrolling strip of official brand logos; pauses on hover. */
export function BrandMarquee({ className }: { className?: string }) {
  const brands = featuredBrandIds.map((id) => brandDirectory[id]).filter((b) => b?.logo);
  if (!brands.length) return null;
  return (
    <div className={cn("group/marquee overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]", className)}>
      <ul className="flex w-max animate-marquee gap-4 group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
        {[...brands, ...brands].map((b, i) => (
          <li key={i} aria-hidden={i >= brands.length}>
            <Link
              href="/materials#brands"
              tabIndex={i >= brands.length ? -1 : undefined}
              className={cn(
                "grid h-20 w-40 place-items-center rounded-2xl border border-forest/10 px-5 transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-[var(--shadow-card)] sm:w-48",
                b.darkLogo ? "bg-forest" : "bg-white",
              )}
            >
              <BrandLogo brand={b} size="sm" className="!h-9" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
