import { test, expect } from "@playwright/test";

test("clicking a course card loads the course detail page", async ({ page }) => {
  await page.goto("/courses");
  await page.locator('a[href="/courses/1"]').first().click();
  await expect(page).toHaveURL("/courses/1");
  await expect(page.locator("h1")).toBeVisible();
});
