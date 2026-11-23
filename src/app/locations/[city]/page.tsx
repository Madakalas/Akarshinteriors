import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MapPin, Phone } from "lucide-react";
import { MapAttribution, ServiceAreaMap } from "@/components/map/ServiceAreaMap";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";
import { ProjectCard } from "@/components/project/ProjectCard";
import { AddressCard } from "@/components/sections/AddressCard";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { OfferStrip } from "@/components/sections/OfferStrip";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLocation, getLocations } from "@/data/locations";
import { getFeaturedProjects, getProjectsByCity } from "@/data/projects";
import { getService } from "@/data/services";
import { site, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return getLocations().map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[city]">): Promise<Metadata> {
  const { city } = await params;
  const l = getLocation(city);
  if (!l) return {};
  return {
    title: `Interior Designers in ${l.city}`,
    description: `Home interiors, modular kitchens and wardrobes in ${l.city}, ${l.state}. ${l.description}`,
    alternates: { canonical: `/locations/${l.slug}` },
  };
}

async function CityContent({ params }: Pick<PageProps<"/locations/[city]">, "params">) {
  const { city } = await params;
  const l = getLocation(city);
  if (!l) notFound();

  const projects = getProjectsByCity(l.slug);
  const cityAddresses = site.addresses.filter((a) => a.locationSlug === l.slug);
  const svc = l.availableServices.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const waMsg = `Hello Akarsh Interiors, I'm in ${l.city} and interested in interior design services. I would like to discuss my project.`;

  return (
    <>
      <section className="relative overflow-hidden bg-forest text-ivory">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,#2b5a4d_0%,transparent_60%)]" />
        <div className="container-x relative grid items-center gap-10 py-14 lg:grid-cols-[1fr_1fr] lg:py-20">
          <Reveal>
            <Breadcrumbs dark items={[{ label: "Locations", href: "/locations" }, { label: l.city }]} />
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              <MapPin className="size-4" aria-hidden /> {l.city}, {l.state}
            </p>
            <h1 className="text-[2.5rem] leading-[1.06] text-ivory sm:text-6xl">
              Interior Design in <span className="italic text-gold">{l.city}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ivory/75">{l.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`/contact?city=${encodeURIComponent(l.city)}`} size="lg" arrow>
                Request Site Visit
              </Button>
              <Button href={whatsappLink(waMsg)} variant="outline-light" size="lg" icon={<WhatsAppGlyph className="size-5" />}>
                WhatsApp
              </Button>
              <Button href={site.phoneHref} variant="outline-light" size="lg" icon={<Phone className="size-4" aria-hidden />}>
                {site.phone}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <ServiceAreaMap
              variant="dark"
              focus={l.slug}
              compact
              cities={getLocations().map((c) => ({ slug: c.slug, city: c.city, intro: c.intro, state: c.state, region: c.region }))}
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <MapAttribution dark />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${l.city}, ${l.state}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-300"
              >
                <MapPin className="size-3.5" aria-hidden /> View {l.city} on Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-10">
        <div className="container-x">
          <OfferStrip />
        </div>
      </section>

      <section className="section !pt-8">
        <div className="container-x">
          <SectionHeading
            eyebrow={`Projects in ${l.city}`}
            title={`Our Work in ${l.city}`}
            action={projects.length > 0 ? <Button href={`/projects?city=${l.slug}`} variant="forest" arrow>View All</Button> : undefined}
          />
          {projects.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <>
              <p className="mb-6 text-muted">
                Projects tagged to {l.city} will appear here. Meanwhile, here are some of our recent 3D designs.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {getFeaturedProjects(3).map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Services" title={`Services Available in ${l.city}`} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {svc.slice(0, 6).map((s) => (
              <ServiceCard key={s.slug} service={s} showDescription={false} />
            ))}
          </div>
          {svc.length > 6 && (
            <p className="mt-6 text-sm text-muted">
              Also available: {svc.slice(6).map((s) => s.title).join(", ")}.
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading eyebrow="FAQs" title={`Interiors in ${l.city} — FAQs`} className="!mb-8" />
            <FAQAccordion items={l.faqs} />
            <div className="mt-8 rounded-2xl bg-beige-200 p-6">
              <h3 className="text-lg">Contact</h3>
              <p className="mt-2 text-sm text-muted">
                Phone / WhatsApp:{" "}
                <a href={site.phoneHref} className="font-semibold text-forest underline-offset-2 hover:underline">
                  {site.phone}
                </a>
              </p>
              {cityAddresses.length > 0 && (
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {cityAddresses.map((a) => (
                    <li key={a.label}>
                      <AddressCard address={a} compact />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="card h-fit p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl">Book a Free Site Visit in {l.city}</h2>
            <p className="mb-6 mt-2 text-sm text-muted">We&apos;ll call to schedule a convenient time.</p>
            <ConsultationForm defaultCity={l.city} sourcePage={`/locations/${l.slug}`} submitLabel="Book Site Visit" />
          </div>
        </div>
      </section>

      <ConsultationCTA whatsappMessage={waMsg} />
    </>
  );
}

/**
 * The shell stays URL-independent so it can be prefetched once and reused for every link;
 * the params-dependent content streams in inside Suspense (instant navigation).
 */
export default function CityPage({ params }: PageProps<"/locations/[city]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CityContent params={params} />
    </Suspense>
  );
}
