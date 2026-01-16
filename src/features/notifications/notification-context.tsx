"use client";

import * as React from "react";
import { Notification, ApprovalRequest, ActivityEvent, NotificationType } from "@/types/notifications.types";

/**
 * Notification context for real-time updates
 * Uses simulated real-time for demo (would use Supabase Realtime in production)
 */

interface NotificationContextValue {
    notifications: Notification[];
    unreadCount: number;
    pendingApprovals: ApprovalRequest[];
    activityStream: ActivityEvent[];
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
    approveRequest: (id: string) => void;
    rejectRequest: (id: string) => void;
}

const NotificationContext = React.createContext<NotificationContextValue | null>(null);

// Demo data generators
const generateNotificationId = () => `notif_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const demoNotifications: Notification[] = [
    {
        id: "notif_001",
        type: "approval_request",
        title: "New Expense Approval",
        message: "Mike Chen requested approval for $3,500 conference travel",
        read: false,
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        actionUrl: "/dashboard/expenses",
    },
    {
        id: "notif_002",
        type: "vendor_added",
        title: "New Vendor Added",
        message: "Digital Marketing Pro was added to your vendor list",
        read: false,
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        actionUrl: "/dashboard/vendors",
    },
    {
        id: "notif_003",
        type: "transaction_alert",
        title: "Large Transaction Alert",
        message: "AWS charge of $2,450 processed",
        read: true,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
];

const demoPendingApprovals: ApprovalRequest[] = [
    {
        id: "approval_001",
        title: "Software License Renewal",
        amount: 1200,
        requestedBy: { id: "user_002", name: "Mike Chen", email: "mike@vaultflow.com" },
        department: "Engineering",
        status: "pending",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: "approval_002",
        title: "Conference Travel",
        amount: 3500,
        requestedBy: { id: "user_003", name: "Lisa Park", email: "lisa@vaultflow.com" },
        department: "Sales",
        status: "pending",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: "approval_003",
        title: "Equipment Purchase",
        amount: 850,
        requestedBy: { id: "user_002", name: "Mike Chen", email: "mike@vaultflow.com" },
        department: "Operations",
        status: "pending",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
];

const demoActivityStream: ActivityEvent[] = [
    {
        id: "activity_001",
        type: "expense_submitted",
        actor: { id: "user_002", name: "Mike Chen" },
        action: "submitted an expense",
        target: "Conference Travel - $3,500",
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    {
        id: "activity_002",
        type: "vendor_created",
        actor: { id: "user_001", name: "Sarah Johnson" },
        action: "added a new vendor",
        target: "Digital Marketing Pro",
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
        id: "activity_003",
        type: "approval_approved",
        actor: { id: "user_001", name: "Sarah Johnson" },
        action: "approved",
        target: "Software subscription - $499",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
];

interface NotificationProviderProps {
    children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
    const [notifications, setNotifications] = React.useState<Notification[]>(demoNotifications);
    const [pendingApprovals, setPendingApprovals] = React.useState<ApprovalRequest[]>(demoPendingApprovals);
    const [activityStream, setActivityStream] = React.useState<ActivityEvent[]>(demoActivityStream);

    // Simulate real-time notifications every 30 seconds
    React.useEffect(() => {
        const interval = setInterval(() => {
            // Randomly add a new notification (30% chance)
            if (Math.random() < 0.3) {
                const types: NotificationType[] = ["approval_request", "transaction_alert", "vendor_added"];
                const type = types[Math.floor(Math.random() * types.length)];

                const messages: Record<NotificationType, { title: string; message: string }> = {
                    approval_request: {
                        title: "New Expense Approval",
                        message: `New expense request for $${(Math.random() * 2000 + 100).toFixed(0)}`,
                    },
                    transaction_alert: {
                        title: "Transaction Processed",
                        message: `Payment of $${(Math.random() * 5000 + 500).toFixed(0)} completed`,
                    },
                    vendor_added: {
                        title: "Vendor Update",
                        message: "A vendor profile was updated",
                    },
                    approval_approved: { title: "", message: "" },
                    approval_rejected: { title: "", message: "" },
                    team_invite: { title: "", message: "" },
                    system: { title: "", message: "" },
                };

                const newNotification: Notification = {
                    id: generateNotificationId(),
                    type,
                    title: messages[type].title,
                    message: messages[type].message,
                    read: false,
                    createdAt: new Date().toISOString(),
                };

                setNotifications((prev) => [newNotification, ...prev].slice(0, 20));
            }
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const unreadCount = React.useMemo(
        () => notifications.filter((n) => !n.read).length,
        [notifications]
    );

    const markAsRead = React.useCallback((id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    }, []);

    const markAllAsRead = React.useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }, []);

    const addNotification = React.useCallback(
        (notification: Omit<Notification, "id" | "createdAt" | "read">) => {
            const newNotification: Notification = {
                ...notification,
                id: generateNotificationId(),
                createdAt: new Date().toISOString(),
                read: false,
            };
            setNotifications((prev) => [newNotification, ...prev].slice(0, 20));
        },
        []
    );

    const approveRequest = React.useCallback((id: string) => {
        setPendingApprovals((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status: "approved" as const, updatedAt: new Date().toISOString() } : a))
        );

        // Add activity
        const approval = pendingApprovals.find((a) => a.id === id);
        if (approval) {
            setActivityStream((prev) => [
                {
                    id: `activity_${Date.now()}`,
                    type: "approval_approved",
                    actor: { id: "user_001", name: "You" },
                    action: "approved",
                    target: `${approval.title} - $${approval.amount}`,
                    timestamp: new Date().toISOString(),
                },
                ...prev,
            ].slice(0, 20));
        }
    }, [pendingApprovals]);

    const rejectRequest = React.useCallback((id: string) => {
        setPendingApprovals((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status: "rejected" as const, updatedAt: new Date().toISOString() } : a))
        );
    }, []);

    const value: NotificationContextValue = React.useMemo(
        () => ({
            notifications,
            unreadCount,
            pendingApprovals: pendingApprovals.filter((a) => a.status === "pending"),
            activityStream,
            markAsRead,
            markAllAsRead,
            addNotification,
            approveRequest,
            rejectRequest,
        }),
        [notifications, unreadCount, pendingApprovals, activityStream, markAsRead, markAllAsRead, addNotification, approveRequest, rejectRequest]
    );

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = React.useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications must be used within NotificationProvider");
    }
    return context;
}
