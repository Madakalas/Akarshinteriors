import { site } from "@/lib/site";
import type { Project, ProjectMedia, RoomKey } from "@/lib/types";
import { designProjects } from "./design-projects";

/**
 * PROJECT DATA
 * ------------
 * - `allProjects` below: hand-written projects (Villa Interiors, plus any completed projects you add).
 * - `designProjects`: generated from the 3D presentation PDFs (see scripts/build-design-projects.py).
 * - `overrides`: add verified facts (city, area, completion, description) to any project by slug
 *   without touching the generated file.
 * Leave unknown fields out rather than guessing. `sample: true` entries are hidden when
 * NEXT_PUBLIC_SHOW_SAMPLE_CONTENT=false.
 */

const VILLA = "/assets/projects/villa-interiors";

function villa(list: [string, RoomKey, string][]): ProjectMedia[] {
  return list.map(([file, room, alt], i) => ({
    id: `villa-${i + 1}`,
    type: "image",
    url: `${VILLA}/${file}.jpg`,
    altText: alt,
    room,
    sortOrder: i,
  }));
}

const allProjects: Project[] = [
  {
    // Source: "VILLA INTERIORS.pdf" (3D renders). City, area and completion status pending confirmation.
    id: "villa",
    slug: "villa-interiors",
    title: "Villa Interiors",
    propertyType: "Villa",
    stage: "design",
    category: "Complete Home Interiors",
    description:
      "A complete interior design for a villa — drawing room, living and dining areas, pooja room, guest and master bedrooms with wardrobes and dressing units, a home theatre and a bar unit — presented as detailed 3D visuals before execution.",
    coverImage: `${VILLA}/sofa-back-wall.jpg`,
    gallery: villa([
      ["sofa-back-wall", "living-room", "Living area with curved sofas, botanical feature wall and cove-lit ceiling"],
      ["drawing-room", "living-room", "Drawing room with floral glass panels, wooden door and fan-fitted false ceiling"],
      ["living-area", "living-room", "Living area with TV wall, curved sofas and inlaid marble flooring"],
      ["tv-unit", "tv-unit", "TV unit wall with wooden display shelving in the living area"],
      ["crockery-unit", "dining", "Crockery unit with open display shelves above a dining table"],
      ["dining-area", "dining", "Round dining table with crockery unit and staircase beyond"],
      ["pooja-door-wall", "pooja", "Pooja room carved double doors beside a painted cow mural"],
      ["pooja-inside", "pooja", "Inside the pooja room with backlit arch niche"],
      ["guest-bedroom", "bedroom", "Guest bedroom with upholstered headboard wall and round mirror"],
      ["guest-wardrobe", "wardrobe", "Guest bedroom full-height white wardrobe with brass handles"],
      ["guest-dressing-unit", "wardrobe", "Guest dressing unit with arched mirror and stool"],
      ["master-bedroom-1", "bedroom", "Master bedroom with panelled headboard and pendant lights"],
      ["master-bedroom-1-wardrobe", "wardrobe", "Master bedroom wardrobe with fluted shutters and cove ceiling"],
      ["master-bedroom-1-dressing-unit", "wardrobe", "Master bedroom dressing unit with backlit mirror and shelves"],
      ["master-bedroom-2", "bedroom", "Second master bedroom in warm neutrals with profile lighting"],
      ["master-bedroom-2-wardrobe-dressing", "wardrobe", "Second master bedroom wardrobe and dressing unit"],
      ["home-theatre-wall", "other", "Home theatre with star ceiling, wall sconces and recliner seating"],
      ["bar-unit", "other", "Home theatre bar unit with backlit shelving"],
    ]),
    videos: [],
    rooms: ["living-room", "tv-unit", "dining", "pooja", "bedroom", "wardrobe", "other"],
    materials: [],
    services: ["complete-home-interiors", "living-room-interiors", "tv-units", "pooja-units", "bedroom-interiors", "wardrobes", "false-ceiling-lighting", "3d-interior-design"],
    featured: true,
    published: true,
  },
];


const ROOM_WORDS: Record<RoomKey, string> = {
  "living-room": "living room",
  dining: "dining area",
  kitchen: "kitchen",
  bedroom: "bedrooms",
  wardrobe: "wardrobes",
  "tv-unit": "TV units",
  pooja: "pooja unit",
  other: "",
};

function describe(p: Project) {
  const home = p.propertyType === "Other" ? "home" : p.propertyType === "Villa" ? "villa" : `${p.propertyType} home`;
  const parts = p.rooms.map((r) => ROOM_WORDS[r]).filter(Boolean);
  const list = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : parts[0];
  if (p.category !== "Complete Home Interiors") return `A 3D interior design for a ${list}.`;
  return `A 3D interior design presentation for a ${home}, covering the ${list}, so each room can be reviewed in detail before execution.`;
}

/** Verified details to layer onto generated projects, keyed by slug. Example:
 *  "i7-villa": { city: "kurnool", areaSqFt: 3200, stage: "completed" },
 */
const overrides: Record<string, Partial<Project>> = {};

const merged: Project[] = [...allProjects, ...designProjects].map((p) => {
  const o = { ...p, ...overrides[p.slug] };
  return { ...o, description: o.description || describe(o) };
});

export function getProjects(): Project[] {
  return merged.filter((p) => p.published && (site.showSampleContent || !p.sample));
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 4) {
  return getProjects().filter((p) => p.featured).slice(0, limit);
}

export function getProjectsByCity(city: string) {
  return getProjects().filter((p) => p.city === city);
}

export function getProjectsByRooms(rooms: RoomKey[], exclude?: string, limit = 3) {
  return getProjects()
    .filter((p) => p.slug !== exclude && p.rooms.some((r) => rooms.includes(r)))
    .sort((a, b) => Number(!!a.sample) - Number(!!b.sample))
    .slice(0, limit);
}

export function getRelatedProjects(project: Project, limit = 3) {
  const others = getProjects().filter((p) => p.slug !== project.slug);
  const score = (p: Project) =>
    (project.city && p.city === project.city ? 2 : 0) + (p.sample ? 0 : 3) + p.rooms.filter((r) => project.rooms.includes(r)).length;
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, limit);
}
