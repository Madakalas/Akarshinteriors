/**
 * Materials & trusted brands.
 *
 * `source: "akarsh"`    = supplied by Akarsh Interiors (the client's own brand list).
 * `source: "suggested"` = additional brands/categories proposed during the build. They are shown
 *                         only while `SHOW_SUGGESTED_BRANDS` is true — confirm or delete them
 *                         before launch.
 *
 * Logos are the brands' own artwork, taken from their official websites, and are shown only to
 * identify the brands used. Brand names and logos are trademarks of their respective owners and no
 * partnership is implied. Descriptions are general and avoid lifespan, waterproofing or warranty
 * claims.
 */

export const SHOW_SUGGESTED_BRANDS = true;

export type BrandSource = "akarsh" | "suggested";

export interface BrandInfo {
  id: string;
  name: string;
  /** Path under /public. Omit to show a clean wordmark card instead. */
  logo?: string;
  /** Logo artwork is light-coloured and needs a dark tile. */
  darkLogo?: boolean;
  website?: string;
  description: string;
  /** Product lines specific to this brand (shown in the brand panel). */
  products?: string[];
  /** Needs confirmation of the exact manufacturer / product line. */
  needsConfirmation?: string;
}

export interface BrandCategory {
  id: string;
  title: string;
  short: string;
  description: string;
  products: string[];
  applications: string[];
  brands: string[];
  /** Brand ids highlighted as our preferred choice in this category. */
  preferred?: string[];
  specification?: string;
  note?: string;
  source: BrandSource;
}

const L = (file: string) => `/assets/brands/${file}`;

