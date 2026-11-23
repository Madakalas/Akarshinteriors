import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { ServiceHeroCarousel } from "@/components/sections/ServiceHeroCarousel";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { OfferStrip } from "@/components/sections/OfferStrip";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceMaterials } from "@/components/finishes/ServiceMaterials";
import { getProjectsByRooms } from "@/data/projects";
import { getService, services } from "@/data/services";
import { whatsappLink } from "@/lib/site";
import { getVideosByRooms } from "@/data/videos";
import { VideoShowcase } from "@/components/project/VideoShowcase";

export function generateStaticParams() {
  return services.filter((s) => !s.href).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.title} in Andhra Pradesh & Hyderabad`,
    description: s.description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { images: [s.coverImage] },
  };
}

async function ServiceContent({ params }: Pick<PageProps<"/services/[slug]">, "params">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s || s.href) notFound();

  const related = getProjectsByRooms(s.rooms, undefined, 3);
  const walkthroughs = getVideosByRooms(s.rooms, 3);
  const others = services.filter((o) => o.slug !== s.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-beige-200">
        <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-16">
          <Reveal className="order-2 lg:order-1">
            <ServiceHeroCarousel images={[...new Set([s.coverImage, ...s.gallery])]} title={s.title} />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: s.title }]} />
            <h1 className="text-[2.4rem] leading-[1.08] sm:text-5xl">{s.title}</h1>
            <p className="mt-2 font-serif text-xl italic text-gold-700">{s.tagline}</p>
            <p className="mt-5 text-lg leading-relaxed text-muted">{s.description}</p>
            <ul className="mt-6 grid gap-3">
              {s.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-forest">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold text-forest">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`/contact?service=${encodeURIComponent(s.title)}`} size="lg" arrow>
                {s.ctaLabel}
              </Button>
              <Button href={whatsappLink(`Hello Akarsh Interiors, I'm interested in ${s.title}. I would like to discuss my project.`)} variant="outline" size="lg">
                Ask on WhatsApp
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-10">
        <div className="container-x">
          <OfferStrip />
        </div>
      </section>

      {/* Types / layouts */}
      {s.types && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow={s.shortTitle ?? s.title} title={s.types.title} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {s.types.items.map((t, i) => (
                <Reveal key={t.name} delay={(i % 3) * 0.06} className="card group p-6 transition-colors hover:border-gold">
                  <span className="font-serif text-4xl text-gold">0{i + 1}</span>
                  <h3 className="mt-3 text-xl">{t.name}</h3>
                  <p className="mt-2 text-sm text-muted">{t.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Gallery" title={`${s.shortTitle ?? s.title} Gallery`} />
          {s.gallery.length ? (
            <ul className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-3 lg:auto-rows-[240px]">
              {s.gallery.map((g, i) => (
                <li key={g} className={`img-zoom relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                  <Image src={g} alt={`${s.title} example ${i + 1}`} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Photos coming soon" text="We're adding photographs from recent projects." />
          )}
        </div>
      </section>

      {walkthroughs.length > 0 && (
        <section className="section bg-forest">
          <div className="container-x">
            <SectionHeading dark eyebrow="3D Walkthroughs" title="See It in 3D" action={<Button href="/3d-design#walkthroughs" arrow>All Walkthroughs</Button>} />
            <VideoShowcase items={walkthroughs} dark />
          </div>
        </section>
      )}

      {/* Features + accessories */}
      {(s.features || s.accessories) && (
        <section className="section">
          <div className="container-x grid gap-8 lg:grid-cols-2">
            {([s.features, s.accessories].filter(Boolean) as { title: string; items: string[]; note?: string }[]).map((block) => (
              <Reveal key={block.title} className="rounded-[24px] bg-forest p-8 text-ivory sm:p-10">
                <h2 className="text-3xl text-ivory">{block.title}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {block.items.map((it) => (
                    <li key={it} className="flex items-center gap-3">
                      <span className="grid size-6 place-items-center rounded-full bg-gold/20 text-gold">
                        <Check className="size-3.5" strokeWidth={3} aria-hidden />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
                {block.note && <p className="mt-6 text-xs text-ivory/60">{block.note}</p>}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Planning */}
      {s.planning && (
        <section className="section bg-beige-200">
          <div className="container-x">
            <SectionHeading eyebrow="Planning" title={s.planning.title} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {s.planning.items.map((p) => (
                <Reveal key={p.name} className="card p-6">
                  <h3 className="text-lg">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted">{p.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Materials & Finishes — from the Materials page */}
      <ServiceMaterials slug={s.slug} serviceTitle={s.title} />

      {/* Related projects */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Works"
            title={`Related Projects`}
            action={<Button href={`/projects?room=${s.rooms[0] ?? ""}`} variant="forest" arrow>View All</Button>}
          />
          {related.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <EmptyState title="Projects coming soon" text={`We'll add completed ${s.title.toLowerCase()} projects here soon.`} />
          )}
        </div>
      </section>

      {/* FAQ + form */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading eyebrow="FAQs" title="Questions, Answered" className="!mb-8" />
            {s.faqs?.length ? (
              <FAQAccordion items={s.faqs} />
            ) : (
              <p className="text-muted">Have a question about {s.title.toLowerCase()}? Call or WhatsApp us — we&apos;re happy to help.</p>
            )}
          </div>
          <div className="card h-fit p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl">{s.ctaHeading}</h2>
            <p className="mb-6 mt-2 text-sm text-muted">Share a few details and we&apos;ll get in touch.</p>
            <ConsultationForm defaultService={s.title} submitLabel={s.ctaLabel} sourcePage={`/services/${s.slug}`} />
          </div>
        </div>
      </section>

      <section className="section bg-beige-200">
        <div className="container-x">
          <SectionHeading eyebrow="More Services" title="Explore Other Services" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <ServiceCard key={o.slug} service={o} showDescription={false} />
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA title={s.ctaHeading} ctaLabel={s.ctaLabel} ctaHref={`/contact?service=${encodeURIComponent(s.title)}`} image={s.coverImage} />
    </>
  );
}

/**
 * The shell stays URL-independent so it can be prefetched once and reused for every link;
 * the params-dependent content streams in inside Suspense (instant navigation).
 */
export default function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}
