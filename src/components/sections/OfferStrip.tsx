import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { freeOffers } from "@/data/content";

export function OfferStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-3 ${className}`}>
      {freeOffers.map((o, i) => (
        <Reveal key={o.title} delay={i * 0.08} className="card flex items-center gap-4 p-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-beige text-forest">
            <Icon name={o.icon} className="size-5" />
          </span>
          <div>
            <h3 className="font-sans text-base font-bold text-forest">{o.title}</h3>
            <p className="text-sm text-muted">{o.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
