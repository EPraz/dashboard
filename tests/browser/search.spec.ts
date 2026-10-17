import { expect, test } from "@playwright/test";

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
