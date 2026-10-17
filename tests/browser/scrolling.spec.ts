import { expect, test } from "@playwright/test";

test("a short dialog scrolls independently and closing it restores page scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 500 });
  await page.goto("/dashboard/leads");
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  const heading = page.getByRole("heading", {
    name: "Leads management",
    level: 1,
    exact: true,
  });
  const before = (await heading.boundingBox())!.y;
  await page.mouse.move(8, 250);
  await page.mouse.wheel(0, 1000);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  expect((await heading.boundingBox())!.y).toBe(before);
  const dialog = page.getByRole("dialog", { name: "Add a lead", exact: true });
  const create = dialog.getByRole("button", {
    name: "Create lead",
    exact: true,
  });
  await expect(create).not.toBeInViewport();
  await page.mouse.move(195, 350);
  await page.mouse.wheel(0, 1000);
  await expect(create).toBeInViewport({ ratio: 1 });
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await page.mouse.move(300, 350);
  await page.mouse.wheel(0, 10000);
  await expect(
    page
      .getByRole("contentinfo")
      .getByText("Made for a clearer picture.", { exact: true }),
  ).toBeInViewport({ ratio: 1 });
});

test("the sidebar can be scrolled to its last navigation item in a short window", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 500 });
  await page.goto("/dashboard/leads");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const help = page
    .getByRole("complementary")
    .getByRole("link", { name: "Help & guide", exact: true });
  await expect(help).not.toBeInViewport();
  await page.mouse.move(120, 400);
  await page.mouse.wheel(0, 1000);
  await expect(help).toBeInViewport({ ratio: 1 });
  await help.click();
  await expect(page).toHaveURL(/\/dashboard\/help$/);
});

for (const theme of ["Light", "Dark"]) {
  for (const width of [390, 1440]) {
    test(`${theme} content can be scrolled with the wheel at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/dashboard/leads");
      await page
        .getByRole("button", { name: `${theme} theme`, exact: true })
        .click();
      for (const route of ["/dashboard/leads", "/dashboard/help"]) {
        await page.goto(route);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        const footer = page.getByRole("contentinfo");
        await expect(footer).not.toBeInViewport();
        await page.mouse.move(width * 0.75, 650);
        await page.mouse.wheel(0, 10000);
        await expect(
          footer.getByText("Made for a clearer picture.", { exact: true }),
        ).toBeInViewport({ ratio: 1 });
        await page.keyboard.press("Control+Home");
        await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
      }
    });
  }
}
