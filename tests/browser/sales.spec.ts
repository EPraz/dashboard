import { expect, test } from "@playwright/test";

test("first and repeat purchases update stock and revenue but count one conversion", async ({
  page,
}) => {
  await page.goto("/dashboard/leads");
  const converted = page.getByRole("group", {
    name: "Converted leads",
    exact: true,
  });
  const before = Number((await converted.innerText()).match(/\b\d+\b/)?.[0]);
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  const create = page.getByRole("dialog", { name: "Add a lead", exact: true });
  await create.getByLabel("Full name").fill("Sam Lee");
  await create.getByLabel("Email address").fill("sam.lee@example.com");
  await create.getByLabel("Acquisition source").selectOption("Email");
  await create
    .getByLabel("Origin campaign (optional)")
    .selectOption("listen-closer");
  await create
    .getByRole("button", { name: "Create lead", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Sam Lee", level: 1, exact: true }),
  ).toBeVisible();
  const leadURL = page.url();
  await expect(
    page.getByRole("button", { name: "Record demo sale", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Record demo sale", exact: true })
    .click();
  let sale = page.getByRole("dialog", {
    name: "Record demo sale",
    exact: true,
  });
  await sale.getByLabel("Product", { exact: true }).selectOption("aurora");
  await sale.getByLabel("Quantity", { exact: true }).fill("99999");
  await sale.getByRole("button", { name: "Record sale", exact: true }).click();
  await expect(sale.getByRole("alert")).toContainText(
    "Only 42 units are available",
  );
  await sale.getByLabel("Quantity", { exact: true }).fill("2");
  await sale.getByRole("button", { name: "Record sale", exact: true }).click();
  await expect(page.getByText("Converted", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Lead status", { exact: true })).toHaveCount(0);
  await page.getByRole("link", { name: /^AST-/ }).click();
  await expect(
    page.getByRole("group", { name: "Sale amount", exact: true }),
  ).toContainText("$358.00");
  await page.goto("/dashboard/products/aurora");
  await expect(
    page
      .getByRole("group", { name: "Units available", exact: true })
      .getByText("40", { exact: true }),
  ).toBeVisible();
  await page.goto(leadURL);
  await page
    .getByRole("button", { name: "Record demo sale", exact: true })
    .click();
  sale = page.getByRole("dialog", { name: "Record demo sale", exact: true });
  await sale.getByLabel("Product", { exact: true }).selectOption("aurora");
  await sale.getByLabel("Quantity", { exact: true }).fill("1");
  await sale.getByRole("button", { name: "Record sale", exact: true }).click();
  await page.reload();
  await expect(page.getByRole("link", { name: /^AST-/ })).toHaveCount(2);
  await page.getByRole("link", { name: "Leads", exact: true }).click();
  await expect(
    page
      .getByRole("group", { name: "Converted leads", exact: true })
      .getByText(String(before + 1), { exact: true }),
  ).toBeVisible();
  await page.goto("/dashboard/transactions");
  await page.getByLabel("Search transactions", { exact: true }).fill("Sam Lee");
  await expect(
    page.getByRole("group", { name: "Paid revenue", exact: true }),
  ).toContainText("$537.00");
  await expect(page.getByRole("link", { name: /^AST-/ })).toHaveCount(2);
  await page.goto("/dashboard/products/aurora");
  await expect(
    page
      .getByRole("group", { name: "Units available", exact: true })
      .getByText("39", { exact: true }),
  ).toBeVisible();
});
