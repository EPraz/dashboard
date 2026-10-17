import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const theme of ["Light", "Dark"]) {
  for (const width of [320, 768, 1024, 1440]) {
    test(`${theme} theme remains accessible at ${width}px across views`, async ({
      page,
    }) => {
      test.setTimeout(120000);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
      await page
        .getByRole("banner")
        .first()
        .getByRole("button", { name: `${theme} theme`, exact: true })
        .click();
      for (const route of [
        "/dashboard",
        "/dashboard/leads",
        "/dashboard/leads?view=funnel",
        "/dashboard/products?view=inventory",
        "/dashboard/transactions",
        "/dashboard/campaign",
        "/dashboard/campaign?view=budget",
        "/dashboard/settings",
        "/dashboard/help",
      ]) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(
          page
            .getByRole("banner")
            .first()
            .getByRole("button", { name: `${theme} theme`, exact: true }),
        ).toHaveAttribute("aria-pressed", "true");
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          `${route} at ${width}px has page overflow`,
        ).toBe(true);
        if (width === 320 || width === 1440) {
          const result = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          expect(
            result.violations.map((item) => ({
              id: item.id,
              nodes: item.nodes.map((node) => node.target),
            })),
            `${route} at ${width}px`,
          ).toEqual([]);
        }
      }
      expect(errors).toEqual([]);
    });
  }
}

test.describe("Touch navigation", () => {
  test.use({ hasTouch: true, isMobile: true });
  test("mobile navigation, keyboard focus, direct routes and browser history recover predictably", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();
    await page.getByRole("button", { name: "Dark theme", exact: true }).tap();
    await expect(
      page.getByRole("button", { name: "Dark theme", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Open navigation" }).tap();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: "Products", exact: true })
      .tap();
    await page
      .getByRole("link", { name: "Aurora Studio Headphones", exact: true })
      .tap();
    await expect(
      page.getByRole("heading", { name: "Aurora Studio Headphones", level: 1 }),
    ).toBeVisible();
    await page.reload();
    await expect(
      page.getByRole("heading", { name: "Aurora Studio Headphones", level: 1 }),
    ).toBeVisible();
    await page.goBack();
    await expect(
      page.getByRole("heading", { name: "Products", exact: true, level: 1 }),
    ).toBeVisible();
    await page.goForward();
    await expect(
      page.getByRole("heading", { name: "Aurora Studio Headphones", level: 1 }),
    ).toBeVisible();
    await page.goto("/a-page-that-does-not-exist");
    await page.getByRole("link", { name: "Back to overview" }).click();
    await expect(
      page.getByRole("heading", { name: "Your business, in harmony." }),
    ).toBeVisible();
  });
});
