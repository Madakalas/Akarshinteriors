import { dorbyFluted } from "./dorby";

/**
 * Akarsh Interiors finish library — laminates taken only from the client's PDF design presentations.
 *
 * Codes (AK-…) are Akarsh's own; the matching brand shade code is confirmed in the quotation.
 */

export type FinishProduct = "Laminate" | "Acrylic Laminate" | "Fluted Panel" | "Digital Print Laminate" | "Fluted Laminate" | "Floor Tile" | "Wall Tile";
export type DecorFamily = "Traditional & Pichwai" | "Botanical Prints" | "Patterned & Inlay" | "Wood" | "Stone & Marble" | "Solids" | "Textures & Metallics";
export type SurfaceFinish = "Matte" | "Suede" | "Super Matte" | "High Gloss" | "Textured";

export interface FinishLook {
  pattern: "wood" | "marble" | "solid" | "fluted" | "concrete" | "metal" | "linen";
  base: string;
  /** Grain / vein / texture colour. */
  tone?: string;
  /** Wood grain tightness, 1 = normal. */
  grain?: number;
}

export interface Finish {
  code: string;
  name: string;
  product: FinishProduct;
  family: DecorFamily;
  finish: SurfaceFinish;
  thickness: string;
  size: string;
  look: FinishLook;
  uses: string[];
  featured?: boolean;
  /** Close-up cut from an Akarsh Interiors 3D render (our own design work). */
  image?: string;
  /** Project the close-up comes from. */
  seenIn?: { slug: string; title: string };
  trending?: boolean;
  /** Pinned to the top of the library. */
  pinned?: boolean;
  /** Which part of the library this belongs to. */
  collection?: Collection;
  /** Brand for catalogue items (e.g. Dorby). */
  brand?: string;
  /** Official product page for brand items. */
  sourceUrl?: string;
  /** Flute profile description (brand items). */
  profile?: string;
  edgeBand?: boolean;
  /** Drawn preview for brand items (no third-party photos). */
  board?: { profile: "bamboo" | "diag-l" | "diag-r" | "section"; decor: "solid" | "wood" | "stone"; base: string; tone: string };
}

export type Collection = "Our Design Presentations" | "Dorby Fluted Laminates";

const SHEET = "8 × 4 ft";
const KITCHEN = ["Kitchen shutters", "Wardrobes", "TV units"];
const PANEL = ["Wall panelling", "TV back panels", "Bed back walls"];
const ALL = ["Kitchen shutters", "Wardrobes", "Wall panelling", "Furniture"];

const lam = (f: Omit<Finish, "product" | "thickness" | "size" | "uses"> & Partial<Finish>): Finish => ({
  product: "Laminate",
  thickness: "1 mm",
  size: SHEET,
  uses: ALL,
  ...f,
});
const acr = (f: Omit<Finish, "product" | "thickness" | "size" | "uses" | "family" | "finish"> & Partial<Finish>): Finish => ({
  product: "Acrylic Laminate",
  family: "Solids",
  finish: "High Gloss",
  thickness: "1.5 mm",
  size: SHEET,
  uses: KITCHEN,
  ...f,
});
const flute = (f: Omit<Finish, "product" | "thickness" | "size" | "uses" | "finish"> & Partial<Finish>): Finish => ({
  product: "Fluted Panel",
  finish: "Textured",
  thickness: "1 mm",
  size: SHEET,
  uses: PANEL,
  ...f,
});

const img = (f: string) => `/assets/finishes/${f}.webp`;
const P = {
  villa: { slug: "villa-interiors", title: "Villa Interiors" },
  i7: { slug: "i7-villa", title: "I7 Villa" },
  fullHouse: { slug: "full-house-interiors", title: "Full House Interiors" },
  teak: { slug: "teak-and-cane-home", title: "Teak & Cane Home" },
  blush: { slug: "blush-kitchen-home", title: "Home with Blush Kitchen" },
  multi: { slug: "multi-level-residence", title: "Multi-Level Residence" },
  navy: { slug: "navy-kitchen-home", title: "Home with Navy Kitchen" },
  theatre: { slug: "home-with-private-theatre", title: "Home with Private Theatre" },
  blue: { slug: "blue-kitchen-home", title: "Home with Blue Kitchen" },
  duplex: { slug: "duplex-home", title: "Duplex Home" },
  greyWalnut: { slug: "grey-walnut-home", title: "Grey & Walnut Home" },
  apt: { slug: "4-bhk-apartment", title: "4 BHK Apartment" },
};
const POOJA = ["Pooja doors", "Pooja walls", "Feature panels"];
const FEATURE = ["Feature walls", "Bed back panels", "TV back panels"];
const print = (f: Omit<Finish, "product" | "thickness" | "size" | "finish"> & Partial<Finish>): Finish => ({
  product: "Digital Print Laminate",
  finish: "Matte",
  thickness: "1 mm",
  size: SHEET,
  trending: true,
  ...f,
});

