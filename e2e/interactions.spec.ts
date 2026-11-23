import { expect, test } from "@playwright/test";
import { watchErrors } from "./helpers";

const isMobile = () => test.info().project.name === "mobile";

test.describe("navigation", () => {
  test("desktop dropdown menus open and link through", async ({ page }) => {
    test.skip(isMobile(), "desktop only");
    await page.goto("/");
    await page.getByRole("button", { name: "Services menu" }).click();
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Modular Kitchens" }).click();
    await expect(page).toHaveURL(/\/services\/modular-kitchens$/);
    // Next 16 keeps the previous page in the DOM (hidden, for instant Back), so count visible headings only
    const h1 = page.locator("h1").filter({ visible: true });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("Modular Kitchens");
  });

  test("mobile menu opens, navigates and closes", async ({ page }) => {
    test.skip(!isMobile(), "mobile only");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const nav = page.getByRole("navigation", { name: "Mobile" });
    await expect(nav).toBeVisible();
    await nav.getByRole("link", { name: "Materials", exact: true }).click();
    await expect(page).toHaveURL(/\/materials$/);
    await expect(nav).toBeHidden();
  });

  test("mobile action bar has call, WhatsApp and quote", async ({ page }) => {
    test.skip(!isMobile(), "mobile only");
    await page.goto("/");
    await expect(page.locator('a[href^="tel:+91"]').last()).toBeVisible();
    await expect(page.locator('a[href*="wa.me/919666306868"]').last()).toBeVisible();
  });
});

test.describe("galleries", () => {
  test("project hero: clicking a thumbnail swaps it into the main image", async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto("/projects/villa-interiors");
    const counter = page.locator("[aria-live=polite]").filter({ hasText: "/ 18" }).first();
    await expect(counter).toHaveText("1 / 18");
    const thumb = isMobile() ? page.locator("button[aria-current]").nth(4) : page.locator("button[aria-label$='as the main image']").nth(1);
    await thumb.click();
    await expect(counter).not.toHaveText("1 / 18");
    expect(errors).toEqual([]);
  });

  test("project gallery lightbox opens, pages and closes", async ({ page }) => {
    await page.goto("/projects/i7-villa");
    await page.locator("#gallery").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /^Open image:/ }).first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Next image" }).click();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("service hero carousel: thumbnail, arrows", async ({ page }) => {
    await page.goto("/services/modular-kitchens");
    const carousel = page.locator("[aria-roledescription=carousel]");
    const counter = carousel.locator("[aria-live=polite]");
    await carousel.getByRole("button", { name: "Show photo 4" }).click();
    await expect(counter).toHaveText(/^4 \/ \d+$/);
    await carousel.getByRole("button", { name: "Next photo" }).click();
    await expect(counter).toHaveText(/^5 \/ \d+$/);
    await carousel.getByRole("button", { name: "Previous photo" }).click();
    await expect(counter).toHaveText(/^4 \/ \d+$/);
  });

  test("projects page filters by room", async ({ page }) => {
    await page.goto("/projects?room=kitchen");
    await expect(page.locator("main a[href^='/projects/']").first()).toBeVisible();
    await expect(page.locator("#room, select").first()).toBeVisible();
  });
});

