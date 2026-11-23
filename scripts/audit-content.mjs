// Content audit: checks every image/video path referenced in src/ exists, data links resolve,
// and every source PDF is accounted for. Run: node scripts/audit-content.mjs
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const pub = path.join(root, "public");
const problems = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

// 1. every /assets/... path in source exists
const srcFiles = walk(path.join(root, "src")).filter((f) => /\.(tsx?|css)$/.test(f));
const refs = new Map();
for (const f of srcFiles) {
  const txt = fs.readFileSync(f, "utf8");
  for (const m of txt.matchAll(/["'`](\/assets\/[^"'`$\s]+\.(?:jpe?g|png|webp|mp4|svg))["'`]/g)) refs.set(m[1], f);
}
// template-literal paths like `${V}/name.jpg` are checked via data imports below
for (const [ref, f] of refs) if (!fs.existsSync(path.join(pub, ref))) problems.push(`Missing file ${ref} (in ${path.relative(root, f)})`);

// 2. generated design projects
const dp = fs.readFileSync(path.join(root, "src/data/design-projects.ts"), "utf8");
const json = JSON.parse(dp.slice(dp.indexOf("= [") + 2, dp.lastIndexOf("]") + 1));
let imgCount = 0;
const hashes = new Map();
const slugs = new Set();
const serviceSlugs = [...fs.readFileSync(path.join(root, "src/data/services.ts"), "utf8").matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
for (const p of json) {
  if (slugs.has(p.slug)) problems.push(`Duplicate slug ${p.slug}`);
  slugs.add(p.slug);
  if (!p.gallery.length) problems.push(`${p.slug}: empty gallery`);
  if (p.coverImage !== p.gallery[0]?.url) problems.push(`${p.slug}: cover is not first gallery image`);
  const roomsInGallery = new Set(p.gallery.map((g) => g.room));
  for (const r of p.rooms) if (!roomsInGallery.has(r)) problems.push(`${p.slug}: room ${r} listed but no image`);
  for (const s of p.services) if (!serviceSlugs.includes(s)) problems.push(`${p.slug}: unknown service ${s}`);
  for (const g of p.gallery) {
    imgCount++;
    const file = path.join(pub, g.url);
    if (!fs.existsSync(file)) { problems.push(`${p.slug}: missing ${g.url}`); continue; }
    if (!g.altText || g.altText.length < 10) problems.push(`${p.slug}: weak alt on ${g.url}`);
    const h = crypto.createHash("md5").update(fs.readFileSync(file)).digest("hex");
    if (hashes.has(h)) problems.push(`Duplicate image: ${g.url} == ${hashes.get(h)}`);
    hashes.set(h, g.url);
  }
}

// 3. villa + videos (template paths)
const villaDir = path.join(pub, "assets/projects/villa-interiors");
const projTs = fs.readFileSync(path.join(root, "src/data/projects.ts"), "utf8");
for (const m of projTs.matchAll(/\["([a-z0-9-]+)", "([a-z-]+)", "[A-Z]/g)) {
  if (!fs.existsSync(path.join(villaDir, m[1] + ".jpg"))) problems.push(`villa: missing ${m[1]}.jpg`);
  else imgCount++;
}
const vidTs = fs.readFileSync(path.join(root, "src/data/videos.ts"), "utf8");
let vids = 0;
for (const m of vidTs.matchAll(/v\("([a-z0-9-]+)"/g)) {
  vids++;
  for (const f of [`assets/videos/${m[1]}.mp4`, `assets/videos/posters/${m[1]}.jpg`]) if (!fs.existsSync(path.join(pub, f))) problems.push(`video: missing ${f}`);
}

// 3b. brand logos: every L("file") in src/data/brands.ts exists; brand ids used by categories exist
const brandSrc = fs.readFileSync(path.join(root, "src/data/brands.ts"), "utf8");
const logoRefs = [...brandSrc.matchAll(/L\("([^"]+)"\)/g)].map((m) => "/assets/brands/" + m[1]);
for (const l of logoRefs) if (!fs.existsSync(path.join(pub, l))) problems.push(`brand logo missing: ${l}`);
const brandIds = new Set([...brandSrc.matchAll(/\n  (\w+): \{ ?\n?\s*id: "(\w+)"/g)].map((m) => m[2]));
for (const m of brandSrc.matchAll(/brands: \[([^\]]+)\]/g))
  for (const id of m[1].match(/"[\w-]+"/g) ?? []) if (!brandIds.has(id.slice(1, -1))) problems.push(`brand category lists unknown brand ${id}`);

// 3c. finish close-ups: every img("name") in src/data/finishes.ts exists
const finishSrc = fs.readFileSync(path.join(root, "src/data/finishes.ts"), "utf8");
const finishRefs = [...finishSrc.matchAll(/img\("([^"]+)"\)/g)].map((m) => `/assets/finishes/${m[1]}.webp`);
for (const f of finishRefs) if (!fs.existsSync(path.join(pub, f))) problems.push(`finish image missing: ${f}`);

// 4. orphan files (in public but never referenced)
const used = new Set([...refs.keys(), ...logoRefs, ...finishRefs, ...json.flatMap((p) => p.gallery.map((g) => g.url))]);
const publicAssets = walk(path.join(pub, "assets")).filter((f) => !f.endsWith(".gitkeep") && !f.endsWith(".DS_Store")).map((f) => "/" + path.relative(pub, f));
const orphans = publicAssets.filter((a) => !used.has(a) && !a.includes("/videos/") && !a.includes("/villa-interiors/") && !a.includes("/3d-design/"));

// 5. source PDFs accounted for
const src = path.join(root, "source-assets");
const pdfs = fs.readdirSync(src).filter((f) => f.endsWith(".pdf"));
const byHash = new Map();
for (const f of pdfs) {
  const h = crypto.createHash("md5").update(fs.readFileSync(path.join(src, f))).digest("hex");
  byHash.set(h, [...(byHash.get(h) ?? []), f]);
}
const script = fs.readFileSync(path.join(root, "scripts/build-design-projects.py"), "utf8");
const folderOf = (f) => f.toLowerCase().replace(".pdf", "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const handled = { "villa-interiors": "Villa Interiors project (hand-written)", "villa-interiors-2": "Villa Interiors project (hand-written)", "3d-2d-ppt": "3D/2D drawings on /3d-design", "sbi-bank-interior": "NOT USED — needs client permission" };
const pdfReport = [...byHash.values()].map((names) => {
  const keys = names.map(folderOf);
  const status = keys.map((k) => handled[k]).find(Boolean) ?? (keys.some((k) => script.includes(`"${k}"`)) ? `project via build script` : "NOT ACCOUNTED FOR");
  if (status === "NOT ACCOUNTED FOR") problems.push(`PDF not used: ${names[0]}`);
  return `${names.length > 1 ? `[${names.length} copies] ` : ""}${names.sort((a, b) => a.length - b.length)[0]} → ${status}`;
});

console.log(`Unique PDFs: ${byHash.size} (of ${pdfs.length} files)`);
pdfReport.forEach((l) => console.log("  " + l));
console.log(`\nProjects: ${json.length} generated + villa | images checked: ${imgCount} | videos: ${vids}`);
console.log(`Brands: ${brandIds.size} | logos: ${logoRefs.length} | finish close-ups: ${finishRefs.length}`);
console.log(`Unreferenced public files: ${orphans.length}`);
orphans.slice(0, 15).forEach((o) => console.log("  " + o));
console.log(problems.length ? `\nPROBLEMS (${problems.length}):\n  ` + problems.join("\n  ") : "\nNo problems found.");
