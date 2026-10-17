import { expect, test } from "@playwright/test";

test("inventory filters identify an out-of-stock product and open its details", async ({
  page,
}) => {
  await page.goto("/dashboard/products");
  await expect(
    page.getByRole("link", { name: "Inventory", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Inventory", exact: true }).click();
  await page.getByLabel("Filter stock", { exact: true }).selectOption("out");
  await expect(
    page.getByRole("link", { name: "Aurora Studio Headphones", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("link", { name: "Orbit Wireless Earbuds", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Orbit Wireless Earbuds",
      level: 1,
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("No units available", { exact: true }),
  ).toBeVisible();
});