/**
 * Every laminate here is taken from the client's PDF design presentations (source-assets/*.pdf):
 * a close-up of the laminate as it appears in that presentation's render. Nothing is invented.
 * `seenIn` points to the project page built from the same PDF.
 */
const pdfFinishes: Finish[] = [
  // Traditional & Pichwai (must-have: elephant pooja door)
  print({ code: "AK-D701", name: "Temple Elephant Pooja Door", family: "Traditional & Pichwai", image: img("elephant-temple-pooja-door"), seenIn: P.villa, uses: POOJA, look: { pattern: "solid", base: "#e9dcc0" }, pinned: true, featured: true }),
  print({ code: "AK-D702", name: "Royal Elephant Pichwai", family: "Traditional & Pichwai", image: img("elephant-pichwai"), seenIn: P.villa, uses: POOJA, look: { pattern: "solid", base: "#e6d6ae" }, pinned: true, featured: true }),
  print({ code: "AK-D703", name: "Pichwai Kamdhenu – Teal", family: "Traditional & Pichwai", image: img("pichwai-kamdhenu-teal"), seenIn: P.villa, uses: POOJA, look: { pattern: "solid", base: "#2f7a68" }, featured: true }),
  print({ code: "AK-D704", name: "Gold Kamdhenu Om", family: "Traditional & Pichwai", finish: "Textured", image: img("gold-kamdhenu-om"), seenIn: P.i7, uses: POOJA, look: { pattern: "solid", base: "#b08a3e" }, featured: true }),
  print({ code: "AK-D705", name: "Pichwai Tile Collage", family: "Traditional & Pichwai", image: img("pichwai-tile-collage"), seenIn: P.fullHouse, uses: ["Pooja walls", "Living room feature walls"], look: { pattern: "solid", base: "#cfd8c2" } }),
  print({ code: "AK-D706", name: "Peacock Chinoiserie", family: "Botanical Prints", image: img("peacock-chinoiserie"), seenIn: P.teak, uses: FEATURE, look: { pattern: "solid", base: "#b9c8b4" }, featured: true }),
  // Botanical prints
  print({ code: "AK-D707", name: "Hummingbird Botanical", family: "Botanical Prints", image: img("hummingbird-botanical"), seenIn: P.i7, uses: FEATURE, look: { pattern: "solid", base: "#e8e3d5" } }),
  print({ code: "AK-D708", name: "Tropical Palm", family: "Botanical Prints", image: img("tropical-palm"), seenIn: P.i7, uses: FEATURE, look: { pattern: "solid", base: "#d9cbb5" } }),
  print({ code: "AK-D709", name: "Rose Leaf Print", family: "Botanical Prints", image: img("rose-leaf-print"), seenIn: P.i7, uses: FEATURE, look: { pattern: "solid", base: "#8a5a55" } }),
  // Stone & marble
  lam({ code: "AK-S208", name: "Golden Leaf Marble", family: "Stone & Marble", finish: "High Gloss", image: img("golden-leaf-marble"), seenIn: P.blush, uses: FEATURE, look: { pattern: "marble", base: "#e6d3b6", tone: "#a7804f" }, trending: true }),
  lam({ code: "AK-S209", name: "Book-matched Grey Marble", family: "Stone & Marble", finish: "High Gloss", image: img("bookmatched-grey-marble"), seenIn: P.multi, uses: FEATURE, look: { pattern: "marble", base: "#cfc8bf", tone: "#6e665e" }, trending: true, featured: true }),
  lam({ code: "AK-S210", name: "Calacatta Gold", family: "Stone & Marble", finish: "High Gloss", image: img("calacatta-gold"), seenIn: P.navy, uses: ["Crockery units", "Feature walls", "Vanity backs"], look: { pattern: "marble", base: "#f1ece4", tone: "#b89a6a" }, trending: true }),
  lam({ code: "AK-S211", name: "Grey Granite Stone", family: "Stone & Marble", finish: "High Gloss", image: img("grey-granite-stone"), seenIn: P.i7, uses: ["Kitchen islands", "Breakfast counters"], look: { pattern: "marble", base: "#9a9a96", tone: "#4e4e4b" } }),
  lam({ code: "AK-S212", name: "Terrazzo", family: "Stone & Marble", finish: "Matte", image: img("terrazzo"), seenIn: P.i7, uses: ["Kitchen backsplash", "Feature walls"], look: { pattern: "concrete", base: "#efe9e2", tone: "#8b6b5b" }, trending: true }),
  // Solids
  lam({ code: "AK-P310", name: "Cashmere Matte", family: "Solids", finish: "Super Matte", image: img("cashmere-matte"), seenIn: P.i7, uses: KITCHEN, look: { pattern: "solid", base: "#cbc3b8" }, trending: true, featured: true }),
  lam({ code: "AK-P311", name: "Blush Pink Matte", family: "Solids", finish: "Super Matte", image: img("blush-pink-matte"), seenIn: P.blush, uses: KITCHEN, look: { pattern: "solid", base: "#d9aea0" }, trending: true }),
  lam({ code: "AK-P312", name: "Powder Blue Matte", family: "Solids", finish: "Super Matte", image: img("powder-blue-matte"), seenIn: P.theatre, uses: KITCHEN, look: { pattern: "solid", base: "#a9bccb" }, trending: true }),
  lam({ code: "AK-P313", name: "Slate Blue Grey", family: "Solids", finish: "Suede", image: img("slate-blue-grey"), seenIn: P.blue, uses: KITCHEN, look: { pattern: "solid", base: "#6f7683" } }),
  lam({ code: "AK-P314", name: "Navy Blue Matte", family: "Solids", finish: "Super Matte", image: img("navy-blue-matte"), seenIn: P.navy, uses: KITCHEN, look: { pattern: "solid", base: "#3d4452" }, trending: true }),
  acr({ code: "AK-A511", name: "Bottle Green Gloss", image: img("bottle-green-gloss"), seenIn: P.duplex, look: { pattern: "solid", base: "#1f4a37" }, trending: true, featured: true }),
  lam({ code: "AK-P315", name: "Sage Green Matte", family: "Solids", finish: "Super Matte", image: img("sage-green-matte"), seenIn: P.greyWalnut, uses: KITCHEN, look: { pattern: "solid", base: "#8a9a82" }, trending: true }),
  lam({ code: "AK-P316", name: "Ivory with Navy Band", family: "Solids", finish: "Suede", image: img("ivory-navy-band"), seenIn: P.blue, uses: ["Sliding wardrobes", "Wardrobes"], look: { pattern: "solid", base: "#e5dccd" } }),
  // Wood & textures
  lam({ code: "AK-W111", name: "Walnut Veneer Panel", family: "Wood", finish: "Matte", image: img("walnut-veneer-panel"), seenIn: P.theatre, uses: ["TV back panels", "Wall panelling"], look: { pattern: "wood", base: "#8a5a36", tone: "#5c381f" }, featured: true }),
  lam({ code: "AK-W112", name: "Teak & Cane", family: "Wood", finish: "Matte", image: img("teak-and-cane"), seenIn: P.teak, uses: ["Wardrobes", "Crockery units"], look: { pattern: "wood", base: "#a5643a", tone: "#6f3f1e" }, trending: true, featured: true }),
  lam({ code: "AK-W113", name: "Walnut & Ivory", family: "Wood", finish: "Matte", image: img("walnut-and-ivory"), seenIn: P.apt, uses: ["Sliding wardrobes", "Wardrobes"], look: { pattern: "wood", base: "#6b3f25", tone: "#3e2214" } }),
  lam({ code: "AK-T405", name: "Rattan Cane Panel", family: "Textures & Metallics", finish: "Textured", image: img("rattan-cane-panel"), seenIn: P.teak, uses: ["Partitions", "Shutters", "Pooja doors"], look: { pattern: "linen", base: "#c9a36b", tone: "#8b6a3a" }, trending: true }),
  lam({ code: "AK-T406", name: "Gold Leaf Metallic", family: "Textures & Metallics", finish: "Textured", image: img("gold-leaf-metallic"), seenIn: P.duplex, uses: ["Feature walls", "Entrance panels"], look: { pattern: "metal", base: "#a8864a", tone: "#6e5428" } }),
  flute({ code: "AK-F609", name: "Fluted White Matte", family: "Solids", image: img("fluted-white-matte"), seenIn: P.villa, uses: ["Wardrobes", "Wall panelling"], look: { pattern: "fluted", base: "#f0ede6" }, trending: true, featured: true }),
  flute({ code: "AK-F610", name: "Fluted Beige", family: "Solids", image: img("fluted-beige"), seenIn: P.teak, uses: ["Wardrobes", "Wall panelling"], look: { pattern: "fluted", base: "#d8c9b2" }, trending: true }),
];