export const brandDirectory: Record<string, BrandInfo> = {
  // Plywood & boards
  centuryply: { id: "centuryply", name: "CenturyPly", logo: L("centuryply.webp"), website: "https://www.centuryply.com", description: "Indian manufacturer of plywood, laminates, MDF, decorative veneers and doors." },
  greenply: { id: "greenply", name: "Greenply", logo: L("greenply.webp"), website: "https://www.greenply.com", description: "Indian manufacturer of plywood, blockboards, decorative veneers and doors." },
  greenpanel: { id: "greenpanel", name: "Greenpanel", logo: L("greenpanel.webp"), website: "https://www.greenpanel.com", description: "Indian manufacturer of MDF and HDHMR-type boards, plywood and wooden flooring." },
  kitply: { id: "kitply", name: "Kitply", logo: L("kitply.webp"), website: "https://kitply.com", description: "Long-established Indian brand of plywood, blockboards and flush doors." },
  actiontesa: { id: "actiontesa", name: "Action TESA", logo: L("actiontesa.webp"), website: "https://www.actiontesa.com", description: "Indian maker of HDHMR boards, MDF, particle boards, laminates and acrylic boards." },
  duroply: { id: "duroply", name: "Duroply", logo: L("duroply.webp"), website: "https://www.duroply.in", description: "Indian manufacturer of plywood, blockboards, veneers and flush doors." },

  // Hardware
  hafele: { id: "hafele", name: "Häfele", logo: L("hafele.webp"), website: "https://www.hafeleindia.com", description: "German specialist in furniture fittings, architectural hardware and kitchen systems." },
  hettich: { id: "hettich", name: "Hettich", logo: L("hettich.webp"), website: "https://www.hettich.com/en-in", description: "German manufacturer of furniture fittings — hinges, drawer systems and sliding systems." },
  ebco: { id: "ebco", name: "Ebco", logo: L("ebco.webp"), darkLogo: true, website: "https://www.ebco.in", description: "Indian brand of furniture fittings, drawer systems, kitchen accessories and handles." },
  blum: { id: "blum", name: "Blum", logo: L("blum.webp"), website: "https://www.blum.com/in/en", description: "Austrian manufacturer of hinges, lift systems and drawer runners for kitchens and furniture." },
  godrej: { id: "godrej", name: "Godrej", logo: L("godrej.webp"), website: "https://www.godrej.com", description: "Indian group whose Locks & Architectural Fittings business makes locks, door hardware and furniture fittings." },
  dorset: { id: "dorset", name: "Dorset", logo: L("dorset.webp"), website: "https://www.dorsetindia.com", description: "Indian brand of door hardware, locks, handles and furniture fittings." },
  ozone: { id: "ozone", name: "Ozone", logo: L("ozone.webp"), website: "https://www.ozone.in", description: "Indian architectural hardware company — glass fittings, door hardware, locks and furniture fittings." },
  yale: { id: "yale", name: "Yale", logo: L("yale.webp"), website: "https://www.yalehome.com/in/en", description: "International lock brand offering door locks, digital locks and door hardware." },

  // Paints
  asianpaints: { id: "asianpaints", name: "Asian Paints", logo: L("asianpaints.webp"), website: "https://www.asianpaints.com", description: "India's largest paint company, offering interior emulsions, textures, enamels and wall finishes." },
  berger: { id: "berger", name: "Berger Paints", logo: L("berger.webp"), website: "https://www.bergerpaints.com", description: "Paint manufacturer offering interior and exterior emulsions, textures and enamels." },
  dulux: { id: "dulux", name: "Dulux", logo: L("dulux.webp"), website: "https://www.dulux.in", description: "Decorative paints brand (JSW Dulux in India) — interior emulsions, primers and wood finishes." },
  nerolac: { id: "nerolac", name: "Nerolac", logo: L("nerolac.webp"), website: "https://www.nerolac.com", description: "Kansai Nerolac's paints brand — interior emulsions, enamels and primers." },
  birlaopus: { id: "birlaopus", name: "Birla Opus", logo: L("birlaopus.webp"), website: "https://www.birlaopus.com", description: "Aditya Birla Group's paints brand — interior and exterior emulsions, enamels and wood finishes." },

  // Lighting & electrical
  philips: { id: "philips", name: "Philips", logo: L("philips.webp"), website: "https://www.lighting.philips.co.in", description: "Philips lighting (Signify) — LED downlights, panels, strips and decorative lighting." },
  panasonic: { id: "panasonic", name: "Panasonic", logo: L("panasonic.webp"), website: "https://www.panasonic.com/in", description: "Japanese electronics brand offering LED lighting, wiring devices and electrical products." },
  havells: { id: "havells", name: "Havells", logo: L("havells.webp"), website: "https://www.havells.com", description: "Indian electrical brand — wires, switches, switchgear and lighting." },
  crompton: { id: "crompton", name: "Crompton", logo: L("crompton.webp"), website: "https://www.crompton.co.in", description: "Indian consumer electricals brand — LED lighting and fans." },
  wipro: { id: "wipro", name: "Wipro Lighting", logo: L("wipro.webp"), website: "https://www.wiprolighting.com", description: "Indian lighting brand — LED panels, downlights and architectural lighting." },
  orient: { id: "orient", name: "Orient Electric", logo: L("orient.webp"), website: "https://orientelectric.com", description: "Indian electricals brand — lighting, fans and switchgear." },
  polycab: { id: "polycab", name: "Polycab", logo: L("polycab.webp"), website: "https://polycab.com", description: "Indian manufacturer of wires and cables, also offering switches and lighting." },
  rrkabel: { id: "rrkabel", name: "RR Kabel", logo: L("rrkabel.webp"), website: "https://www.rrkabel.com", description: "Indian manufacturer of house wires and cables." },
  finolex: { id: "finolex", name: "Finolex", logo: L("finolex.webp"), website: "https://www.finolex.com", description: "Indian manufacturer of electrical wires and cables." },
  goldmedal: { id: "goldmedal", name: "Goldmedal", logo: L("goldmedal.webp"), website: "https://www.goldmedalindia.com", description: "Indian electrical brand — modular switches, wires and lighting." },
  kei: { id: "kei", name: "KEI", logo: L("kei.webp"), website: "https://www.kei-ind.com", description: "Indian manufacturer of house wires, power cables and control cables." },
  legrand: { id: "legrand", name: "Legrand", logo: L("legrand.webp"), darkLogo: true, website: "https://www.legrand.co.in", description: "French electrical specialist — modular switches, sockets and smart home devices." },
  anchor: { id: "anchor", name: "Anchor by Panasonic", website: "https://lsin.panasonic.com", description: "Panasonic Life Solutions India's range of switches, sockets and wiring devices." },
  schneider: { id: "schneider", name: "Schneider Electric", logo: L("schneider.webp"), website: "https://www.se.com/in/en", description: "Global energy management company — switches, sockets and electrical distribution." },

  // Ceiling
  gyproc: { id: "gyproc", name: "Saint-Gobain Gyproc", logo: L("gyproc.webp"), website: "https://www.gyproc.in", description: "Saint-Gobain's gypsum brand — gypsum boards, ceiling framing and jointing systems.", products: ["Gyproc gypsum boards", "Ceiling framing", "Jointing materials"] },
  jsw: { id: "jsw", name: "JSW Steel", logo: L("jsw.webp"), website: "https://www.jswsteel.in", description: "Indian steel maker; its galvanised steel is used for GI ceiling channels and framing.", products: ["GI steel for ceiling channels / framing"] },

  // Glass
  saintgobainglass: { id: "saintgobainglass", name: "Saint-Gobain Glass", logo: L("saintgobainglass.webp"), website: "https://in.saint-gobain-glass.com", description: "Saint-Gobain's glass business — clear, tinted, decorative and processed glass and mirrors." },

  modiguard: { id: "modiguard", name: "Modiguard", logo: L("modiguard.webp"), website: "https://www.guardianglass.com/in/en/our-glass/modiguard", description: "Float glass and mirror brand of Gujarat Guardian (Guardian Glass India) — clear glass, mirrors and decorative glass." },

  // Adhesives
  fevicol: {
    id: "fevicol",
    name: "Fevicol",
    logo: L("fevicol.webp"),
    website: "https://fevicol.in",
    description: "Pidilite's adhesives brand for wood, plywood and laminate work, including Fevicol Hi-Per and Fevicol Marine.",
    products: ["Fevicol SH", "Fevicol Hi-Per", "Fevicol Marine"],
  },
  araldite: { id: "araldite", name: "Araldite", logo: L("araldite.webp"), darkLogo: true, website: "https://araldite.in", description: "Epoxy adhesives for strong bonding of wood, metal, glass and stone." },

  jivanjor: { id: "jivanjor", name: "Jivanjor", logo: L("jivanjor.webp"), website: "https://www.jivanjor.com", description: "Jubilant's adhesives brand — wood adhesives, PVC and laminate adhesives for carpentry and furniture work." },

  // Surfaces
  probond: {
    id: "probond",
    name: "ProBond",
    description: "Premium acrylic sheets and high-gloss acrylic surfaces for shutters.",
    needsConfirmation: "Exact manufacturer and website to be confirmed.",
  },
  rehau: { id: "rehau", name: "REHAU", logo: L("rehau.webp"), website: "https://www.rehau.com/in-en", description: "German polymer specialist — furniture surfaces, acrylic panels and edge bands." },
  greenlam: { id: "greenlam", name: "Greenlam", logo: L("greenlam.webp"), website: "https://www.greenlam.com", description: "Indian manufacturer of decorative laminates, compact panels and veneers." },
  merino: { id: "merino", name: "Merino", logo: L("merino.webp"), website: "https://www.merinolaminates.com", description: "Indian manufacturer of decorative laminates and surface solutions." },

  // Glass doors & sliding
  aristo: { id: "aristo", name: "Aristo", logo: L("aristo.webp"), website: "https://www.aristoindia.com", description: "Indian specialist in wardrobe sliding systems, glass doors and aluminium profile systems." },
  dormakaba: { id: "dormakaba", name: "dormakaba", logo: L("dormakaba.webp"), website: "https://www.dormakaba.com/in-en", description: "Swiss company offering glass door fittings, door closers and access solutions." },

  // Laminates
  skydecor: { id: "skydecor", name: "Skydecor", logo: L("skydecor.webp"), website: "https://skydecor.in", description: "Indian laminate brand — 1 mm and 0.8 mm decorative laminates in solids, woodgrains, stones and textured finishes." },
  dorby: { id: "dorby", name: "Dorby", logo: L("dorby.webp"), website: "https://www.dorbypanels.com", description: "Indian brand of decorative laminates, fluted laminates and textured panels." },
  advance: { id: "advance", name: "Advance", logo: L("advance.webp"), website: "https://advancelam.com", description: "Advance Decorative Laminates — paper, PVC, acrylic and PETG laminates." },

  // ——— Suggested additions ———
  carysil: { id: "carysil", name: "Carysil", logo: L("carysil.webp"), website: "https://carysil.com", description: "Indian maker of quartz kitchen sinks, stainless-steel sinks and kitchen appliances." },
  franke: { id: "franke", name: "Franke", logo: L("franke.webp"), website: "https://www.franke.com/in/en/home.html", description: "Swiss kitchen systems brand — sinks, taps, chimneys and hobs." },
  elica: { id: "elica", name: "Elica", logo: L("elica.webp"), website: "https://www.elicaindia.com", description: "Italian kitchen ventilation brand — chimneys, hobs and built-in appliances." },
  faber: { id: "faber", name: "Faber", logo: L("faber.webp"), website: "https://faberindia.com", description: "Kitchen chimneys, hobs and built-in appliances." },
  jaquar: { id: "jaquar", name: "Jaquar", logo: L("jaquar.webp"), website: "https://www.jaquar.com", description: "Indian bath brand — faucets, showers, sanitaryware and lighting." },
  kohler: { id: "kohler", name: "Kohler", logo: L("kohler.webp"), website: "https://www.kohler.co.in", description: "American bath and kitchen brand — faucets, sanitaryware and showers." },
  hindware: { id: "hindware", name: "Hindware", logo: L("hindware.webp"), website: "https://hindware.com", description: "Indian brand of sanitaryware, faucets and kitchen appliances." },
  cera: { id: "cera", name: "Cera", logo: L("cera.webp"), website: "https://www.cera-india.com", description: "Indian brand of sanitaryware, faucets and tiles." },
  grohe: { id: "grohe", name: "Grohe", logo: L("grohe.webp"), website: "https://www.grohe.com/en-IN", description: "German bath and kitchen fittings brand — faucets and shower systems." },
  kajaria: { id: "kajaria", name: "Kajaria", logo: L("kajaria.webp"), website: "https://www.kajariaceramics.com", description: "Indian manufacturer of ceramic and vitrified tiles." },
  somany: { id: "somany", name: "Somany", logo: L("somany.webp"), website: "https://www.somanyceramics.com", description: "Indian manufacturer of wall and floor tiles and bath fittings." },
};

