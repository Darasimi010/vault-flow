"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Wallet,
    Receipt,
    Users,
    FileBarChart,
    Settings,
    ChevronLeft,
    CreditCard,
    UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, Badge } from "@/components/ui";
import { useSidebarStore } from "@/stores";
import { useAuth } from "@/features/auth";
import { canAccessRoute } from "@/types/auth.types";
import type { NavItem } from "@/types";

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Cash Flow",
        href: "/dashboard/cash-flow",
        icon: Wallet,
        roles: ["admin", "editor"], // Viewers can't see cash flow
    },
    {
        title: "Expenses",
        href: "/dashboard/expenses",
        icon: Receipt,
    },
    {
        title: "Vendors",
        href: "/dashboard/vendors",
        icon: Users,
        roles: ["admin", "editor"],
    },
    {
        title: "Reports",
        href: "/dashboard/reports",
        icon: FileBarChart,
        roles: ["admin", "editor"],
    },
    {
        title: "Team",
        href: "/dashboard/team",
        icon: UsersRound,
        roles: ["admin"], // Only admins can manage team
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { isCollapsed, toggleCollapsed } = useSidebarStore();
    const { user, isLoading } = useAuth();

    // Filter nav items based on user role
    const accessibleNavItems = React.useMemo(() => {
        if (!user) return [];
        return navItems.filter((item) => canAccessRoute(user.role, item.roles));
    }, [user]);

    // Show minimal skeleton while loading
    if (isLoading || !user) {
        return (
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300 ease-in-out hidden md:flex flex-col",
                    isCollapsed ? "w-[70px]" : "w-[260px]"
                )}
            >
                <div className="flex h-16 items-center border-b border-border px-4">
                    <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
                </div>
                <nav className="flex-1 space-y-2 p-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-10 bg-muted/50 rounded-lg animate-pulse" />
                    ))}
                </nav>
            </aside>
        );
    }

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300 ease-in-out hidden md:flex flex-col",
                isCollapsed ? "w-[70px]" : "w-[260px]"
            )}
        >
            {/* Logo */}
            <div
                className={cn(
                    "flex h-16 items-center border-b border-border px-4",
                    isCollapsed ? "justify-center" : "justify-between"
                )}
            >
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 font-bold text-xl"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                        <CreditCard className="h-4 w-4" />
                    </div>
                    {!isCollapsed && (
                        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            VaultFlow
                        </span>
                    )}
                </Link>
                {!isCollapsed && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={toggleCollapsed}
                        aria-label="Collapse sidebar"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
                {accessibleNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                isCollapsed && "justify-center px-2"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                                    isActive && "text-primary-foreground"
                                )}
                            />
                            {!isCollapsed && <span>{item.title}</span>}
                            {!isCollapsed && item.badge && (
                                <Badge variant="secondary" className="ml-auto text-xs">
                                    {item.badge}
                                </Badge>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Expand button when collapsed */}
            {isCollapsed && (
                <div className="border-t border-border p-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-full h-10"
                        onClick={toggleCollapsed}
                        aria-label="Expand sidebar"
                    >
                        <ChevronLeft className="h-4 w-4 rotate-180" />
                    </Button>
                </div>
            )}

            {/* Footer with role indicator */}
            {!isCollapsed && (
                <div className="border-t border-border p-4">
                    <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-3">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs capitalize">
                                {user.role}
                            </Badge>
                            <span className="text-xs text-muted-foreground">Mode</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground/70">
                            {user.role === "admin" && "Full access to all features"}
                            {user.role === "editor" && "View & edit, no approvals"}
                            {user.role === "viewer" && "View own data only"}
                        </p>
                    </div>
                </div>
            )}
        </aside>
    );
}
