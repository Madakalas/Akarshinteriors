import { MapPin, Navigation } from "lucide-react";
import { mapsLink, type Address } from "@/lib/site";
import { cn } from "@/lib/utils";

/** One of Akarsh Interiors' addresses, with a Google Maps directions link. */
export function AddressCard({ address: a, dark, compact }: { address: Address; dark?: boolean; compact?: boolean }) {
  return (
    <address
      className={cn(
        "flex h-full flex-col not-italic",
        !compact && "rounded-2xl border p-5 sm:p-6",
        !compact && (dark ? "border-ivory/15 bg-ivory/5" : "border-line bg-white"),
      )}
    >
      <span className="flex items-center gap-2.5">
        <span className={cn("grid shrink-0 place-items-center rounded-full", compact ? "size-7" : "size-10", dark ? "bg-gold/15 text-gold" : "bg-forest text-gold")}>
          <MapPin className={compact ? "size-3.5" : "size-4.5"} aria-hidden />
        </span>
        <span className={cn("font-bold", compact ? "text-sm" : "text-base", dark ? "text-ivory" : "text-forest")}>{a.label}</span>
      </span>
      <span className={cn(compact ? "mt-1 block leading-relaxed" : "mt-2 block leading-relaxed", compact ? "pl-[2.375rem] text-sm" : "text-[0.95rem]", dark ? "text-ivory/75" : "text-muted")}>
        {a.street}
        <br />
        {a.city}, {a.state}
        {a.postalCode ? ` ${a.postalCode}` : ""}
      </span>
      <a
        href={mapsLink(a)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline",
          compact ? "mt-1.5 pl-[2.375rem] text-xs" : "mt-auto pt-4 text-sm",
          dark ? "text-gold" : "text-gold-700",
        )}
      >
        <Navigation className="size-3.5" aria-hidden /> Get directions
      </a>
    </address>
  );
}
