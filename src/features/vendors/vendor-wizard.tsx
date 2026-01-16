"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
    vendorOnboardingSchema,
    VendorOnboardingData,
    defaultVendorValues,
} from "./vendor-schema";
import { CompanyInfoStep } from "./steps/company-info-step";
import { AddressStep } from "./steps/address-step";
import { BankDetailsStep } from "./steps/bank-details-step";
import { ReviewStep } from "./steps/review-step";
import { useToast } from "@/features/notifications";

// Wizard steps configuration
const steps = [
    { id: "company", title: "Company Info", description: "Basic company details" },
    { id: "address", title: "Address", description: "Business address" },
    { id: "bank", title: "Bank Details", description: "Payment information" },
    { id: "review", title: "Review", description: "Confirm details" },
];

// Storage key for form persistence
const STORAGE_KEY = "vaultflow-vendor-wizard";

// Load saved form data
function loadSavedData(): Partial<VendorOnboardingData> {
    if (typeof window === "undefined") return {};
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    } catch {
        return {};
    }
}

// Save form data
function saveFormData(data: Partial<VendorOnboardingData>) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // Ignore storage errors
    }
}

// Clear saved data
function clearSavedData() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
}

interface VendorWizardProps {
    onComplete?: (data: VendorOnboardingData) => void;
    onCancel?: () => void;
}

export function VendorWizard({ onComplete, onCancel }: VendorWizardProps) {
    const { addToast } = useToast();
    const [currentStep, setCurrentStep] = React.useState(0);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Load saved data on mount
    const savedData = React.useMemo(() => loadSavedData(), []);

    const methods = useForm<VendorOnboardingData>({
        resolver: zodResolver(vendorOnboardingSchema),
        defaultValues: { ...defaultVendorValues, ...savedData },
        mode: "onChange",
    });

    const { handleSubmit, watch, trigger, formState: { errors } } = methods;

    // Save form data on change
    React.useEffect(() => {
        const subscription = watch((data) => {
            saveFormData(data as VendorOnboardingData);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    // Validate current step before proceeding
    const validateStep = async () => {
        const fieldsPerStep: (keyof VendorOnboardingData)[][] = [
            ["companyName", "taxId", "contactName", "contactEmail", "contactPhone", "category"],
            ["addressLine1", "city", "state", "zipCode", "country"],
            ["bankName", "accountNumber", "routingNumber", "accountType", "paymentTerms"],
            [], // Review step has no fields to validate
        ];

        const fieldsToValidate = fieldsPerStep[currentStep];
        if (fieldsToValidate.length === 0) return true;

        const isValid = await trigger(fieldsToValidate);
        return isValid;
    };

    const handleNext = async () => {
        const isValid = await validateStep();
        if (isValid && currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const onSubmit = async (data: VendorOnboardingData) => {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        clearSavedData();

        addToast({
            type: "success",
            title: "Vendor Added",
            message: `${data.companyName} has been successfully onboarded.`,
        });

        onComplete?.(data);
        setIsSubmitting(false);
    };

    // Render current step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <CompanyInfoStep />;
            case 1:
                return <AddressStep />;
            case 2:
                return <BankDetailsStep />;
            case 3:
                return <ReviewStep />;
            default:
                return null;
        }
    };

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>New Vendor Onboarding</CardTitle>
                <CardDescription>
                    Complete the form to register a new supplier
                </CardDescription>
            </CardHeader>

            {/* Stepper */}
            <div className="px-6 pb-6">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                                        index < currentStep
                                            ? "bg-primary border-primary text-primary-foreground"
                                            : index === currentStep
                                                ? "border-primary text-primary"
                                                : "border-muted text-muted-foreground"
                                    )}
                                >
                                    {index < currentStep ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <span className="text-sm font-medium">{index + 1}</span>
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        "mt-2 text-xs font-medium hidden sm:block",
                                        index <= currentStep ? "text-foreground" : "text-muted-foreground"
                                    )}
                                >
                                    {step.title}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={cn(
                                        "flex-1 h-0.5 mx-2",
                                        index < currentStep ? "bg-primary" : "bg-muted"
                                    )}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <CardContent>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Step content */}
                        <div className="min-h-[400px]">
                            {renderStepContent()}
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={currentStep === 0 ? onCancel : handleBack}
                            >
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                {currentStep === 0 ? "Cancel" : "Back"}
                            </Button>

                            {currentStep < steps.length - 1 ? (
                                <Button type="button" onClick={handleNext}>
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                            ) : (
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            )}
                        </div>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}
