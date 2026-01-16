/**
 * Vendor onboarding wizard schema with Zod validation
 */

import { z } from "zod";

// Step 1: Company Info
export const companyInfoSchema = z.object({
    companyName: z
        .string()
        .min(2, "Company name must be at least 2 characters")
        .max(100, "Company name must be less than 100 characters"),
    taxId: z
        .string()
        .regex(/^\d{9}$/, "Tax ID must be exactly 9 digits")
        .or(z.string().regex(/^\d{2}-\d{7}$/, "Tax ID must be in format XX-XXXXXXX")),
    contactName: z
        .string()
        .min(2, "Contact name must be at least 2 characters"),
    contactEmail: z
        .string()
        .email("Please enter a valid email address"),
    contactPhone: z
        .string()
        .regex(/^[\d\s\-\+\(\)]{10,}$/, "Please enter a valid phone number"),
    category: z
        .string()
        .min(1, "Please select a category"),
});

// Step 2: Address
export const addressSchema = z.object({
    addressLine1: z
        .string()
        .min(5, "Address must be at least 5 characters"),
    addressLine2: z
        .string()
        .optional(),
    city: z
        .string()
        .min(2, "City must be at least 2 characters"),
    state: z
        .string()
        .length(2, "Please use 2-letter state code (e.g., CA)"),
    zipCode: z
        .string()
        .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
    country: z
        .string()
        .min(2, "Please select a country"),
});

// Step 3: Bank Details
export const bankDetailsSchema = z.object({
    bankName: z
        .string()
        .min(2, "Bank name must be at least 2 characters"),
    accountNumber: z
        .string()
        .regex(/^\d{8,17}$/, "Account number must be 8-17 digits"),
    routingNumber: z
        .string()
        .regex(/^\d{9}$/, "Routing number must be exactly 9 digits"),
    accountType: z
        .enum(["checking", "savings"], {
            errorMap: () => ({ message: "Please select account type" }),
        }),
    paymentTerms: z
        .enum(["net15", "net30", "net45", "net60"], {
            errorMap: () => ({ message: "Please select payment terms" }),
        }),
});

// Combined schema for all steps
export const vendorOnboardingSchema = z.object({
    ...companyInfoSchema.shape,
    ...addressSchema.shape,
    ...bankDetailsSchema.shape,
});

// Type exports
export type CompanyInfoData = z.infer<typeof companyInfoSchema>;
export type AddressData = z.infer<typeof addressSchema>;
export type BankDetailsData = z.infer<typeof bankDetailsSchema>;
export type VendorOnboardingData = z.infer<typeof vendorOnboardingSchema>;

// Default values
export const defaultVendorValues: VendorOnboardingData = {
    companyName: "",
    taxId: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    category: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "checking",
    paymentTerms: "net30",
};

// Category options
export const vendorCategories = [
    { value: "cloud", label: "Cloud Services" },
    { value: "software", label: "Software" },
    { value: "marketing", label: "Marketing" },
    { value: "consulting", label: "Consulting" },
    { value: "office", label: "Office Supplies" },
    { value: "travel", label: "Travel & Expenses" },
    { value: "equipment", label: "Equipment" },
    { value: "professional", label: "Professional Services" },
    { value: "other", label: "Other" },
];

// Payment terms options
export const paymentTermsOptions = [
    { value: "net15", label: "Net 15 days" },
    { value: "net30", label: "Net 30 days" },
    { value: "net45", label: "Net 45 days" },
    { value: "net60", label: "Net 60 days" },
];
