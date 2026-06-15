import { test, expect } from "@playwright/test";

test("enrolling in a course changes button to Continue learning", async ({ page }) => {
  // Log in first
  await page.goto("/login");
  await page.fill("#email", "test@example.com");
  await page.fill("#password", "password123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/dashboard");

  // Go to a course that the test user is NOT pre-enrolled in (id=4)
  await page.goto("/courses/4");
  const enrollBtn = page.getByRole("button", { name: "Enroll for free" });
  await expect(enrollBtn).toBeVisible();
  await enrollBtn.click();
  await expect(page.getByRole("link", { name: /Continue learning/i })).toBeVisible();
});
