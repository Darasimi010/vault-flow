/**
 * Authentication and RBAC types for VaultFlow
 */

/**
 * User roles with increasing permissions
 * - viewer: Can only view their own data and request funds
 * - editor: Can view all data, edit categories, but cannot approve money movement
 * - admin: Full access - view all, approve transactions, manage users
 */
export type UserRole = "admin" | "editor" | "viewer";

/**
 * Permission actions that can be performed in the app
 */
export type Permission =
    | "view:own"           // View own data only
    | "view:all"           // View all company data
    | "edit:categories"    // Edit transaction categories
    | "approve:transactions" // Approve large transactions
    | "manage:users"       // Manage team members
    | "manage:vendors"     // Add/edit vendors
    | "export:reports"     // Export financial reports
    | "settings:company";  // Modify company settings

/**
 * Role-based permission mapping
 */
export const rolePermissions: Record<UserRole, Permission[]> = {
    viewer: [
        "view:own",
    ],
    editor: [
        "view:own",
        "view:all",
        "edit:categories",
        "manage:vendors",
        "export:reports",
    ],
    admin: [
        "view:own",
        "view:all",
        "edit:categories",
        "approve:transactions",
        "manage:users",
        "manage:vendors",
        "export:reports",
        "settings:company",
    ],
};

/**
 * User profile with role
 */
export interface UserProfile {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    role: UserRole;
    department?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Auth state
 */
export interface AuthState {
    user: UserProfile | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

/**
 * Team member for team management
 */
export interface TeamMember extends UserProfile {
    status: "active" | "invited" | "disabled";
    lastLoginAt?: string;
}

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
    return rolePermissions[role]?.includes(permission) ?? false;
}

/**
 * Check if a role can access a route based on allowed roles
 */
export function canAccessRoute(
    userRole: UserRole,
    allowedRoles?: UserRole[]
): boolean {
    if (!allowedRoles || allowedRoles.length === 0) {
        return true; // No restrictions
    }
    return allowedRoles.includes(userRole);
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: UserRole): string {
    const names: Record<UserRole, string> = {
        admin: "Administrator (CFO)",
        editor: "Editor (Accountant)",
        viewer: "Viewer (Employee)",
    };
    return names[role];
}
