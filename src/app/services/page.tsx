import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { FinishThumb } from "@/components/finishes/FinishThumb";
import { OfferStrip } from "@/components/sections/OfferStrip";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessTimeline";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { generalFaqs } from "@/data/content";
import { finishes } from "@/data/finishes";

const libraryPicks = ["AK-D701", "AK-S209", "AK-W112", "AK-P315", "AK-TL801", "AK-TL802", "AK-F609", "BF 9070"]
  .map((c) => finishes.find((f) => f.code === c))
  .filter((f): f is NonNullable<typeof f> => Boolean(f));
import { getFeaturedProjects } from "@/data/projects";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Interior Design Services",
  description:
    "Modular kitchens, wardrobes, TV units, pooja units, false ceilings, bedroom and living room interiors, custom furniture and 3D design — by Akarsh Interiors.",
  alternates: { canonical: "/services" },
};

const approach = [
  { icon: "consult", title: "Listen first", text: "We start with how you live, what you store and what you love." },
  { icon: "measure", title: "Plan the space", text: "Layouts are drawn to your exact measurements and site conditions." },
  { icon: "design", title: "Design in 3D", text: "You review the design and finishes before anything is built." },
  { icon: "execution", title: "Build with care", text: "Coordinated execution with quality checks at every stage." },
];

const benefits = [
  "Every unit built to your exact dimensions",
  "Storage planned around what you own",
  "Finishes matched across rooms",
  "Lighting and electrical planned with the design",
  "One team from design to handover",
  "Clear specifications in your quotation",
];

export default function ServicesPage() {
  const projects = getFeaturedProjects(3);
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Complete Interior Solutions for Every Space."
        description="Thoughtfully designed interiors that balance beauty, functionality and everyday comfort."
        crumbs={[{ label: "Services" }]}
        image="/assets/projects/multi-level-residence/01-living-room.webp"
        imageAlt="Double-height formal living room 3D design"
      >
        <Button href="/contact" size="lg" arrow>
          Get Free Quote
        </Button>
      </PageHero>

      <section className="section">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
          <OfferStrip className="mt-12" />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Our Design Approach" title="Beautiful, and Built for Everyday Life." align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08} className="rounded-[var(--radius-card)] bg-beige-200 p-7">
                <span className="grid size-12 place-items-center rounded-full bg-forest text-gold">
                  <Icon name={a.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-xl">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Why Custom Interiors" title="Made for Your Home, Not a Catalogue." className="!mb-8" />
            <ul className="grid gap-4 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold text-forest">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-forest">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="grid grid-cols-4 gap-3">
            {libraryPicks.map((f) => (
              <a key={f.code} href="/materials#library" className="group">
                <FinishThumb finish={f} sizes="12vw" className="aspect-square rounded-xl transition-transform duration-500 group-hover:-translate-y-1" />
                <p className="mt-2 text-[0.7rem] font-semibold leading-tight text-forest">{f.name}</p>
              </a>
            ))}
            <div className="col-span-4 mt-2">
              <Button href="/materials" variant="outline" arrow>
                Materials &amp; Brands
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="How We Execute" title="From Consultation to Handover." align="center" />
          <ProcessSteps />
        </div>
      </section>

      {projects.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading
              eyebrow="Our Works"
              title="Completed Projects"
              action={<Button href="/projects" variant="forest" arrow>View All</Button>}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-beige-200">
        <div className="container-x max-w-4xl">
          <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" align="center" />
          <FAQAccordion items={generalFaqs} />
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
