import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRole } from "@/types";

interface User {
    id: string;
    email: string;
    fullName: string | null;
    avatarUrl: string | null;
    role: UserRole;
}

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: true,
            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user,
                    isLoading: false,
                }),
            setLoading: (loading) => set({ isLoading: loading }),
            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                }),
        }),
        {
            name: "vaultflow-user",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

/**
 * Check if user has required role
 */
export function hasRole(user: User | null, roles: UserRole[]): boolean {
    if (!user) return false;
    return roles.includes(user.role);
}

/**
 * Check if user can perform action based on role hierarchy
 * admin > editor > viewer
 */
export function canPerform(
    user: User | null,
    requiredRole: UserRole
): boolean {
    if (!user) return false;

    const roleHierarchy: Record<UserRole, number> = {
        admin: 3,
        editor: 2,
        viewer: 1,
    };

    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}