export const brandCategories: BrandCategory[] = [
  {
    id: "plywood",
    title: "Plywood & Boards",
    short: "Plywood",
    description: "The structural core of kitchens, wardrobes and furniture. The board grade is chosen by location and use.",
    products: ["BWP Plywood", "BWR Plywood", "HDHMR Boards", "MDF Boards", "Blockboards"],
    applications: ["Kitchen carcasses", "Wardrobes", "TV units", "Beds & storage"],
    brands: ["centuryply", "greenply", "greenpanel", "kitply", "actiontesa", "duroply"],
    source: "akarsh",
  },
  {
    id: "hardware",
    title: "Furniture Hardware & Accessories",
    short: "Hardware",
    description: "Fittings that decide how smoothly every drawer, shutter and lift-up unit works, every day.",
    products: ["Soft-Close Hinges", "Tandem Drawers", "Sliding Systems", "Wardrobe Fittings", "Kitchen Accessories", "Hydraulic Lift Systems"],
    applications: ["Modular kitchens", "Wardrobes", "Drawers", "Overhead units"],
    brands: ["hafele", "hettich", "ebco", "blum", "godrej", "dorset", "ozone"],
    source: "akarsh",
  },
  {
    id: "handles",
    title: "Premium Handles & Door Fittings",
    short: "Handles",
    description: "Handles, profiles and locks that complete the look and feel of every shutter and door.",
    products: ["Premium Cabinet Handles", "Profile Handles", "Concealed Handles", "Door Handles", "Premium Locks & Door Fittings"],
    applications: ["Kitchen shutters", "Wardrobes", "Main & room doors"],
    brands: ["hafele", "hettich", "godrej", "dorset", "ozone", "yale"],
    source: "akarsh",
  },
  {
    id: "paints",
    title: "Paints & Surface Finishes",
    short: "Paints",
    description: "Wall colours and finishes selected to suit the room, the light and the overall design palette.",
    products: ["Interior Emulsion", "Premium Wall Finishes", "Texture Paints", "Primers", "Enamels"],
    applications: ["Walls & ceilings", "Feature walls", "Doors & frames"],
    brands: ["asianpaints", "berger", "dulux", "nerolac", "birlaopus"],
    source: "akarsh",
  },
  {
    id: "lighting",
    title: "Lighting Solutions",
    short: "Lighting",
    description: "Layered lighting planned together with the false ceiling and furniture layout.",
    products: ["POP LED Lights", "COB Spotlights", "LED Panel Lights", "Profile Lights", "LED Strip Lights", "Downlights", "Decorative Lighting"],
    applications: ["False ceilings", "TV units", "Wardrobes", "Kitchens"],
    brands: ["philips", "panasonic", "havells", "crompton", "wipro", "orient"],
    source: "akarsh",
  },
  {
    id: "wiring",
    title: "Electrical Wiring & Cables",
    short: "Wiring",
    description: "Wires and cables for lighting and power points, planned with the electrical layout.",
    products: ["FRLS Copper Wires", "Electrical Cables", "Lighting Wires", "Power Cables"],
    applications: ["Lighting circuits", "Power points", "Appliance points"],
    brands: ["polycab", "rrkabel", "finolex", "havells", "goldmedal", "kei"],
    preferred: ["polycab"],
    source: "akarsh",
  },
  {
    id: "ceiling",
    title: "False Ceiling – Gypsum & Channels",
    short: "False Ceiling",
    description: "Gypsum boards and framing for clean false ceilings with integrated lighting.",
    products: ["Gyproc Gypsum Sheets", "GI Ceiling Channels", "Perimeter Channels", "Ceiling Accessories", "Jointing Materials"],
    applications: ["Living rooms", "Bedrooms", "Dining areas", "Cove & profile lighting"],
    brands: ["gyproc", "jsw"],
    preferred: ["gyproc"],
    specification: "Saint-Gobain Gyproc gypsum boards with quality GI framing channels, including JSW steel-based channels where specified.",
    source: "akarsh",
  },
  {
    id: "glass",
    title: "Glass & Mirrors",
    short: "Glass",
    description: "Glass shutters, mirrors and partitions that add light and depth to a room.",
    products: ["Toughened Glass", "Clear Glass", "Frosted Glass", "Tinted Glass", "Decorative Glass", "Mirrors", "Glass Partitions"],
    applications: ["Crockery units", "Wardrobe shutters", "Partitions", "Mirrors & vanities"],
    brands: ["saintgobainglass", "modiguard"],
    preferred: ["saintgobainglass"],
    source: "akarsh",
  },
  {
    id: "adhesives",
    title: "Adhesives & Wood Glues",
    short: "Adhesives",
    description: "Adhesives that hold plywood, laminates and furniture joints together.",
    products: ["Wood Adhesives", "Plywood Bonding Adhesives", "Laminate Adhesives", "Furniture Assembly Adhesives"],
    applications: ["Carpentry joints", "Laminate pasting", "Furniture assembly"],
    brands: ["fevicol", "jivanjor", "araldite"],
    preferred: ["fevicol"],
    note: "Fevicol range includes Fevicol Hi-Per and Fevicol Marine.",
    source: "akarsh",
  },
  {
    id: "surfaces",
    title: "Acrylic & Decorative Surfaces",
    short: "Acrylic & Laminates",
    description: "The visible finish of shutters and panels — from high-gloss acrylic to textured laminates.",
    products: ["Premium Acrylic Sheets", "High-Gloss Acrylic Shutters", "Decorative Laminates", "Premium Surface Finishes"],
    applications: ["Kitchen shutters", "Wardrobe shutters", "Wall panelling", "Feature units"],
    brands: ["probond", "rehau", "greenlam", "merino"],
    preferred: ["probond"],
    source: "akarsh",
  },
  {
    id: "glass-doors",
    title: "Premium Glass Doors & Sliding Systems",
    short: "Glass Doors",
    description: "Sliding wardrobes, aluminium profile doors and glass partitions with smooth, quiet movement.",
    products: ["Glass Sliding Doors", "Aluminium Profile Glass Doors", "Wardrobe Sliding Systems", "Glass Partitions", "Premium Door Fittings"],
    applications: ["Sliding wardrobes", "Walk-in closets", "Kitchen & room partitions"],
    brands: ["aristo", "hafele", "hettich", "ozone", "dormakaba"],
    preferred: ["aristo"],
    note: "Digital / smart glass door solutions are available on request, subject to confirmation of the exact product range.",
    source: "akarsh",
  },
  {
    id: "switches",
    title: "Modular Switches & Electrical Accessories",
    short: "Switches",
    description: "Switches and sockets that are used every day — chosen for feel, finish and the room's design.",
    products: ["Modular Switches", "Sockets", "Switch Plates", "Electrical Accessories", "Smart Switches"],
    applications: ["Every room", "Kitchen appliance points", "Smart home controls"],
    brands: ["goldmedal", "legrand", "anchor", "schneider", "havells"],
    source: "akarsh",
  },

  {
    id: "laminates",
    title: "Laminates",
    short: "Laminates",
    description: "Decorative laminates in solids, woodgrains, stones, fluted and textured finishes for every room and budget.",
    products: ["Decorative Laminates", "Fluted Laminates", "Textured Laminates", "Acrylic & PVC Laminates"],
    applications: ["Kitchen shutters", "Wardrobes", "Wall panelling", "Furniture"],
    brands: ["skydecor", "dorby", "advance"],
    source: "akarsh",
  },

  // ——— Suggested additions (confirm before launch) ———
  {
    id: "kitchen-appliances",
    title: "Kitchen Sinks & Appliances",
    short: "Kitchen Appliances",
    description: "Sinks, chimneys and hobs planned into the modular kitchen layout from the start.",
    products: ["Quartz & Steel Sinks", "Kitchen Chimneys", "Built-in Hobs", "Built-in Ovens"],
    applications: ["Modular kitchens", "Utility areas"],
    brands: ["carysil", "franke", "elica", "faber", "hindware"],
    source: "suggested",
  },
  {
    id: "bath",
    title: "Bath Fittings & Sanitaryware",
    short: "Bath Fittings",
    description: "Faucets, showers and sanitaryware coordinated with the vanity and bathroom design.",
    products: ["Faucets", "Showers", "Sanitaryware", "Vanity Basins"],
    applications: ["Bathrooms", "Powder rooms", "Vanity areas"],
    brands: ["jaquar", "kohler", "hindware", "cera", "grohe"],
    source: "suggested",
  },
  {
    id: "tiles",
    title: "Tiles & Flooring",
    short: "Tiles",
    description: "Floor and wall tiles chosen to sit well with the furniture finishes and colour palette.",
    products: ["Vitrified Tiles", "Wall Tiles", "Kitchen Dado Tiles", "Wooden Flooring"],
    applications: ["Floors", "Kitchen dado", "Bathroom walls", "Feature walls"],
    brands: ["kajaria", "somany", "greenpanel"],
    source: "suggested",
  },
];

