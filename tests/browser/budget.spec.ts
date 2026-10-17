import { expect, test } from "@playwright/test";

test("a saved budget validates allocations, survives reload and resets without changing revenue", async ({
  page,
}) => {
  await page.goto("/dashboard/campaign");
  const revenue = await page
    .getByRole("group", { name: "All attributed revenue", exact: true })
    .getByText(/^\$/)
    .innerText();
  await page.getByRole("link", { name: "Budget planner", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Plan your next move" }),
  ).toBeVisible();
  await page.getByLabel("Total budget (USD)").fill("2000");
  await page.getByLabel("Email allocation (%)").fill("40");
  await page.getByRole("button", { name: "Save plan", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("100%");
  await page.getByLabel("Paid search allocation (%)").fill("10");
  await page.getByRole("button", { name: "Save plan", exact: true }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Budget plan saved" }),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Total budget (USD)")).toHaveValue("2000");
  await expect(page.getByLabel("Email allocation (%)")).toHaveValue("40");
  await expect(
    page.getByText("$1,000.00 above the initial plan", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Overview", exact: true })
    .last()
    .click();
  await expect(
    page
      .getByRole("group", { name: "All attributed revenue", exact: true })
      .getByText(/^\$/),
  ).toHaveText(revenue);
  await page.goto("/dashboard/settings");
  await page.getByRole("button", { name: "Reset demo", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Reset demo", exact: true })
    .click();
  await page.goto("/dashboard/campaign?view=budget");
  await expect(page.getByLabel("Total budget (USD)")).toHaveValue("1000");
});