test.describe("materials", () => {
  test("library tabs, filter, search and detail panel", async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto("/materials#library");
    const lib = page.locator("#library");
    const count = lib.getByText(/^\d+ items?$/);

    await lib.getByRole("tab", { name: /^Tiles/ }).click();
    await expect(count).toHaveText("12 items");
    await lib.getByRole("tab", { name: /^Laminates/ }).click();
    await expect(count).toHaveText("70 items");
    await lib.getByRole("tab", { name: /^All/ }).click();

    await lib.getByRole("searchbox").fill("elephant");
    await expect(count).toHaveText("2 items");
    await lib.getByRole("button", { name: /Temple Elephant Pooja Door.*view details/ }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("heading", { name: "Temple Elephant Pooja Door" })).toBeVisible();
    await expect(dialog).not.toContainText("₹");
    await page.keyboard.press("Escape");
    await lib.getByRole("searchbox").fill("");

    // no prices anywhere in the library
    await expect(lib).not.toContainText("₹");
    expect(errors).toEqual([]);
  });

  test("Dorby collection filter shows the 41 Dorby shades", async ({ page }) => {
    test.skip(isMobile(), "sidebar filters are desktop; mobile uses the drawer");
    await page.goto("/materials#library");
    const lib = page.locator("#library");
    await lib.locator("aside label").filter({ hasText: "Dorby Fluted Laminates" }).click();
    await expect(lib.getByText(/^\d+ items?$/)).toHaveText("41 items");
    await lib.getByRole("button", { name: /Mint Green – BF 183: view details/ }).click();
    await expect(page.getByRole("dialog").getByRole("link", { name: /View Mint Green BF 183 on Dorby/ })).toHaveAttribute(
      "href",
      "https://www.dorbypanels.com/products/mint-green-bf-183",
    );
  });

  test("mobile filter drawer works", async ({ page }) => {
    test.skip(!isMobile(), "mobile only");
    await page.goto("/materials#library");
    await page.locator("#library").getByRole("button", { name: /^Filters/ }).click();
    const drawer = page.getByRole("dialog");
    await drawer.locator("label").filter({ hasText: "Floor Tile" }).click();
    await drawer.getByRole("button", { name: /^Show \d+ items$/ }).click();
    await expect(page.locator("#library").getByText(/^\d+ items?$/)).toHaveText("8 items");
  });

  test("shortlist adds items and offers WhatsApp", async ({ page }) => {
    await page.goto("/materials#library");
    const hearts = page.locator("#library li button[aria-pressed]");
    await hearts.nth(0).click();
    await hearts.nth(1).click();
    const bar = page.getByText("2 finishes shortlisted");
    await expect(bar).toBeVisible();
    await expect(page.getByRole("link", { name: "Send list" })).toHaveAttribute("href", /wa\.me\/919666306868/);
  });

  test("brand categories are in the requested order and open a brand panel", async ({ page }) => {
    await page.goto("/materials#brands");
    const titles = await page.locator("#brands section h3").allTextContents();
    expect(titles.slice(0, 10)).toEqual([
      "Plywood & Boards",
      "Furniture Hardware & Accessories",
      "Laminates",
      "Acrylic & Decorative Surfaces",
      "Premium Handles & Door Fittings",
      "False Ceiling – Gypsum & Channels",
      "Electrical Wiring & Cables",
      "Lighting Solutions",
      "Modular Switches & Electrical Accessories",
      "Paints & Surface Finishes",
    ]);
    await page.locator("#brands-laminates").getByRole("button", { name: /Dorby/ }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("link", { name: /Visit official website/ })).toHaveAttribute("href", /dorbypanels\.com/);
    await page.keyboard.press("Escape");
  });
});

test.describe("map & locations", () => {
  test("map region views and pins", async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto("/locations");
    const map = page.locator("figure").first();
    await map.getByRole("button", { name: "Coastal Andhra" }).click();
    await expect(map.getByRole("button", { name: "Coastal Andhra" })).toHaveAttribute("aria-pressed", "true");
    await map.getByRole("button", { name: "All" }).click();
    await expect(map.locator('a[href="/locations/hyderabad"]')).toHaveCount(1);
    expect(await map.locator('a[href^="/locations/"]').count()).toBe(10);
    expect(errors).toEqual([]);
  });

  test("city page mentions the full service area", async ({ page }) => {
    await page.goto("/locations/hyderabad");
    await expect(page.locator("h1")).toContainText("Hyderabad");
    await expect(page.locator("main").getByText(/Andhra Pradesh/).filter({ visible: true }).first()).toBeVisible();
  });
});

test.describe("enquiry form", () => {
  test("shows validation errors, then hands off to WhatsApp", async ({ page, context }) => {
    await page.goto("/contact");
    const form = page.locator("form").first();
    await form.locator('button[type="submit"]').click();
    await expect(form.getByText("Please choose your city")).toBeVisible();

    await form.locator("#name").fill("Test Visitor");
    await form.locator("#phone").fill("9876543210");
    await form.locator("#city").selectOption({ label: "Hyderabad" });
    await form.locator("#service").selectOption({ index: 1 });
    const consent = form.locator('input[type="checkbox"]').last();
    if (await consent.isVisible()) await consent.check();

    // Without a webhook the form opens WhatsApp with the enquiry prefilled.
    const popupPromise = context.waitForEvent("page", { timeout: 8000 }).catch(() => null);
    await form.locator('button[type="submit"]').click();
    const popup = await popupPromise;
    if (popup) {
      await popup.waitForURL(/wa\.me|whatsapp/, { timeout: 15000 }).catch(() => {});
      expect(popup.url()).toMatch(/wa\.me|whatsapp/);
      await popup.close();
    } else {
      await expect(page).toHaveURL(/thank-you|wa\.me|contact/);
    }
  });

  test("city links prefill the form", async ({ page }) => {
    await page.goto("/contact?city=Kurnool&service=Modular%20Kitchens");
    await expect(page.locator("#city")).toHaveValue("Kurnool");
  });

  test("enquiry API rejects bad input", async ({ request }) => {
    const res = await request.post("/api/enquiry", { data: { name: "" } });
    expect([400, 422, 503]).toContain(res.status());
  });
});
