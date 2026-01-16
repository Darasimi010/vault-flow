/**
 * Notification types for VaultFlow real-time features
 */

export type NotificationType =
    | "approval_request"
    | "approval_approved"
    | "approval_rejected"
    | "transaction_alert"
    | "vendor_added"
    | "team_invite"
    | "system";

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    actionUrl?: string;
    metadata?: Record<string, unknown>;
}

export interface ApprovalRequest {
    id: string;
    title: string;
    amount: number;
    requestedBy: {
        id: string;
        name: string;
        email: string;
    };
    department: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    updatedAt: string;
}

export interface ActivityEvent {
    id: string;
    type: string;
    actor: {
        id: string;
        name: string;
    };
    action: string;
    target?: string;
    timestamp: string;
    metadata?: Record<string, unknown>;
}
