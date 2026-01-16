import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
    test("should load the dashboard page", async ({ page }) => {
        await page.goto("/dashboard");

        // Check page title
        await expect(page).toHaveTitle(/VaultFlow/);

        // Check that the CFO Command Center heading is visible
        await expect(
            page.getByRole("heading", { name: /CFO Command Center/i })
        ).toBeVisible();
    });

    test("should display stats cards", async ({ page }) => {
        await page.goto("/dashboard");

        // Check that stats cards are rendered
        await expect(page.getByText("Total Balance")).toBeVisible();
        await expect(page.getByText("Monthly Revenue")).toBeVisible();
        await expect(page.getByText("Monthly Expenses")).toBeVisible();
        await expect(page.getByText("Active Vendors")).toBeVisible();
    });

    test("should have working navigation", async ({ page }) => {
        await page.goto("/dashboard");

        // Check sidebar navigation items are visible (desktop)
        const sidebar = page.locator("aside");
        await expect(sidebar.getByText("Dashboard")).toBeVisible();
        await expect(sidebar.getByText("Expenses")).toBeVisible();
        await expect(sidebar.getByText("Vendors")).toBeVisible();
    });

    test("should toggle theme", async ({ page }) => {
        await page.goto("/dashboard");

        // Find and click theme toggle button
        const themeToggle = page.getByRole("button", { name: /theme/i });
        await themeToggle.click();

        // Check that theme class is applied to html element
        const html = page.locator("html");
        await expect(html).toHaveClass(/dark|light/);
    });
});

test.describe("Responsive Design", () => {
    test("should show mobile nav on small screens", async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto("/dashboard");

        // Desktop sidebar should be hidden
        const desktopSidebar = page.locator("aside.hidden.md\\:flex");
        await expect(desktopSidebar).not.toBeVisible();

        // Mobile menu button should be visible
        const mobileMenuButton = page.getByRole("button", { name: /toggle menu/i });
        await expect(mobileMenuButton).toBeVisible();
    });
});
