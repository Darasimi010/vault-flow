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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useSidebarStore } from "@/stores";
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
    },
    {
        title: "Reports",
        href: "/dashboard/reports",
        icon: FileBarChart,
        roles: ["admin", "editor"],
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
                {navItems.map((item) => {
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
                                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/20 px-1.5 text-xs font-medium text-primary">
                                    {item.badge}
                                </span>
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

            {/* Footer */}
            {!isCollapsed && (
                <div className="border-t border-border p-4">
                    <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-3">
                        <p className="text-xs font-medium text-muted-foreground">
                            VaultFlow Pro
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground/70">
                            Upgrade for advanced analytics
                        </p>
                        <Button size="sm" className="mt-3 w-full text-xs">
                            Upgrade Now
                        </Button>
                    </div>
                </div>
            )}
        </aside>
    );
}
