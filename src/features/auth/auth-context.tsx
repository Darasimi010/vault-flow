"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    UserProfile,
    UserRole,
    Permission,
    hasPermission,
    AuthState,
} from "@/types/auth.types";

/**
 * Auth context value
 */
interface AuthContextValue extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkPermission: (permission: Permission) => boolean;
    switchRole: (role: UserRole) => void; // For demo purposes
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

/**
 * Demo users for different roles
 */
const demoUsers: Record<UserRole, UserProfile> = {
    admin: {
        id: "user_001",
        email: "cfo@vaultflow.com",
        fullName: "Sarah Johnson",
        avatarUrl: undefined,
        role: "admin",
        department: "Executive",
        createdAt: "2023-01-15T00:00:00Z",
        updatedAt: "2024-01-15T00:00:00Z",
    },
    editor: {
        id: "user_002",
        email: "accountant@vaultflow.com",
        fullName: "Mike Chen",
        avatarUrl: undefined,
        role: "editor",
        department: "Finance",
        createdAt: "2023-03-20T00:00:00Z",
        updatedAt: "2024-01-10T00:00:00Z",
    },
    viewer: {
        id: "user_003",
        email: "employee@vaultflow.com",
        fullName: "Lisa Park",
        avatarUrl: undefined,
        role: "viewer",
        department: "Engineering",
        createdAt: "2023-06-01T00:00:00Z",
        updatedAt: "2024-01-05T00:00:00Z",
    },
};

interface AuthProviderProps {
    children: React.ReactNode;
    defaultRole?: UserRole;
}

/**
 * Auth provider component
 * Uses demo authentication for showcasing RBAC
 */
export function AuthProvider({ children, defaultRole = "admin" }: AuthProviderProps) {
    const router = useRouter();
    const [state, setState] = React.useState<AuthState>({
        user: null,
        isLoading: true,
        isAuthenticated: false,
    });

    // Simulate auth check on mount
    React.useEffect(() => {
        const storedRole = localStorage.getItem("vaultflow-demo-role") as UserRole | null;
        const role = storedRole || defaultRole;

        // Simulate loading delay
        const timer = setTimeout(() => {
            setState({
                user: demoUsers[role],
                isLoading: false,
                isAuthenticated: true,
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [defaultRole]);

    const login = React.useCallback(async (email: string, _password: string) => {
        setState((prev) => ({ ...prev, isLoading: true }));

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Demo: Determine role from email
        let role: UserRole = "viewer";
        if (email.includes("cfo") || email.includes("admin")) {
            role = "admin";
        } else if (email.includes("accountant") || email.includes("editor")) {
            role = "editor";
        }

        localStorage.setItem("vaultflow-demo-role", role);

        setState({
            user: demoUsers[role],
            isLoading: false,
            isAuthenticated: true,
        });

        router.push("/dashboard");
    }, [router]);

    const logout = React.useCallback(async () => {
        setState((prev) => ({ ...prev, isLoading: true }));

        await new Promise((resolve) => setTimeout(resolve, 500));

        localStorage.removeItem("vaultflow-demo-role");

        setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
        });

        router.push("/");
    }, [router]);

    const checkPermission = React.useCallback(
        (permission: Permission) => {
            if (!state.user) return false;
            return hasPermission(state.user.role, permission);
        },
        [state.user]
    );

    // For demo: Switch between roles
    const switchRole = React.useCallback((role: UserRole) => {
        localStorage.setItem("vaultflow-demo-role", role);
        setState({
            user: demoUsers[role],
            isLoading: false,
            isAuthenticated: true,
        });
    }, []);

    const value: AuthContextValue = React.useMemo(
        () => ({
            ...state,
            login,
            logout,
            checkPermission,
            switchRole,
        }),
        [state, login, logout, checkPermission, switchRole]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth context
 */
export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

/**
 * Hook to check if current user has a permission
 */
export function usePermission(permission: Permission): boolean {
    const { checkPermission } = useAuth();
    return checkPermission(permission);
}

/**
 * Hook to get current user role
 */
export function useRole(): UserRole | null {
    const { user } = useAuth();
    return user?.role ?? null;
}
