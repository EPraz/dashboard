const { chromium, expect } = require("@playwright/test");
const fs = require("node:fs");

async function main() {
  const base = process.env.PLAYWRIGHT_BASE_URL;
  if (!base)
    throw new Error("Set PLAYWRIGHT_BASE_URL to the published origin.");
  const evidence = {
    checkedAt: new Date().toISOString(),
    base,
    assets: [],
    routes: [],
  };
  const response = await fetch(`${base}/dashboard`);
  expect(response.status).toBe(200);
  const html = await response.text();
  expect(html).toContain("<title>Aster</title>");
  const assets = new Set([
    ...Array.from(
      html.matchAll(/(?:src|href)="([^"]+)"/g),
      (match) => match[1],
    ),
    "/fonts/urbanist-latin.woff2",
    "/favicon.png",
  ]);
  for (const asset of assets) {
    const result = await fetch(new URL(asset, base));
    const type = result.headers.get("content-type");
    expect(result.status, asset).toBe(200);
    expect(type, asset).not.toContain("text/html");
    if (asset.endsWith(".js")) expect(type).toMatch(/javascript/);
    if (asset.endsWith(".css")) expect(type).toContain("text/css");
    if (asset.endsWith(".woff2")) expect(type).toMatch(/font|octet-stream/);
    evidence.assets.push({ path: asset, status: result.status, type });
  }
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const path of [
      "/",
      "/dashboard/leads/lead-001",
      "/dashboard/products/aurora",
      "/dashboard/transactions/AST-1001",
    ]) {
      await page.goto(new URL(path, base).href);
      const heading = page.getByRole("heading", { level: 1 });
      await expect(heading).toBeVisible();
      const title = await heading.innerText();
      expect(title).not.toMatch(/not found/i);
      await page.reload();
      await expect(heading).toHaveText(title);
      evidence.routes.push({
        path,
        heading: title,
        direct: "passed",
        reload: "passed",
      });
    }
    await page
      .getByRole("link", { name: "Back to transactions", exact: true })
      .click();
    await expect(
      page.getByRole("heading", {
        name: "Transactions",
        level: 1,
        exact: true,
      }),
    ).toBeVisible();
    await page.goBack();
    await expect(
      page.getByRole("heading", { name: "AST-1001", level: 1, exact: true }),
    ).toBeVisible();
    await page.goForward();
    await expect(
      page.getByRole("heading", {
        name: "Transactions",
        level: 1,
        exact: true,
      }),
    ).toBeVisible();
    evidence.transactionHistory = "passed";
    expect(errors).toEqual([]);
    evidence.browserErrors = errors;
  } finally {
    await browser.close();
  }
  fs.writeFileSync(
    ".scratch/portfolio-polish/qa/hosted-spot-checks.json",
    JSON.stringify(evidence, null, 2) + "\n",
  );
  console.log(JSON.stringify(evidence, null, 2));
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
