"use client";

import { useFormContext } from "react-hook-form";
import { Building2, Hash, CreditCard, Calendar } from "lucide-react";
import { Input, Label } from "@/components/ui";
import { VendorOnboardingData, paymentTermsOptions } from "../vendor-schema";
import { cn } from "@/lib/utils";

export function BankDetailsStep() {
    const {
        register,
        formState: { errors },
    } = useFormContext<VendorOnboardingData>();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">Banking Information</h3>
                <p className="text-sm text-muted-foreground">
                    Enter the vendor&apos;s bank details for payments
                </p>
            </div>

            {/* Security notice */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <CreditCard className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-blue-500">Secure Information</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Bank details are encrypted and stored securely. Only authorized personnel can access this information.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Bank Name */}
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bankName">Bank Name *</Label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="bankName"
                            placeholder="Chase Bank"
                            className={cn("pl-9", errors.bankName && "border-destructive")}
                            {...register("bankName")}
                        />
                    </div>
                    {errors.bankName && (
                        <p className="text-xs text-destructive">{errors.bankName.message}</p>
                    )}
                </div>

                {/* Account Number */}
                <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <div className="relative">
                        <Hash className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="accountNumber"
                            placeholder="••••••••••"
                            type="password"
                            autoComplete="off"
                            className={cn("pl-9", errors.accountNumber && "border-destructive")}
                            {...register("accountNumber")}
                        />
                    </div>
                    {errors.accountNumber && (
                        <p className="text-xs text-destructive">{errors.accountNumber.message}</p>
                    )}
                </div>

                {/* Routing Number */}
                <div className="space-y-2">
                    <Label htmlFor="routingNumber">Routing Number *</Label>
                    <div className="relative">
                        <Hash className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="routingNumber"
                            placeholder="9 digits"
                            className={cn("pl-9", errors.routingNumber && "border-destructive")}
                            {...register("routingNumber")}
                        />
                    </div>
                    {errors.routingNumber && (
                        <p className="text-xs text-destructive">{errors.routingNumber.message}</p>
                    )}
                </div>

                {/* Account Type */}
                <div className="space-y-2">
                    <Label htmlFor="accountType">Account Type *</Label>
                    <select
                        id="accountType"
                        className={cn(
                            "w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                            errors.accountType && "border-destructive"
                        )}
                        {...register("accountType")}
                    >
                        <option value="checking">Checking</option>
                        <option value="savings">Savings</option>
                    </select>
                    {errors.accountType && (
                        <p className="text-xs text-destructive">{errors.accountType.message}</p>
                    )}
                </div>

                {/* Payment Terms */}
                <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms *</Label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <select
                            id="paymentTerms"
                            className={cn(
                                "w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                                errors.paymentTerms && "border-destructive"
                            )}
                            {...register("paymentTerms")}
                        >
                            {paymentTermsOptions.map((term) => (
                                <option key={term.value} value={term.value}>
                                    {term.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.paymentTerms && (
                        <p className="text-xs text-destructive">{errors.paymentTerms.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
