"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

const avatarVariants = cva(
    "relative flex shrink-0 overflow-hidden rounded-full",
    {
        variants: {
            size: {
                xs: "h-6 w-6 text-xs",
                sm: "h-8 w-8 text-xs",
                default: "h-10 w-10 text-sm",
                lg: "h-12 w-12 text-base",
                xl: "h-16 w-16 text-lg",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

export interface AvatarProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
    src?: string;
    alt?: string;
    fallback?: string;
}

const Avatar = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    AvatarProps
>(({ className, size, src, alt, fallback, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ size, className }))}
        {...props}
    >
        <AvatarPrimitive.Image
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
        />
        <AvatarPrimitive.Fallback
            className="flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground"
        >
            {fallback ? getInitials(fallback) : alt ? getInitials(alt) : "?"}
        </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

export { Avatar, avatarVariants };
