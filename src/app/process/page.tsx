import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { generalFaqs } from "@/data/content";

export const metadata: Metadata = {
  title: "Our Process",
  description: "Consultation, site visit, 3D design, material selection, execution and handover — how Akarsh Interiors delivers your home interiors.",
  alternates: { canonical: "/process" },
};

const expect = [
  { title: "What clients can expect", items: ["A single point of contact", "Clear, itemised quotations", "Regular updates during execution", "A final walkthrough at handover"] },
  { title: "Design approval", items: ["3D design shared for review", "Changes discussed and revised", "Work begins only after your approval"] },
  { title: "Material selection", items: ["Physical samples where available", "Board, finish and hardware options explained", "Specifications recorded in the quotation"] },
  { title: "Site execution", items: ["Planned work schedule", "Coordination between trades", "Quality checks at key stages", "Site cleaned before handover"] },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Process"
        title="A Simple, Transparent Interior Journey."
        description="From idea to handover, we make your interior experience smooth and stress-free."
        crumbs={[{ label: "Our Process" }]}
        image="/assets/projects/4-bhk-duplex/08-kitchen.webp"
        imageAlt="Modular kitchen 3D design"
      >
        <Button href="/contact" size="lg" arrow>
          Book Consultation
        </Button>
      </PageHero>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Six Steps" title="How We Bring Your Home to Life" description="Select a step to learn more." />
          <ProcessTimeline />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Transparency" title="What to Expect at Every Stage" align="center" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {expect.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06} className="rounded-[var(--radius-card)] bg-beige-200 p-7">
                <h3 className="text-xl">{e.title}</h3>
                <ul className="mt-4 grid gap-2.5">
                  {e.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-sm text-forest">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold-700" strokeWidth={2.5} aria-hidden /> {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-4xl">
          <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" align="center" />
          <FAQAccordion items={generalFaqs} />
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
