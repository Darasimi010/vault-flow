import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    hasPermission,
    canAccessRoute,
    getRoleDisplayName,
    rolePermissions,
    UserRole,
    Permission,
} from "@/types/auth.types";

describe("Auth Types and Utilities", () => {
    describe("hasPermission", () => {
        it("returns true when admin has permission", () => {
            expect(hasPermission("admin", "manage:users")).toBe(true);
            expect(hasPermission("admin", "approve:transactions")).toBe(true);
            expect(hasPermission("admin", "view:all")).toBe(true);
        });

        it("returns false when viewer tries admin-only permission", () => {
            expect(hasPermission("viewer", "manage:users")).toBe(false);
            expect(hasPermission("viewer", "approve:transactions")).toBe(false);
        });

        it("returns true when viewer has basic permission", () => {
            expect(hasPermission("viewer", "view:own")).toBe(true);
        });

        it("returns correct permissions for editor role", () => {
            expect(hasPermission("editor", "view:all")).toBe(true);
            expect(hasPermission("editor", "edit:categories")).toBe(true);
            expect(hasPermission("editor", "manage:vendors")).toBe(true);
            // Editor should NOT have approval permission
            expect(hasPermission("editor", "approve:transactions")).toBe(false);
        });
    });

    describe("canAccessRoute", () => {
        it("returns true when no roles are specified", () => {
            expect(canAccessRoute("viewer", undefined)).toBe(true);
            expect(canAccessRoute("viewer", [])).toBe(true);
        });

        it("returns true when user role is in allowed list", () => {
            expect(canAccessRoute("admin", ["admin"])).toBe(true);
            expect(canAccessRoute("editor", ["admin", "editor"])).toBe(true);
        });

        it("returns false when user role is not in allowed list", () => {
            expect(canAccessRoute("viewer", ["admin"])).toBe(false);
            expect(canAccessRoute("viewer", ["admin", "editor"])).toBe(false);
        });
    });

    describe("getRoleDisplayName", () => {
        it("returns correct display names", () => {
            expect(getRoleDisplayName("admin")).toBe("Administrator (CFO)");
            expect(getRoleDisplayName("editor")).toBe("Editor (Accountant)");
            expect(getRoleDisplayName("viewer")).toBe("Viewer (Employee)");
        });
    });

    describe("rolePermissions mapping", () => {
        it("admin has most permissions", () => {
            expect(rolePermissions.admin.length).toBeGreaterThan(rolePermissions.editor.length);
            expect(rolePermissions.editor.length).toBeGreaterThan(rolePermissions.viewer.length);
        });

        it("viewer has minimum permissions", () => {
            expect(rolePermissions.viewer).toEqual(["view:own"]);
        });
    });
});
