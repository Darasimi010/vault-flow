"use client";

import { useFormContext } from "react-hook-form";
import { MapPin, Building, Globe } from "lucide-react";
import { Input, Label } from "@/components/ui";
import { VendorOnboardingData } from "../vendor-schema";
import { cn } from "@/lib/utils";

// US States
const US_STATES = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

export function AddressStep() {
    const {
        register,
        formState: { errors },
    } = useFormContext<VendorOnboardingData>();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">Business Address</h3>
                <p className="text-sm text-muted-foreground">
                    Enter the vendor&apos;s physical business address
                </p>
            </div>

            <div className="grid gap-4">
                {/* Address Line 1 */}
                <div className="space-y-2">
                    <Label htmlFor="addressLine1">Street Address *</Label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="addressLine1"
                            placeholder="123 Main Street"
                            className={cn("pl-9", errors.addressLine1 && "border-destructive")}
                            {...register("addressLine1")}
                        />
                    </div>
                    {errors.addressLine1 && (
                        <p className="text-xs text-destructive">{errors.addressLine1.message}</p>
                    )}
                </div>

                {/* Address Line 2 */}
                <div className="space-y-2">
                    <Label htmlFor="addressLine2">Suite / Unit (Optional)</Label>
                    <div className="relative">
                        <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="addressLine2"
                            placeholder="Suite 100"
                            className="pl-9"
                            {...register("addressLine2")}
                        />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* City */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                            id="city"
                            placeholder="San Francisco"
                            className={cn(errors.city && "border-destructive")}
                            {...register("city")}
                        />
                        {errors.city && (
                            <p className="text-xs text-destructive">{errors.city.message}</p>
                        )}
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <select
                            id="state"
                            className={cn(
                                "w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                                errors.state && "border-destructive"
                            )}
                            {...register("state")}
                        >
                            <option value="">--</option>
                            {US_STATES.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        {errors.state && (
                            <p className="text-xs text-destructive">{errors.state.message}</p>
                        )}
                    </div>

                    {/* ZIP Code */}
                    <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                            id="zipCode"
                            placeholder="94102"
                            className={cn(errors.zipCode && "border-destructive")}
                            {...register("zipCode")}
                        />
                        {errors.zipCode && (
                            <p className="text-xs text-destructive">{errors.zipCode.message}</p>
                        )}
                    </div>
                </div>

                {/* Country */}
                <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <div className="relative">
                        <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <select
                            id="country"
                            className={cn(
                                "w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                                errors.country && "border-destructive"
                            )}
                            {...register("country")}
                        >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="MX">Mexico</option>
                        </select>
                    </div>
                    {errors.country && (
                        <p className="text-xs text-destructive">{errors.country.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
