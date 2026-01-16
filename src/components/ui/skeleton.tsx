import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "circular" | "text";
}

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse bg-muted",
                {
                    "rounded-md": variant === "default",
                    "rounded-full": variant === "circular",
                    "rounded h-4 w-full": variant === "text",
                },
                className
            )}
            {...props}
        />
    );
}

function SkeletonCard() {
    return (
        <div className="rounded-xl border border-border p-6 space-y-4">
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </div>
        </div>
    );
}

function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/50">
                <div className="flex gap-4">
                    <Skeleton className="h-4 w-1/6" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/6" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            </div>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="p-4 border-b border-border last:border-b-0">
                    <div className="flex gap-4 items-center">
                        <Skeleton variant="circular" className="h-8 w-8" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/6" />
                        <Skeleton className="h-4 w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export { Skeleton, SkeletonCard, SkeletonTable };
