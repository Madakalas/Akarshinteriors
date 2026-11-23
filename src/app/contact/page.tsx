import type { Metadata } from "next";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { MapAttribution, ServiceAreaMap } from "@/components/map/ServiceAreaMap";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";
import { AddressCard } from "@/components/sections/AddressCard";
import { ProcessSteps } from "@/components/sections/ProcessTimeline";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { generalFaqs } from "@/data/content";
import { getLocations } from "@/data/locations";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Book a Consultation",
  description: "Call or WhatsApp Akarsh Interiors on +91 96663 06868, or book a free consultation for your home anywhere in Andhra Pradesh or Hyderabad.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const cities = getLocations();
  return (
    <>
      <section className="relative overflow-hidden bg-beige-200">
        <div className="container-x relative grid gap-10 py-12 lg:grid-cols-[1fr_1.1fr] lg:py-20">
          <Reveal>
            <Breadcrumbs items={[{ label: "Contact" }]} />
            <span className="eyebrow mb-5">Contact Us</span>
            <h1 className="text-[2.4rem] leading-[1.08] sm:text-5xl">Let&apos;s Design Your Dream Home.</h1>
            <p className="mt-5 text-lg text-muted">Share your requirements and our team will help you plan the next steps.</p>

            <ul className="mt-8 grid gap-4">
              <li>
                <a href={site.phoneHref} className="group flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-forest text-gold">
                    <Phone className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-muted">Call us</span>
                    <span className="font-semibold text-forest group-hover:text-gold-700">{site.phone}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-[#1a7a43] text-white">
                    <WhatsAppGlyph className="size-6" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-muted">WhatsApp</span>
                    <span className="font-semibold text-forest group-hover:text-gold-700">{site.phone}</span>
                  </span>
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-full bg-forest text-gold">
                      <Mail className="size-5" aria-hidden />
                    </span>
                    <span className="font-semibold text-forest group-hover:text-gold-700">{site.email}</span>
                  </a>
                </li>
              )}
              <li className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-forest text-gold">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-muted">Service area</span>
                  <span className="font-semibold text-forest">All of Andhra Pradesh &amp; Hyderabad</span>
                </span>
              </li>
              {site.addresses.length > 0 && (
                <li>
                  <a href="#addresses" className="group flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-forest text-gold">
                      <Building2 className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-muted">Our addresses</span>
                      <span className="font-semibold text-forest group-hover:text-gold-700">
                        {[...new Set(site.addresses.map((a) => a.city))].join(" · ")}
                      </span>
                    </span>
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-10">
              <ServiceAreaMap
                cities={cities.map((c) => ({ slug: c.slug, city: c.city, intro: c.intro, state: c.state, region: c.region }))}
              />
              <MapAttribution />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="card p-6 sm:p-8">
            <h2 className="text-2xl">Book a Consultation</h2>
            <p className="mb-6 mt-1 text-sm text-muted">Fields marked * are required.</p>
            <ConsultationForm variant="full" sourcePage="/contact" />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="What Happens Next" title="Your Consultation Journey" align="center" />
          <ProcessSteps />
        </div>
      </section>

      {site.addresses.length > 0 && (
        <section id="addresses" className="section scroll-mt-24 bg-white">
          <div className="container-x">
            <SectionHeading eyebrow="Visit Us" title="Our Addresses" description="Call or WhatsApp before visiting so we can make sure the right person is there to meet you." />
            <ul className="grid gap-5 md:grid-cols-3">
              {site.addresses.map((a, i) => (
                <Reveal as="li" key={a.label} delay={i * 0.06}>
                  <AddressCard address={a} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section bg-beige-200">
        <div className="container-x max-w-4xl">
          <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" align="center" />
          <FAQAccordion items={generalFaqs} />
        </div>
      </section>
    </>
  );
}
