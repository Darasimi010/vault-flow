"use client";

import * as React from "react";
import Link from "next/link";
import {
    Bell,
    Search,
    ChevronRight,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { Button, Avatar } from "@/components/ui";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { useSidebarStore, useUserStore } from "@/stores";
import type { BreadcrumbItem } from "@/types";

interface HeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function Header({ breadcrumbs = [] }: HeaderProps) {
    const { isCollapsed } = useSidebarStore();
    const { user } = useUserStore();

    // Demo user for UI display
    const displayUser = user || {
        fullName: "John Doe",
        email: "john@vaultflow.com",
        role: "admin" as const,
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 transition-all duration-300",
                isCollapsed ? "md:pl-[86px]" : "md:pl-[276px]"
            )}
        >
            {/* Mobile nav trigger */}
            <MobileNav />

            {/* Breadcrumbs */}
            <nav className="hidden md:flex items-center gap-1 text-sm">
                <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                >
                    Home
                </Link>
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.label}>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                        {crumb.href ? (
                            <Link
                                href={crumb.href}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="text-foreground font-medium">{crumb.label}</span>
                        )}
                    </React.Fragment>
                ))}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search */}
            <Button
                variant="outline"
                className="hidden md:flex w-64 justify-start text-muted-foreground"
            >
                <Search className="mr-2 h-4 w-4" />
                <span>Search...</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <ThemeToggle />

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1 right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                </Button>

                {/* User menu */}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-9 w-9 rounded-full p-0"
                        >
                            <Avatar
                                size="sm"
                                fallback={displayUser.fullName || "User"}
                                alt={displayUser.fullName || "User avatar"}
                            />
                        </Button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className="z-50 min-w-[220px] overflow-hidden rounded-lg border border-border bg-card p-1 shadow-lg animate-in fade-in-0 zoom-in-95"
                            align="end"
                            sideOffset={8}
                        >
                            <div className="px-3 py-2 border-b border-border mb-1">
                                <p className="text-sm font-medium">{displayUser.fullName}</p>
                                <p className="text-xs text-muted-foreground">
                                    {displayUser.email}
                                </p>
                                <span className="inline-flex mt-1 items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary capitalize">
                                    {displayUser.role}
                                </span>
                            </div>

                            <DropdownMenu.Item className="flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                                Profile
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                                Settings
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                                Billing
                            </DropdownMenu.Item>

                            <DropdownMenu.Separator className="my-1 h-px bg-border" />

                            <DropdownMenu.Item className="flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-destructive outline-none transition-colors hover:bg-destructive/10">
                                Log out
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </header>
    );
}
