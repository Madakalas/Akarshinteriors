import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brandDirectory, getBrandCategories } from "@/data/brands";
import { finishes } from "@/data/finishes";
import { serviceMaterials } from "@/data/service-materials";
import { FinishThumb } from "./FinishThumb";

/** "Materials & Finishes" for a service page — built only from the Materials page content. */
export function ServiceMaterials({ slug, serviceTitle }: { slug: string; serviceTitle: string }) {
  const cfg = serviceMaterials[slug];
  if (!cfg) return null;
  const all = getBrandCategories();
  const cats = cfg.categories.map((id) => all.find((c) => c.id === id)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const picks = cfg.picks.map((code) => finishes.find((f) => f.code === code)).filter((f): f is NonNullable<typeof f> => Boolean(f));
  if (!cats.length && !picks.length) return null;

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Materials & Finishes"
          title={`Materials for ${serviceTitle}`}
          description="Laminates, tiles and trusted brands from our materials range — final selections are confirmed in your quotation."
          action={<Button href="/materials" variant="outline" arrow>All Materials</Button>}
        />

        {picks.length > 0 && (
          <div className="mb-12">
            <div className="mb-4 flex items-end justify-between gap-4">
              <h3 className="text-xl">Laminates &amp; Tiles</h3>
              <Link href="/materials#library" className="text-sm font-semibold text-forest underline-offset-4 hover:text-gold-700 hover:underline">
                Browse the full library
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {picks.map((f, i) => (
                <Reveal as="li" key={f.code} delay={i * 0.04}>
                  <Link href="/materials#library" className="group block">
                    <FinishThumb finish={f} className="aspect-square rounded-2xl transition-transform duration-500 group-hover:-translate-y-1" />
                    <span className="mt-2 block text-sm font-bold leading-snug text-forest group-hover:text-gold-700">
                      {f.name} – {f.code}
                    </span>
                    <span className="block text-xs text-muted">
                      {f.brand ? `${f.brand} · ` : ""}
                      {f.product}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        )}

        {cats.length > 0 && (
          <>
            <h3 className="mb-4 text-xl">Trusted Brands We Use</h3>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cats.map((c, i) => {
                const logos = c.brands.map((id) => brandDirectory[id]).filter((b) => b?.logo).slice(0, 4);
                return (
                  <Reveal as="li" key={c.id} delay={(i % 3) * 0.05}>
                    <Link
                      href={`/materials#brands-${c.id}`}
                      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-lift)]"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-sans text-base font-bold text-forest">{c.title}</span>
                        <ArrowRight className="mt-0.5 size-4 shrink-0 text-gold-700 transition-transform group-hover:translate-x-1" aria-hidden />
                      </span>
                      <span className="mt-1.5 text-sm text-muted">{c.products.slice(0, 4).join(" · ")}</span>
                      {logos.length > 0 && (
                        <span className="mt-auto flex items-center gap-3 pt-4">
                          {logos.map((b) => (
                            <span key={b.id} className={`relative h-8 flex-1 rounded-md ${b.darkLogo ? "bg-forest" : ""}`} title={b.name}>
                              <Image src={b.logo!} alt={`${b.name} logo`} fill unoptimized sizes="80px" className="object-contain p-0.5" />
                            </span>
                          ))}
                        </span>
                      )}
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
