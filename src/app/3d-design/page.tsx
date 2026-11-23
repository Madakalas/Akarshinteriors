import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Icon } from "@/components/ui/Icon";
import { ImageComparisonSlider } from "@/components/ui/ImageComparisonSlider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoShowcase } from "@/components/project/VideoShowcase";
import { videos } from "@/data/videos";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Free 3D Interior Design",
  description: "See your home in 3D before work begins. Request a free 3D interior design from Akarsh Interiors anywhere in Andhra Pradesh or Hyderabad.",
  alternates: { canonical: "/3d-design" },
};

const benefits = [
  { icon: "design", title: "Visualise room layouts", text: "See how furniture, storage and circulation work together." },
  { icon: "materials", title: "Explore finish combinations", text: "Compare colours, laminates and textures side by side." },
  { icon: "check", title: "Review design concepts", text: "Walk through each room before anything is built." },
  { icon: "consult", title: "Discuss changes", text: "Request revisions until the design feels right." },
  { icon: "handover", title: "Finalise with confidence", text: "Approve the direction, then move to execution." },
];

const drawings = [
  { key: "kitchen", title: "Modular kitchen" },
  { key: "tv-unit", title: "TV unit" },
  { key: "wardrobe", title: "Wardrobe with display niches" },
  { key: "pooja", title: "Pooja unit" },
  { key: "bedroom-wardrobe", title: "Bedroom wardrobe" },
];

const journey = ["Share your requirements", "Discuss the space", "Review design possibilities", "Finalise your design direction", "Proceed with the approved work"];

const faqs = [
  { q: "Is the 3D design really free?", a: "Yes — we offer a free 3D design as part of our consultation. The scope (number of rooms and revisions) and any conditions are explained when you book." },
  { q: "Do I have to proceed after seeing the design?", a: "No. Our promise is that you see your home in 3D first and start work only if you like it." },
  { q: "What do you need from me?", a: "Your requirements, a floor plan if available, and access for a site visit so we can take accurate measurements." },
];

export default function ThreeDDesignPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-beige-200">
        <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-[1fr_1.15fr] lg:py-20">
          <Reveal>
            <Breadcrumbs items={[{ label: "Free 3D Design" }]} />
            <span className="eyebrow mb-5">Free 3D Design</span>
            <h1 className="text-[2.4rem] leading-[1.08] sm:text-5xl lg:text-6xl">Visualize Your Home Before We Build It.</h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Get a realistic 3D design of your space, make changes and start the work only if you&apos;re completely happy.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {["Realistic 3D views", "Multiple design options", "Material & colour preview", "No obligation to proceed"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 font-medium text-forest">
                  <span className="grid size-6 place-items-center rounded-full bg-gold">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Button href="#request" size="lg" className="mt-8" arrow>
              Request Free 3D Design
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageComparisonSlider
              before="/assets/projects/villa-interiors/master-bedroom-1.jpg"
              after="/assets/projects/villa-interiors/master-bedroom-1.jpg"
              beforeLabel="Concept"
              afterLabel="3D Visual"
              alt="Illustrative living room design"
              sketchBefore
              className="aspect-[4/3] shadow-[var(--shadow-lift)]"
            />
            <p className="mt-3 text-xs text-muted">Villa master bedroom 3D design — the left side is shown as a sketch for illustration.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Key Benefits" title="Why Design in 3D First?" align="center" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06} className="card p-6">
                <span className="grid size-12 place-items-center rounded-full bg-beige text-forest">
                  <Icon name={b.icon} className="size-5" />
                </span>
                <h3 className="mt-4 text-lg">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-forest">
        <div className="container-x">
          <SectionHeading dark eyebrow="Design Journey" title="Five Simple Steps" align="center" />
          <ol className="grid gap-4 md:grid-cols-5">
            {journey.map((j, i) => (
              <Reveal as="li" key={j} delay={i * 0.08} className="relative rounded-2xl border border-ivory/10 bg-forest-700 p-6">
                <span className="font-serif text-5xl text-gold">0{i + 1}</span>
                <p className="mt-3 font-semibold text-ivory">{j}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="walkthroughs" className="section scroll-mt-20 bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="3D Walkthroughs"
            title="Interior Walkthroughs"
            description="Press play to walk through 3D interior designs created by our team."
          />
          <VideoShowcase items={videos.filter((v) => v.kind === "interior")} />
          <h3 className="mb-6 mt-16 text-2xl">Exterior Visualisations</h3>
          <VideoShowcase items={videos.filter((v) => v.kind === "exterior")} className="lg:grid-cols-4" />
        </div>
      </section>

      <section className="section bg-beige-200">
        <div className="container-x">
          <SectionHeading
            eyebrow="3D + 2D Drawings"
            title="From 3D Visual to Working Drawing"
            description="Once you approve the 3D design, we prepare measured 2D drawings for each unit, so what gets built matches what you approved."
          />
          <ul className="grid gap-6 md:grid-cols-2">
            {drawings.map((d) => (
              <li key={d.key} className="card overflow-hidden">
                <div className="grid grid-cols-2 gap-px bg-line">
                  <div className="relative aspect-[4/3] bg-white">
                    <Image src={`/assets/3d-design/${d.key}-3d.webp`} alt={`${d.title} 3D design`} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
                    <span className="absolute left-2 top-2 rounded-full bg-forest/90 px-2.5 py-0.5 text-[0.65rem] font-bold text-gold-300">3D</span>
                  </div>
                  <div className="relative aspect-[4/3] bg-white">
                    <Image src={`/assets/3d-design/${d.key}-2d.webp`} alt={`${d.title} 2D working drawing with dimensions`} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-contain p-2" />
                    <span className="absolute left-2 top-2 rounded-full bg-white px-2.5 py-0.5 text-[0.65rem] font-bold text-forest ring-1 ring-line">2D</span>
                  </div>
                </div>
                <p className="px-5 py-4 font-semibold text-forest">{d.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Design Showcase" title="Villa Interiors in 3D" action={<Button href="/projects/villa-interiors" variant="forest" arrow>View Project</Button>} />
          <ul className="grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4 lg:auto-rows-[220px]">
            {["sofa-back-wall", "pooja-door-wall", "master-bedroom-1-wardrobe", "dining-area", "home-theatre-wall", "master-bedroom-2"].map((f, i) => (
              <li key={f} className={`img-zoom relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <Image src={`/assets/projects/villa-interiors/${f}.jpg`} alt={`Villa ${f.replace(/-/g, " ")} 3D design`} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="request" className="section scroll-mt-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="FAQs" title="About the Free 3D Design" className="!mb-8" />
            <FAQAccordion items={faqs} />
          </div>
          <div className="card h-fit p-6 sm:p-8">
            <h2 className="text-2xl">Request Your Free 3D Design</h2>
            <p className="mb-6 mt-2 text-sm text-muted">Tell us about your space and we&apos;ll be in touch.</p>
            <ConsultationForm variant="full" defaultService="3D Interior Design" submitLabel="Request Free 3D Design" sourcePage="/3d-design" />
          </div>
        </div>
      </section>

      <ConsultationCTA title="See Your Home in 3D First." ctaLabel="Request Free 3D Design" ctaHref="#request" />
    </>
  );
}
