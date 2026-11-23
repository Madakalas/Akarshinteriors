import type { RoomKey } from "@/lib/types";

const VILLA = "/assets/projects/villa-interiors";

export const rooms: { key: RoomKey; label: string; image: string }[] = [
  { key: "living-room", label: "Living Room", image: `${VILLA}/sofa-back-wall.jpg` },
  { key: "bedroom", label: "Bedroom", image: `${VILLA}/master-bedroom-1.jpg` },
  { key: "kitchen", label: "Modular Kitchen", image: "/assets/projects/i7-villa/06-kitchen.webp" },
  { key: "dining", label: "Dining Room", image: `${VILLA}/dining-area.jpg` },
  { key: "wardrobe", label: "Wardrobes", image: `${VILLA}/master-bedroom-1-wardrobe.jpg` },
  { key: "pooja", label: "Pooja Room", image: `${VILLA}/pooja-door-wall.jpg` },
  { key: "tv-unit", label: "TV Unit", image: `${VILLA}/tv-unit.jpg` },
];

export const roomLabel: Record<RoomKey, string> = {
  "living-room": "Living Room",
  bedroom: "Bedroom",
  kitchen: "Kitchen",
  dining: "Dining",
  wardrobe: "Wardrobe",
  "tv-unit": "TV Unit",
  pooja: "Pooja Room",
  other: "Other Areas",
};
