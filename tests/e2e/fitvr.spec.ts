import { expect, test } from "@playwright/test";

test("landing leads into the fitting room", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Good style. Great fit. All you." })).toBeVisible();
  await page.getByRole("link", { name: "Find your fit", exact: true }).click();
  await expect(page.getByRole("heading", { name: "It starts with you." })).toBeVisible();
  await page.getByRole("button", { name: /Scan with your phone/ }).click();
  await expect(page.getByText("Native scanner not connected yet.")).toBeVisible();
});

test("sample scan, profile review, garment controls, and reset", async ({ page }) => {
  await page.goto("/try-on");
  await page.getByRole("button", { name: "Explore sample scan", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Your sample profile is ready." })).toBeVisible();
  await page.getByRole("button", { name: "Find your next favourite" }).click();
  await page.getByRole("button", { name: /Compression tee/ }).click();
  await page.getByRole("button", { name: "XL", exact: true }).click();
  await page.getByRole("button", { name: "Stone", exact: true }).click();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByRole("img", { name: /Back view.*compression in size XL/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Stone", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Clear session & start again" }).click();
  await expect(page.getByRole("heading", { name: "It starts with you." })).toBeVisible();
});

test("manual measurements persist through profile and wardrobe", async ({ page }) => {
  await page.goto("/try-on");
  await page.getByRole("button", { name: "Use my measurements" }).click();
  await page.getByLabel("Height", { exact: false }).fill("185");
  await page.getByRole("button", { name: "Create my profile" }).click();
  await expect(page.getByRole("spinbutton", { name: "Height", exact: true })).toHaveValue("185");
  await page.getByRole("button", { name: "Find your next favourite" }).click();
  await expect(page.getByText("Manual measurements · nothing uploaded")).toBeVisible();
});

test("camera framing is gated by explicit consent", async ({ page }) => {
  await page.goto("/try-on");
  await page.getByText("Preview your camera framing", { exact: false }).click();
  await expect(page.getByRole("button", { name: "Open camera preview" })).toBeDisabled();
  await expect(page.locator("video")).not.toBeVisible();
});
