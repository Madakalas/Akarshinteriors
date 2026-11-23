import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppGlyph } from "@/components/layout/WhatsAppButton";
import { site, whatsappLink } from "@/lib/site";

interface Props {
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  whatsappMessage?: string;
}

export function ConsultationCTA({
  title = "Your Dream Home Starts With a Conversation.",
  text = "Tell us about your space. We'll visit, understand your needs and show you the design in 3D before any work begins.",
  ctaLabel = "Book Free Consultation",
  ctaHref = "/contact",
  image = "/assets/projects/villa-interiors/sofa-back-wall.jpg",
  whatsappMessage,
}: Props) {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal className="grain relative isolate overflow-hidden rounded-[28px] bg-forest px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
          <Image src={image} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest via-forest/90 to-forest/40" />
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dark mb-5">Free consultation</span>
            <h2 className="text-[2rem] leading-tight text-ivory sm:text-5xl">{title}</h2>
            <p className="mt-5 text-lg text-ivory/75">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={ctaHref} size="lg" arrow>
                {ctaLabel}
              </Button>
              <Button href={whatsappLink(whatsappMessage)} variant="outline-light" size="lg" icon={<WhatsAppGlyph className="size-5" />}>
                WhatsApp Us
              </Button>
              <Button href={site.phoneHref} variant="outline-light" size="lg" icon={<Phone className="size-4" aria-hidden />}>
                Call Now
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
