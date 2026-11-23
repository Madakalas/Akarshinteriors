import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { getLocations } from "@/data/locations";
import { services, serviceHref } from "@/data/services";
import { site, whatsappLink } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";
import { Logo } from "./Logo";
import { AddressCard } from "@/components/sections/AddressCard";
import { WhatsAppGlyph } from "./WhatsAppButton";

const explore = [
  { label: "Our Works", href: "/projects" },
  { label: "Materials & Brands", href: "/materials" },
  { label: "Our Process", href: "/process" },
  { label: "Free 3D Design", href: "/3d-design" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  const social = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="relative overflow-hidden bg-forest text-ivory/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <Logo size="lg" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Personalised home interiors — designed in 3D, built with care. Serving homeowners across Andhra Pradesh and Hyderabad.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-2.5 text-sm hover:border-gold hover:text-gold">
              <Phone className="size-4" aria-hidden /> {site.phone}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-2.5 text-sm hover:border-gold hover:text-gold"
            >
              <WhatsAppGlyph className="size-4" /> WhatsApp
            </a>
          </div>
          {site.addresses.length > 0 && (
            <ul className="mt-8 grid gap-4" aria-label="Our addresses">
              {site.addresses.map((a) => (
                <li key={a.label}>
                  <AddressCard address={a} dark compact />
                </li>
              ))}
            </ul>
          )}
          {site.email && (
            <a href={`mailto:${site.email}`} className="mt-4 block text-sm hover:text-gold">
              {site.email}
            </a>
          )}
          {social.length > 0 && (
            <ul className="mt-6 flex gap-4 text-sm">
              {social.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-gold">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <FooterCol title="Services">
          {services.slice(0, 8).map((s) => (
            <FooterLink key={s.slug} href={serviceHref(s)}>
              {s.title}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Explore">
          {explore.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Service Area">
          {getLocations().map((l) => (
            <li key={l.slug}>
              <Link href={`/locations/${l.slug}`} className="inline-flex items-center gap-2 text-sm hover:text-gold">
                <MapPin className="size-3.5 text-gold" aria-hidden /> {l.city}
              </Link>
            </li>
          ))}
        </FooterCol>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/60 sm:flex-row">
          <p>© <CurrentYear /> {site.legalName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-gold">{title}</h2>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm transition-colors hover:text-gold">
        {children}
      </Link>
    </li>
  );
}
