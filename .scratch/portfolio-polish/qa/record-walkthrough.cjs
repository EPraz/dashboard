const { chromium, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");

const rehearsal = process.argv.includes("--rehearsal");
const speed = rehearsal ? 0.05 : 1;
const origin = "https://dashboard-one-rose-14.vercel.app";
const applicationCommit = "945411657daf167b79420d4f55a0c4f13d9dd859";
const output = path.resolve(
  ".scratch/portfolio-polish/recording",
  rehearsal ? "rehearsal" : `take-${Date.now()}`,
);
fs.mkdirSync(output, { recursive: true });
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms * speed));
const scenes = [];
const errors = [];
const evidence = { origin, applicationCommit, rehearsal, checks: {} };

// Capture-only annotations: never shipped with or persisted into Aster.
function installPointer() {
  addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style");
    style.textContent = `*{cursor:none!important} #capture-pointer{position:fixed;left:0;top:0;width:28px;height:32px;z-index:2147483647;pointer-events:none;transform:translate(1250px,70px);filter:drop-shadow(0 2px 3px #0005)} #capture-pulse{position:fixed;left:0;top:0;width:42px;height:42px;margin:-21px;border:3px solid #edae7d;border-radius:50%;pointer-events:none;z-index:2147483646;opacity:0} #capture-highlight{position:fixed;border:3px solid #edae7d;border-radius:9px;box-shadow:0 0 0 4px #edae7d25;pointer-events:none;z-index:2147483645;display:none} @keyframes capture-click{0%{opacity:.9;scale:.55}100%{opacity:0;scale:1.5}}`;
    document.head.append(style);
    const pointer = document.createElement("div");
    pointer.id = "capture-pointer";
    pointer.innerHTML = `<svg width="28" height="32" viewBox="0 0 28 32"><path d="M3 2v24l6-6 5 10 5-3-5-9h9Z" fill="#fff" stroke="#152230" stroke-width="2" stroke-linejoin="round"/></svg>`;
    const pulse = document.createElement("div");
    pulse.id = "capture-pulse";
    const highlight = document.createElement("div");
    highlight.id = "capture-highlight";
    document.body.append(pointer, pulse, highlight);
    // Native dialogs occupy the browser's top layer, above every body z-index.
    // Keep the capture annotations in that layer while a dialog is open.
    const attach = () => {
      const target =
        [...document.querySelectorAll("dialog[open]")].at(-1) ?? document.body;
      for (const element of [pointer, pulse, highlight]) {
        if (element.parentElement !== target) target.append(element);
      }
    };
    new MutationObserver(attach).observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    let point = { x: 1250, y: 70 };
    addEventListener(
      "pointermove",
      (event) => {
        point = { x: event.clientX, y: event.clientY };
        pointer.style.transform = `translate(${point.x}px,${point.y}px)`;
      },
      true,
    );
    function click() {
      pulse.style.left = `${point.x}px`;
      pulse.style.top = `${point.y}px`;
      pulse.style.setProperty("animation", "none", "important");
      void pulse.offsetWidth;
      pulse.style.setProperty(
        "animation",
        "capture-click .45s ease-out forwards",
        "important",
      );
    }
    addEventListener("pointerdown", click, true);
    window.captureAnnotations = {
      click,
      sync() {
        const marker = document.createElement("div");
        Object.assign(marker.style, {
          position: "fixed",
          left: "0",
          top: "0",
          width: "8px",
          height: "8px",
          background: "rgb(0,0,255)",
          zIndex: "2147483647",
          pointerEvents: "none",
        });
        document.body.append(marker);
        setTimeout(() => marker.remove(), 200);
      },
      highlight(rect, duration) {
        Object.assign(highlight.style, {
          display: "block",
          left: `${rect.x - 5}px`,
          top: `${rect.y - 5}px`,
          width: `${rect.width + 10}px`,
          height: `${rect.height + 10}px`,
        });
        setTimeout(() => {
          highlight.style.display = "none";
        }, duration);
      },
    };
  });
}

