"use client";

import * as React from "react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
        const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        const newToast: Toast = { ...toast, id };

        setToasts((prev) => [...prev, newToast]);

        // Auto-remove after duration
        const duration = toast.duration ?? 5000;
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
}

// Toast container
function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onRemove={() => onRemove(toast.id)} />
            ))}
        </div>
    );
}

// Individual toast
function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
    const icons: Record<ToastType, React.ReactNode> = {
        success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        error: <AlertCircle className="h-5 w-5 text-red-500" />,
        warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
        info: <Info className="h-5 w-5 text-blue-500" />,
    };

    const colors: Record<ToastType, string> = {
        success: "border-green-500/30 bg-green-500/10",
        error: "border-red-500/30 bg-red-500/10",
        warning: "border-yellow-500/30 bg-yellow-500/10",
        info: "border-blue-500/30 bg-blue-500/10",
    };

    return (
        <div
            className={cn(
                "flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-in slide-in-from-right-5 bg-card",
                colors[toast.type]
            )}
        >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{toast.title}</p>
                {toast.message && (
                    <p className="text-xs text-muted-foreground mt-1">{toast.message}</p>
                )}
            </div>
            <button
                onClick={onRemove}
                className="text-muted-foreground hover:text-foreground transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
