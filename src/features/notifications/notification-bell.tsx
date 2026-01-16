"use client";

import * as React from "react";
import { Bell, Check, CheckCheck, X } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { useNotifications } from "./notification-context";
import { cn } from "@/lib/utils";
import { Notification } from "@/types/notifications.types";

// Format relative time
function formatRelativeTime(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
}

// Notification type icons/colors
const notificationConfig: Record<string, { icon: string; color: string }> = {
    approval_request: { icon: "📋", color: "bg-yellow-500/10 text-yellow-500" },
    approval_approved: { icon: "✅", color: "bg-green-500/10 text-green-500" },
    approval_rejected: { icon: "❌", color: "bg-red-500/10 text-red-500" },
    transaction_alert: { icon: "💰", color: "bg-blue-500/10 text-blue-500" },
    vendor_added: { icon: "🏢", color: "bg-purple-500/10 text-purple-500" },
    team_invite: { icon: "👋", color: "bg-indigo-500/10 text-indigo-500" },
    system: { icon: "⚙️", color: "bg-gray-500/10 text-gray-500" },
};

export function NotificationBell() {
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Close on outside click
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex items-center justify-center h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    </span>
                )}
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold">Notifications</h3>
                            {unreadCount > 0 && (
                                <Badge variant="default" size="sm">{unreadCount}</Badge>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                                onClick={markAllAsRead}
                            >
                                <CheckCheck className="h-3 w-3 mr-1" />
                                Mark all read
                            </Button>
                        )}
                    </div>

                    {/* Notification list */}
                    <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            notifications.slice(0, 10).map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onMarkAsRead={() => markAsRead(notification.id)}
                                />
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="border-t border-border p-2">
                            <Button variant="ghost" size="sm" className="w-full text-xs">
                                View all notifications
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead: () => void;
}

function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
    const config = notificationConfig[notification.type] || notificationConfig.system;

    return (
        <div
            className={cn(
                "flex items-start gap-3 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer border-b border-border last:border-0",
                !notification.read && "bg-primary/5"
            )}
            onClick={onMarkAsRead}
        >
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-sm", config.color)}>
                {config.icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                    {formatRelativeTime(notification.createdAt)}
                </p>
            </div>
            {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
            )}
        </div>
    );
}
