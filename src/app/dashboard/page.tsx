"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    TrendingUp,
    DollarSign,
    Users,
    Receipt,
    MoreHorizontal,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Button,
    Avatar,
    DataCard,
    Badge,
} from "@/components/ui";
import { CashFlowChart, ExpenseDonutChart } from "@/components/charts";
import { TransactionsTable } from "@/components/tables";
import { cn, formatCurrency } from "@/lib/utils";
import {
    mockCashFlowData,
    mockExpenseCategories,
    mockTransactions,
} from "@/lib/api";

// Time range options for charts
type TimeRange = "7d" | "30d" | "90d" | "ytd";

const timeRangeOptions: { value: TimeRange; label: string }[] = [
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "ytd", label: "YTD" },
];

// Demo stats data
const stats = [
    {
        title: "Total Balance",
        value: 284500.0,
        change: 12.5,
        trend: "up" as const,
        icon: DollarSign,
        description: "Across all accounts",
    },
    {
        title: "Monthly Revenue",
        value: 48250.0,
        change: 8.2,
        trend: "up" as const,
        icon: TrendingUp,
        description: "vs last month",
    },
    {
        title: "Monthly Expenses",
        value: 32180.0,
        change: -3.1,
        trend: "down" as const,
        icon: Receipt,
        description: "vs last month",
    },
    {
        title: "Active Vendors",
        value: 24,
        change: 2,
        trend: "up" as const,
        icon: Users,
        description: "New this month",
        isCurrency: false,
    },
];

const pendingApprovals = [
    {
        id: "1",
        title: "Software License Renewal",
        amount: 1200.0,
        requestedBy: "Sarah Johnson",
        department: "Engineering",
    },
    {
        id: "2",
        title: "Conference Travel",
        amount: 3500.0,
        requestedBy: "Mike Chen",
        department: "Sales",
    },
    {
        id: "3",
        title: "Equipment Purchase",
        amount: 850.0,
        requestedBy: "Lisa Park",
        department: "Operations",
    },
];

export default function DashboardPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get time range from URL or default to 30d
    const timeRange = (searchParams.get("range") as TimeRange) || "30d";

    // Handle time range change
    const handleTimeRangeChange = (range: TimeRange) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("range", range);
        router.push(`/dashboard?${params.toString()}`);
    };

    // Filter cash flow data based on time range
    const filteredCashFlowData = React.useMemo(() => {
        const days =
            timeRange === "7d"
                ? 7
                : timeRange === "30d"
                    ? 30
                    : timeRange === "90d"
                        ? 90
                        : 365;
        return mockCashFlowData.slice(-Math.min(days, mockCashFlowData.length));
    }, [timeRange]);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        CFO Command Center
                    </h1>
                    <p className="text-muted-foreground">
                        Welcome back! Here&apos;s an overview of your financial health.
                    </p>
                </div>

                {/* Time Range Selector */}
                <div className="flex gap-1 p-1 bg-muted rounded-lg">
                    {timeRangeOptions.map((option) => (
                        <Button
                            key={option.value}
                            variant={timeRange === option.value ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handleTimeRangeChange(option.value)}
                            className={cn(
                                "text-xs",
                                timeRange === option.value && "shadow-sm"
                            )}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <DataCard
                            key={stat.title}
                            title={stat.title}
                            value={
                                stat.isCurrency === false
                                    ? stat.value
                                    : formatCurrency(stat.value)
                            }
                            trend={{
                                value: Math.abs(stat.change),
                                direction: stat.trend === "up" ? "up" : "down",
                            }}
                            description={stat.description}
                            icon={<Icon className="h-4 w-4 text-primary" />}
                        />
                    );
                })}
            </div>

            {/* Charts Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                <CashFlowChart data={filteredCashFlowData} />
                <ExpenseDonutChart data={mockExpenseCategories} />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Transactions Table */}
                <div className="lg:col-span-2">
                    <TransactionsTable data={mockTransactions.slice(0, 50)} />
                </div>

                {/* Pending Approvals */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Pending Approvals</CardTitle>
                            <CardDescription>Expenses awaiting review</CardDescription>
                        </div>
                        <Badge variant="default">{pendingApprovals.length}</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {pendingApprovals.map((approval) => (
                                <div
                                    key={approval.id}
                                    className="flex items-start justify-between p-3 rounded-lg border border-border"
                                >
                                    <div className="flex items-start gap-3">
                                        <Avatar
                                            size="sm"
                                            fallback={approval.requestedBy}
                                            alt={approval.requestedBy}
                                        />
                                        <div>
                                            <p className="font-medium text-sm">{approval.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {approval.requestedBy} • {approval.department}
                                            </p>
                                            <p className="font-semibold text-sm mt-1">
                                                {formatCurrency(approval.amount)}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                            Review All Approvals
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks you can perform</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                            <Receipt className="h-5 w-5" />
                            <span>New Expense</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                            <Users className="h-5 w-5" />
                            <span>Add Vendor</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                            <DollarSign className="h-5 w-5" />
                            <span>Transfer Funds</span>
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                            <TrendingUp className="h-5 w-5" />
                            <span>View Reports</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
