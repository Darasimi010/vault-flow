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
    Menu,
    X,
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
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function MobileNav() {
    const pathname = usePathname();
    const { isMobileOpen, toggleMobileOpen, setMobileOpen } = useSidebarStore();

    // Close mobile nav on route change
    React.useEffect(() => {
        setMobileOpen(false);
    }, [pathname, setMobileOpen]);

    return (
        <>
            {/* Mobile menu trigger */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMobileOpen}
                aria-label="Toggle menu"
            >
                <Menu className="h-5 w-5" />
            </Button>

            {/* Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Slide-out drawer */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-[280px] bg-card border-r border-border shadow-xl transition-transform duration-300 ease-in-out md:hidden",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex h-16 items-center justify-between border-b border-border px-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 font-bold text-xl"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                            <CreditCard className="h-4 w-4" />
                        </div>
                        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            VaultFlow
                        </span>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <Icon className="h-5 w-5 shrink-0" />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
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
            </aside>
        </>
    );
}
