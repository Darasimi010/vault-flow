"use client";

import { useFormContext } from "react-hook-form";
import { Check, Building2, MapPin, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { VendorOnboardingData, vendorCategories, paymentTermsOptions } from "../vendor-schema";
import { cn } from "@/lib/utils";

export function ReviewStep() {
    const { watch } = useFormContext<VendorOnboardingData>();
    const data = watch();

    const getCategoryLabel = (value: string) =>
        vendorCategories.find((c) => c.value === value)?.label || value;

    const getPaymentTermsLabel = (value: string) =>
        paymentTermsOptions.find((t) => t.value === value)?.label || value;

    const sections = [
        {
            title: "Company Information",
            icon: Building2,
            items: [
                { label: "Company Name", value: data.companyName },
                { label: "Tax ID / EIN", value: data.taxId },
                { label: "Contact Name", value: data.contactName },
                { label: "Contact Email", value: data.contactEmail },
                { label: "Contact Phone", value: data.contactPhone },
                { label: "Category", value: getCategoryLabel(data.category) },
            ],
        },
        {
            title: "Business Address",
            icon: MapPin,
            items: [
                { label: "Street Address", value: data.addressLine1 },
                ...(data.addressLine2 ? [{ label: "Suite / Unit", value: data.addressLine2 }] : []),
                { label: "City", value: data.city },
                { label: "State", value: data.state },
                { label: "ZIP Code", value: data.zipCode },
                { label: "Country", value: data.country === "US" ? "United States" : data.country },
            ],
        },
        {
            title: "Banking Information",
            icon: CreditCard,
            items: [
                { label: "Bank Name", value: data.bankName },
                { label: "Account Number", value: data.accountNumber ? `••••${data.accountNumber.slice(-4)}` : "" },
                { label: "Routing Number", value: data.routingNumber },
                { label: "Account Type", value: data.accountType === "checking" ? "Checking" : "Savings" },
                { label: "Payment Terms", value: getPaymentTermsLabel(data.paymentTerms) },
            ],
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">Review & Submit</h3>
                <p className="text-sm text-muted-foreground">
                    Please review all information before submitting
                </p>
            </div>

            {/* Success indicator */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                    <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                    <p className="text-sm font-medium text-green-500">All steps completed</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Review the details below and submit when ready
                    </p>
                </div>
            </div>

            {/* Review sections */}
            <div className="grid gap-4">
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <Card key={section.title}>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                    <h4 className="font-semibold">{section.title}</h4>
                                </div>
                                <div className="grid gap-2 md:grid-cols-2">
                                    {section.items.map((item, index) => (
                                        <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                                            <span className="text-sm text-muted-foreground">{item.label}</span>
                                            <span className="text-sm font-medium text-right">{item.value || "—"}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
