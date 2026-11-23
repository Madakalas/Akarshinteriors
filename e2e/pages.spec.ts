import { expect, test } from "@playwright/test";
import { brokenImages, expectNoHorizontalOverflow, scrollThrough, watchErrors } from "./helpers";

// Every page in the sitemap plus the pages that are intentionally left out of it.
const SITEMAP_ROUTES = [
  "/", "/services", "/projects", "/locations", "/materials", "/process", "/about", "/3d-design", "/contact", "/privacy-policy", "/terms",
  "/services/modular-kitchens", "/services/wardrobes", "/services/complete-home-interiors", "/services/living-room-interiors",
  "/services/bedroom-interiors", "/services/tv-units", "/services/pooja-units", "/services/false-ceiling-lighting", "/services/custom-furniture",
  "/projects/villa-interiors", "/projects/i7-villa", "/projects/multi-level-residence", "/projects/4-bhk-duplex", "/projects/4-bhk-apartment",
  "/projects/duplex-home", "/projects/3-bhk-home", "/projects/full-house-interiors", "/projects/blush-kitchen-home",
  "/projects/home-with-private-theatre", "/projects/ground-floor-interiors", "/projects/sage-living-home", "/projects/grey-walnut-home",
  "/projects/contemporary-grey-home", "/projects/teak-and-cane-home", "/projects/blue-kitchen-home", "/projects/ivory-and-gold-home",
  "/projects/navy-kitchen-home", "/projects/blush-living-room",
  "/locations/anantapur", "/locations/kurnool", "/locations/nandyal", "/locations/hyderabad", "/locations/vijayawada",
  "/locations/visakhapatnam", "/locations/guntur", "/locations/tirupati", "/locations/nellore", "/locations/kadapa",
  "/thank-you",
];

test("sitemap lists every page we test (and nothing we don't)", async ({ page }) => {
  const res = await page.request.get("/sitemap.xml");
  const paths = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const missing = paths.filter((p) => !SITEMAP_ROUTES.includes(p));
  expect(missing, "pages in the sitemap without a test").toEqual([]);
});

for (const path of SITEMAP_ROUTES) {
  test(`page ${path} loads cleanly`, async ({ page }) => {
    const errors = watchErrors(page);
    const res = await page.goto(path, { waitUntil: "networkidle" });
    expect(res?.status(), "HTTP status").toBe(200);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.title()).toMatch(/Akarsh Interiors/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);

    await scrollThrough(page);
    await expectNoHorizontalOverflow(page);
    expect(await brokenImages(page), "images that failed to load").toEqual([]);
    const dupIds = await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
      return [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
    });
    expect(dupIds, "duplicate element ids").toEqual([]);
    expect(errors, "console errors / exceptions").toEqual([]);
  });
}

test("unknown page shows the 404 page", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByRole("link", { name: /home/i }).first()).toBeVisible();
});

test("old finish-library URL redirects to the Materials library", async ({ page }) => {
  await page.goto("/materials/finishes");
  await expect(page).toHaveURL(/\/materials#library$/);
});

test("robots.txt and sitemap are served", async ({ request }) => {
  expect((await request.get("/robots.txt")).ok()).toBeTruthy();
  expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
});
