import Image from "next/image";
import type { BrandInfo } from "@/data/brands";
import { cn } from "@/lib/utils";

/** Official logo when available, otherwise a clean wordmark (never an invented logo). */
export function BrandLogo({ brand, className, size = "md" }: { brand: BrandInfo; className?: string; size?: "sm" | "md" | "lg" }) {
  const h = size === "lg" ? "h-16 sm:h-20" : size === "sm" ? "h-7" : "h-10 sm:h-11";
  if (brand.logo) {
    return (
      <span className={cn("relative block w-full", h, className)}>
        <Image src={brand.logo} alt={`${brand.name} logo`} fill unoptimized className="object-contain" sizes="200px" />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "grid w-full place-items-center text-center font-sans font-extrabold leading-none tracking-tight",
        size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-xl",
        h,
        className,
      )}
    >
      {brand.name}
    </span>
  );
}
