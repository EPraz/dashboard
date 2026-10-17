import { expect, test } from "@playwright/test";

test("an origin campaign receives first and repeat purchase revenue", async ({
  page,
}) => {
  await page.goto("/dashboard/campaign");
  await expect(
    page.getByRole("columnheader", { name: "Attributed revenue", exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("row", { name: /Studio Days/ })
      .getByText("$0.00", { exact: true }),
  ).toBeVisible();
  await page.goto("/dashboard/leads");
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  const create = page.getByRole("dialog", { name: "Add a lead", exact: true });
  await create.getByLabel("Full name").fill("Noah Vega");
  await create.getByLabel("Email address").fill("noah.vega@example.com");
  await create.getByLabel("Acquisition source").selectOption("Paid search");
  await create
    .getByLabel("Origin campaign (optional)")
    .selectOption("studio-days");
  await create
    .getByRole("button", { name: "Create lead", exact: true })
    .click();
  for (const quantity of ["2", "1"]) {
    await page
      .getByRole("button", { name: "Record demo sale", exact: true })
      .click();
    const sale = page.getByRole("dialog", {
      name: "Record demo sale",
      exact: true,
    });
    await sale.getByLabel("Product", { exact: true }).selectOption("aurora");
    await sale.getByLabel("Quantity", { exact: true }).fill(quantity);
    await sale
      .getByRole("button", { name: "Record sale", exact: true })
      .click();
    await expect(sale).toHaveCount(0);
  }
  await page.getByRole("link", { name: "Campaigns", exact: true }).click();
  await expect(
    page
      .getByRole("row", { name: /Studio Days/ })
      .getByText("$537.00", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(/origin campaign, including repeat purchases/),
  ).toBeVisible();
  await page.reload();
  await expect(
    page
      .getByRole("row", { name: /Studio Days/ })
      .getByText("$537.00", { exact: true }),
  ).toBeVisible();
});
