/**
 * Central business configuration.
 * Everything here is shown publicly — keep it limited to verified facts.
 */
export interface Address {
  label: string;
  /** Matching city page in data/locations.ts. */
  locationSlug?: string;
  street: string;
  city: string;
  state: string;
  postalCode?: string;
}

export function formatAddress(a: Address) {
  return `${a.street}, ${a.city}, ${a.state}${a.postalCode ? ` ${a.postalCode}` : ""}`;
}

export function mapsLink(a: Address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddress(a))}`;
}

export const site = {
  name: "Akarsh Interiors",
  legalName: "Akarsh Interiors",
  tagline: "Design. Build. Transform.",
  promise: "See your home in 3D first and start work only if you like it.",
  description:
    "Akarsh Interiors designs and executes personalised home interiors — modular kitchens, wardrobes, TV units, pooja units, false ceilings and complete homes — across Andhra Pradesh and Hyderabal.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://akarshinteriors.com",

  phone: "+91 96663 06868",
  phoneHref: "tel:+919666306868",
  whatsappNumber: "919666306868",

  /** Only add an email once it is verified and monitored. */
  email: null as string | null,
  /** Addresses supplied by Akarsh Interiors. Shown on Contact, in the footer, on matching city pages and in structured data. */
  addresses: [
    {
      label: "Anantapur",
      locationSlug: "anantapur",
      street: "Housing Board Colony",
      city: "Anantapuramu",
      state: "Andhra Pradesh",
    },
    {
      label: "Hyderabad – Panjagutta",
      locationSlug: "hyderabad",
      street: "Flat No. 101, Sri Devi Apartments, Dwarakapuri Colony, Panjagutta",
      city: "Hyderabad",
      state: "Telangana",
    },
    {
      label: "Hyderabad – Red Hills",
      locationSlug: "hyderabad",
      street: "Kiran Apartment, Red Hills Road, Red Hills",
      city: "Hyderabad",
      state: "Telangana",
      postalCode: "500004",
    },
  ] as Address[],

  /**
   * Official logo (transparent PNG made from the supplied file; original kept in /source-assets).
   * It is designed for dark backgrounds. Set to null to fall back to a plain text wordmark.
   */
  logo: { src: "/assets/brand/akarsh-logo.png", width: 940, height: 1040 } as null | { src: string; width: number; height: number },

  /** Add profile URLs once confirmed. Empty entries are hidden. */
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },

  /**
   * Sample (placeholder) projects, photos and brand names are shown while true so the
   * layout can be reviewed. Set NEXT_PUBLIC_SHOW_SAMPLE_CONTENT=false before launch,
   * after adding real projects.
   */
  showSampleContent: process.env.NEXT_PUBLIC_SHOW_SAMPLE_CONTENT !== "false",
} as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Akarsh Interiors, I'm interested in interior design services. I would like to discuss my project.";

export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const mainNav = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Modular Kitchens", href: "/services/modular-kitchens" },
      { label: "Wardrobes & Storage", href: "/services/wardrobes" },
      { label: "Complete Home Interiors", href: "/services/complete-home-interiors" },
      { label: "TV Units", href: "/services/tv-units" },
      { label: "Pooja Units", href: "/services/pooja-units" },
      { label: "False Ceiling & Lighting", href: "/services/false-ceiling-lighting" },
      { label: "Free 3D Design", href: "/3d-design" },
      { label: "All Services", href: "/services" },
    ],
  },
  { label: "Our Works", href: "/projects" },
  {
    label: "Locations",
    href: "/locations",
    children: [
      { label: "Hyderabad", href: "/locations/hyderabad" },
      { label: "Vijayawada", href: "/locations/vijayawada" },
      { label: "Visakhapatnam", href: "/locations/visakhapatnam" },
      { label: "Tirupati", href: "/locations/tirupati" },
      { label: "Kurnool", href: "/locations/kurnool" },
      { label: "Anantapur", href: "/locations/anantapur" },
      { label: "All of AP & Hyderabad", href: "/locations" },
    ],
  },
  { label: "Materials", href: "/materials" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Our Process", href: "/process" },
      { label: "Free 3D Design", href: "/3d-design" },
    ],
  },
  { label: "Contact", href: "/contact" },
] as const;

export type NavItem = (typeof mainNav)[number];
