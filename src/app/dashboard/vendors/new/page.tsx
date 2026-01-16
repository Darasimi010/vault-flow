"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";
import { VendorWizard, VendorOnboardingData } from "@/features/vendors";
import { RequirePermission } from "@/features/auth";

export default function NewVendorPage() {
    const router = useRouter();

    const handleComplete = (data: VendorOnboardingData) => {
        // In production, this would save to the database
        console.log("Vendor created:", data);
        router.push("/dashboard/vendors");
    };

    const handleCancel = () => {
        router.push("/dashboard/vendors");
    };

    return (
        <RequirePermission
            permission="manage:vendors"
            fallback={
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
                    <p className="text-muted-foreground mb-4">
                        You don&apos;t have permission to add vendors.
                    </p>
                    <Button onClick={() => router.push("/dashboard/vendors")}>
                        Go Back
                    </Button>
                </div>
            }
        >
            <div className="space-y-6">
                {/* Back button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/dashboard/vendors")}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Vendors
                </Button>

                {/* Wizard */}
                <VendorWizard
                    onComplete={handleComplete}
                    onCancel={handleCancel}
                />
            </div>
        </RequirePermission>
    );
}
