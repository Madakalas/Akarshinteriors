import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/project/ProjectExplorer";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { getLocations } from "@/data/locations";
import { getProjects } from "@/data/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Works — Interior Projects",
  description: "Explore homes designed and built by Akarsh Interiors across Andhra Pradesh and Hyderabad — kitchens, wardrobes, living rooms and complete homes.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjects();
  const cities = getLocations().map((l) => ({ slug: l.slug, city: l.city }));

  return (
    <>
      <section className="relative overflow-hidden bg-beige-200">
        <div className="pointer-events-none absolute -left-40 top-0 size-[480px] rounded-full bg-gold/15 blur-3xl" />
        <div className="container-x relative py-12 lg:py-20">
          <Reveal className="max-w-3xl">
            <Breadcrumbs items={[{ label: "Our Works" }]} />
            <span className="eyebrow mb-5">Our Works</span>
            <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl">
              Our Works. <span className="italic text-gold-700">Your Inspiration.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">Explore spaces we&apos;ve designed and brought to life.</p>
          </Reveal>
        </div>
      </section>

      <section className="section !pt-12">
        <div className="container-x">
          {site.showSampleContent && projects.some((p) => p.sample) && (
            <p className="mb-6 rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-sm text-forest">
              Projects marked <strong>Sample</strong> use placeholder photography and will be replaced with completed Akarsh Interiors projects.
            </p>
          )}
          {projects.length === 0 ? (
            <EmptyState title="Our portfolio is being updated" text="New project photographs are on the way. Message us on WhatsApp to see recent work." />
          ) : (
            <ProjectExplorer projects={projects} cities={cities} />
          )}
        </div>
      </section>

      <ConsultationCTA title="Love What You See? Let's Create Yours." />
    </>
  );
}
