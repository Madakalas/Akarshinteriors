import type { Metadata } from "next";
import Image from "next/image";
import { ProjectCard } from "@/components/project/ProjectCard";
import { CityCard } from "@/components/sections/CityCard";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { ProcessSteps } from "@/components/sections/ProcessTimeline";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyChoose } from "@/data/content";
import { getLocations } from "@/data/locations";
import { getFeaturedProjects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Akarsh Interiors designs functional, beautiful and personalised home interiors across Andhra Pradesh and Hyderabad.",
  alternates: { canonical: "/about" },
};

/** Add real team members here (name, role, photo) — the section stays hidden while empty. */
const team: { name: string; role: string; photo: string }[] = [];

export default function AboutPage() {
  const locations = getLocations();
  const facts = [
    { icon: "site", value: "AP + HYD", label: "All of Andhra Pradesh & Hyderabad" },
    { icon: "home", value: String(services.length), label: "Interior Services" },
    { icon: "design", value: "3D", label: "Design Before Build" },
    { icon: "team", value: "1", label: "Team, Design to Handover" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-beige-200">
        <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
          <Reveal>
            <Breadcrumbs items={[{ label: "About Us" }]} />
            <span className="eyebrow mb-5">About Us</span>
            <h1 className="text-[2.4rem] leading-[1.08] sm:text-5xl lg:text-6xl">Designing Homes That Feel Like You.</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {site.name} is a home interior design and execution studio. We combine thoughtful design, practical planning, transparent
              material choices and careful execution to create spaces you&apos;ll love living in every day.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[var(--shadow-lift)]">
            <Image src="/assets/projects/villa-interiors/drawing-room.jpg" alt="Villa drawing room 3D design with floral glass panels" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
        <div className="container-x pb-14">
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {facts.map((f) => (
              <li key={f.label} className="flex flex-col items-center rounded-2xl bg-white p-6 text-center">
                <Icon name={f.icon} className="size-7 text-gold-700" />
                <span className="mt-3 font-serif text-3xl text-forest">{f.value}</span>
                <span className="text-sm text-muted">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[20px]">
              <Image src="/assets/projects/villa-interiors/pooja-door-wall.jpg" alt="" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[20px]">
              <Image src="/assets/projects/villa-interiors/master-bedroom-1.jpg" alt="" fill sizes="25vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow mb-5">Our Story</span>
            <h2 className="text-[2.1rem] leading-tight sm:text-5xl">Interiors Built Around the Way You Live.</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Every family uses its home differently. That&apos;s why we begin every project by listening — to how you cook, what you
                store, how you unwind and what makes a space feel like yours.
              </p>
              <p>
                We then plan each room to your exact measurements, show you the design in 3D, help you choose materials with clear
                specifications, and carry out the work with care through to handover.
              </p>
              <p>
                Our promise is simple: <strong className="font-semibold text-forest">see your home in 3D first and start work only if you like it.</strong>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-forest">
        <div className="container-x">
          <SectionHeading dark eyebrow="Why Akarsh Interiors" title="Our Approach" align="center" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.06} className="rounded-[var(--radius-card)] border border-ivory/10 bg-forest-700 p-7">
                <span className="grid size-12 place-items-center rounded-full bg-gold text-forest">
                  <Icon name={w.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-xl text-ivory">{w.title}</h3>
                <p className="mt-2 text-sm text-ivory/70">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="Our Team" title="The People Behind Your Home" />
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((t) => (
                <li key={t.name} className="card overflow-hidden">
                  <div className="relative aspect-square">
                    <Image src={t.photo} alt={t.name} fill sizes="25vw" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg">{t.name}</h3>
                    <p className="text-sm text-muted">{t.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="How We Work" title="Our Process" action={<Button href="/process" variant="outline" arrow>Learn More</Button>} />
          <ProcessSteps />
        </div>
      </section>

      <section className="section bg-beige-200">
        <div className="container-x">
          <SectionHeading eyebrow="Areas Served" title="Where We Work" />
          <div className="grid gap-6 md:grid-cols-3">
            {locations.map((l) => (
              <CityCard key={l.slug} location={l} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Our Works" title="Featured Projects" action={<Button href="/projects" variant="forest" arrow>View All</Button>} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getFeaturedProjects(3).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
