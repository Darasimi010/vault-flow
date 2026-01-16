"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-context";
import { UserRole, Permission, canAccessRoute } from "@/types/auth.types";
import { Skeleton } from "@/components/ui";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
    fallbackUrl?: string;
}

/**
 * Component to protect routes based on authentication and roles
 */
export function ProtectedRoute({
    children,
    allowedRoles,
    fallbackUrl = "/",
}: ProtectedRouteProps) {
    const router = useRouter();
    const { user, isLoading, isAuthenticated } = useAuth();

    React.useEffect(() => {
        if (isLoading) return;

        // Redirect if not authenticated
        if (!isAuthenticated) {
            router.push(fallbackUrl);
            return;
        }

        // Check role access
        if (user && allowedRoles && !canAccessRoute(user.role, allowedRoles)) {
            router.push("/dashboard"); // Redirect to dashboard if no access
        }
    }, [isLoading, isAuthenticated, user, allowedRoles, router, fallbackUrl]);

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="space-y-4 w-full max-w-md">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-8 w-3/4" />
                </div>
            </div>
        );
    }

    // Don't render if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    // Don't render if no role access
    if (user && allowedRoles && !canAccessRoute(user.role, allowedRoles)) {
        return null;
    }

    return <>{children}</>;
}

interface RequirePermissionProps {
    children: React.ReactNode;
    permission: string;
    fallback?: React.ReactNode;
}

/**
 * Component to conditionally render based on permission
 */
export function RequirePermission({
    children,
    permission,
    fallback = null,
}: RequirePermissionProps) {
    const { checkPermission } = useAuth();

    if (!checkPermission(permission as Permission)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}

interface RoleGateProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
    fallback?: React.ReactNode;
}

/**
 * Component to conditionally render based on role
 */
export function RoleGate({
    children,
    allowedRoles,
    fallback = null,
}: RoleGateProps) {
    const { user } = useAuth();

    if (!user || !canAccessRoute(user.role, allowedRoles)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
