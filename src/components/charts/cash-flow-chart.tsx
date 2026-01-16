"use client";

import * as React from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Area,
    AreaChart,
    Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { CashFlowData } from "@/lib/api";

interface CashFlowChartProps {
    data: CashFlowData[];
    isLoading?: boolean;
    className?: string;
    showNetFlow?: boolean;
}

// Format date for display
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Format currency for tooltip
const formatTooltipCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export function CashFlowChart({
    data,
    isLoading = false,
    className,
    showNetFlow = true,
}: CashFlowChartProps) {
    if (isLoading) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle>Cash Flow Trends</CardTitle>
                    <CardDescription>Loading chart data...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-pulse text-muted-foreground">
                            Loading...
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Cash Flow Trends</CardTitle>
                <CardDescription>
                    Daily cash in vs cash out for the selected period
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorCashIn" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorCashOut" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="hsl(var(--border))"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="date"
                                tickFormatter={formatDate}
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                formatter={(value) => formatTooltipCurrency(value as number)}
                                labelFormatter={(label) => formatDate(label as string)}
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "8px",
                                }}
                            />
                            <Legend
                                wrapperStyle={{ paddingTop: "20px" }}
                                iconType="circle"
                            />
                            <Area
                                type="monotone"
                                dataKey="cashIn"
                                name="Cash In"
                                stroke="#22c55e"
                                strokeWidth={2}
                                fill="url(#colorCashIn)"
                            />
                            <Area
                                type="monotone"
                                dataKey="cashOut"
                                name="Cash Out"
                                stroke="#ef4444"
                                strokeWidth={2}
                                fill="url(#colorCashOut)"
                            />
                            {showNetFlow && (
                                <Line
                                    type="monotone"
                                    dataKey="netFlow"
                                    name="Net Flow"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
