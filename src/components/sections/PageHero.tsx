import Image from "next/image";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

/** Standard inner-page hero: ivory panel with heading left and image right. */
export function PageHero({ eyebrow, title, description, crumbs, image, imageAlt = "", children }: Props) {
  return (
    <section className="relative overflow-hidden bg-beige-200">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-gold/15 blur-3xl" />
      <div className="container-x relative grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        <Reveal>
          <Breadcrumbs items={crumbs} />
          <span className="eyebrow mb-5">{eyebrow}</span>
          <h1 className="text-[2.4rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem]">{title}</h1>
          {description && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{description}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
        {image && (
          <Reveal delay={0.15} className="relative">
            <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-[24px] shadow-[var(--shadow-lift)]">
              <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 z-0 hidden h-24 w-24 rounded-2xl border-2 border-gold/60 lg:block" />
          </Reveal>
        )}
      </div>
    </section>
  );
}
