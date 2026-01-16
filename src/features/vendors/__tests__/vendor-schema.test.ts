import { describe, it, expect } from "vitest";
import {
    companyInfoSchema,
    addressSchema,
    bankDetailsSchema,
    vendorOnboardingSchema,
} from "@/features/vendors/vendor-schema";

describe("Vendor Onboarding Schema Validation", () => {
    describe("companyInfoSchema", () => {
        it("validates correct company info", () => {
            const validData = {
                companyName: "Acme Corporation",
                taxId: "12-3456789",
                contactName: "John Doe",
                contactEmail: "john@acme.com",
                contactPhone: "(555) 123-4567",
                category: "software",
            };

            const result = companyInfoSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it("rejects invalid email", () => {
            const invalidData = {
                companyName: "Acme Corporation",
                taxId: "12-3456789",
                contactName: "John Doe",
                contactEmail: "invalid-email",
                contactPhone: "(555) 123-4567",
                category: "software",
            };

            const result = companyInfoSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        it("rejects tax ID with wrong format", () => {
            const invalidData = {
                companyName: "Acme Corporation",
                taxId: "1234",
                contactName: "John Doe",
                contactEmail: "john@acme.com",
                contactPhone: "(555) 123-4567",
                category: "software",
            };

            const result = companyInfoSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        it("rejects short company name", () => {
            const invalidData = {
                companyName: "A",
                taxId: "12-3456789",
                contactName: "John Doe",
                contactEmail: "john@acme.com",
                contactPhone: "(555) 123-4567",
                category: "software",
            };

            const result = companyInfoSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });

    describe("addressSchema", () => {
        it("validates correct address", () => {
            const validData = {
                addressLine1: "123 Main Street",
                addressLine2: "Suite 100",
                city: "San Francisco",
                state: "CA",
                zipCode: "94102",
                country: "US",
            };

            const result = addressSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it("validates address without optional line 2", () => {
            const validData = {
                addressLine1: "123 Main Street",
                city: "San Francisco",
                state: "CA",
                zipCode: "94102",
                country: "US",
            };

            const result = addressSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it("rejects invalid ZIP code", () => {
            const invalidData = {
                addressLine1: "123 Main Street",
                city: "San Francisco",
                state: "CA",
                zipCode: "9410",
                country: "US",
            };

            const result = addressSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        it("rejects invalid state code", () => {
            const invalidData = {
                addressLine1: "123 Main Street",
                city: "San Francisco",
                state: "California",
                zipCode: "94102",
                country: "US",
            };

            const result = addressSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });

    describe("bankDetailsSchema", () => {
        it("validates correct bank details", () => {
            const validData = {
                bankName: "Chase Bank",
                accountNumber: "123456789012",
                routingNumber: "021000021",
                accountType: "checking",
                paymentTerms: "net30",
            };

            const result = bankDetailsSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it("rejects routing number with wrong length", () => {
            const invalidData = {
                bankName: "Chase Bank",
                accountNumber: "123456789012",
                routingNumber: "12345",
                accountType: "checking",
                paymentTerms: "net30",
            };

            const result = bankDetailsSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        it("rejects invalid account type", () => {
            const invalidData = {
                bankName: "Chase Bank",
                accountNumber: "123456789012",
                routingNumber: "021000021",
                accountType: "money_market",
                paymentTerms: "net30",
            };

            const result = bankDetailsSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });
});
