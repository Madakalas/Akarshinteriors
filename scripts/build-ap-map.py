"""
Generates src/data/ap-map.ts (SVG paths for the service-area map) from geoBoundaries data.

Sources (download first):
  ADM1 (states):    https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/IND/ADM1/geoBoundaries-IND-ADM1_simplified.geojson
                    DataMeet India / Election Commission of India — CC BY 2.5 IN
  ADM2 (districts): https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/IND/ADM2/geoBoundaries-IND-ADM2_simplified.geojson
                    Pathways Data / lgdirectory.gov.in — ODbL 1.0

Usage: python3 scripts/build-ap-map.py adm1.geojson adm2.geojson
"""
import json
import math
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
adm1 = json.load(open(sys.argv[1]))
adm2 = json.load(open(sys.argv[2]))

# Map window (degrees) — Andhra Pradesh with a little context around it.
LON0, LON1, LAT0, LAT1 = 76.2, 84.9, 12.4, 19.5
WIDTH = 1000
K = math.cos(math.radians((LAT0 + LAT1) / 2))
SCALE = WIDTH / ((LON1 - LON0) * K)
HEIGHT = round((LAT1 - LAT0) * SCALE)


def proj(lon, lat):
    return ((lon - LON0) * K * SCALE, (LAT1 - lat) * SCALE)


def rings(geom):
    if geom["type"] == "Polygon":
        return geom["coordinates"]
    return [r for poly in geom["coordinates"] for r in poly]


def outer_rings(geom):
    if geom["type"] == "Polygon":
        return [geom["coordinates"][0]]
    return [poly[0] for poly in geom["coordinates"]]


def simplify(points, tol):
    """Douglas-Peucker on projected points."""
    if len(points) < 4:
        return points
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        a, b = stack.pop()
        ax, ay = points[a]
        bx, by = points[b]
        dx, dy = bx - ax, by - ay
        norm = math.hypot(dx, dy) or 1e-9
        best, idx = 0.0, None
        for i in range(a + 1, b):
            px, py = points[i]
            d = abs(dy * px - dx * py + bx * ay - by * ax) / norm
            if d > best:
                best, idx = d, i
        if idx is not None and best > tol:
            keep[idx] = True
            stack += [(a, idx), (idx, b)]
    return [p for p, k in zip(points, keep) if k]


def in_window(ring, pad=1.5):
    return any(LON0 - pad <= x <= LON1 + pad and LAT0 - pad <= y <= LAT1 + pad for x, y in ring)


