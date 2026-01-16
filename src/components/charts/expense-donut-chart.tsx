"use client";

import * as React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { ExpenseCategory } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

interface ExpenseDonutChartProps {
    data: ExpenseCategory[];
    isLoading?: boolean;
    className?: string;
}

// Chart data format
interface ChartData {
    category: string;
    amount: number;
    percentage: number;
    color: string;
}

export function ExpenseDonutChart({
    data,
    isLoading = false,
    className,
}: ExpenseDonutChartProps) {
    if (isLoading) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle>Expense Breakdown</CardTitle>
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

    const total = data.reduce((sum, item) => sum + item.amount, 0);

    // Convert data to chart format
    const chartData: ChartData[] = data.map((item) => ({
        category: item.category,
        amount: item.amount,
        percentage: item.percentage,
        color: item.color,
    }));

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>
                    Distribution by category • Total: {formatCurrency(total)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                innerRadius={60}
                                fill="#8884d8"
                                dataKey="amount"
                                nameKey="category"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => formatCurrency(value)}
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "8px",
                                }}
                            />
                            <Legend
                                layout="horizontal"
                                verticalAlign="bottom"
                                align="center"
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{ paddingTop: "16px" }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
