import { expect, test } from "@playwright/test";

test("overview totals reconcile with transactions and period selection updates the chart", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await expect(
    page.getByRole("heading", { name: "Your business, in harmony." }),
  ).toBeVisible();
  await expect(page.getByLabel("Reporting period")).toHaveValue("30");
  const campaign = page.getByRole("group", {
    name: "Leading campaign",
    exact: true,
  });
  const campaignName = await campaign
    .getByRole("heading", { level: 3 })
    .innerText();
  const attributed = await campaign.getByText(/^\$[\d,.]+$/).innerText();
  await campaign
    .getByRole("link", { name: "Compare campaign results", exact: true })
    .click();
  await expect(
    page
      .getByRole("row")
      .filter({ has: page.getByText(campaignName, { exact: true }) })
      .getByText(attributed, { exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Aster home", exact: true }).click();
  const revenue = await page
    .getByRole("group", { name: "Paid revenue", exact: true })
    .getByText(/^\$/)
    .innerText();
  await page
    .getByRole("link", { name: "View all transactions", exact: true })
    .click();
  await expect(
    page
      .getByRole("group", { name: "Paid revenue", exact: true })
      .getByText(/^\$/),
  ).toHaveText(revenue);
  await page.getByRole("link", { name: "Aster home" }).click();
  await page.getByLabel("Reporting period").selectOption("7");
  await expect(
    page.getByRole("img", { name: /Paid revenue by day/ }),
  ).toBeVisible();
  const weekRevenue = await page
    .getByRole("group", { name: "Paid revenue", exact: true })
    .getByText(/^\$/)
    .innerText();
  await page
    .getByRole("link", { name: "View all transactions", exact: true })
    .click();
  await expect(
    page
      .getByRole("group", { name: "Paid revenue", exact: true })
      .getByText(/^\$/),
  ).toHaveText(weekRevenue);
});
