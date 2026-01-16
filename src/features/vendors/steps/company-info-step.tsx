"use client";

import { useFormContext } from "react-hook-form";
import { Building2, Mail, Phone, User, Tag } from "lucide-react";
import { Input, Label } from "@/components/ui";
import { VendorOnboardingData, vendorCategories } from "../vendor-schema";
import { cn } from "@/lib/utils";

export function CompanyInfoStep() {
    const {
        register,
        formState: { errors },
    } = useFormContext<VendorOnboardingData>();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">Company Information</h3>
                <p className="text-sm text-muted-foreground">
                    Enter the vendor&apos;s basic business details
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Company Name */}
                <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="companyName"
                            placeholder="Acme Corporation"
                            className={cn("pl-9", errors.companyName && "border-destructive")}
                            {...register("companyName")}
                        />
                    </div>
                    {errors.companyName && (
                        <p className="text-xs text-destructive">{errors.companyName.message}</p>
                    )}
                </div>

                {/* Tax ID */}
                <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / EIN *</Label>
                    <Input
                        id="taxId"
                        placeholder="XX-XXXXXXX"
                        className={cn(errors.taxId && "border-destructive")}
                        {...register("taxId")}
                    />
                    {errors.taxId && (
                        <p className="text-xs text-destructive">{errors.taxId.message}</p>
                    )}
                </div>

                {/* Contact Name */}
                <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="contactName"
                            placeholder="John Smith"
                            className={cn("pl-9", errors.contactName && "border-destructive")}
                            {...register("contactName")}
                        />
                    </div>
                    {errors.contactName && (
                        <p className="text-xs text-destructive">{errors.contactName.message}</p>
                    )}
                </div>

                {/* Contact Email */}
                <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="contactEmail"
                            type="email"
                            placeholder="john@acme.com"
                            className={cn("pl-9", errors.contactEmail && "border-destructive")}
                            {...register("contactEmail")}
                        />
                    </div>
                    {errors.contactEmail && (
                        <p className="text-xs text-destructive">{errors.contactEmail.message}</p>
                    )}
                </div>

                {/* Contact Phone */}
                <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone *</Label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="contactPhone"
                            placeholder="(555) 123-4567"
                            className={cn("pl-9", errors.contactPhone && "border-destructive")}
                            {...register("contactPhone")}
                        />
                    </div>
                    {errors.contactPhone && (
                        <p className="text-xs text-destructive">{errors.contactPhone.message}</p>
                    )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <div className="relative">
                        <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <select
                            id="category"
                            className={cn(
                                "w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                                errors.category && "border-destructive"
                            )}
                            {...register("category")}
                        >
                            <option value="">Select a category</option>
                            {vendorCategories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.category && (
                        <p className="text-xs text-destructive">{errors.category.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
