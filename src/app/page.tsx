import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ProjectCard } from "@/components/project/ProjectCard";
import { LocationsExplorer } from "@/components/map/LocationsExplorer";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { HomeHero } from "@/components/sections/HomeHero";
import { ProcessSteps } from "@/components/sections/ProcessTimeline";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { ImageComparisonSlider } from "@/components/ui/ImageComparisonSlider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLocations, SERVICE_AREA } from "@/data/locations";
import { finishes } from "@/data/finishes";
import { getFeaturedProjects, getProjects } from "@/data/projects";
import { CountUp } from "@/components/motion/CountUp";
import { ImageMarquee } from "@/components/motion/ImageMarquee";
import { RoomCarousel } from "@/components/motion/RoomCarousel";
import { rooms } from "@/data/rooms";
import { getService, services } from "@/data/services";
import { videos } from "@/data/videos";
import { VideoShowcase } from "@/components/project/VideoShowcase";
import { BrandMarquee } from "@/components/brands/BrandMarquee";

const highlights = [
  { icon: "kitchen", title: "Modular Kitchens", text: "Planned for how you cook", href: "/services/modular-kitchens" },
  { icon: "wardrobe", title: "Wardrobes", text: "Storage built to size", href: "/services/wardrobes" },
  { icon: "home", title: "Complete Home Interiors", text: "Every room, one team", href: "/services/complete-home-interiors" },
  { icon: "site", title: "Free Site Visit", text: "We measure & assess", href: "/contact" },
  { icon: "design", title: "Free 3D Design", text: "See it before we build", href: "/3d-design" },
  { icon: "quote", title: "Free Quotation", text: "Clear, itemised estimate", href: "/contact" },
];

const homeServices = ["modular-kitchens", "wardrobes", "complete-home-interiors", "false-ceiling-lighting", "tv-units", "pooja-units"];

const heroSlides = [
  { src: "/assets/projects/villa-interiors/sofa-back-wall.jpg", alt: "Villa living area with curved sofas and cove-lit ceiling", project: "Villa Interiors", href: "/projects/villa-interiors" },
  { src: "/assets/projects/i7-villa/01-living-room.webp", alt: "Living room with backlit arch panels and curved sofa", project: "I7 Villa", href: "/projects/i7-villa" },
  { src: "/assets/projects/multi-level-residence/01-living-room.webp", alt: "Double-height formal living room", project: "Multi-Level Residence", href: "/projects/multi-level-residence" },
  { src: "/assets/projects/4-bhk-apartment/01-living-room.webp", alt: "Warm living room with brown ceiling panel", project: "4 BHK Apartment", href: "/projects/4-bhk-apartment" },
];

