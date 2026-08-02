const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

const baseUrl = process.env.DAEWON_QA_URL || "http://127.0.0.1:5203";
const outputDir = process.env.DAEWON_QA_OUTPUT || "/tmp/chungju-daewon-qa";

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

(async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    const consoleErrors = [];
    const failedRequests = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("requestfailed", (request) => {
      failedRequests.push(`${request.url()} :: ${request.failure()?.errorText}`);
    });

    const response = await page.goto(baseUrl, {
      waitUntil: "networkidle",
      timeout: 30_000,
    });
    await page.evaluate(() => document.fonts.ready);
    for (const card of await page.locator(".service-card").all()) {
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(160);
    }
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    await page.waitForTimeout(120);

    const metrics = await page.evaluate(() => ({
      title: document.title,
      heading: document.querySelector("h1")?.innerText.trim(),
      cards: document.querySelectorAll(".service-card").length,
      disabledLinks: document.querySelectorAll('.service-link[aria-disabled="true"]')
        .length,
      missingImages: [...document.images].filter(
        (image) => !image.complete || image.naturalWidth === 0,
      ).length,
      horizontalOverflow: Math.max(
        0,
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    }));

    const screenshot = path.join(outputDir, `${viewport.name}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });

    results.push({
      viewport,
      status: response?.status(),
      ...metrics,
      consoleErrors,
      failedRequests,
      screenshot,
    });
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));

  const hasFailure = results.some(
    (result) =>
      result.status !== 200 ||
      result.cards !== 3 ||
      result.disabledLinks !== 3 ||
      result.missingImages !== 0 ||
      result.horizontalOverflow !== 0 ||
      result.consoleErrors.length > 0 ||
      result.failedRequests.length > 0,
  );

  if (hasFailure) process.exitCode = 1;
})();
