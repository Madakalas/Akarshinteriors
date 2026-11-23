import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Home, MapPin, Ruler } from "lucide-react";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ProjectHeroGallery } from "@/components/project/ProjectHeroGallery";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { VideoPlayer } from "@/components/project/VideoPlayer";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { ImageComparisonSlider } from "@/components/ui/ImageComparisonSlider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cityName } from "@/data/locations";
import { getProject, getProjects, getRelatedProjects } from "@/data/projects";
import { roomLabel } from "@/data/rooms";
import { getService } from "@/data/services";
import { getVideosForProject } from "@/data/videos";
import type { RoomKey } from "@/lib/types";

const roomIcon: Record<RoomKey, string> = {
  "living-room": "sofa",
  bedroom: "bed",
  kitchen: "kitchen",
  dining: "armchair",
  wardrobe: "wardrobe",
  "tv-unit": "tv",
  pooja: "lamp",
  other: "home",
};

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.city ? `${p.title} — ${cityName(p.city)}` : p.title,
    description: `${p.category} by Akarsh Interiors${p.city ? ` in ${cityName(p.city)}` : ""}. ${p.description}`,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { images: [p.coverImage] },
  };
}

async function ProjectContent({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const city = cityName(p.city);
  const label = city ? `${p.title} — ${city}` : p.title;
  const videos = [
    ...p.videos.map((v) => ({ id: v.id, src: v.url, poster: v.thumbnail, title: v.altText })),
    ...getVideosForProject(p.slug).map((v) => ({ id: v.slug, src: v.src, poster: v.poster, title: v.title })),
  ];
  const related = getRelatedProjects(p);

  const facts = [
    city ? { icon: MapPin, label: "Location", value: city } : null,
    { icon: Home, label: "Property", value: p.propertyType },
    p.stage === "design" ? { icon: Ruler, label: "Stage", value: "3D Design" } : null,
    p.areaSqFt ? { icon: Ruler, label: "Area", value: `${p.areaSqFt.toLocaleString("en-IN")} sq.ft` } : null,
    p.completionDate ? { icon: CalendarDays, label: "Completed", value: p.completionDate } : null,
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string }[];

  return (
    <>
      <section className="bg-beige-200">
        <div className="container-x py-10 lg:py-14">
          <Breadcrumbs items={[{ label: "Our Works", href: "/projects" }, { label }]} />
          <Reveal>
            <ProjectHeroGallery
              images={p.gallery}
              badge={
                p.stage === "design" ? (
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold text-forest">3D Design Visual</span>
                ) : p.sample ? (
                  <span className="absolute left-4 top-4 rounded-full bg-forest/85 px-3 py-1 text-xs font-semibold text-gold-300">Sample — placeholder photos</span>
                ) : undefined
              }
            />
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <span className="eyebrow mb-4">{p.category}</span>
              <h1 className="text-[2.3rem] leading-tight sm:text-5xl">
                {p.title} {city && <span className="text-gold-700">– {city}</span>}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {[p.propertyType, p.areaSqFt && `${p.areaSqFt.toLocaleString("en-IN")} sq.ft`, p.category, p.style]
                  .filter(Boolean)
                  .map((t) => (
                    <span key={String(t)} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-forest">
                      {t}
                    </span>
                  ))}
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl bg-white p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                    <f.icon className="size-3.5 text-gold-700" aria-hidden /> {f.label}
                  </dt>
                  <dd className="mt-1 font-semibold text-forest">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Overview + highlights */}
      <section className="section !pb-10">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="text-3xl">Project Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{p.description}</p>
            {p.stage === "design" && (
              <p className="mt-4 rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-sm text-forest">
                The images on this page are 3D design visuals prepared for this home — this is how we let you see your interiors before
                any work begins.
              </p>
            )}
            {p.services.length > 0 && (
              <>
                <h3 className="mt-8 font-sans text-sm font-bold uppercase tracking-[0.14em] text-gold-700">Scope of work</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.services.map((slug) => {
                    const s = getService(slug);
                    return s ? (
                      <li key={slug}>
                        <Link href={s.href ?? `/services/${s.slug}`} className="inline-block rounded-full bg-beige px-4 py-2 text-sm font-medium text-forest hover:bg-gold">
                          {s.title}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl">Project Highlights</h2>
            <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {p.rooms.map((r) => (
                <li key={r} className="flex flex-col items-center rounded-2xl border border-line bg-white p-4 text-center">
                  <Icon name={roomIcon[r]} className="size-6 text-forest" />
                  <span className="mt-2 text-xs font-semibold text-forest">{roomLabel[r]}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="section scroll-mt-24 !pt-10">
        <div className="container-x">
          <SectionHeading eyebrow="Gallery" title="Room-by-Room Gallery" className="!mb-8" />
          <ProjectGallery media={p.gallery} />
        </div>
      </section>

      {videos.length > 0 && (
        <section className="section bg-forest">
          <div className="container-x">
            <SectionHeading dark eyebrow="Walkthrough" title="Video Walkthrough" />
            <div className="grid gap-6 lg:grid-cols-2">
              {videos.map((v) => (
                <VideoPlayer key={v.id} src={v.src} poster={v.poster} title={v.title} />
              ))}
            </div>
          </div>
        </section>
      )}

      {p.materials.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="Materials" title="Materials Used" />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.materials.map((m) => (
                <li key={m.category} className="card p-5">
                  <h3 className="font-sans text-base font-bold">{m.category}</h3>
                  {m.brand && <p className="mt-1 text-sm text-gold-700">{m.brand}</p>}
                  {m.detail && <p className="mt-1 text-sm text-muted">{m.detail}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {(p.challenges?.length || p.solutions?.length) && (
        <section className="section bg-white">
          <div className="container-x grid gap-8 md:grid-cols-2">
            {p.challenges?.length ? (
              <div className="rounded-[24px] bg-beige-200 p-8">
                <h2 className="text-2xl">Design Challenges</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">{p.challenges.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
            ) : null}
            {p.solutions?.length ? (
              <div className="rounded-[24px] bg-forest p-8 text-ivory">
                <h2 className="text-2xl text-ivory">Our Solutions</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-ivory/80">{p.solutions.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {p.beforeAfter?.length ? (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="Transformation" title="Before & After" />
            <div className="grid gap-8 lg:grid-cols-2">
              {p.beforeAfter.map((ba) => (
                <figure key={ba.after}>
                  <ImageComparisonSlider before={ba.before} after={ba.after} alt={ba.caption} className="aspect-[4/3]" />
                  <figcaption className="mt-3 text-sm text-muted">{ba.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section bg-beige-200">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <span className="eyebrow mb-5">Get Started</span>
            <h2 className="text-[2.2rem] leading-tight sm:text-5xl">Love This Design? Let&apos;s Create Yours.</h2>
            <p className="mt-4 text-lg text-muted">
              Tell us about your home{city ? ` in ${city} or nearby` : ""} and we&apos;ll plan a free site visit.
            </p>
          </div>
          <div className="card p-6 sm:p-8">
            <ConsultationForm defaultCity={city} sourcePage={`/projects/${p.slug}`} submitLabel="Request a Similar Design" />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading eyebrow="More Projects" title="Related Projects" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProjectCard key={r.id} project={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ConsultationCTA image={p.coverImage} />
    </>
  );
}

/**
 * The shell stays URL-independent so it can be prefetched once and reused for every link;
 * the params-dependent content streams in inside Suspense (instant navigation).
 */
export default function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}
