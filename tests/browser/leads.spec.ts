import { expect, test } from "@playwright/test";

test("a new lead keeps its notes and stage after reload and disappears after confirmed reset", async ({
  page,
}) => {
  await page.goto("/dashboard/leads");
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  const form = page.getByRole("dialog", { name: "Add a lead", exact: true });
  await form.getByLabel("Full name").fill("Alex Rivera");
  await form.getByLabel("Email address").fill("alex.rivera@example.com");
  await form.getByLabel("Acquisition source").selectOption("Referral");
  await form.getByRole("button", { name: "Create lead", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Alex Rivera", level: 1, exact: true }),
  ).toBeVisible();
  await page
    .getByLabel("Lead status", { exact: true })
    .selectOption("Qualified");
  await page
    .getByLabel("New note", { exact: true })
    .fill("Interested in studio headphones.");
  await page.getByRole("button", { name: "Add note", exact: true }).click();
  await page.reload();
  await expect(page.getByLabel("Lead status", { exact: true })).toHaveValue(
    "Qualified",
  );
  await expect(
    page.getByText("Interested in studio headphones.", { exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "Reset demo", exact: true }).click();
  await page
    .getByRole("dialog", { name: "Reset demo?", exact: true })
    .getByRole("button", { name: "Cancel", exact: true })
    .click();
  await page.getByRole("link", { name: "Leads", exact: true }).click();
  await page.getByLabel("Search leads", { exact: true }).fill("Alex Rivera");
  await expect(
    page.getByRole("link", { name: "Alex Rivera", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "Reset demo", exact: true }).click();
  await page
    .getByRole("dialog", { name: "Reset demo?", exact: true })
    .getByRole("button", { name: "Reset demo", exact: true })
    .click();
  await page.getByRole("link", { name: "Leads", exact: true }).click();
  await page.getByLabel("Search leads", { exact: true }).fill("Alex Rivera");
  await expect(
    page.getByRole("heading", { name: "No leads found", exact: true }),
  ).toBeVisible();
});
