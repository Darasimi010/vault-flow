import { test, expect } from "@playwright/test";

test.describe("Vendor Onboarding Wizard", () => {
    test.beforeEach(async ({ page }) => {
        // Start at the vendors page
        await page.goto("/dashboard/vendors/new");
        await page.waitForLoadState("networkidle");
    });

    test("should display the vendor wizard form", async ({ page }) => {
        // Check for wizard header
        await expect(page.getByText("New Vendor Onboarding")).toBeVisible();

        // Check for stepper with 4 steps
        await expect(page.getByText("Company Info")).toBeVisible();
        await expect(page.getByText("Address")).toBeVisible();
        await expect(page.getByText("Bank Details")).toBeVisible();
        await expect(page.getByText("Review")).toBeVisible();
    });

    test("should show validation errors for empty fields", async ({ page }) => {
        // Try to go to next step without filling anything
        await page.click("button:has-text('Next')");

        // Should show validation errors
        await expect(page.getByText(/must be at least/i).first()).toBeVisible();
    });

    test("should progress through steps when filled correctly", async ({ page }) => {
        // Fill in company info
        await page.fill("#companyName", "Test Corporation");
        await page.fill("#taxId", "12-3456789");
        await page.fill("#contactName", "John Doe");
        await page.fill("#contactEmail", "john@test.com");
        await page.fill("#contactPhone", "(555) 123-4567");
        await page.selectOption("#category", "software");

        // Go to next step
        await page.click("button:has-text('Next')");

        // Should be on address step
        await expect(page.getByText("Business Address")).toBeVisible();

        // Fill in address
        await page.fill("#addressLine1", "123 Test Street");
        await page.fill("#city", "San Francisco");
        await page.selectOption("#state", "CA");
        await page.fill("#zipCode", "94102");

        // Go to next step
        await page.click("button:has-text('Next')");

        // Should be on bank details step
        await expect(page.getByText("Banking Information")).toBeVisible();

        // Fill in bank details
        await page.fill("#bankName", "Test Bank");
        await page.fill("#accountNumber", "123456789012");
        await page.fill("#routingNumber", "021000021");

        // Go to next step
        await page.click("button:has-text('Next')");

        // Should be on review step
        await expect(page.getByText("Review & Submit")).toBeVisible();
        await expect(page.getByText("All steps completed")).toBeVisible();

        // Check that entered data appears in review
        await expect(page.getByText("Test Corporation")).toBeVisible();
        await expect(page.getByText("john@test.com")).toBeVisible();
    });

    test("should navigate back through steps", async ({ page }) => {
        // Fill step 1 and go to step 2
        await page.fill("#companyName", "Test Corp");
        await page.fill("#taxId", "12-3456789");
        await page.fill("#contactName", "John");
        await page.fill("#contactEmail", "john@test.com");
        await page.fill("#contactPhone", "5551234567");
        await page.selectOption("#category", "software");
        await page.click("button:has-text('Next')");

        // Should be on step 2
        await expect(page.getByText("Business Address")).toBeVisible();

        // Go back
        await page.click("button:has-text('Back')");

        // Should be back on step 1
        await expect(page.getByText("Company Information")).toBeVisible();

        // Values should be preserved
        await expect(page.locator("#companyName")).toHaveValue("Test Corp");
    });
});
