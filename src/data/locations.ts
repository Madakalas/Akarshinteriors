import type { Location } from "@/lib/types";

/**
 * Akarsh Interiors works across all of Andhra Pradesh and in Hyderabad.
 * The cities below get their own pages (and map pins) for local search; any other town in
 * Andhra Pradesh or the Hyderabad area is still served — see `SERVICE_AREA`.
 * No office addresses or local project counts are listed until verified.
 */
export const SERVICE_AREA = {
  short: "Andhra Pradesh & Hyderabad",
  long: "all of Andhra Pradesh and Hyderabad",
  /** AP has 26 districts since the 2022 reorganisation. */
  apDistricts: 26,
};

const ALL_SERVICES = [
  "complete-home-interiors",
  "modular-kitchens",
  "wardrobes",
  "tv-units",
  "pooja-units",
  "false-ceiling-lighting",
  "bedroom-interiors",
  "living-room-interiors",
  "custom-furniture",
];

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;
const BY_SA_3 = { license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0" };
const BY_SA_4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" };

const allLocations: Location[] = [
  {
    slug: "anantapur",
    city: "Anantapur",
    state: "Andhra Pradesh",
    region: "Rayalaseema",
    intro: "Interior design and execution for homes in Anantapur.",
    coverImage: "/assets/locations/anantapur.webp",
    coverCaption: "ISKCON Temple, Anantapur",
    coverCredit: { author: "Maheshrig", ...BY_SA_3, sourceUrl: commons("Iskcon_Anantapur.JPG") },
    description:
      "From a single modular kitchen to a complete home, we plan, design and execute interiors for homeowners in Anantapur — starting with a site visit and a 3D design you can review before any work begins.",
    availableServices: ALL_SERVICES,
    faqs: [
      {
        q: "Do you provide site visits in Anantapur?",
        a: "Yes. Share your location and a convenient time and our team will arrange a visit to measure the space and understand your requirements.",
      },
      {
        q: "Can I see a design before work starts?",
        a: "Yes. We prepare a 3D design for your review, and work begins only after you approve the design and quotation.",
      },
    ],
    active: true,
  },
  {
    slug: "kurnool",
    city: "Kurnool",
    state: "Andhra Pradesh",
    region: "Rayalaseema",
    intro: "Personalised home interiors for families in Kurnool.",
    coverImage: "/assets/locations/kurnool.webp",
    coverCaption: "Konda Reddy Fort, Kurnool",
    coverCredit: {
      author: "Nehareddy17",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      sourceUrl: commons("Konda_Reddy_Fort_Kurnool.jpg"),
    },
    description:
      "We work with homeowners in Kurnool on kitchens, wardrobes, living spaces and complete home interiors — with clear material choices, a reviewed 3D design and coordinated execution on site.",
    availableServices: ALL_SERVICES,
    faqs: [
      {
        q: "Do you take up single-room projects in Kurnool?",
        a: "Yes. We handle individual rooms such as a modular kitchen or bedroom wardrobes, as well as complete homes.",
      },
      {
        q: "How do I book a consultation?",
        a: "Call or WhatsApp us, or use the enquiry form on this page. We'll get back to you to plan the next steps.",
      },
    ],
    active: true,
  },
  {
    slug: "nandyal",
    city: "Nandyal",
    state: "Andhra Pradesh",
    region: "Rayalaseema",
    intro: "Thoughtfully designed interiors for homes in Nandyal.",
    coverImage: "/assets/locations/nandyal.webp",
    coverCaption: "Mahanandi Temple, Nandyal district",
    coverCredit: { author: "Adityamadhav83", ...BY_SA_3, sourceUrl: commons("Mahanandi_Temple_View.jpg") },
    description:
      "Planning a new home or renovating an existing one in Nandyal? We help you design functional, elegant spaces and manage execution from material selection to handover.",
    availableServices: ALL_SERVICES,
    faqs: [
      {
        q: "Do you serve customers in Nandyal?",
        a: "Yes. We serve Nandyal and the surrounding towns, along with the rest of Andhra Pradesh and Hyderabad.",
      },
      {
        q: "Can you work with an under-construction home?",
        a: "Yes. Planning interiors early helps coordinate electrical points, lighting and ceiling work. Contact us to discuss your project stage.",
      },
    ],
    active: true,
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    region: "Telangana",
    intro: "Complete home interiors and modular kitchens in Hyderabad.",
    coverImage: "/assets/locations/hyderabad.webp",
    coverCaption: "Buddha Statue, Hussain Sagar",
    coverCredit: { author: "Nikhilb239", ...BY_SA_4, sourceUrl: commons("Hussain_Sagar_Buddha_Statue.JPG") },
    description:
      "Apartments, villas and independent houses across Hyderabad — we design every room in 3D, help you choose materials and coordinate execution on site until handover.",
    availableServices: ALL_SERVICES,
    faqs: [
      {
        q: "Do you take up projects in Hyderabad?",
        a: "Yes. We work across Hyderabad and its surrounding areas — from a single modular kitchen to complete home interiors.",
      },
      {
        q: "Can you design interiors for a new apartment before handover?",
        a: "Yes. Planning early helps coordinate electrical points, lighting and ceiling work. Share your floor plan and we'll start with a 3D design.",
      },
    ],
    active: true,
  },
  {
    slug: "vijayawada",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    region: "Coastal Andhra",
    intro: "Modern, functional interiors for homes in Vijayawada.",
    coverImage: "/assets/locations/vijayawada.webp",
    coverCaption: "Prakasam Barrage & Indrakeeladri",
    coverCredit: { author: "iMahesh", ...BY_SA_4, sourceUrl: commons("Indrakeeladri_and_Prakasam_Barrage_from_Tadepalli_(02).jpg") },
    description:
      "We design and execute home interiors in Vijayawada — modular kitchens, wardrobes, TV units and complete homes — with a 3D design you approve before work begins.",
    availableServices: ALL_SERVICES,
    faqs: [
      {
        q: "Do you work in Vijayawada and nearby areas?",
        a: "Yes. We take up projects in Vijayawada and surrounding areas, and across the rest of Andhra Pradesh.",
      },
      {
        q: "Can I see a design before work starts?",
        a: "Yes. We prepare a 3D design for your review, and work begins only after you approve the design and quotation.",
      },
    ],
    active: true,
  },
  {
    slug: "visakhapatnam",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    region: "Coastal Andhra",
    intro: "Elegant, practical home interiors in Visakhapatnam.",
    coverImage: "/assets/locations/visakhapatnam.webp",
    coverCaption: "RK Beach, Visakhapatnam",
    coverCredit: { author: "Rishabh Tatiraju", ...BY_SA_3, sourceUrl: commons("RK_Beach_Visakhapatnam_Nov_2012_-_02.JPG") },
    description:
      "From apartments to independent homes in Visakhapatnam, we plan every room in 3D, help you choose the right materials and coordinate execution through to handover.",
    availableServices: ALL_SERVICES,
    faqs: [
      {
        q: "Do you take up projects in Visakhapatnam?",
        a: "Yes. We serve Visakhapatnam along with the rest of Andhra Pradesh and Hyderabad.",
      },
      {
        q: "Do you handle single rooms as well as complete homes?",
        a: "Yes. We take up individual rooms such as a modular kitchen or wardrobes, as well as complete home interiors.",
      },
    ],
    active: true,
  },
  {
    slug: "guntur",
    city: "Guntur",
    state: "Andhra Pradesh",
    region: "Coastal Andhra",
    intro: "Personalised interiors for homes in Guntur.",
    coverImage: "/assets/locations/guntur.webp",
    coverCaption: "Chilli City of India, Guntur",
    coverCredit: { author: "iMahesh", ...BY_SA_4, sourceUrl: commons("Guntur_-_Chilli_City_of_India.jpg") },
    description:
      "Whether it's a new home or a renovation in Guntur, we design functional, elegant spaces in 3D and manage the work from material selection to handover.",
    availableServices: ALL_SERVICES,
    faqs: [
      {
        q: "Do you provide site visits in Guntur?",
        a: "Yes. Share your location and a convenient time and our team will arrange a visit to understand your requirements.",
      },
      {
        q: "Can you work with an under-construction home?",
        a: "Yes. Planning interiors early helps coordinate electrical points, lighting and ceiling work.",
      },
    ],
    active: true,
  },
  {
    slug: "tirupati",
    city: "Tirupati",
    state: "Andhra Pradesh",
    region: "Rayalaseema",
    intro: "Thoughtful home interiors for families in Tirupati.",
    coverImage: "/assets/locations/tirupati.webp",
    coverCaption: "Tirupati & the Tirumala hills",
    coverCredit: { author: "Saiphani02", ...BY_SA_4, sourceUrl: commons("Aerial_view_of_Tirupati_city_and_Srinivasa_flyover.jpg") },
    description:
      "We help homeowners in Tirupati plan kitchens, wardrobes, pooja units and complete homes — designed in 3D first, then executed with coordinated on-site work.",
    availableServices: ALL_SERVICES,
    faqs: [
      {
        q: "Do you take up projects in Tirupati?",
        a: "Yes. We serve Tirupati and surrounding areas, along with the rest of Andhra Pradesh and Hyderabad.",
      },
      {
        q: "Do you design pooja units?",
        a: "Yes. Pooja units can be designed as standalone units or as part of a complete home interior.",
      },
    ],
    active: true,
  },
  {
    slug: "nellore",
    city: "Nellore",
    state: "Andhra Pradesh",
    region: "Coastal Andhra",
    intro: "Complete home interiors and modular kitchens in Nellore.",
    coverImage: "/assets/locations/nellore.webp",
    coverCaption: "Sri Ranganathaswamy Temple, Nellore",
    coverCredit: { author: "YVSREDDY", ...BY_SA_3, sourceUrl: commons("Sri_Ranganathaswamy_Temple,_Galigopuram,_Nellore_(2).jpg") },
    description:
      "Planning interiors in Nellore? We design each room in 3D, help you choose materials that suit your budget and coordinate execution until handover.",
    availableServices: ALL_SERVICES,
    faqs: [
      {
        q: "Do you serve customers in Nellore?",
        a: "Yes. We take up projects in Nellore and across Andhra Pradesh.",
      },
      {
        q: "How do I book a consultation?",
        a: "Call or WhatsApp us, or use the enquiry form on this page. We'll get back to you to plan the next steps.",
      },
    ],
    active: true,
  },
  {
    slug: "kadapa",
    city: "Kadapa",
    state: "Andhra Pradesh",
    region: "Rayalaseema",
    intro: "Functional, elegant interiors for homes in Kadapa.",
    coverImage: "/assets/locations/kadapa.webp",
    coverCaption: "Gandikota, Kadapa district",
    coverCredit: { author: "ThejeshGN", ...BY_SA_3, sourceUrl: commons("Gandikota_Gorge_(30755).jpg") },
    description:
      "From a modular kitchen to a complete home in Kadapa, we start with a site visit and a 3D design you can review before any work begins.",
    availableServices: ALL_SERVICES,
    faqs: [
      {
        q: "Do you provide site visits in Kadapa?",
        a: "Yes. Share your location and a convenient time and our team will arrange a visit.",
      },
      {
        q: "Can I see a design before work starts?",
        a: "Yes. We prepare a 3D design for your review, and work begins only after you approve the design and quotation.",
      },
    ],
    active: true,
  },
];

export function getLocations() {
  return allLocations.filter((l) => l.active);
}

export function getLocation(slug: string) {
  return getLocations().find((l) => l.slug === slug);
}

export function cityName(slug?: string) {
  if (!slug) return undefined;
  return allLocations.find((l) => l.slug === slug)?.city ?? slug;
}

export const REGIONS = ["Rayalaseema", "Coastal Andhra", "Telangana"] as const;
