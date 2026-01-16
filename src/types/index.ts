/**
 * Global type definitions for VaultFlow
 */

export * from "./database.types";

/**
 * Navigation item type for sidebar
 */
export interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    disabled?: boolean;
    roles?: ("admin" | "editor" | "viewer")[];
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
    label: string;
    href?: string;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

/**
 * Pagination params
 */
export interface PaginationParams {
    page: number;
    pageSize: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
