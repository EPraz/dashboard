import { expect, test, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

async function csv(page: Page) {
  const downloading = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export CSV", exact: true }).click();
  const download = await downloading;
  return readFile((await download.path())!, "utf8");
}
test("CSV exports all matching pages and safely preserves user-entered cells", async ({
  page,
}) => {
  await page.goto("/dashboard/leads");
  await expect(
    page.getByRole("button", { name: "Export CSV", exact: true }),
  ).toBeVisible();
  await page.getByLabel("Reporting period").selectOption("all");
  await page.getByLabel("Filter acquisition source").selectOption("Referral");
  const leads = await csv(page);
  expect(leads.trim().split("\r\n")).toHaveLength(13);
  expect(leads).toContain("Acquisition date (UTC)");
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  const create = page.getByRole("dialog");
  await create.getByLabel("Full name").fill('=SUM("Éva",2)');
  await create.getByLabel("Email address").fill("eva.csv@example.com");
  await create
    .getByRole("button", { name: "Create lead", exact: true })
    .click();
  await page.goto("/dashboard/leads");
  await page.getByLabel("Search leads").fill("eva.csv");
  expect(await csv(page)).toContain('"\'=SUM(""Éva"",2)"');
  await page.getByLabel("Search leads").fill("no-match-for-csv");
  await expect(
    page.getByRole("button", { name: "Export CSV", exact: true }),
  ).toBeDisabled();
  await page.goto("/dashboard/products?view=inventory");
  await page.getByLabel("Filter stock").selectOption("out");
  const products = await csv(page);
  expect(products).toContain("Current stock (units)");
  expect(products).toContain("Orbit Wireless Earbuds");
  expect(products).not.toContain("Aurora Studio Headphones");
  await page.goto("/dashboard/transactions");
  await page.getByLabel("Reporting period").selectOption("all");
  await page.getByLabel("Filter transaction product").selectOption("aurora");
  const transactions = await csv(page);
  expect(transactions).toContain("Amount (USD)");
  expect(transactions).toContain("Aurora Studio Headphones");
  expect(transactions).not.toContain("Nova Soundbar");
});
