"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

const dataCardVariants = cva(
    "relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all",
    {
        variants: {
            variant: {
                default: "",
                elevated: "shadow-md hover:shadow-lg",
                outline: "bg-transparent",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface DataCardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
    title: string;
    value: string | number;
    description?: string;
    trend?: {
        value: number;
        direction: "up" | "down" | "neutral";
    };
    icon?: React.ReactNode;
    loading?: boolean;
    sparkline?: React.ReactNode;
}

function DataCard({
    className,
    variant,
    title,
    value,
    description,
    trend,
    icon,
    loading = false,
    sparkline,
    ...props
}: DataCardProps) {
    if (loading) {
        return (
            <div
                className={cn(dataCardVariants({ variant }), className)}
                {...props}
            >
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="mt-3 h-8 w-32" />
                <Skeleton className="mt-2 h-4 w-20" />
            </div>
        );
    }

    const TrendIcon =
        trend?.direction === "up"
            ? TrendingUp
            : trend?.direction === "down"
                ? TrendingDown
                : Minus;

    const trendColor =
        trend?.direction === "up"
            ? "text-green-500"
            : trend?.direction === "down"
                ? "text-red-500"
                : "text-muted-foreground";

    return (
        <div
            className={cn(dataCardVariants({ variant }), className)}
            {...props}
        >
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                    {title}
                </p>
                {icon && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {icon}
                    </div>
                )}
            </div>

            <div className="mt-2">
                <p className="text-2xl font-bold">{value}</p>
            </div>

            {(trend || description) && (
                <div className="mt-2 flex items-center gap-2">
                    {trend && (
                        <div className={cn("flex items-center gap-1", trendColor)}>
                            <TrendIcon className="h-4 w-4" />
                            <span className="text-xs font-medium">
                                {Math.abs(trend.value)}%
                            </span>
                        </div>
                    )}
                    {description && (
                        <span className="text-xs text-muted-foreground">
                            {description}
                        </span>
                    )}
                </div>
            )}

            {sparkline && (
                <div className="mt-3 h-10">
                    {sparkline}
                </div>
            )}

            {/* Decorative gradient based on trend */}
            {trend && (
                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 h-1",
                        trend.direction === "up"
                            ? "bg-gradient-to-r from-green-500/50 to-green-500/0"
                            : trend.direction === "down"
                                ? "bg-gradient-to-r from-red-500/50 to-red-500/0"
                                : "bg-gradient-to-r from-muted/50 to-muted/0"
                    )}
                />
            )}
        </div>
    );
}

export { DataCard, dataCardVariants };
