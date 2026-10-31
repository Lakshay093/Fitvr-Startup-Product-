const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { chromium } = require("playwright");

const managedPort = Number(process.env.FITVR_SMOKE_PORT || 3010);
const managedServer = process.env.FITVR_MANAGED_SERVER === "1";
const baseUrl =
  process.env.FITVR_SMOKE_URL || `http://localhost:${managedPort}`;
const outputDir = path.join(process.cwd(), "test-results");
const webCwd = path.join(process.cwd(), "apps", "web");

function startServer() {
  const server = spawn(
    process.execPath,
    ["..\\..\\node_modules\\next\\dist\\bin\\next", "start", "--port", String(managedPort)],
    {
      cwd: webCwd,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true
    }
  );

  let output = "";
  server.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  return { server, getOutput: () => output };
}

async function waitForHttp(getOutput) {
  const deadline = Date.now() + 45_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        return;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw new Error(`Timed out waiting for ${baseUrl}\n${getOutput()}`);
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const child = managedServer ? startServer() : null;

  if (child) {
    await waitForHttp(child.getOutput);
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 30_000 });
  await page
    .getByRole("heading", {
      name: "Good style. Great fit. All you."
    })
    .waitFor({ timeout: 10_000 });
  await page.screenshot({
    path: path.join(outputDir, "fitvr-home.png"),
    fullPage: false
  });

  await page.goto(`${baseUrl}/try-on`, {
    waitUntil: "networkidle",
    timeout: 30_000
  });
  await page.getByRole("button", { name: "Explore sample scan", exact: true }).click();
  await page.getByRole("heading", { name: "Your sample profile is ready." }).waitFor({ timeout: 10_000 });
  await page.getByRole("button", { name: "Find your next favourite" }).click();
  await page.getByRole("heading", { name: "Your fit. Your way." }).waitFor();
  await page.screenshot({
    path: path.join(outputDir, "fitvr-try-on.png"),
    fullPage: false
  });

  const summary = {
    baseUrl,
    homeTitle: await page.title(),
    fittingRoomVisible: await page.getByRole("heading", { name: "Your fit. Your way." }).isVisible(),
    screenshots: [
      path.join(outputDir, "fitvr-home.png"),
      path.join(outputDir, "fitvr-try-on.png")
    ]
  };

  await browser.close();
  child?.server.kill();
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
