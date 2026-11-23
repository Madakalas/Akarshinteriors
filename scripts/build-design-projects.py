"""
Builds web images + src/data/design-projects.ts from the 3D presentation PDFs in /source-assets.

Usage (from the project root):
    python3 scripts/build-design-projects.py <extracted-images-dir>

<extracted-images-dir> holds one folder per PDF with page images named pNN-K.jpg
(extracted with pypdf). Selections below were made by reviewing every page:
floor plans, bathrooms, duplicate angles and renders showing third-party logos or
film stills on TV screens are excluded. Client names from file names are NOT used.
"""
import json
import os
import sys

from PIL import Image

SRC = sys.argv[1]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_IMG = os.path.join(ROOT, "public", "assets", "projects")
OUT_TS = os.path.join(ROOT, "src", "data", "design-projects.ts")

ROOM_LABEL = {
    "living-room": "Living room", "dining": "Dining area", "kitchen": "Modular kitchen", "bedroom": "Bedroom",
    "wardrobe": "Wardrobe", "tv-unit": "TV unit", "pooja": "Pooja unit", "other": "Interior",
}
ROOM_SERVICES = {
    "kitchen": "modular-kitchens", "wardrobe": "wardrobes", "tv-unit": "tv-units", "pooja": "pooja-units",
    "bedroom": "bedroom-interiors", "living-room": "living-room-interiors",
}