export default function HomePage() {
  const featured = getFeaturedProjects(4);
  const locations = getLocations();
  const allProjects = getProjects();
  const designCount = allProjects.reduce((n, p) => n + p.gallery.length, 0);
  const roomItems = rooms.map((r) => ({ ...r, count: allProjects.flatMap((p) => p.gallery).filter((g) => g.room === r.key).length }));
  const marquee = allProjects
    .filter((p) => !p.sample)
    .flatMap((p) => p.gallery.slice(1, 3).map((g) => ({ src: g.url, alt: g.altText, href: `/projects/${p.slug}`, label: p.title })))
    .slice(0, 16);
  const homeMaterials = ["AK-D701", "AK-TL801", "AK-W112", "AK-TL802", "AK-S209", "AK-TL809"]
    .map((c) => finishes.find((f) => f.code === c))
    .filter((f): f is NonNullable<typeof f> => Boolean(f?.image));
  const stats = [
    { value: allProjects.length, suffix: "", label: "Home designs in our portfolio" },
    { value: designCount, suffix: "+", label: "Room-by-room 3D visuals" },
    { value: SERVICE_AREA.apDistricts, suffix: "", label: "AP districts + Hyderabad served" },
    { value: services.length, suffix: "", label: "Interior services" },
  ];

  return (
    <>
      <HomeHero slides={heroSlides} />

      {/* Quick highlights */}
      <section id="highlights" className="relative z-10 -mt-20 scroll-mt-24">
        <div className="container-x">
          <ul className="grid grid-cols-2 gap-3 rounded-[24px] border border-line bg-white p-3 shadow-[var(--shadow-lift)] sm:grid-cols-3 lg:grid-cols-6">
            {highlights.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 0.05}>
                <Link
                  href={h.href}
                  className="group flex h-full flex-col items-center rounded-2xl px-3 py-6 text-center transition-colors hover:bg-beige-200"
                >
                  <span className="grid size-14 place-items-center rounded-full bg-beige-200 text-forest transition-colors group-hover:bg-gold">
                    <Icon name={h.icon} className="size-6" />
                  </span>
                  <span className="mt-4 text-sm font-bold text-forest">{h.title}</span>
                  <span className="mt-1 text-xs text-muted">{h.text}</span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-6">
            <Link
              href="/3d-design"
              className="group flex flex-col items-center gap-5 overflow-hidden rounded-[24px] bg-beige p-3 pr-6 sm:flex-row"
            >
              <span className="relative h-36 w-full shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-56">
                <Image src="/assets/projects/duplex-home/06-kitchen.webp" alt="" fill sizes="224px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </span>
              <p className="flex-1 px-3 text-center font-serif text-2xl leading-snug text-forest sm:text-left sm:text-[1.7rem]">
                See your home in 3D first <span className="italic text-gold-700">and start work only if you like it.</span>
              </p>
              <span className="mb-3 grid size-12 shrink-0 place-items-center rounded-full bg-gold text-forest transition-transform group-hover:translate-x-1 sm:mb-0">
                <ArrowRight className="size-5" aria-hidden />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="pt-16 lg:pt-20">
        <div className="container-x">
          <ul className="grid grid-cols-2 gap-y-8 divide-line lg:grid-cols-4 lg:divide-x">
            {stats.map((st, i) => (
              <Reveal as="li" key={st.label} delay={i * 0.08} className="px-4 text-center">
                <span className="block font-serif text-5xl text-forest sm:text-6xl">
                  <CountUp to={st.value} suffix={st.suffix} />
                </span>
                <span className="mt-2 block text-sm font-medium text-muted">{st.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Services"
            title={<>End-to-End Interior Solutions <span className="italic text-gold-700">for Your Home</span></>}
            description="Thoughtfully designed interiors that balance beauty, function and everyday comfort."
            action={<Button href="/services" variant="outline" arrow>All Services</Button>}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeServices.map((slug, i) => {
              const s = getService(slug)!;
              return (
                <Reveal key={slug} delay={(i % 3) * 0.08}>
                  <ServiceCard service={s} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured works */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Works"
            title="Real Homes. Real Transformations."
            description="A look at spaces we've designed and brought to life."
            action={<Button href="/projects" variant="forest" arrow>View All Projects</Button>}
          />
          {featured.length === 0 ? (
            <EmptyState title="Projects coming soon" text="We're photographing our latest homes. Ask us on WhatsApp for recent work." />
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <Reveal className="flex [&>a]:w-full">
                <ProjectCard project={featured[0]} size="lg" priority />
              </Reveal>
              <div className="grid gap-6 sm:grid-cols-2">
                {featured.slice(1).map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.08} className={i === 2 ? "sm:col-span-2" : ""}>
                    <ProjectCard project={p} size={i === 2 ? "wide" : "md"} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Explore by room */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Explore by Room" title="Find Inspiration, Room by Room." />
        </div>
        <RoomCarousel rooms={roomItems} />
      </section>

      {/* Cities */}
      <section className="section bg-beige-200">
        <div className="container-x">
          <LocationsExplorer
            locations={locations}
            intro={
              <Reveal>
                <span className="eyebrow mb-4">Our Locations</span>
                <h2 className="text-[2rem] leading-[1.12] sm:text-4xl lg:text-[2.9rem]">Across Andhra Pradesh &amp; Hyderabad.</h2>
                <p className="mt-4 text-lg text-muted">
                  Premium interior design and execution for homes anywhere in Andhra Pradesh and in Hyderabad — with a site visit,
                  a 3D design and on-site coordination wherever your home is.
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-3 text-sm font-semibold text-forest">
                  {["Site visits in any town", "Quick response", "Personalised quotation", "On-site coordination"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold">
                        <Check className="size-3.5" strokeWidth={3} aria-hidden />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <Button href="/locations" variant="outline" className="mt-8" arrow>
                  All Locations
                </Button>
              </Reveal>
            }
          />
        </div>
      </section>

      {/* Free 3D design */}
      <section className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal>
            <ImageComparisonSlider
              before="/assets/projects/villa-interiors/living-area.jpg"
              after="/assets/projects/villa-interiors/living-area.jpg"
              beforeLabel="Concept"
              afterLabel="3D Visual"
              alt="Illustrative living room design"
              sketchBefore
              className="aspect-[4/3]"
            />
            <p className="mt-3 text-xs text-muted">Villa living area 3D design — the left side is shown as a sketch for illustration. Drag to compare.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow mb-5">Free 3D Design</span>
            <h2 className="text-[2.1rem] leading-tight sm:text-5xl">See Your Home Before We Build It.</h2>
            <p className="mt-5 text-lg text-muted">
              Visualise your interiors in 3D, explore design possibilities, and move forward with confidence.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Realistic 3D views", "Multiple design options", "Material & colour preview", "Decide before work starts"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-forest">
                  <span className="grid size-6 place-items-center rounded-full bg-gold text-forest">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-sm font-semibold">{t}</span>
                </li>
              ))}
            </ul>
            <Button href="/3d-design" size="lg" className="mt-8" arrow>
              Request Free 3D Design
            </Button>
          </Reveal>
        </div>
      </section>

      {/* 3D walkthroughs */}
      <section className="section bg-forest">
        <div className="container-x">
          <SectionHeading
            dark
            eyebrow="3D Walkthroughs"
            title="Walk Through Your Home Before It's Built."
            description="A few of the 3D walkthroughs our team creates so clients can review every detail before work begins."
            action={<Button href="/3d-design#walkthroughs" arrow>More Walkthroughs</Button>}
          />
          <VideoShowcase items={videos.filter((v) => v.kind === "interior").slice(0, 3)} dark />
        </div>
      </section>

      {/* Materials */}
      <section className="section bg-beige">
        <div className="container-x">
          <SectionHeading
            eyebrow="Materials & Brands"
            title="Premium Materials, Chosen With Care."
            description="Laminates and tiles taken from our own 3D design presentations — from temple-elephant pooja doors to inlay marble floors."
            action={<Button href="/materials#library" arrow>Browse Laminates &amp; Tiles</Button>}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {homeMaterials.map((f, i) => (
              <Reveal key={f.code} delay={i * 0.05}>
                <Link href="/materials#library" className="group block">
                  <span className="relative block aspect-square overflow-hidden rounded-2xl shadow-[var(--shadow-card)] transition-transform duration-500 group-hover:-translate-y-1">
                    <Image src={f.image!} alt={`${f.name} ${f.product.toLowerCase()}`} fill sizes="(min-width:1024px) 16vw, (min-width:768px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </span>
                  <span className="mt-3 block text-sm font-semibold text-forest group-hover:text-gold-700">{f.name}</span>
                  <span className="block text-xs text-muted">{f.product}</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 flex items-end justify-between gap-4">
            <h3 className="text-xl sm:text-2xl">Our Trusted Brands</h3>
            <Link href="/materials#brands" className="text-sm font-semibold text-forest underline-offset-4 hover:text-gold-700 hover:underline">
              View all brands
            </Link>
          </div>
          <BrandMarquee className="mt-5" />
          <p className="mt-3 text-xs text-muted">Brand names and logos are trademarks of their respective owners. No official partnership is implied.</p>
        </div>
      </section>

      {/* Design gallery strip */}
      <section className="section !pb-0">
        <div className="container-x">
          <SectionHeading
            eyebrow="Design Gallery"
            title="A Glimpse of Our Designs."
            action={<Button href="/projects" variant="outline" arrow>Browse All</Button>}
          />
        </div>
        <ImageMarquee items={marquee} />
      </section>

      {/* Process */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our Process"
            title="A Simple & Transparent Journey."
            description="From idea to handover, we make your interior experience smooth and stress-free."
          />
          <Reveal>
            <ProcessSteps />
          </Reveal>
          <div className="mt-12 text-center">
            <Button href="/process" variant="outline" arrow>
              See How We Work
            </Button>
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
