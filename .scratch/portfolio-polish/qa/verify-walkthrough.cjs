const { chromium, expect } = require("@playwright/test");
const { AxeBuilder } = require("@axe-core/playwright");
const fs = require("node:fs");
const crypto = require("node:crypto");

async function verify() {
  const origin = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173";
  const resource = `${origin}/walkthrough/aster-walkthrough.mp4`;
  const range = await fetch(resource, { headers: { Range: "bytes=0-1023" } });
  expect(range.status).toBe(206);
  expect(range.headers.get("content-type")).toContain("video/mp4");
  expect(range.headers.get("content-range")).toMatch(/^bytes 0-1023\/\d+$/);
  const downloaded = Buffer.from(await (await fetch(resource)).arrayBuffer());
  const expected = fs.readFileSync("public/walkthrough/aster-walkthrough.mp4");
  const hash = (buffer) =>
    crypto.createHash("sha256").update(buffer).digest("hex");
  expect(hash(downloaded)).toBe(hash(expected));
  const captions = await fetch(`${origin}/walkthrough/aster-walkthrough.vtt`);
  expect(captions.status).toBe(200);
  const captionText = await captions.text();
  expect(captionText).toMatch(/^WEBVTT/);
  expect(captionText.match(/ --> /g)).toHaveLength(28);
  const report = {
    origin,
    videoBytes: downloaded.length,
    sha256: hash(downloaded),
    byteRange: "passed",
    widths: [],
    browserErrors: [],
  };
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on("pageerror", (error) => report.browserErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") report.browserErrors.push(message.text());
    });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`${origin}/walkthrough`);
      await expect(
        page.getByRole("heading", {
          name: "See Aster in action.",
          level: 1,
          exact: true,
        }),
      ).toBeVisible();
      const video = page.locator("video");
      await expect
        .poll(() => video.evaluate((element) => element.readyState))
        .toBeGreaterThanOrEqual(1);
      const info = await video.evaluate((element) => ({
        duration: element.duration,
        width: element.videoWidth,
        height: element.videoHeight,
        controls: element.controls,
      }));
      expect(info.duration).toBeGreaterThan(180);
      expect(info.duration).toBeLessThan(240);
      expect([info.width, info.height]).toEqual([1920, 1080]);
      expect(info.controls).toBe(true);
      await video.evaluate(async (element) => {
        element.muted = true;
        await element.play();
      });
      await expect
        .poll(() => video.evaluate((element) => element.currentTime))
        .toBeGreaterThan(1);
      await video.evaluate((element) => element.pause());
      for (const time of [60, 120, 170, info.duration - 2]) {
        await video.evaluate(
          (element, time) =>
            new Promise((resolve, reject) => {
              const timeout = setTimeout(
                () => reject(new Error("Video seek timed out")),
                10000,
              );
              element.addEventListener(
                "seeked",
                () => {
                  clearTimeout(timeout);
                  resolve();
                },
                { once: true },
              );
              element.currentTime = time;
            }),
          time,
        );
        expect(
          await video.evaluate(
            (element, time) => Math.abs(element.currentTime - time),
            time,
          ),
        ).toBeLessThan(0.1);
      }
      await page
        .getByText("Read the walkthrough transcript", { exact: true })
        .click();
      await expect(
        page.getByText(/Studio Days receives the attributed revenue/),
      ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
      // This video has no audio track; its explanatory text is embedded and also
      // available as an HTML transcript, so the audio-caption heuristic is inapplicable.
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .disableRules(["video-caption"])
        .analyze();
      expect(accessibility.violations.map((issue) => issue.id)).toEqual([]);
      report.widths.push({
        viewportWidth: width,
        video: info,
        playback: "passed",
        seeking: "passed",
        transcript: "passed",
        accessibility: "passed",
      });
      await page
        .getByRole("link", { name: "Try the demo →", exact: true })
        .click();
      await expect(
        page.getByRole("heading", {
          name: "Your business, in harmony.",
          level: 1,
          exact: true,
        }),
      ).toBeVisible();
    }
    expect(report.browserErrors).toEqual([]);
  } finally {
    await browser.close();
  }
  const output = process.argv[2];
  if (output) fs.writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
}
verify().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
