import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BackToTop } from "@/components/motion/BackToTop";
import { MobileActionBar } from "@/components/motion/MobileActionBar";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { getLocations } from "@/data/locations";
import { site } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Akarsh Interiors — Home Interiors across Andhra Pradesh & Hyderabad",
    template: "%s | Akarsh Interiors",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/assets/projects/villa-interiors/sofa-back-wall.jpg", width: 1494, height: 1053, alt: "Villa living area designed by Akarsh Interiors" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#102D27",
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  url: site.url,
  telephone: "+919666306868",
  description: site.description,
  areaServed: [
    { "@type": "State", name: "Andhra Pradesh" },
    { "@type": "City", name: "Hyderabad" },
    ...getLocations()
      .filter((l) => l.slug !== "hyderabad")
      .map((l) => ({ "@type": "City", name: l.city })),
  ],
  ...(site.email ? { email: site.email } : {}),
  ...(site.addresses.length
    ? {
        address: site.addresses.map((a) => ({
          "@type": "PostalAddress",
          streetAddress: a.street,
          addressLocality: a.city,
          addressRegion: a.state,
          ...(a.postalCode ? { postalCode: a.postalCode } : {}),
          addressCountry: "IN",
        })),
      }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${manrope.variable} antialiased`}>
      <body className="flex min-h-screen flex-col pb-[calc(60px+env(safe-area-inset-bottom))] sm:pb-0">
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-semibold focus:text-forest"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppButton />
        <BackToTop />
        <MobileActionBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
      </body>
    </html>
  );
}
