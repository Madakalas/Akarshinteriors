import { expect, type Page } from "@playwright/test";

/** Collects console errors and uncaught exceptions for a page. */
export function watchErrors(page: Page, ignore: RegExp[] = []) {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" && !ignore.some((r) => r.test(m.text()))) errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  return errors;
}

/** Scrolls through the page so lazy images and in-view animations load. */
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
}

export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow, "page should not scroll sideways").toBeLessThanOrEqual(1);
}

/** Images that failed to load (naturalWidth 0 after load). */
export async function brokenImages(page: Page) {
  return page.evaluate(async () => {
    const imgs = [...document.images];
    await Promise.all(
      imgs.map((i) =>
        i.complete
          ? null
          : new Promise((r) => {
              i.addEventListener("load", r, { once: true });
              i.addEventListener("error", r, { once: true });
              setTimeout(r, 4000);
            }),
      ),
    );
    return imgs.filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc).map((i) => i.currentSrc);
  });
}

/** All routes listed in the sitemap, as paths. */
export async function sitemapPaths(page: Page) {
  const res = await page.request.get("/sitemap.xml");
  expect(res.ok()).toBeTruthy();
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}
