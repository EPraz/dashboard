import { expect, test, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

async function paidRevenue(page: Page) {
  const text = await page
    .getByRole("group", { name: "Paid revenue", exact: true })
    .getByText(/^\$/)
    .innerText();
  return Number(text.replace(/[^\d.]/g, ""));
}

test("the complete lead-to-sale journey reconciles across reports, export, planning and reset", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.goto("/dashboard");
  const initialRevenue = await paidRevenue(page);
  await page.getByRole("button", { name: "Dark theme", exact: true }).click();
  await page.getByRole("link", { name: "Leads", exact: true }).click();
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  const create = page.getByRole("dialog");
  await create.getByLabel("Full name").fill("Zoe Park");
  await create.getByLabel("Email address").fill("zoe.park@example.com");
  await create.getByLabel("Acquisition source").selectOption("Paid search");
  await create
    .getByLabel("Origin campaign (optional)")
    .selectOption("studio-days");
  await create
    .getByRole("button", { name: "Create lead", exact: true })
    .click();
  await page
    .getByLabel("Lead status", { exact: true })
    .selectOption("Qualified");
  await page
    .getByLabel("New note")
    .fill("Interested in a home listening setup.");
  await page.getByRole("button", { name: "Add note", exact: true }).click();
  await page
    .getByRole("button", { name: "Search workspace", exact: true })
    .click();
  await page.getByLabel("Search leads and products").fill("zoe.park");
  await page
    .getByRole("dialog")
    .getByRole("link", { name: /Zoe Park/ })
    .click();
  for (const quantity of ["2", "1"]) {
    await page
      .getByRole("button", { name: "Record demo sale", exact: true })
      .click();
    const sale = page.getByRole("dialog");
    await sale.getByLabel("Product", { exact: true }).selectOption("aurora");
    await sale.getByLabel("Quantity", { exact: true }).fill(quantity);
    if (quantity === "2")
      await sale
        .getByRole("button", { name: "Record sale", exact: true })
        .dblclick();
    else
      await sale
        .getByRole("button", { name: "Record sale", exact: true })
        .click();
    await expect(sale).toHaveCount(0);
  }
  await page.reload();
  await expect(page.getByRole("link", { name: /^AST-/ })).toHaveCount(2);
  await expect(
    page.getByText("Interested in a home listening setup.", { exact: true }),
  ).toBeVisible();
  await page.goto("/dashboard");
  expect(await paidRevenue(page)).toBeCloseTo(initialRevenue + 537, 2);
  await page.goto("/dashboard/products/aurora");
  await expect(
    page.getByRole("group", { name: "Units available", exact: true }),
  ).toContainText("39");
  await page.goto("/dashboard/campaign");
  await expect(page.getByRole("row", { name: /Studio Days/ })).toContainText(
    "$537.00",
  );
  await page.getByRole("link", { name: "Budget planner", exact: true }).click();
  await page.getByLabel("Total budget (USD)").fill("1500");
  await page.getByRole("button", { name: "Save plan", exact: true }).click();
  await page.goto("/dashboard/transactions");
  await page.getByLabel("Search transactions").fill("Zoe Park");
  expect(await paidRevenue(page)).toBe(537);
  const downloading = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export CSV", exact: true }).click();
  const download = await downloading;
  const csv = await readFile((await download.path())!, "utf8");
  expect(csv.trim().split("\r\n")).toHaveLength(3);
  expect(csv).toContain("Studio Days");
  await page.goto("/dashboard/settings");
  await page.getByRole("button", { name: "Reset demo", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Reset demo", exact: true })
    .click();
  await page.goto("/dashboard");
  expect(await paidRevenue(page)).toBe(initialRevenue);
  await expect(
    page.getByRole("button", { name: "Dark theme", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Search workspace", exact: true })
    .click();
  await page.getByLabel("Search leads and products").fill("zoe.park");
  await expect(
    page.getByRole("heading", { name: "No matches yet", exact: true }),
  ).toBeVisible();
});