async function controls(page) {
  let pointer = { x: 1250, y: 70 };
  const viewport = page.viewportSize();
  if (viewport.width < 500) pointer = { x: 240, y: 60 };
  async function reveal(locator) {
    await expect(locator).toBeVisible();
    const box = await locator.boundingBox();
    if (box.y < 20 || box.y + box.height > viewport.height - 30) {
      await locator.evaluate(
        (element, smooth) =>
          element.scrollIntoView({
            behavior: smooth ? "smooth" : "instant",
            block: "center",
          }),
        !rehearsal,
      );
      await pause(650);
    }
  }
  async function move(locator) {
    await reveal(locator);
    const box = await locator.boundingBox();
    const target = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    const from = { ...pointer };
    const frames = rehearsal ? 1 : 24;
    for (let frame = 1; frame <= frames; frame++) {
      const ratio = frame / frames;
      const eased = ratio * ratio * (3 - 2 * ratio);
      await page.mouse.move(
        from.x + (target.x - from.x) * eased,
        from.y + (target.y - from.y) * eased,
      );
      if (!rehearsal) await pause(12);
    }
    pointer = target;
  }
  async function click(locator) {
    await move(locator);
    await pause(180);
    await locator.click();
    await pause(300);
  }
  async function type(locator, text) {
    await click(locator);
    await locator.press("Control+A");
    await locator.pressSequentially(text, { delay: rehearsal ? 0 : 38 });
    await pause(250);
  }
  async function select(locator, value) {
    await move(locator);
    await locator.focus();
    await page.evaluate(() => window.captureAnnotations.click());
    await locator.selectOption(value);
    await pause(550);
  }
  async function highlight(locator, duration = 1800) {
    await reveal(locator);
    await page.evaluate(
      ({ rect, duration }) =>
        window.captureAnnotations.highlight(rect, duration),
      { rect: await locator.boundingBox(), duration: duration * speed },
    );
    await pause(duration);
  }
  async function nav(name) {
    await click(
      page.getByRole("complementary").getByRole("link", { name, exact: true }),
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await pause(650);
  }
  return { click, type, select, highlight, nav, reveal };
}

async function run() {
  const browser = await chromium.launch();
  let desktop, mobile;
  try {
    const common = { reducedMotion: "reduce", deviceScaleFactor: 1 };
    desktop = await browser.newContext({
      ...common,
      viewport: { width: 1600, height: 840 },
      ...(rehearsal
        ? {}
        : {
            recordVideo: {
              dir: path.join(output, "raw"),
              size: { width: 1600, height: 840 },
            },
          }),
    });
    await desktop.addInitScript(installPointer);
    const wallStart = performance.now();
    const page = await desktop.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const c = await controls(page);
    await page.goto(`${origin}/dashboard/settings`);
    await page.getByRole("button", { name: "Reset demo", exact: true }).click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Reset demo", exact: true })
      .click();
    await page.goto(`${origin}/dashboard`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const desktopSyncBefore = performance.now();
    await page.evaluate(() => window.captureAnnotations.sync());
    const desktopSync =
      ((desktopSyncBefore + performance.now()) / 2 - wallStart) / 1000;
    await pause(600);
    const revenue = () =>
      page
        .getByRole("group", { name: "Paid revenue", exact: true })
        .getByText(/^\$/)
        .innerText();
    const dollars = (value) => Number(value.replace(/[^\d.]/g, ""));
    const initialRevenue = dollars(await revenue());
    let convertedBefore, leadURL;
    async function scene(id, title, seconds, captions, action, options = {}) {
      const start = (performance.now() - wallStart) / 1000;
      console.log(`Scene ${id}: ${title}`);
      await pause(550);
      await action();
      const remaining =
        seconds * speed - (performance.now() - wallStart) / 1000 + start;
      if (remaining > 0)
        await new Promise((resolve) => setTimeout(resolve, remaining * 1000));
      scenes.push({
        id,
        title,
        seconds,
        start,
        rawSeconds: (performance.now() - wallStart) / 1000 - start,
        source: "desktop",
        captions,
        ...options,
      });
    }

    await scene(
      "intro",
      "A connected frontend workspace",
      10,
      [
        "Aster · Sales & Marketing Dashboard",
        "A fictional audio store. Browser-local sample data; no login, API or real payments.",
      ],
      async () => {
        await c.highlight(
          page.getByText("Interactive demo · Sample data", { exact: true }),
          1500,
        );
        await c.highlight(
          page.getByRole("group", { name: "Paid revenue", exact: true }),
          1500,
        );
      },
    );
    await scene(
      "lead",
      "01 / Build a customer connection",
      22,
      [
        "Create a lead and connect them to an acquisition source and campaign.",
        "Jamie Reed · Paid search · Studio Days",
      ],
      async () => {
        await c.nav("Leads");
        convertedBefore = Number(
          (
            await page
              .getByRole("group", { name: "Converted leads", exact: true })
              .innerText()
          ).match(/\b\d+\b/)[0],
        );
        await c.click(
          page.getByRole("button", { name: "Add lead", exact: true }),
        );
        const dialog = page.getByRole("dialog", {
          name: "Add a lead",
          exact: true,
        });
        await c.type(dialog.getByLabel("Full name"), "Jamie Reed");
        await c.type(
          dialog.getByLabel("Email address"),
          "jamie.walkthrough@example.com",
        );
        await c.select(dialog.getByLabel("Acquisition source"), "Paid search");
        await c.select(
          dialog.getByLabel("Origin campaign (optional)"),
          "studio-days",
        );
        await pause(1100);
        await c.click(
          dialog.getByRole("button", { name: "Create lead", exact: true }),
        );
        await expect(
          page.getByRole("heading", {
            name: "Jamie Reed",
            exact: true,
            level: 1,
          }),
        ).toBeVisible();
        leadURL = page.url();
      },
    );
    await scene(
      "followup",
      "02 / Keep useful follow-up context",
      14,
      [
        "Qualify the lead and add a note for the next conversation.",
        "Stage and follow-up notes persist after a reload.",
      ],
      async () => {
        await c.select(
          page.getByLabel("Lead status", { exact: true }),
          "Qualified",
        );
        await c.type(
          page.getByLabel("New note", { exact: true }),
          "Interested in a home listening setup.",
        );
        await c.click(
          page.getByRole("button", { name: "Add note", exact: true }),
        );
        await page.reload();
        await expect(
          page.getByText("Interested in a home listening setup.", {
            exact: true,
          }),
        ).toBeVisible();
        await c.highlight(
          page.getByText("Interested in a home listening setup.", {
            exact: true,
          }),
        );
      },
    );
    async function sale(quantity, total) {
      await c.click(
        page.getByRole("button", { name: "Record demo sale", exact: true }),
      );
      const dialog = page.getByRole("dialog", {
        name: "Record demo sale",
        exact: true,
      });
      await expect(dialog.locator("#capture-pointer")).toHaveCount(1);
      await c.select(dialog.getByLabel("Product", { exact: true }), "aurora");
      await c.type(dialog.getByLabel("Quantity", { exact: true }), quantity);
      if (rehearsal)
        await page.screenshot({
          path: path.join(output, "cursor-in-dialog.png"),
        });
      await expect(dialog.getByText(total, { exact: true })).toBeVisible();
      await c.highlight(dialog.getByText(total, { exact: true }), 2200);
      await pause(800);
      await c.click(
        dialog.getByRole("button", { name: "Record sale", exact: true }),
      );
      await expect(dialog).toHaveCount(0);
      await expect(page.getByText("Converted", { exact: true })).toBeVisible();
    }
    await scene(
      "first-sale",
      "03 / First purchase, first conversion",
      18,
      [
        "Two Aurora Studio Headphones · USD 358.00",
        "The first paid sample purchase converts the lead and updates inventory. No payment is taken.",
      ],
      async () => {
        await sale("2", "$358.00");
        await c.highlight(page.getByText("Converted", { exact: true }), 1500);
      },
      { camera: "gentle-center" },
    );
    await scene(
      "repeat-sale",
      "04 / Repeat purchases stay coherent",
      16,
      [
        "One more unit · USD 179.00",
        "Two purchases. USD 537.00 in revenue. The customer still counts as one conversion.",
      ],
      async () => {
        await sale("1", "$179.00");
        await expect(page.getByRole("link", { name: /^AST-/ })).toHaveCount(2);
        await c.highlight(
          page.getByRole("heading", { name: "Purchase history", exact: true }),
        );
      },
    );
    await scene(
      "transaction",
      "05 / Trace a real transaction",
      12,
      [
        "Every sample purchase has a transaction, customer, product and attribution.",
        "Inspect the repeat purchase: one unit, USD 179.00, attributed to Studio Days.",
      ],
      async () => {
        await c.click(page.getByRole("link", { name: /^AST-/ }).first());
        await expect(
          page.getByRole("group", { name: "Sale amount", exact: true }),
        ).toContainText("$179.00");
        await c.highlight(
          page.getByRole("group", { name: "Sale amount", exact: true }),
        );
      },
    );
    await scene(
      "inventory",
      "06 / Inventory follows the purchases",
      10,
      [
        "Available inventory: 42 → 39 units.",
        "Stock and product performance derive from the same transaction ledger.",
      ],
      async () => {
        await c.click(
          page.getByRole("link", {
            name: "Aurora Studio Headphones",
            exact: true,
          }),
        );
        const stock = page.getByRole("group", {
          name: "Units available",
          exact: true,
        });
        await expect(stock).toContainText("39");
        await c.highlight(stock, 2600);
      },
    );
    await scene(
      "overview",
      "07 / One shared commercial picture",
      10,
      [
        "Both purchases add USD 537.00 to the overview.",
        "Reporting periods, product results and revenue use the shared local records.",
      ],
      async () => {
        await c.nav("Overview");
        expect(dollars(await revenue())).toBeCloseTo(initialRevenue + 537, 2);
        await c.highlight(
          page.getByRole("group", { name: "Paid revenue", exact: true }),
          2400,
        );
      },
    );
    await scene(
      "campaign",
      "08 / Follow the campaign contribution",
      10,
      [
        "Studio Days receives USD 537.00 from the customer's two purchases.",
        "Repeat purchases add campaign revenue without inventing another conversion.",
      ],
      async () => {
        await c.nav("Campaigns");
        const row = page.getByRole("row", { name: /Studio Days/ });
        await expect(row).toContainText("$537.00");
        await c.highlight(
          row.getByRole("cell", { name: "$537.00", exact: true }),
          2300,
        );
      },
    );
    await scene(
      "budget",
      "09 / Plan without changing achieved results",
      16,
      [
        "Save a USD 1,500.00 proposal with allocations totaling 100%.",
        "Budget planning is a simulation. It does not change sales, conversions or inventory.",
      ],
      async () => {
        await c.click(
          page.getByRole("link", { name: "Budget planner", exact: true }),
        );
        await c.type(page.getByLabel("Total budget (USD)"), "1500");
        await pause(900);
        await c.click(
          page.getByRole("button", { name: "Save plan", exact: true }),
        );
        await expect(
          page.getByRole("status").filter({ hasText: "Budget plan saved" }),
        ).toBeVisible();
        await c.highlight(page.getByText("$1,500.00", { exact: true }), 2200);
        await expect(
          page.getByText("$500.00 above the initial plan", { exact: true }),
        ).toBeVisible();
      },
    );
    await scene(
      "export",
      "10 / Filter, reconcile and export",
      14,
      [
        "Search Jamie's purchases: two transactions, three units, USD 537.00.",
        "Export the matching records to CSV, including results beyond the visible page.",
      ],
      async () => {
        await c.nav("Transactions");
        await c.type(page.getByLabel("Search transactions"), "Jamie Reed");
        await expect(page.getByRole("link", { name: /^AST-/ })).toHaveCount(2);
        expect(dollars(await revenue())).toBe(537);
        const pending = page.waitForEvent("download");
        await c.click(
          page.getByRole("button", { name: "Export CSV", exact: true }),
        );
        const download = await pending;
        const destination = path.join(output, "jamie-transactions.csv");
        await download.saveAs(destination);
        const csv = fs.readFileSync(destination, "utf8");
        expect(csv.trim().split("\r\n")).toHaveLength(3);
        expect(csv).toContain("Studio Days");
        await c.highlight(
          page
            .getByRole("status")
            .filter({ hasText: "2 matching records exported." }),
          1600,
        );
        evidence.checks.csv = "2 matching purchases downloaded and verified";
      },
    );
    await scene(
      "themes",
      "11 / Two complete palettes",
      10,
      [
        "Petrol & apricot. Ink & periwinkle.",
        "The visible theme control remembers your appearance after reload.",
      ],
      async () => {
        await c.nav("Overview");
        await pause(1000);
        await c.click(
          page.getByRole("button", { name: "Dark theme", exact: true }),
        );
        await pause(1400);
        await page.reload();
        await expect(
          page.getByRole("button", { name: "Dark theme", exact: true }),
        ).toHaveAttribute("aria-pressed", "true");
        await c.highlight(
          page.getByRole("button", { name: "Dark theme", exact: true }),
          1200,
        );
      },
    );
    const mobileState = await desktop.storageState();
    await scene(
      "outro",
      "Explore Aster",
      10,
      [
        "Try the complete sample workflow yourself.",
        "dashboard-one-rose-14.vercel.app · github.com/EPraz/dashboard",
      ],
      async () => {
        await page.mouse.move(1450, 60, { steps: 12 });
        await pause(1500);
      },
    );
    // Verify the conversion count through the public list, outside the finished edit.
    await c.nav("Leads");
    const convertedAfter = Number(
      (
        await page
          .getByRole("group", { name: "Converted leads", exact: true })
          .innerText()
      ).match(/\b\d+\b/)[0],
    );
    expect(convertedAfter).toBe(convertedBefore + 1);
    evidence.checks.commercial = {
      initialRevenue,
      finalRevenue: initialRevenue + 537,
      purchases: 2,
      units: 3,
      stock: 39,
      conversionsAdded: convertedAfter - convertedBefore,
      leadURL: new URL(leadURL).pathname,
    };
    const desktopWallSeconds = (performance.now() - wallStart) / 1000;
    const desktopVideo = rehearsal ? null : await page.video().path();
    await desktop.close();
    desktop = null;

    mobile = await browser.newContext({
      ...common,
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
      storageState: mobileState,
      ...(rehearsal
        ? {}
        : {
            recordVideo: {
              dir: path.join(output, "raw"),
              size: { width: 390, height: 844 },
            },
          }),
    });
    await mobile.addInitScript(installPointer);
    const mobileWallStart = performance.now();
    const phone = await mobile.newPage();
    phone.on("pageerror", (error) => errors.push(error.message));
    phone.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await phone.goto(`${origin}/dashboard`);
    await expect(phone.getByRole("heading", { level: 1 })).toBeVisible();
    await phone.evaluate(() => document.fonts.ready);
    const mobileSyncBefore = performance.now();
    await phone.evaluate(() => window.captureAnnotations.sync());
    const mobileSync =
      ((mobileSyncBefore + performance.now()) / 2 - mobileWallStart) / 1000;
    await pause(600);
    const m = await controls(phone);
    const mobileStart = (performance.now() - mobileWallStart) / 1000;
    await pause(1000);
    await m.click(
      phone.getByRole("button", { name: "Open navigation", exact: true }),
    );
    await pause(1300);
    await m.click(
      phone
        .getByRole("dialog")
        .getByRole("link", { name: "Products", exact: true }),
    );
    await expect(
      phone.getByRole("heading", { name: "Products", level: 1, exact: true }),
    ).toBeVisible();
    await pause(900);
    await m.click(
      phone.getByRole("link", {
        name: "Aurora Studio Headphones",
        exact: true,
      }),
    );
    await expect(
      phone.getByRole("heading", {
        name: "Aurora Studio Headphones",
        level: 1,
        exact: true,
      }),
    ).toBeVisible();
    await pause(900);
    await m.highlight(
      phone.getByRole("group", { name: "Units available", exact: true }),
      1800,
    );
    await expect(
      phone.getByRole("group", { name: "Units available", exact: true }),
    ).toContainText("39");
    const mobileRemaining =
      14 * speed - ((performance.now() - mobileWallStart) / 1000 - mobileStart);
    if (mobileRemaining > 0)
      await new Promise((resolve) =>
        setTimeout(resolve, mobileRemaining * 1000),
      );
    const mobileScene = {
      id: "mobile",
      title: "12 / A workspace that moves with you",
      seconds: 14,
      start: mobileStart,
      rawSeconds: (performance.now() - mobileWallStart) / 1000 - mobileStart,
      source: "mobile",
      captions: [
        "Actual mobile viewport · touch-sized navigation and responsive product views.",
        "Explore products and their details in the responsive mobile layout.",
      ],
    };
    scenes.splice(scenes.length - 1, 0, mobileScene);
    const mobileWallSeconds = (performance.now() - mobileWallStart) / 1000;
    const mobileVideo = rehearsal ? null : await phone.video().path();
    await mobile.close();
    mobile = null;
    expect(errors).toEqual([]);
    evidence.checks.browserErrors = errors;
    evidence.sources = {
      desktop: {
        file: desktopVideo && path.relative(output, desktopVideo),
        wallSeconds: desktopWallSeconds,
        width: 1600,
        height: 840,
        syncWallTime: desktopSync,
      },
      mobile: {
        file: mobileVideo && path.relative(output, mobileVideo),
        wallSeconds: mobileWallSeconds,
        width: 390,
        height: 844,
        syncWallTime: mobileSync,
      },
    };
    evidence.scenes = scenes;
    fs.writeFileSync(
      path.join(output, "manifest.json"),
      JSON.stringify(evidence, null, 2) + "\n",
    );
    console.log(
      JSON.stringify({
        output,
        checks: evidence.checks,
        scenes: scenes.length,
        targetSeconds: scenes.reduce((sum, scene) => sum + scene.seconds, 0),
      }),
    );
  } finally {
    await mobile?.close();
    await desktop?.close();
    await browser.close();
  }
}
run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
