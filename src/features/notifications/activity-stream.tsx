"use client";

import * as React from "react";
import { Activity, User, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useNotifications } from "./notification-context";
import { cn } from "@/lib/utils";

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

interface ActivityStreamProps {
    className?: string;
    maxItems?: number;
}

export function ActivityStream({ className, maxItems = 10 }: ActivityStreamProps) {
    const { activityStream } = useNotifications();

    return (
        <Card className={className}>
            <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Live Activity
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />

                    <div className="space-y-4">
                        {activityStream.slice(0, maxItems).map((event, index) => (
                            <div key={event.id} className="relative flex gap-3 pl-8">
                                {/* Timeline dot */}
                                <div className={cn(
                                    "absolute left-1.5 h-3 w-3 rounded-full border-2 border-background",
                                    index === 0 ? "bg-primary" : "bg-muted"
                                )} />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{event.actor.name}</span>
                                        <span className="text-sm text-muted-foreground">{event.action}</span>
                                    </div>
                                    {event.target && (
                                        <p className="text-sm text-muted-foreground truncate">
                                            {event.target}
                                        </p>
                                    )}
                                    <p className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-1">
                                        <Clock className="h-3 w-3" />
                                        {formatRelativeTime(event.timestamp)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
