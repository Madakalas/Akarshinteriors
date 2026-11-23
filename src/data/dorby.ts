/**
 * Dorby fluted laminates (Laminates brand list: Skydecor, Dorby, Advance).
 * Names, shade codes, profiles are taken from Dorby's public fluted-laminate collection
 * (dorbypanels.com/collections/fluted-laminate). Dorby's product photos are NOT used: each board is drawn on the
 * page by FluteBoard from `board` (profile + colours sampled from the shade). Prices are not shown.
 */
import type { Finish } from "./finishes";

const PROFILE = {
  "bamboo": "Bamboo Flute \u2014 rounded vertical ribs",
  "diag-r": "Diagonal Flute (right) \u2014 45\u00b0 ribs",
  "diag-l": "Diagonal Flute (left) \u2014 45\u00b0 ribs",
  "section": "Sectioned Flute \u2014 ribs in vertical sections"
} as const;

type Row = [code: string, name: string, family: Finish["family"], profile: keyof typeof PROFILE, decor: "solid" | "wood" | "stone", base: string, tone: string, url: string, edgeBand: boolean];

const rows: Row[] = [
  ["BF 183", "Mint Green", "Solids", "bamboo", "solid", "#aac7ac", "#a9c5aa", "https://www.dorbypanels.com/products/mint-green-bf-183", false],
  ["BF 98880", "Southern Stone", "Stone & Marble", "bamboo", "stone", "#404a55", "#333b44", "https://www.dorbypanels.com/products/southern-stone-bf-98880", false],
  ["BF 9182", "Mellow Rose", "Solids", "bamboo", "solid", "#c2a69c", "#aa9289", "https://www.dorbypanels.com/products/mellow-rose-bf-9182", false],
  ["BF 9136", "Stylish Beige", "Solids", "bamboo", "solid", "#9d9690", "#948b86", "https://www.dorbypanels.com/products/stylish-beige-bf-9136", true],
  ["BF 95226", "Rojo Fendi", "Wood", "bamboo", "wood", "#897b77", "#81726e", "https://www.dorbypanels.com/products/rojo-fendi-bf-95226", false],
  ["BF 95225", "Fendi", "Wood", "bamboo", "wood", "#8d8178", "#887b73", "https://www.dorbypanels.com/products/fendi-bf-95225", false],
  ["BF 9070", "Calacatta", "Stone & Marble", "bamboo", "stone", "#cecdd2", "#b5b4b8", "https://www.dorbypanels.com/products/calacatta-bf-9070", false],
  ["BF 9179", "Whyte Blue", "Solids", "bamboo", "solid", "#9cb7c0", "#9ab5be", "https://www.dorbypanels.com/products/whyte-blue-bf-9179", false],
  ["BF 9201", "Almond Bisque", "Wood", "bamboo", "wood", "#7f6149", "#7e6048", "https://www.dorbypanels.com/products/almond-bisque-bf-9201", false],
  ["BF 9175", "Taupe", "Wood", "bamboo", "wood", "#887564", "#877463", "https://www.dorbypanels.com/products/taupe-bf-9175", true],
  ["BF 9149", "Mocha", "Wood", "bamboo", "wood", "#9c8d70", "#9b8c6f", "https://www.dorbypanels.com/products/mocha-bf-9149", true],
  ["BF 9187", "Neutral Beige", "Wood", "bamboo", "wood", "#c6b69d", "#c4b49b", "https://www.dorbypanels.com/products/neutral-beige-bf-9187", false],
  ["BF 9178", "Magnetic Grey", "Solids", "bamboo", "solid", "#56595f", "#52555b", "https://www.dorbypanels.com/products/magnetic-grey-bf-9178", true],
  ["BF 9110", "Cool Beige", "Solids", "bamboo", "solid", "#9e8974", "#9d8772", "https://www.dorbypanels.com/products/cool-beige-bf-9110", false],
  ["BF 9103", "Warm White", "Solids", "bamboo", "solid", "#c9cccd", "#c6c8c9", "https://www.dorbypanels.com/products/warm-white-bf-9103", true],
  ["BF 98879", "River Stone", "Stone & Marble", "bamboo", "stone", "#9ca4b6", "#979fb2", "https://www.dorbypanels.com/products/river-stone-bf-98879", false],
  ["BF 9063", "Pietra Grey", "Stone & Marble", "bamboo", "stone", "#676c70", "#61686b", "https://www.dorbypanels.com/products/pietra-grey-bf-9063", false],
  ["BF 9183", "Mint Green", "Solids", "bamboo", "solid", "#aac7ac", "#a9c5aa", "https://www.dorbypanels.com/products/mint-green-bf-9183", false],
  ["BF 9167", "Brick Brown", "Solids", "bamboo", "solid", "#56342b", "#543229", "https://www.dorbypanels.com/products/brick-brown-bf-9167", false],
  ["BF 9156", "Sea Pearl", "Solids", "bamboo", "solid", "#a2a19e", "#989896", "https://www.dorbypanels.com/products/sea-pearl-bf-9156", true],
  ["FF-R 156", "Sea Pearl", "Solids", "diag-r", "solid", "#bfb8a9", "#aea699", "https://www.dorbypanels.com/products/sea-pearl-ff-r-156", true],
  ["FF-L 156", "Sea Pearl", "Solids", "diag-l", "solid", "#bfb8a9", "#aea699", "https://www.dorbypanels.com/products/sea-pearl-ff-l-156", true],
  ["FF-R 154", "Cape Grey", "Solids", "diag-r", "solid", "#b3b0a7", "#a3a098", "https://www.dorbypanels.com/products/cape-grey-ff-r-154", true],
  ["FF-L 154", "Cape Grey", "Solids", "diag-l", "solid", "#979691", "#898883", "https://www.dorbypanels.com/products/cape-grey-ff-l-154", true],
  ["FF-R 179", "Whyte Blue", "Solids", "diag-r", "solid", "#7f949c", "#73878e", "https://www.dorbypanels.com/products/whyte-blue-ff-r-179", true],
  ["FF-L 179", "Whyte Blue", "Solids", "diag-l", "solid", "#7f949c", "#73868e", "https://www.dorbypanels.com/products/whyte-blue-ff-l-179", true],
  ["FF-R 136", "Stylish Beige", "Solids", "diag-r", "solid", "#bba8a1", "#ac9992", "https://www.dorbypanels.com/products/stylish-beige-ff-r-136", true],
  ["FF-L 136", "Stylish Beige", "Solids", "diag-l", "solid", "#9b8c85", "#8d7f78", "https://www.dorbypanels.com/products/stylish-beige-ff-l-136", true],
  ["SC 179", "Whyte Blue", "Solids", "section", "solid", "#708584", "#6b807e", "https://www.dorbypanels.com/products/whyte-blue-sc-179", true],
  ["SC 138", "Swank Brown", "Solids", "section", "solid", "#5f5852", "#57504a", "https://www.dorbypanels.com/products/swank-brown-sc-138", true],
  ["BF 136", "Stylish Beige", "Solids", "bamboo", "solid", "#9d9690", "#948b86", "https://www.dorbypanels.com/products/stylish-beige-bf-136", true],
  ["SC 156", "Sea Pearl", "Solids", "section", "solid", "#cabca4", "#c3b49a", "https://www.dorbypanels.com/products/sea-pearl-sc-156", true],
  ["BF 156", "Sea Pearl", "Solids", "bamboo", "solid", "#a2a19e", "#989896", "https://www.dorbypanels.com/products/sea-pearl-bf-156", true],
  ["BF 153", "Pearl Grey", "Solids", "bamboo", "solid", "#8d8e91", "#87878a", "https://www.dorbypanels.com/products/pearl-grey-bf-153", true],
  ["SC 182", "Mellow Rose", "Solids", "section", "solid", "#967a70", "#8f7368", "https://www.dorbypanels.com/products/mellow-rose-sc-182", true],
  ["BF 155", "Glisten", "Solids", "bamboo", "solid", "#78726a", "#706961", "https://www.dorbypanels.com/products/glisten-bf-155", true],
  ["SC 104", "Frosty White", "Solids", "section", "solid", "#e8e6d2", "#e5e2cd", "https://www.dorbypanels.com/products/frosty-white-sc-104", true],
  ["SC 107", "Dark Grey", "Solids", "section", "solid", "#24261f", "#1c1e18", "https://www.dorbypanels.com/products/dark-grey-sc-107", true],
  ["BF 180", "Clary Jade", "Solids", "bamboo", "solid", "#92afab", "#89a6a2", "https://www.dorbypanels.com/products/clary-jade-bf-180", true],
  ["SC 154", "Cape Grey", "Solids", "section", "solid", "#a8a5ab", "#9e9ba1", "https://www.dorbypanels.com/products/cape-grey-sc-154", true],
  ["BF 154", "Cape Grey", "Solids", "bamboo", "solid", "#65646d", "#5c5a63", "https://www.dorbypanels.com/products/cape-grey-bf-154", true],
];

const USES: Record<keyof typeof PROFILE, string[]> = {"bamboo": ["TV walls", "Bed back panels", "Kitchen island fronts", "Wardrobe shutters"], "diag-r": ["TV walls", "Wardrobe fronts", "Bar counters"], "diag-l": ["TV walls", "Wardrobe fronts", "Bar counters"], "section": ["Wardrobe shutters", "TV walls", "Display panels"]};

export const dorbyFluted: Finish[] = rows.map(([code, name, family, profile, decor, base, tone, url, edgeBand]) => ({
  code,
  name,
  product: "Fluted Laminate",
  family,
  finish: "Textured",
  thickness: "1 mm",
  size: "Standard laminate sheet",
  uses: USES[profile],
  brand: "Dorby",
  collection: "Dorby Fluted Laminates",
  sourceUrl: url,
  profile: PROFILE[profile],
  edgeBand,
  look: { pattern: "fluted", base, tone },
  board: { profile, decor, base, tone },
  trending: profile !== "bamboo" || decor === "stone",
}));
