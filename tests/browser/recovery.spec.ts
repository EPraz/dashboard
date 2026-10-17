import { expect, test } from "@playwright/test";

test("help explains the local demo and links to the starting workflow", async ({
  page,
}) => {
  await page.goto("/dashboard/help");
  await expect(
    page.getByRole("heading", { name: "A quick guide to Aster", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(/No account, API, or real payment/),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Start with a lead", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Leads management" }),
  ).toBeVisible();
});

test("unreadable saved data is preserved until a confirmed reset", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("injected")) {
      localStorage.setItem("aster.demo.v1", "{broken");
      localStorage.setItem("injected", "yes");
    }
  });
  await page.goto("/dashboard/settings");
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "saved demo could not be read" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset demo", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Cancel", exact: true })
    .click();
  await page.reload();
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "saved demo could not be read" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset demo", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Reset demo", exact: true })
    .click();
  await page.reload();
  await expect(page.getByText(/saved demo could not be read/)).toHaveCount(0);
});

test("unavailable storage explains that changes last for this session", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
    Storage.prototype.setItem = () => {
      throw new DOMException("Blocked", "QuotaExceededError");
    };
  });
  await page.goto("/dashboard/leads");
  await expect(page.getByText(/Browser storage is unavailable/)).toBeVisible();
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Full name").fill("Local Only");
  await dialog.getByLabel("Email address").fill("local.only@example.com");
  await dialog
    .getByRole("button", { name: "Create lead", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Local Only" }),
  ).toBeVisible();
  await expect(
    page.getByText(/These changes could not be saved/),
  ).toBeVisible();
  await page.getByRole("link", { name: "Open Settings", exact: true }).click();
  await page.getByRole("link", { name: "Leads", exact: true }).click();
  await page.getByLabel("Search leads").fill("local.only");
  await expect(
    page.getByRole("link", { name: "Local Only", exact: true }),
  ).toBeVisible();
});
