import type { Metadata } from "next";

import { FinishThumb } from "@/components/finishes/FinishThumb";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisons } from "@/data/materials";
import { finishes } from "@/data/finishes";

const heroPicks = ["AK-D701", "AK-S209", "AK-TL801", "AK-W112", "AK-F609"]
  .map((c) => finishes.find((f) => f.code === c))
  .filter((f): f is NonNullable<typeof f> => Boolean(f));
import { BrandShowcase } from "@/components/brands/BrandShowcase";
import { FinishCatalogue } from "@/components/finishes/FinishCatalogue";

export const metadata: Metadata = {
  title: "Materials & Brands",
  description: "Plywood and boards, laminates, acrylic finishes, hardware, kitchen accessories, lighting and countertops — the materials behind Akarsh Interiors projects.",
  alternates: { canonical: "/materials" },
};

export default function MaterialsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-beige-200">
        <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <Reveal>
            <Breadcrumbs items={[{ label: "Materials" }]} />
            <span className="eyebrow mb-5">Materials & Brands</span>
            <h1 className="text-[2.4rem] leading-[1.08] sm:text-5xl lg:text-6xl">We Use Trusted, Premium Materials.</h1>
            <p className="mt-5 max-w-xl text-lg text-muted">Beautiful interiors begin with thoughtful material selection and quality craftsmanship.</p>
            <a href="#brands" className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-forest px-6 font-semibold text-ivory transition hover:bg-forest-700 active:scale-[0.97]">Explore our trusted brands</a>
            <a href="#library" className="ml-3 mt-7 inline-flex h-12 items-center gap-2 rounded-full border border-forest/25 px-6 font-semibold text-forest transition hover:bg-forest hover:text-ivory active:scale-[0.97]">Browse laminates &amp; tiles</a>
          </Reveal>
          <Reveal delay={0.1} className="relative grid h-[340px] grid-cols-3 gap-3 sm:h-[400px]">
            {heroPicks.map((f, i) => (
              <a key={f.code} href="#library" className={`group relative ${i === 0 ? "row-span-2" : ""}`} title={`${f.name} – ${f.code}`}>
                <FinishThumb finish={f} sizes="20vw" className="size-full rounded-2xl" />
                <span className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-black/60 to-transparent px-3 pb-2 pt-6 text-[0.7rem] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {f.name}
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="library" className="section scroll-mt-24">
        <div className="container-x">
          <div className="mb-10 text-center">
            <span className="eyebrow mb-4">Browse Materials</span>
            <h2 className="text-[2.2rem] leading-[1.1] sm:text-5xl">Laminates &amp; Tiles</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted">
              Laminates and tiles from our 3D design presentations — Pichwai and temple-elephant prints, marbles, woods, inlay floors
              and wall cladding — plus the full Dorby fluted laminate range. Filter, tap for details, and shortlist your favourites to
              send us on WhatsApp.
            </p>
          </div>
          <FinishCatalogue />
          <p className="mt-8 text-center text-xs text-muted">Specifications, grades and exact products are confirmed in your quotation.</p>
        </div>
      </section>

      <section id="brands" className="section scroll-mt-24 bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Materials & Brands"
            title="Our Materials & Trusted Brands"
            description="At Akarsh Interiors, we believe that quality interiors begin with quality materials. We carefully select trusted brands for plywood, hardware, lighting, electrical wiring, glass, surface finishes and ceiling systems to deliver beautiful, durable and functional living spaces."
          />
          <BrandShowcase />
          <p className="mt-12 rounded-2xl bg-beige-200 p-5 text-sm text-forest">
            <strong>Note:</strong> Brand selection and specifications may vary according to project requirements, client preferences and approved
            quotations.
            <span className="mt-2 block text-xs text-muted">
              Brand names and logos are trademarks of their respective owners and are shown only to identify the brands we work with. No official
              partnership or endorsement is implied.
            </span>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Compare" title="Helping You Choose" description="A quick, general guide. We'll show physical samples during material selection." />
          <div className="grid gap-6 lg:grid-cols-3">
            {comparisons.map((c) => (
              <Reveal key={c.title} className="card overflow-hidden">
                <h3 className="bg-forest px-6 py-4 text-xl text-ivory">{c.title}</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line text-left">
                      <th scope="col" className="sr-only px-4 py-3">Aspect</th>
                      <th scope="col" className="px-4 py-3 font-bold text-gold-700">{c.a}</th>
                      <th scope="col" className="px-4 py-3 font-bold text-gold-700">{c.b}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.rows.map(([k, a, b]) => (
                      <tr key={k} className="border-b border-line last:border-0 align-top">
                        <th scope="row" className="sr-only">{k}</th>
                        <td className="px-4 py-3 text-forest">
                          <span className="block text-[0.7rem] font-semibold uppercase tracking-wide text-muted">{k}</span>
                          {a}
                        </td>
                        <td className="px-4 py-3 text-forest">
                          <span className="block text-[0.7rem] font-semibold uppercase tracking-wide text-muted">{k}</span>
                          {b}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA
        title="Choose Materials That Match Your Lifestyle."
        text="Not sure what's right for your kitchen or wardrobe? Our team will walk you through the options and samples."
        ctaLabel="Talk to Our Team"
        image="/assets/projects/navy-kitchen-home/02-kitchen.webp"
      />
    </>
  );
}
