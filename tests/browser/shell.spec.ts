import { expect, test } from "@playwright/test";

test("visitors enter Aster and keep their chosen appearance after reload", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await expect(page.getByRole("link", { name: "Aster home" })).toBeVisible();
  await expect(
    page.getByText("Interactive demo · Sample data", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Dark theme", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Dark theme", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Dark theme", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Light theme", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Light theme", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
