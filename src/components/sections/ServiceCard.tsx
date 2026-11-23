import { FadeImage } from "@/components/motion/FadeImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceHref } from "@/data/services";
import type { Service } from "@/lib/types";

export function ServiceCard({ service, showDescription = true }: { service: Service; showDescription?: boolean }) {
  return (
    <Link
      href={serviceHref(service)}
      className="group card flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="img-zoom relative aspect-[4/3] overflow-hidden">
        <FadeImage src={service.coverImage} alt={service.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg sm:text-xl">{service.title}</h3>
          <ArrowRight className="size-4 shrink-0 text-forest transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </div>
        {showDescription && <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>}
        <span className="mt-auto pt-4 text-xs font-bold uppercase tracking-[0.14em] text-gold-700">Explore Service</span>
      </div>
    </Link>
  );
}