# (source folder, slug, title, propertyType, category, featured, [(page, room, optional alt detail)])
P = [
    ("i7-villa-2", "i7-villa", "I7 Villa", "Villa", "Complete Home Interiors", True, [
        ("p04", "living-room", "curved sofa and backlit arch panels"), ("p05", "living-room", "lounge with wooden ceiling"),
        ("p08", "living-room", "jaali partition and sectional sofa"), ("p10", "dining", "open dining beside the living area"),
        ("p11", "dining", "dining table with glass-front kitchen behind"), ("p13", "kitchen", "U-shaped kitchen with glass wall units"),
        ("p14", "kitchen", "breakfast counter with stone cladding"), ("p15", "kitchen", "tall appliance units"),
        ("p21", "living-room", "upper-floor family lounge"), ("p22", "living-room", "lounge with panelled walls"),
        ("p23", "pooja", "carved pooja doors"), ("p24", "pooja", "inside the pooja room"),
        ("p18", "bedroom", "bedroom with botanical wall"), ("p19", "bedroom", "bedroom with large window"),
        ("p20", "wardrobe", "wardrobe and dressing niche"), ("p25", "bedroom", "bedroom with tropical wallpaper"),
        ("p26", "bedroom", "bedroom with panelled headboard"), ("p27", "wardrobe", "walk-in wardrobe with glass shutters"),
        ("p28", "bedroom", "bedroom with study shelves"), ("p29", "tv-unit", "bedroom TV wall with profile lighting"),
        ("p31", "bedroom", "bedroom with rose-toned headboard"),
    ]),
    ("00-mr-subba-rao-s-3d-render-presentation-1-1", "multi-level-residence", "Multi-Level Residence", "Other", "Complete Home Interiors", True, [
        ("p08-2", "living-room", "double-height formal living"), ("p07-2", "living-room", "formal living with feature wall"),
        ("p09-0", "dining", "dining with wooden ceiling"), ("p10-0", "dining", "eight-seater dining"),
        ("p11-0", "kitchen", "island kitchen"), ("p12-0", "pooja", "pooja unit with backlit panel"),
        ("p05-2", "other", "home office"), ("p06-0", "other", "lobby lounge"),
        ("p22-3", "living-room", "first-floor living room"), ("p23-0", "other", "bar counter and display"),
        ("p24-0", "other", "ante room"), ("p25-0", "other", "home theatre"), ("p26-0", "other", "home theatre seating"),
        ("p13-3", "bedroom", "master bedroom with marble headboard"), ("p15-3", "wardrobe", "walk-in wardrobe"),
        ("p17-4", "bedroom", "bedroom with wall panelling"), ("p18-0", "wardrobe", "bedroom wardrobe and study"),
        ("p19-5", "wardrobe", "dressing unit"), ("p27-0", "bedroom", "bedroom with herringbone panel"),
        ("p30-0", "bedroom", "bedroom option one"), ("p32-0", "bedroom", "bedroom option two"),
        ("p36-0", "bedroom", "bedroom with arched wardrobe"), ("p42-0", "bedroom", "top-floor bedroom"),
    ]),
    ("4bhk-duplex-merged-1", "4-bhk-duplex", "4 BHK Duplex", "4 BHK", "Complete Home Interiors", True, [
        ("p06", "living-room", "double-height living with staircase"), ("p05", "living-room", "living room TV wall"),
        ("p07", "living-room", "living and dining"), ("p01", "other", "backlit display partition"),
        ("p04", "living-room", "lounge"), ("p08", "dining", "dining under the staircase"),
        ("p09", "kitchen", "kitchen with breakfast counter"), ("p10", "kitchen", "L-shaped kitchen"),
        ("p11", "kitchen", "kitchen with tall units"), ("p12", "bedroom", "bedroom with walk-in wardrobe"),
        ("p13", "wardrobe", "glass-shutter walk-in wardrobe"), ("p14", "bedroom", "bedroom with feature wall"),
        ("p16", "bedroom", "dark-panelled bedroom"), ("p18", "bedroom", "bedroom with round accent light"),
        ("p20", "bedroom", "guest bedroom"),
    ]),
    ("4bhk-interior-full-flat", "4-bhk-apartment", "4 BHK Apartment", "4 BHK", "Complete Home Interiors", False, [
        ("p05", "living-room", "living room with brown ceiling panel"), ("p02", "living-room", "living room with textured wall"),
        ("p03", "living-room", "living room seating"), ("p07", "living-room", "living room with jaali door"),
        ("p09", "dining", "dining with display shelving"), ("p10", "dining", "dining area"),
        ("p12", "kitchen", "kitchen with breakfast counter"), ("p13", "kitchen", "kitchen with black stone counter"),
        ("p16", "other", "balcony seating"), ("p17", "bedroom", "bedroom with wooden headboard wall"),
        ("p18", "bedroom", "bedroom"), ("p20", "bedroom", "bedroom with wave wardrobe design"),
        ("p22", "bedroom", "bedroom with black-and-gold headboard"), ("p25", "wardrobe", "sliding wardrobe"),
        ("p27", "wardrobe", "bedroom wardrobe"), ("p19", "other", "false ceiling with cove lighting"),
    ]),
    ("duplex-lead-1", "duplex-home", "Duplex Home", "Other", "Complete Home Interiors", False, [
        ("p10", "living-room", "living room"), ("p05", "living-room", "entrance and living"),
        ("p04", "other", "entrance foyer"), ("p12", "dining", "dining with wooden ceiling"),
        ("p13", "kitchen", "green kitchen and dining"), ("p14", "kitchen", "green modular kitchen"),
        ("p15", "kitchen", "kitchen with tall units"), ("p17", "bedroom", "bedroom"),
        ("p18", "bedroom", "bedroom with gallery wall"), ("p19", "bedroom", "bedroom with wardrobe wall"),
        ("p26", "bedroom", "bedroom lounge corner"), ("p28", "bedroom", "bedroom with panelled wall"),
        ("p29", "bedroom", "bedroom seating area"),
    ]),
    ("render-3bhk", "3-bhk-home", "3 BHK Home", "3 BHK", "Complete Home Interiors", False, [
        ("p01", "living-room", "living room with green sofa"), ("p02", "living-room", "living room seating"),
        ("p03", "tv-unit", "TV unit with wood slats"), ("p04", "living-room", "living room with panelled wall"),
        ("p05", "dining", "dining area"), ("p08", "kitchen", "kitchen with breakfast counter"),
        ("p11", "pooja", "pooja unit"), ("p06", "other", "balcony with swing"),
        ("p14", "bedroom", "master bedroom"), ("p15", "tv-unit", "bedroom TV unit"),
        ("p18", "bedroom", "bedroom with upholstered headboard"), ("p23", "bedroom", "bedroom with dark wall"),
        ("p27", "bedroom", "bedroom with pendant lights"),
    ]),
    ("mr-karthick-full-house-design-presentation-1", "full-house-interiors", "Full House Interiors", "Other", "Complete Home Interiors", False, [
        ("p07", "dining", "dining with teal crockery unit"), ("p02", "living-room", "living room with carved pillar"),
        ("p04-1", "living-room", "living room with art panel"), ("p05", "dining", "open dining"),
        ("p10-1", "living-room", "living room with swing"), ("p13", "living-room", "living room"),
        ("p34", "kitchen", "green U-shaped kitchen"), ("p35-1", "kitchen", "kitchen with open shelves"),
        ("p36", "kitchen", "kitchen with tall fridge unit"), ("p30", "pooja", "pooja doors"),
        ("p31", "pooja", "pooja unit"), ("p14", "bedroom", "bedroom with geometric wall art"),
        ("p15-1", "wardrobe", "bedroom wardrobe"), ("p19", "bedroom", "bedroom with travel-themed wall"),
        ("p20-1", "wardrobe", "wardrobe and study"), ("p23", "bedroom", "bedroom with record wall art"),
        ("p27", "bedroom", "study bedroom"), ("p28", "bedroom", "study desk"), ("p33", "other", "family lounge"),
    ]),
    ("aprana-project", "blush-kitchen-home", "Home with Blush Kitchen", "Other", "Complete Home Interiors", False, [
        ("p04", "living-room", "living room with landscape mural"), ("p05", "living-room", "living room seating"),
        ("p06", "tv-unit", "TV wall with wooden slats"), ("p03", "other", "arched console niche"),
        ("p08", "dining", "dining with display units"), ("p09", "dining", "dining area"),
        ("p10", "kitchen", "blush-toned modular kitchen"), ("p11", "kitchen", "parallel kitchen run"),
        ("p13", "pooja", "arched pooja unit"), ("p14-0", "pooja", "pooja unit detail"),
        ("p16", "bedroom", "bedroom with tropical wallpaper"), ("p15", "wardrobe", "arched wardrobe"),
        ("p17", "bedroom", "bedroom"), ("p18", "tv-unit", "bedroom TV wall"),
        ("p19", "wardrobe", "sliding wardrobe"), ("p21", "bedroom", "bedroom with marble headboard"),
    ]),
    ("mr-lahari-1", "home-with-private-theatre", "Home with Private Theatre", "Other", "Complete Home Interiors", False, [
        ("p01", "living-room", "living room with wooden TV wall"), ("p02", "living-room", "living room"),
        ("p03", "living-room", "living room seating"), ("p05", "dining", "dining with arched doorway"),
        ("p06", "kitchen", "kitchen and dining"), ("p07", "kitchen", "blue-grey kitchen"),
        ("p08", "kitchen", "kitchen with bar display"), ("p10", "other", "staircase with indoor garden"),
        ("p11", "bedroom", "bedroom with blue wardrobe"), ("p13", "bedroom", "bedroom"),
        ("p14", "bedroom", "bedroom with golden wardrobe"), ("p16", "bedroom", "bedroom with dressing unit"),
        ("p18", "other", "home theatre seating"),
    ]),
    ("mr-parushuram-ground-floor-1", "ground-floor-interiors", "Ground Floor Interiors", "Other", "Complete Home Interiors", False, [
        ("p01", "living-room", "living room with marble-print wall"), ("p02", "living-room", "living room with arched niche"),
        ("p03", "living-room", "living room seating"), ("p05", "dining", "dining with statement art"),
        ("p07", "dining", "dining area"), ("p08", "living-room", "family lounge with staircase"),
        ("p11", "kitchen", "kitchen with pooja doors"), ("p12", "kitchen", "L-shaped kitchen"),
        ("p13", "kitchen", "kitchen with tall appliance wall"), ("p15", "bedroom", "bedroom with wooden slats"),
        ("p16", "bedroom", "bedroom"), ("p04", "other", "false ceiling with oval cove"),
    ]),
    ("linga-murthi-1", "sage-living-home", "Home with Sage Living Room", "Other", "Complete Home Interiors", False, [
        ("p01", "living-room", "living room with sage sofas"), ("p02", "living-room", "open living and dining"),
        ("p03", "living-room", "living room with curved sofa"), ("p05", "dining", "dining with calligraphy wall art"),
        ("p06", "dining", "dining partition"), ("p08", "kitchen", "straight kitchen"),
        ("p09", "kitchen", "kitchen with tall units"), ("p10", "bedroom", "bedroom with open wardrobes"),
        ("p12", "bedroom", "bedroom with arched shelving"), ("p04", "other", "false ceiling layout"),
    ]),
    ("moumika-project-my-3d-works-1-1", "grey-walnut-home", "Grey & Walnut Home", "Other", "Complete Home Interiors", False, [
        ("p02", "living-room", "living room"), ("p03", "tv-unit", "marble TV wall"),
        ("p04", "living-room", "living room seating"), ("p06", "dining", "dining with display unit"),
        ("p07", "dining", "dining with backlit leaf panel"), ("p10", "kitchen", "sage kitchen"),
        ("p11", "kitchen", "L-shaped kitchen"), ("p14", "pooja", "pooja room glass door"),
        ("p15", "other", "study unit"), ("p18", "bedroom", "master bedroom"),
        ("p19", "bedroom", "bedroom"), ("p22", "bedroom", "guest bedroom"), ("p25", "tv-unit", "bedroom TV wall"),
    ]),
    ("untitled-13-2-1", "contemporary-grey-home", "Contemporary Grey Home", "Other", "Complete Home Interiors", False, [
        ("p01", "living-room", "living room with sculptural chairs"), ("p02", "living-room", "living room"),
        ("p03", "tv-unit", "TV wall"), ("p04", "living-room", "living room seating"),
        ("p06", "dining", "dining with pendant lights"), ("p07", "dining", "dining with botanical wallpaper"),
        ("p08", "kitchen", "kitchen with arched glass door"), ("p09", "kitchen", "navy kitchen"),
        ("p11", "pooja", "pooja niche"), ("p12", "living-room", "family lounge"),
        ("p15", "bedroom", "bedroom"), ("p16", "wardrobe", "wardrobe"), ("p18", "bedroom", "bedroom with floral wall"),
        ("p21", "bedroom", "bedroom with cut-out panels"), ("p14", "other", "false ceiling detail"),
    ]),
    ("doc-20260825-wa0005", "teak-and-cane-home", "Teak & Cane Home", "Other", "Complete Home Interiors", False, [
        ("p09", "living-room", "living room with arched screens"), ("p18", "living-room", "living room with peacock mural"),
        ("p15", "living-room", "family lounge"), ("p05", "dining", "dining with painting"),
        ("p03", "kitchen", "kitchen"), ("p04", "kitchen", "kitchen with tall units"),
        ("p12", "kitchen", "kitchen with glass wall units"), ("p10", "bedroom", "twin bedroom"),
        ("p11", "wardrobe", "cane-shutter wardrobe"), ("p14", "wardrobe", "fluted wardrobe"),
        ("p17", "bedroom", "bedroom"), ("p22", "wardrobe", "teak and cane wardrobe"), ("p20", "wardrobe", "wardrobe"),
    ]),
    ("doc-20260430-wa0077", "blue-kitchen-home", "Home with Blue Kitchen", "Other", "Complete Home Interiors", False, [
        ("p01", "living-room", "living room"), ("p03", "kitchen", "blue L-shaped kitchen"),
        ("p04", "kitchen", "kitchen with glass shutters"), ("p05", "kitchen", "kitchen"),
        ("p07", "dining", "dining with pendant lights"), ("p08", "kitchen", "kitchen with crockery unit"),
        ("p10", "bedroom", "bedroom with pink wall"), ("p09", "wardrobe", "wardrobe with dresser"),
        ("p11", "wardrobe", "sliding wardrobe"), ("p12", "bedroom", "bedroom"),
    ]),
    ("doc-20260424-wa0093", "ivory-and-gold-home", "Ivory & Gold Home", "Other", "Complete Home Interiors", False, [
        ("p02", "living-room", "living room with gold accents"), ("p04", "living-room", "living room with jaali partition"),
        ("p05", "kitchen", "ivory U-shaped kitchen"), ("p06", "kitchen", "kitchen with glass wall units"),
        ("p07", "kitchen", "kitchen with breakfast counter"), ("p08", "kitchen", "kitchen with tall units"),
        ("p09", "dining", "dining area"),
    ]),
    ("3d", "navy-kitchen-home", "Home with Navy Kitchen", "Other", "Complete Home Interiors", False, [
        ("p02", "living-room", "living room"), ("p07", "kitchen", "navy kitchen with breakfast counter"),
        ("p08", "kitchen", "navy L-shaped kitchen"), ("p09", "kitchen", "kitchen with tall units"),
        ("p05", "dining", "dining area"), ("p06", "dining", "crockery and display unit"),
        ("p03-0", "pooja", "pooja doors"), ("p04", "pooja", "pooja unit"),
        ("p10", "bedroom", "bedroom"), ("p13", "bedroom", "bedroom with study"),
        ("p14", "wardrobe", "wardrobe"), ("p16", "bedroom", "bedroom"), ("p17", "wardrobe", "panelled wardrobe"),
        ("p19-0", "wardrobe", "wardrobe with dressing unit"),
    ]),
    ("living-room", "blush-living-room", "Blush Living Room", "Other", "Living Room Interiors", False, [
        ("p02", "living-room", "living room with blush wall"), ("p04", "living-room", "living room seating"),
    ]),
]


