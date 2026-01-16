"use client";

import * as React from "react";
import { useAuth } from "./auth-context";
import { UserRole, getRoleDisplayName } from "@/types/auth.types";
import { Button, Badge, Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Shield, ChevronDown, Check } from "lucide-react";

/**
 * Role switcher component for demo purposes
 * Allows switching between Admin, Editor, and Viewer roles
 */
export function RoleSwitcher() {
    const { user, switchRole } = useAuth();
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const roles: UserRole[] = ["admin", "editor", "viewer"];

    // Close dropdown on outside click
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    const roleColors: Record<UserRole, string> = {
        admin: "bg-red-500/10 text-red-500 border-red-500/20",
        editor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        viewer: "bg-green-500/10 text-green-500 border-green-500/20",
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="gap-2"
            >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Role:</span>
                <Badge
                    variant="outline"
                    className={cn("text-xs capitalize", roleColors[user.role])}
                >
                    {user.role}
                </Badge>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50 p-2">
                    <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase">
                        Switch Demo Role
                    </div>
                    {roles.map((role) => (
                        <button
                            key={role}
                            onClick={() => {
                                switchRole(role);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-2 py-2 rounded-md text-left transition-colors",
                                user.role === role
                                    ? "bg-accent"
                                    : "hover:bg-accent/50"
                            )}
                        >
                            <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold",
                                roleColors[role]
                            )}>
                                {role[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm capitalize">{role}</p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {getRoleDisplayName(role)}
                                </p>
                            </div>
                            {user.role === role && (
                                <Check className="h-4 w-4 text-primary" />
                            )}
                        </button>
                    ))}
                    <div className="mt-2 px-2 py-1.5 text-xs text-muted-foreground border-t border-border">
                        Switching roles updates permissions in real-time
                    </div>
                </div>
            )}
        </div>
    );
}
