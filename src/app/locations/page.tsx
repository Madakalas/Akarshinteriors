import type { Metadata } from "next";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { LocationsExplorer } from "@/components/map/LocationsExplorer";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { getLocations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Service Area — All of Andhra Pradesh & Hyderabad",
  description: "Akarsh Interiors designs and executes home interiors anywhere in Andhra Pradesh and in Hyderabad — Vijayawada, Visakhapatnam, Guntur, Tirupati, Nellore, Kadapa, Kurnool, Anantapur, Nandyal and more.",
  alternates: { canonical: "/locations" },
};

const perks = [
  { icon: "site", title: "Site Visits", text: "Anywhere in AP & Hyderabad" },
  { icon: "fast", title: "Quick Response", text: "Call or WhatsApp" },
  { icon: "quote", title: "Personalised Quotation", text: "For your space" },
  { icon: "team", title: "On-site Coordination", text: "From start to handover" },
];

export default function LocationsPage() {
  const locations = getLocations();
  return (
    <>
      <section className="relative overflow-hidden bg-beige-200">
        <div className="container-x relative py-12 lg:py-20">
          <LocationsExplorer
            locations={locations}
            intro={
              <Reveal>
                <Breadcrumbs items={[{ label: "Locations" }]} />
                <span className="eyebrow mb-5">Our Locations</span>
                <h1 className="text-[2.4rem] leading-[1.08] sm:text-5xl lg:text-6xl">Anywhere in Andhra Pradesh &amp; Hyderabad.</h1>
                <p className="mt-5 max-w-xl text-lg text-muted">
                  We take up home interior projects in every district of Andhra Pradesh and across Hyderabad — with site visits and
                  on-site project coordination wherever your home is. Tap a pin to explore a city.
                </p>
              </Reveal>
            }
          />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {perks.map((p) => (
              <li key={p.title} className="flex flex-col items-center rounded-2xl bg-white p-6 text-center">
                <Icon name={p.icon} className="size-7 text-gold-700" />
                <span className="mt-3 font-bold text-forest">{p.title}</span>
                <span className="text-sm text-muted">{p.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-muted">Your town isn&apos;t listed? We still serve it — anywhere in Andhra Pradesh or Hyderabad.</p>
        </div>
      </section>

      <section className="section bg-forest">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow eyebrow-dark mb-5">Site Visit</span>
            <h2 className="text-[2.2rem] leading-tight text-ivory sm:text-5xl">Book a Site Visit, Wherever You Are.</h2>
            <p className="mt-4 text-lg text-ivory/75">Choose your city and tell us what you&apos;re planning. Our team will call you to schedule a visit.</p>
          </div>
          <div className="rounded-[24px] bg-white p-6 sm:p-8">
            <ConsultationForm sourcePage="/locations" submitLabel="Book Site Visit" />
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