def src_file(folder, page):
    name = page if "-" in page else f"{page}-0"
    return os.path.join(SRC, folder, f"{name}.jpg")


projects = []
for folder, slug, title, ptype, category, featured, items in P:
    out_dir = os.path.join(OUT_IMG, slug)
    os.makedirs(out_dir, exist_ok=True)
    media = []
    for i, (page, room, detail) in enumerate(items):
        im = Image.open(src_file(folder, page)).convert("RGB")
        im.thumbnail((1800, 1800), Image.LANCZOS)
        fname = f"{i + 1:02d}-{room}.webp"
        im.save(os.path.join(out_dir, fname), "WEBP", quality=80, method=6)
        alt = f"{ROOM_LABEL[room]} 3D design — {detail}"
        media.append({"url": f"/assets/projects/{slug}/{fname}", "room": room, "alt": alt})
    rooms = list(dict.fromkeys(m["room"] for m in media))
    services = ["complete-home-interiors"] if category == "Complete Home Interiors" else []
    services += [ROOM_SERVICES[r] for r in rooms if r in ROOM_SERVICES and ROOM_SERVICES[r] not in services]
    services.append("3d-interior-design")
    projects.append({
        "slug": slug, "title": title, "propertyType": ptype, "category": category,
        "featured": featured, "media": media, "rooms": rooms, "services": services, "source": folder,
    })
    print(f"{slug:32s} {len(media):2d} images  rooms={rooms}")

ts = [
    "// AUTO-GENERATED by scripts/build-design-projects.py from the 3D presentation PDFs in /source-assets.",
    "// Edit the script (or move a project into projects.ts) rather than editing this file by hand.",
    "// City, size and completion details are not stated in the PDFs — add them in projects.ts overrides once confirmed.",
    'import type { Project } from "@/lib/types";',
    "",
    "export const designProjects: Project[] = " + json.dumps([
        {
            "id": f"d-{p['slug']}",
            "slug": p["slug"],
            "title": p["title"],
            "propertyType": p["propertyType"],
            "stage": "design",
            "category": p["category"],
            "description": "",
            "coverImage": p["media"][0]["url"],
            "gallery": [
                {"id": f"{p['slug']}-{i + 1}", "type": "image", "url": m["url"], "altText": m["alt"], "room": m["room"], "sortOrder": i}
                for i, m in enumerate(p["media"])
            ],
            "videos": [],
            "rooms": p["rooms"],
            "materials": [],
            "services": p["services"],
            "featured": p["featured"],
            "published": True,
        }
        for p in projects
    ], indent=2) + ";",
    "",
]
with open(OUT_TS, "w") as f:
    f.write("\n".join(ts))
print("wrote", OUT_TS)
