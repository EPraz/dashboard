import { expect, test } from "@playwright/test";

test("source segments open matching leads and the funnel responds to stage changes", async ({
  page,
}) => {
  await page.goto("/dashboard/leads");
  await expect(
    page.getByRole("link", { name: "Segments", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  const create = page.getByRole("dialog", { name: "Add a lead", exact: true });
  await create.getByLabel("Full name").fill("Lena Ortiz");
  await create.getByLabel("Email address").fill("lena.ortiz@example.com");
  await create.getByLabel("Acquisition source").selectOption("Referral");
  await create
    .getByRole("button", { name: "Create lead", exact: true })
    .click();
  const leadURL = page.url();
  await page.getByRole("link", { name: "Leads", exact: true }).click();
  await page.getByRole("link", { name: "Segments", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Acquisition sources",
      level: 2,
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "View Referral leads", exact: true })
    .click();
  await expect(
    page.getByLabel("Filter acquisition source", { exact: true }),
  ).toHaveValue("Referral");
  await expect(
    page.getByRole("link", { name: "Lena Ortiz", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Funnel", exact: true }).click();
  const qualified = page.getByRole("group", {
    name: "Qualified stage",
    exact: true,
  });
  const before = Number((await qualified.innerText()).match(/\b\d+\b/)?.[0]);
  await page.goto(leadURL);
  await page
    .getByLabel("Lead status", { exact: true })
    .selectOption("Qualified");
  await page.getByRole("link", { name: "Leads", exact: true }).click();
  await page.getByRole("link", { name: "Funnel", exact: true }).click();
  await expect(
    page
      .getByRole("group", { name: "Qualified stage", exact: true })
      .getByText(String(before + 1), { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(/current stages, not a historical/),
  ).toBeVisible();
});
