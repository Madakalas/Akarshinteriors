import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Renders the official logo from `site.logo` (src/lib/site.ts). Use on dark backgrounds.
 * If `site.logo` is null, a plain text wordmark is shown instead.
 */
export function Logo({ dark = true, className, size = "md" }: { dark?: boolean; className?: string; size?: "md" | "lg" }) {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className={cn("inline-flex shrink-0 items-center", className)}>
      {site.logo ? (
        <Image
          src={site.logo.src}
          alt={site.name}
          width={site.logo.width}
          height={site.logo.height}
          priority={size === "md"}
          sizes={size === "lg" ? "120px" : "72px"}
          className={size === "lg" ? "h-28 w-auto" : "h-[70px] w-auto"}
        />
      ) : (
        <span className="flex flex-col items-center leading-none">
          <svg viewBox="0 0 48 30" className="h-6 w-auto" aria-hidden>
            <path d="M4 28 L24 3 L44 28" fill="none" stroke="#D6AE73" strokeWidth="3.2" strokeLinejoin="round" />
            <path d="M15 28 L24 16 L33 28" fill="none" stroke="#D6AE73" strokeWidth="2.2" strokeLinejoin="round" />
          </svg>
          <span className={cn("mt-1 font-serif text-[1.05rem] tracking-[0.28em]", dark ? "text-ivory" : "text-forest")}>AKARSH</span>
          <span className="mt-0.5 flex items-center gap-1 text-[0.5rem] font-semibold tracking-[0.35em] text-gold">
            <span className="h-px w-3 bg-gold" />
            INTERIORS
            <span className="h-px w-3 bg-gold" />
          </span>
        </span>
      )}
    </Link>
  );
}