const tile = (f: Omit<Finish, "thickness" | "size" | "product"> & Partial<Finish>): Finish => ({
  product: "Floor Tile",
  thickness: "As per tile",
  size: "As per design",
  ...f,
});
const FLOOR = ["Living & dining floors", "Foyers", "Bedrooms"];
const WALL = ["Feature walls", "TV walls", "Entrance walls"];

/** Tiles and stone from the same PDF presentations (floors, inlays and wall cladding in the renders). */
const pdfTiles: Finish[] = [
  tile({ code: "AK-TL801", name: "Gold Rangoli Inlay", family: "Patterned & Inlay", finish: "High Gloss", image: img("tile-gold-rangoli-inlay"), seenIn: P.i7, uses: ["Pooja rooms", "Foyers", "Floor medallions"], look: { pattern: "solid", base: "#d9c08a" }, trending: true, featured: true }),
  tile({ code: "AK-TL802", name: "Chevron Monochrome", family: "Patterned & Inlay", finish: "High Gloss", image: img("tile-chevron-monochrome"), seenIn: P.duplex, uses: ["Foyers", "Corridors", "Living floors"], look: { pattern: "solid", base: "#9a9893" }, trending: true, featured: true }),
  tile({ code: "AK-TL803", name: "Chevron Grey & White", family: "Patterned & Inlay", finish: "High Gloss", image: img("tile-chevron-hallway"), seenIn: P.duplex, uses: ["Corridors", "Foyers"], look: { pattern: "solid", base: "#b8b6b1" }, trending: true }),
  tile({ code: "AK-TL804", name: "Pebble Inlay Marble", family: "Patterned & Inlay", finish: "High Gloss", image: img("tile-pebble-inlay-marble"), seenIn: P.villa, uses: FLOOR, look: { pattern: "solid", base: "#e8e0d2" }, trending: true, featured: true }),
  tile({ code: "AK-TL805", name: "Diamond Inset Marble", family: "Patterned & Inlay", finish: "High Gloss", image: img("tile-diamond-inset-marble"), seenIn: P.i7, uses: FLOOR, look: { pattern: "solid", base: "#eceae6" }, featured: true }),
  tile({ code: "AK-TL806", name: "Crema Marble", family: "Stone & Marble", finish: "High Gloss", image: img("tile-crema-marble-floor"), seenIn: P.blush, uses: ["Kitchen floors", ...FLOOR], look: { pattern: "solid", base: "#d9b98f" } }),
  tile({ code: "AK-TL807", name: "Ivory Marble", family: "Stone & Marble", finish: "High Gloss", image: img("tile-grey-marble-floor"), seenIn: { slug: "3-bhk-home", title: "3 BHK Home" }, uses: ["Kitchen floors", ...FLOOR], look: { pattern: "solid", base: "#ecebe8" } }),
  tile({ code: "AK-TL808", name: "Dark Herringbone Wood", family: "Wood", finish: "Matte", image: img("tile-dark-herringbone-wood"), seenIn: P.multi, uses: ["Home theatres", "Bedrooms", "Living floors"], look: { pattern: "solid", base: "#5b4231" }, trending: true }),
  tile({ code: "AK-TL809", name: "3D Square Relief", product: "Wall Tile", family: "Textures & Metallics", finish: "Textured", image: img("tile-3d-square-relief"), seenIn: P.i7, uses: WALL, look: { pattern: "solid", base: "#ddd5c8" }, trending: true, featured: true }),
  tile({ code: "AK-TL810", name: "Textured Stone Cladding", product: "Wall Tile", family: "Stone & Marble", finish: "Textured", image: img("tile-textured-stone-cladding"), seenIn: P.theatre, uses: WALL, look: { pattern: "solid", base: "#b9b9b6" }, trending: true }),
  tile({ code: "AK-TL811", name: "Charcoal Stone Wall", product: "Wall Tile", family: "Stone & Marble", finish: "Textured", image: img("tile-charcoal-stone-wall"), seenIn: P.multi, uses: ["Home theatres", ...WALL], look: { pattern: "solid", base: "#2c3036" } }),
  tile({ code: "AK-TL812", name: "Woven Mosaic Cladding", product: "Wall Tile", family: "Patterned & Inlay", finish: "Textured", image: img("tile-woven-mosaic-cladding"), seenIn: P.apt, uses: ["Balconies", "Feature walls"], look: { pattern: "solid", base: "#8b7a66" } }),
];

export const finishes: Finish[] = [
  ...[...pdfFinishes, ...pdfTiles].map((f) => ({ ...f, collection: "Our Design Presentations" as const })),
  ...dorbyFluted,
];

export const isTile = (f: Finish) => f.product === "Floor Tile" || f.product === "Wall Tile";

export const FINISH_FILTERS = {
  collection: ["Our Design Presentations", "Dorby Fluted Laminates"] as Collection[],
  product: ["Digital Print Laminate", "Fluted Laminate", "Laminate", "Acrylic Laminate", "Fluted Panel", "Floor Tile", "Wall Tile"] as FinishProduct[],
  family: ["Traditional & Pichwai", "Botanical Prints", "Patterned & Inlay", "Wood", "Stone & Marble", "Solids", "Textures & Metallics"] as DecorFamily[],
  finish: ["Matte", "Suede", "Super Matte", "High Gloss", "Textured"] as SurfaceFinish[],
};

