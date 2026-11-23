import { expect, test } from "@playwright/test";

// Pages whose links we collect — covers the header, footer, cards, buttons and in-page anchors.
const START = ["/", "/services", "/services/modular-kitchens", "/projects", "/projects/villa-interiors", "/locations", "/locations/hyderabad", "/materials", "/about", "/contact", "/3d-design", "/process"];

test.describe.configure({ mode: "serial" });

test("every internal link and #anchor resolves", async ({ page, request }) => {
  test.skip(test.info().project.name !== "desktop", "link check runs once");
  test.setTimeout(300_000);
  const hrefs = new Set<string>();
  for (const path of START) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const found = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")!));
    for (const h of found) if (h.startsWith("/") || h.startsWith("#")) hrefs.add(h.startsWith("#") ? `${path}${h}` : h);
  }

  const broken: string[] = [];
  const checkedPages = new Map<string, string>();
  for (const href of hrefs) {
    const url = new URL(href, "http://x");
    const path = url.pathname;
    if (!checkedPages.has(path)) {
      const res = await request.get(path, { maxRedirects: 5 });
      checkedPages.set(path, res.status() < 400 ? await res.text() : "");
      if (res.status() >= 400) broken.push(`${href} → ${res.status()}`);
    }
    const id = url.hash.slice(1);
    if (id && checkedPages.get(path) && !checkedPages.get(path)!.includes(`id="${decodeURIComponent(id)}"`)) {
      broken.push(`${href} → no element with id "${id}"`);
    }
  }
  console.log(`checked ${hrefs.size} links across ${checkedPages.size} pages`);
  expect(broken).toEqual([]);
});

test("external links open safely in a new tab", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "runs once");
  for (const path of ["/", "/materials", "/contact", "/locations/kurnool"]) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const unsafe = await page.$$eval('a[href^="http"]', (as) =>
      (as as HTMLAnchorElement[]).filter((a) => a.target === "_blank" && !/noopener/.test(a.rel)).map((a) => a.href),
    );
    expect(unsafe, `on ${path}`).toEqual([]);
  }
});
