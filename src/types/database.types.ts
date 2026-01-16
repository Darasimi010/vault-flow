/**
 * Database types for Supabase
 * These types should be generated using: npx supabase gen types typescript
 * For now, we'll define placeholder types that can be extended
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

/**
 * User roles for RBAC
 */
export type UserRole = "admin" | "editor" | "viewer";

/**
 * Database schema types (placeholder - generate with Supabase CLI)
 */
export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    full_name: string | null;
                    avatar_url: string | null;
                    role: UserRole;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id: string;
                    email: string;
                    full_name?: string | null;
                    avatar_url?: string | null;
                    role?: UserRole;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    email?: string;
                    full_name?: string | null;
                    avatar_url?: string | null;
                    role?: UserRole;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            vendors: {
                Row: {
                    id: string;
                    name: string;
                    email: string;
                    phone: string | null;
                    address: string | null;
                    category: string;
                    status: "pending" | "active" | "inactive";
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    email: string;
                    phone?: string | null;
                    address?: string | null;
                    category: string;
                    status?: "pending" | "active" | "inactive";
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    email?: string;
                    phone?: string | null;
                    address?: string | null;
                    category?: string;
                    status?: "pending" | "active" | "inactive";
                    created_at?: string;
                    updated_at?: string;
                };
            };
            expenses: {
                Row: {
                    id: string;
                    vendor_id: string | null;
                    category: string;
                    amount: number;
                    description: string | null;
                    date: string;
                    status: "pending" | "approved" | "rejected";
                    created_by: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    vendor_id?: string | null;
                    category: string;
                    amount: number;
                    description?: string | null;
                    date: string;
                    status?: "pending" | "approved" | "rejected";
                    created_by: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    vendor_id?: string | null;
                    category?: string;
                    amount?: number;
                    description?: string | null;
                    date?: string;
                    status?: "pending" | "approved" | "rejected";
                    created_by?: string;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            transactions: {
                Row: {
                    id: string;
                    type: "income" | "expense";
                    amount: number;
                    description: string | null;
                    category: string;
                    date: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    type: "income" | "expense";
                    amount: number;
                    description?: string | null;
                    category: string;
                    date: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    type?: "income" | "expense";
                    amount?: number;
                    description?: string | null;
                    category?: string;
                    date?: string;
                    created_at?: string;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            user_role: UserRole;
        };
    };
}
