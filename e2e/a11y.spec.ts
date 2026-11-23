import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = ["/", "/services/modular-kitchens", "/projects/villa-interiors", "/materials", "/locations", "/contact"];

for (const path of PAGES) {
  test(`accessibility: ${path} has no serious or critical issues`, async ({ page }) => {
    test.skip(test.info().project.name !== "desktop", "runs once");
    await page.goto(path, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500); // let entrance animations finish
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const bad = results.violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .map((v) => `${v.impact} ${v.id}: ${v.help} (${v.nodes.length}× e.g. ${v.nodes[0]?.target.join(" ")})`);
    expect(bad).toEqual([]);
  });
}
