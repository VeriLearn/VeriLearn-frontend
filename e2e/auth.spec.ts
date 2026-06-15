import { test, expect } from "@playwright/test";

test("sign in redirects to dashboard", async ({ page }) => {
  await page.goto("/login");
  await page.fill("#email", "test@example.com");
  await page.fill("#password", "password123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/dashboard");
});
