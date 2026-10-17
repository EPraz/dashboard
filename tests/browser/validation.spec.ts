import { expect, test } from "@playwright/test";

test("long valid contact names remain readable on a narrow screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/dashboard/leads");
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  const create = page.getByRole("dialog");
  const name = "Alexandra".repeat(12);
  await create.getByLabel("Full name").fill(name);
  await create.getByLabel("Email address").fill("long.contact@example.com");
  await create
    .getByRole("button", { name: "Create lead", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name, level: 1, exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});

test("invalid lead and sale input leave records intact, and a lost lead can reopen", async ({
  page,
}) => {
  await page.goto("/dashboard/leads");
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  const create = page.getByRole("dialog", { name: "Add a lead" });
  await create
    .getByRole("button", { name: "Create lead", exact: true })
    .click();
  await expect(create.getByRole("alert")).toBeVisible();
  await create.getByLabel("Full name").fill("Amara Okafor");
  await create.getByLabel("Email address").fill("invalid-email");
  await create
    .getByRole("button", { name: "Create lead", exact: true })
    .click();
  await expect(create.getByRole("alert")).toContainText("email");
  await create.getByLabel("Email address").fill("amara@example.com");
  await create
    .getByRole("button", { name: "Create lead", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Amara Okafor", level: 1, exact: true }),
  ).toBeVisible();
  const detailUrl = page.url();
  await page.getByLabel("Lead status", { exact: true }).selectOption("Lost");
  await page
    .getByLabel("Lead status", { exact: true })
    .selectOption("Contacted");
  await page
    .getByRole("button", { name: "Record demo sale", exact: true })
    .click();
  const sale = page.getByRole("dialog", { name: "Record demo sale" });
  await sale.getByLabel("Product", { exact: true }).selectOption("bassline");
  for (const quantity of ["0", "-1", "1.5"]) {
    await sale.getByLabel("Quantity", { exact: true }).fill(quantity);
    await sale
      .getByRole("button", { name: "Record sale", exact: true })
      .click();
    await expect(sale.getByRole("alert")).toBeVisible();
  }
  await sale.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(
    page.getByText("No purchases yet. This lead has not converted."),
  ).toBeVisible();
  await page.getByRole("link", { name: "Leads", exact: true }).click();
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  await create.getByLabel("Full name").fill("Duplicate Person");
  await create.getByLabel("Email address").fill("AMARA@example.com");
  await create
    .getByRole("button", { name: "Create lead", exact: true })
    .click();
  await expect(create.getByRole("alert")).toContainText(/already/);
  await create.getByRole("button", { name: "Cancel", exact: true }).click();
  await page.goto(detailUrl);
  await expect(page.getByLabel("Lead status", { exact: true })).toHaveValue(
    "Contacted",
  );
});

test("UTC reporting boundaries exclude an older purchase without changing current inventory", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-10-17T23:59:00Z"));
  await page.goto("/dashboard/leads");
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  const create = page.getByRole("dialog");
  await create.getByLabel("Full name").fill("Midnight Buyer");
  await create.getByLabel("Email address").fill("midnight@example.com");
  await create
    .getByRole("button", { name: "Create lead", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Record demo sale", exact: true })
    .click();
  const sale = page.getByRole("dialog");
  await sale.getByLabel("Product", { exact: true }).selectOption("aurora");
  await sale.getByRole("button", { name: "Record sale", exact: true }).click();
  await page.clock.setFixedTime(new Date("2026-10-24T00:01:00Z"));
  await page.goto("/dashboard/transactions");
  await page.getByLabel("Reporting period").selectOption("7");
  await page.getByLabel("Search transactions").fill("Midnight Buyer");
  await expect(
    page.getByRole("heading", { name: "No transactions found" }),
  ).toBeVisible();
  await page.getByLabel("Reporting period").selectOption("all");
  await expect(
    page
      .getByRole("group", { name: "Paid revenue", exact: true })
      .getByText("$179.00", { exact: true }),
  ).toBeVisible();
  await page.goto("/dashboard/products/aurora");
  await expect(
    page
      .getByRole("group", { name: "Units available", exact: true })
      .getByText("41", { exact: true }),
  ).toBeVisible();
  await page.goto("/dashboard");
  await page.getByLabel("Reporting period").selectOption("7");
  await expect(
    page.getByRole("heading", {
      name: "No revenue in this period",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("group", { name: "Cohort conversion", exact: true }),
  ).toContainText("—");
});
