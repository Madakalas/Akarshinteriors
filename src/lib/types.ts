export type RoomKey =
  | "living-room"
  | "bedroom"
  | "kitchen"
  | "dining"
  | "wardrobe"
  | "tv-unit"
  | "pooja"
  | "other";

export type PropertyType = "2 BHK" | "3 BHK" | "4 BHK" | "Villa" | "Independent House" | "Other";
export type DesignStyle = "Modern" | "Contemporary" | "Minimalist" | "Luxury" | "Traditional";
export type CitySlug = string;

export interface ProjectMedia {
  id: string;
  type: "image" | "video";
  url: string;
  /** Poster image for videos. */
  thumbnail?: string;
  altText: string;
  room: RoomKey;
  caption?: string;
  sortOrder: number;
}

export interface ProjectMaterial {
  category: string;
  /** Only fill when documented for this project. */
  brand?: string;
  detail?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Leave undefined until the location is confirmed. */
  city?: CitySlug;
  propertyType: PropertyType;
  /** "design" = 3D design visuals (not photos of completed work). */
  stage?: "completed" | "design";
  /** Only fill when verified. */
  style?: DesignStyle;
  areaSqFt?: number;
  category: string;
  description: string;
  coverImage: string;
  gallery: ProjectMedia[];
  videos: ProjectMedia[];
  rooms: RoomKey[];
  materials: ProjectMaterial[];
  /** Service slugs. */
  services: string[];
  completionDate?: string;
  challenges?: string[];
  solutions?: string[];
  /** Only real, matching pairs. */
  beforeAfter?: { before: string; after: string; caption: string }[];
  featured: boolean;
  published: boolean;
  /** Placeholder content — hidden when NEXT_PUBLIC_SHOW_SAMPLE_CONTENT=false. */
  sample?: boolean;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  tagline: string;
  heroHeading: string;
  description: string;
  coverImage: string;
  gallery: string[];
  icon: string;
  benefits: string[];
  /** Rooms used to find related projects. */
  rooms: RoomKey[];
  relatedProjects?: string[];
  /** Optional rich sections — rendered only when present. */
  types?: { title: string; items: { name: string; text: string }[] };
  features?: { title: string; items: string[] };
  accessories?: { title: string; items: string[]; note?: string };
  planning?: { title: string; items: { name: string; text: string }[] };
  faqs?: FAQ[];
  ctaLabel: string;
  ctaHeading: string;
  /** If set, the card links here instead of /services/[slug]. */
  href?: string;
}


export interface Location {
  slug: CitySlug;
  city: string;
  state: string;
  region: "Rayalaseema" | "Coastal Andhra" | "Telangana";
  intro: string;
  description: string;
  coverImage?: string;
  /** Landmark shown in the photo, e.g. "Konda Reddy Fort". */
  coverCaption?: string;
  /** Required for openly licensed photos (CC BY-SA etc.). */
  coverCredit?: { author: string; license: string; licenseUrl: string; sourceUrl: string };
  availableServices: string[];
  faqs: FAQ[];
  active: boolean;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  service: string;
  propertyType?: string;
  area?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  sourcePage: string;
  createdAt: string;
  status: "new" | "contacted" | "qualified" | "closed";
}