def path_d(ring_list, tol=0.9, min_area=6):
    out = []
    for ring in ring_list:
        if not in_window(ring):
            continue
        raw = [proj(x, y) for x, y in ring]
        if len(raw) > 3 and raw[0] == raw[-1]:
            raw = raw[:-1]
        mid = len(raw) // 2  # closed ring: simplify two open halves
        pts = simplify(raw[: mid + 1], tol)[:-1] + simplify(raw[mid:] + [raw[0]], tol)[:-1]
        if len(pts) < 3:
            continue
        area = abs(sum(pts[i][0] * pts[i - 1][1] - pts[i - 1][0] * pts[i][1] for i in range(len(pts)))) / 2
        if area < min_area:
            continue
        out.append("M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in pts) + "Z")
    return "".join(out)


def point_in_ring(x, y, ring):
    inside = False
    j = len(ring) - 1
    for i in range(len(ring)):
        xi, yi = ring[i]
        xj, yj = ring[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi:
            inside = not inside
        j = i
    return inside


states = {f["properties"]["shapeName"]: f["geometry"] for f in adm1["features"]}
ap = states["Andhra Pradesh"]
ap_rings = outer_rings(ap)

neighbours = {}
for name in ["Telangāna", "Karnātaka", "Tamil Nādu", "Odisha", "Chhattīsgarh", "Mahārāshtra", "Puducherry"]:
    d = path_d(outer_rings(states[name]), tol=2.2, min_area=60)
    if d:
        neighbours[name.replace("ā", "a").replace("ī", "i")] = d

# AP districts: those whose first ring's centroid falls inside the AP outline
districts = []
for f in adm2["features"]:
    ring = outer_rings(f["geometry"])[0]
    cx = sum(p[0] for p in ring) / len(ring)
    cy = sum(p[1] for p in ring) / len(ring)
    if not (LON0 <= cx <= LON1 and LAT0 <= cy <= LAT1):
        continue
    if f["properties"]["shapeName"] != "Yanam" and any(point_in_ring(cx, cy, r) for r in ap_rings):
        districts.append({"name": f["properties"]["shapeName"], "d": path_d(outer_rings(f["geometry"]), tol=1.8, min_area=30)})

# Cities with their own page (map pins), keyed by location slug.
CITIES = {
    "anantapur": (77.6006, 14.6819),
    "kurnool": (78.0373, 15.8281),
    "nandyal": (78.4836, 15.4786),
    "hyderabad": (78.4867, 17.3850),
    "vijayawada": (80.6480, 16.5062),
    "visakhapatnam": (83.2185, 17.6868),
    "guntur": (80.4365, 16.3067),
    "tirupati": (79.4192, 13.6288),
    "nellore": (79.9865, 14.4426),
    "kadapa": (78.8242, 14.4673),
}
# Other towns we also serve (small dots) — shows the service area is the whole state.
TOWNS = {
    "Srikakulam": (83.8968, 18.2949),
    "Vizianagaram": (83.3956, 18.1067),
    "Kakinada": (82.2475, 16.9891),
    "Rajahmundry": (81.8040, 17.0005),
    "Eluru": (81.0952, 16.7107),
    "Machilipatnam": (81.1389, 16.1875),
    "Ongole": (80.0499, 15.5057),
    "Chittoor": (79.1003, 13.2172),
    "Madanapalle": (78.5010, 13.5503),
    "Hindupur": (77.5007, 13.8291),
    "Proddatur": (78.5512, 14.7502),
    "Adoni": (77.2728, 15.6280),
}
# Reference cities outside the service area, shown faintly for orientation.
CONTEXT = {
    "Bengaluru": (77.5946, 12.9716),
    "Chennai": (80.2707, 13.0827),
}
# Every AP district is a service district.
SERVICE_DISTRICTS = {d["name"] for d in districts}
# Greater Hyderabad (Telangana districts in this dataset).
HYD_NAMES = ["Hydrabad", "Medchal", "Rangareddy"]
hyd = [f for f in adm2["features"] if f["properties"]["shapeName"] in HYD_NAMES and f["properties"].get("shapeGroup", "IND") == "IND"]
hyderabad_area = path_d([r for f in hyd for r in outer_rings(f["geometry"])], tol=1.2, min_area=4)

ts = f"""// AUTO-GENERATED by scripts/build-ap-map.py — do not edit by hand.
// Boundaries: geoBoundaries (DataMeet India / ECI, CC BY 2.5 IN; districts: lgdirectory.gov.in, ODbL 1.0).
// District lines follow the pre-2022 district map and are indicative only.

export const MAP_VIEWBOX = "0 0 {WIDTH} {HEIGHT}";
export const MAP_SIZE = {{ width: {WIDTH}, height: {HEIGHT} }};

/** Equirectangular projection used for every path, so labels can be placed from lon/lat. */
export const MAP_PROJECTION = {{ lon0: {LON0}, lat1: {LAT1}, k: {K:.6f}, scale: {SCALE:.4f} }};
export function project(lon: number, lat: number) {{
  return {{ x: (lon - MAP_PROJECTION.lon0) * MAP_PROJECTION.k * MAP_PROJECTION.scale, y: (MAP_PROJECTION.lat1 - lat) * MAP_PROJECTION.scale }};
}}

export const apOutline = {json.dumps(path_d(ap_rings, tol=1.1, min_area=8))};

export const neighbourStates: {{ name: string; d: string }}[] = {json.dumps([{"name": k, "d": v} for k, v in neighbours.items()])};

export const apDistricts: {{ name: string; d: string; service: boolean }}[] = {json.dumps([{**d, "service": d["name"] in SERVICE_DISTRICTS} for d in districts])};

/** Projected positions (SVG units) of the service cities, keyed by location slug. */
export const cityPoints: Record<string, {{ x: number; y: number; lat: number; lon: number }}> = {json.dumps({k: {"x": round(proj(*v)[0], 1), "y": round(proj(*v)[1], 1), "lat": v[1], "lon": v[0]} for k, v in CITIES.items()})};

/** Greater Hyderabad area (Hyderabad, Medchal and Rangareddy districts), part of the service area. */
export const hyderabadArea = {json.dumps(hyderabad_area)};

/** Other towns in the service area, shown as small dots. */
export const serviceTowns: {{ name: string; x: number; y: number }}[] = {json.dumps([{"name": k, "x": round(proj(*v)[0], 1), "y": round(proj(*v)[1], 1)} for k, v in TOWNS.items()])};

/** Reference cities outside the service area, shown faintly for orientation. */
export const contextCities: {{ name: string; x: number; y: number }}[] = {json.dumps([{"name": k, "x": round(proj(*v)[0], 1), "y": round(proj(*v)[1], 1)} for k, v in CONTEXT.items()])};
"""
out = os.path.join(ROOT, "src", "data", "ap-map.ts")
open(out, "w").write(ts)
print(f"wrote {out}: {os.path.getsize(out)//1024} KB, districts={[d['name'] for d in districts]}, neighbours={list(neighbours)}")
