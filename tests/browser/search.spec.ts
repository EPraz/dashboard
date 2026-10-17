import { expect, test } from "@playwright/test";

test("navigating directly between leads clears a draft belonging to the previous lead", async ({
  page,
}) => {
  await page.goto("/dashboard/leads");
  await expect(page.locator("tbody").getByRole("link").first()).toBeVisible();
  const names = await page.locator("tbody").getByRole("link").allTextContents();
  const first = names[0].trim();
  const second = names[1].trim();
  await page.getByRole("link", { name: first, exact: true }).click();
  await expect(
    page.getByRole("heading", { name: first, level: 1, exact: true }),
  ).toBeVisible();
  await page
    .getByLabel("New note", { exact: true })
    .fill("Draft intended only for the first lead.");
  await page
    .getByRole("button", { name: "Search workspace", exact: true })
    .click();
  const dialog = page.getByRole("dialog", { name: "Search your workspace" });
  await dialog.getByLabel("Search leads and products").fill(second);
  await dialog.getByRole("link", { name: new RegExp(second) }).click();
  await expect(
    page.getByRole("heading", { name: second, level: 1, exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel("New note", { exact: true })).toHaveValue("");
});

test("workspace search opens real records and supports empty results and keyboard dismissal", async ({
  page,
}) => {
  await page.goto("/dashboard/campaign");
  const open = page.getByRole("button", {
    name: "Search workspace",
    exact: true,
  });
  await open.click();
  const dialog = page.getByRole("dialog", { name: "Search your workspace" });
  const input = dialog.getByLabel("Search leads and products");
  await expect(input).toBeFocused();
  await input.fill("nothing-matches-this");
  await expect(
    dialog.getByText("No matches yet", { exact: true }),
  ).toBeVisible();
  await dialog
    .getByRole("button", { name: "Clear search", exact: true })
    .click();
  await input.fill("aurora");
  await dialog.getByRole("link", { name: /Aurora Studio Headphones/ }).click();
  await expect(
    page.getByRole("heading", { name: "Aurora Studio Headphones", level: 1 }),
  ).toBeVisible();
  await open.click();
  await input.fill("morgan");
  await expect(dialog.getByRole("heading", { name: /Leads/ })).toBeVisible();
  await input.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(open).toBeFocused();
});
