import type { RoomKey } from "@/lib/types";

/**
 * 3D design walkthrough videos supplied by Akarsh Interiors.
 * They are not linked to a specific project or city yet — add `projectSlug` once confirmed,
 * and the video will also appear on that project's page.
 */
export interface ShowcaseVideo {
  slug: string;
  title: string;
  src: string;
  poster: string;
  kind: "interior" | "exterior";
  rooms: RoomKey[];
  /** Portrait videos get a tall frame. */
  orientation: "landscape" | "portrait" | "square";
  projectSlug?: string;
}

const V = "/assets/videos";
const v = (slug: string, title: string, kind: ShowcaseVideo["kind"], rooms: RoomKey[], orientation: ShowcaseVideo["orientation"] = "landscape"): ShowcaseVideo => ({
  slug,
  title,
  src: `${V}/${slug}.mp4`,
  poster: `${V}/posters/${slug}.jpg`,
  kind,
  rooms,
  orientation,
});

export const videos: ShowcaseVideo[] = [
  v("living-kitchen-dining-walkthrough", "Living, Kitchen & Dining Walkthrough", "interior", ["living-room", "kitchen", "dining"]),
  v("living-room-curved-sofa", "Living Room with Arched Backlit Panels", "interior", ["living-room"]),
  v("master-bedroom-build-up", "Master Bedroom Design", "interior", ["bedroom", "wardrobe"]),
  v("living-room-marble-feature-wall", "Living Room Marble Feature Wall", "interior", ["living-room"]),
  v("tv-unit-marble-wood-panel", "TV Unit with Marble & Wood Panelling", "interior", ["tv-unit", "living-room"]),
  v("tv-unit-art-wall", "TV Unit with Art Wall", "interior", ["tv-unit", "living-room"]),
  v("twin-bedroom", "Twin Bedroom Design", "interior", ["bedroom"]),
  v("exterior-plot-to-home", "Exterior Visualisation — Plot to Home", "exterior", ["other"]),
  v("exterior-elevation-day", "Exterior Elevation — Day", "exterior", ["other"]),
  v("exterior-elevation-night", "Exterior Elevation — Night", "exterior", ["other"], "square"),
  v("exterior-plot-to-home-vertical", "Exterior Visualisation (Vertical)", "exterior", ["other"], "portrait"),
];

export function getVideosByRooms(rooms: RoomKey[], limit = 3) {
  return videos.filter((x) => x.kind === "interior" && x.rooms.some((r) => rooms.includes(r))).slice(0, limit);
}

export function getVideosForProject(slug: string) {
  return videos.filter((x) => x.projectSlug === slug);
}