/** Display order on the Materials page; categories not listed follow in their original order. */
const CATEGORY_ORDER = [
  "plywood",
  "hardware",
  "laminates",
  "surfaces",
  "handles",
  "ceiling",
  "wiring",
  "lighting",
  "switches",
  "paints",
  "glass",
  "glass-doors",
  "adhesives",
];

export function getBrandCategories() {
  const rank = (id: string) => {
    const i = CATEGORY_ORDER.indexOf(id);
    return i === -1 ? CATEGORY_ORDER.length : i;
  };
  return brandCategories
    .filter((c) => c.source === "akarsh" || SHOW_SUGGESTED_BRANDS)
    .map((c, i) => ({ c, i }))
    .sort((a, b) => rank(a.c.id) - rank(b.c.id) || a.i - b.i)
    .map(({ c }) => c);
}

/** Every visible brand once, with the categories it appears in. */
export function getAllBrands() {
  const map = new Map<string, { brand: BrandInfo; categories: BrandCategory[]; preferred: boolean }>();
  for (const c of getBrandCategories()) {
    for (const id of c.brands) {
      const brand = brandDirectory[id];
      if (!brand) continue;
      const entry = map.get(id) ?? { brand, categories: [], preferred: false };
      entry.categories.push(c);
      if (c.preferred?.includes(id)) entry.preferred = true;
      map.set(id, entry);
    }
  }
  return [...map.values()];
}

/** Brands shown in the home-page logo strip. */
export const featuredBrandIds = [
  "centuryply", "hettich", "hafele", "blum", "asianpaints", "polycab", "gyproc", "saintgobainglass",
  "fevicol", "philips", "legrand", "merino", "ebco", "aristo", "havells", "schneider",
];
