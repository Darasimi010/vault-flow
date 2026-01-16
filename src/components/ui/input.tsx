import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
    "flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "border-input",
                error: "border-destructive focus-visible:ring-destructive",
            },
            inputSize: {
                default: "h-10",
                sm: "h-8 text-xs",
                lg: "h-12 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            inputSize: "default",
        },
    }
);

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, variant, inputSize, error, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    type={type}
                    className={cn(
                        inputVariants({
                            variant: error ? "error" : variant,
                            inputSize,
                            className,
                        })
                    )}
                    ref={ref}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${props.id}-error` : undefined}
                    {...props}
                />
                {error && (
                    <p
                        id={`${props.id}-error`}
                        className="mt-1 text-xs text-destructive"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input, inputVariants };
