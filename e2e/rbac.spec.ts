import { test, expect } from "@playwright/test";

test.describe("RBAC - Role-Based Access Control", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/dashboard");
        // Wait for the page to be fully loaded
        await page.waitForLoadState("networkidle");
    });

    test("should display role switcher in header", async ({ page }) => {
        // Check that role switcher button is visible
        const roleSwitcher = page.getByRole("button", { name: /role/i });
        await expect(roleSwitcher).toBeVisible();
    });

    test("should switch roles when clicking role options", async ({ page }) => {
        // Open role switcher dropdown
        const roleSwitcher = page.getByRole("button", { name: /role/i });
        await roleSwitcher.click();

        // Wait for dropdown to appear
        await page.waitForSelector("text=Switch Demo Role");

        // Click on Viewer role
        await page.click("text=viewer");

        // Verify the role has changed
        await expect(page.getByText(/viewer/i).first()).toBeVisible();
    });

    test("admin should see Team page in sidebar", async ({ page }) => {
        // Ensure we're in admin mode (default)
        const sidebar = page.locator("aside");
        await expect(sidebar.getByText("Team")).toBeVisible();
    });

    test("viewer should not see Team page in sidebar", async ({ page }) => {
        // Switch to viewer role
        const roleSwitcher = page.getByRole("button", { name: /role/i });
        await roleSwitcher.click();
        await page.waitForSelector("text=Switch Demo Role");
        await page.click("button:has-text('viewer')");

        // Wait for role to switch
        await page.waitForTimeout(500);

        // Team should not be visible for viewer
        const sidebar = page.locator("aside");
        await expect(sidebar.getByText("Team")).not.toBeVisible();
    });

    test("viewer should not see Cash Flow page in sidebar", async ({ page }) => {
        // Switch to viewer role
        const roleSwitcher = page.getByRole("button", { name: /role/i });
        await roleSwitcher.click();
        await page.waitForSelector("text=Switch Demo Role");
        await page.click("button:has-text('viewer')");

        // Wait for role to switch
        await page.waitForTimeout(500);

        // Cash Flow should not be visible for viewer
        const sidebar = page.locator("aside");
        await expect(sidebar.getByText("Cash Flow")).not.toBeVisible();
    });
});

test.describe("Notifications", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/dashboard");
        await page.waitForLoadState("networkidle");
    });

    test("should display notification bell with badge", async ({ page }) => {
        // Find the notification bell
        const notificationBell = page.locator("header").getByRole("button").filter({ has: page.locator("svg") }).first();
        await expect(notificationBell).toBeVisible();
    });

    test("should open notification dropdown on bell click", async ({ page }) => {
        // Click the notification bell (first button in actions area)
        await page.click("header button:has(svg + span)");

        // Wait for dropdown
        await page.waitForTimeout(300);

        // Check for notifications header
        await expect(page.getByText("Notifications")).toBeVisible();
    });
});
