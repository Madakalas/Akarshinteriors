/**
 * What each service page shows under "Materials & Finishes" — taken only from the Materials page:
 * `categories` are brand-category ids from `brands.ts` (Our Materials & Trusted Brands),
 * `picks` are codes from the laminate & tile library (`finishes.ts` / `dorby.ts`).
 */
export const serviceMaterials: Record<string, { categories: string[]; picks: string[] }> = {
  "modular-kitchens": {
    categories: ["plywood", "hardware", "laminates", "surfaces", "handles", "kitchen-appliances"],
    picks: ["AK-P310", "AK-P311", "AK-P312", "AK-P314", "AK-A511", "AK-S212"],
  },
  wardrobes: {
    categories: ["plywood", "hardware", "laminates", "surfaces", "handles", "glass-doors"],
    picks: ["AK-W112", "AK-F609", "AK-F610", "AK-W113", "AK-P316", "BF 9182"],
  },
  "complete-home-interiors": {
    categories: ["plywood", "hardware", "laminates", "surfaces", "ceiling", "lighting", "wiring", "switches", "paints"],
    picks: ["AK-D701", "AK-S209", "AK-W111", "AK-TL801", "AK-TL802", "AK-D706"],
  },
  "living-room-interiors": {
    categories: ["laminates", "surfaces", "lighting", "switches", "paints", "glass"],
    picks: ["AK-W111", "AK-S209", "AK-D707", "AK-D708", "AK-TL804", "AK-TL809"],
  },
  "bedroom-interiors": {
    categories: ["plywood", "hardware", "laminates", "lighting", "paints", "glass-doors"],
    picks: ["AK-D709", "AK-S209", "AK-W113", "AK-F609", "AK-D707", "AK-TL808"],
  },
  "tv-units": {
    categories: ["laminates", "surfaces", "lighting", "glass"],
    picks: ["AK-W111", "AK-S208", "AK-D708", "BF 9070", "BF 98880", "AK-TL811"],
  },
  "pooja-units": {
    categories: ["laminates", "lighting", "glass", "plywood"],
    picks: ["AK-D701", "AK-D702", "AK-D703", "AK-D704", "AK-D705", "AK-TL801"],
  },
  "false-ceiling-lighting": {
    categories: ["ceiling", "lighting", "wiring", "switches", "paints"],
    picks: [],
  },
  "custom-furniture": {
    categories: ["plywood", "hardware", "laminates", "surfaces", "handles", "adhesives"],
    picks: ["AK-W112", "AK-T405", "AK-W111", "AK-P315", "AK-F610", "BF 95225"],
  },
};
