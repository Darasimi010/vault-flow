"use client";

import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    Receipt,
    ArrowUpRight,
    ArrowDownRight,
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
} from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";

// Demo data for the dashboard
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

const recentTransactions = [
    {
        id: "1",
        vendor: "Amazon Web Services",
        category: "Cloud Services",
        amount: -2450.0,
        date: "2024-01-15",
        status: "completed",
    },
    {
        id: "2",
        vendor: "Stripe Payments",
        category: "Payment Processing",
        amount: 12500.0,
        date: "2024-01-14",
        status: "completed",
    },
    {
        id: "3",
        vendor: "Office Supplies Co",
        category: "Office Expenses",
        amount: -385.5,
        date: "2024-01-13",
        status: "pending",
    },
    {
        id: "4",
        vendor: "Marketing Agency",
        category: "Marketing",
        amount: -5200.0,
        date: "2024-01-12",
        status: "completed",
    },
    {
        id: "5",
        vendor: "Client Payment",
        category: "Revenue",
        amount: 8750.0,
        date: "2024-01-11",
        status: "completed",
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
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    CFO Command Center
                </h1>
                <p className="text-muted-foreground">
                    Welcome back! Here&apos;s an overview of your financial health.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    const isPositive = stat.trend === "up";

                    return (
                        <Card key={stat.title} className="relative overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Icon className="h-4 w-4 text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stat.isCurrency === false
                                        ? stat.value
                                        : formatCurrency(stat.value)}
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    {isPositive ? (
                                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                                    )}
                                    <span
                                        className={cn(
                                            "text-xs font-medium",
                                            isPositive ? "text-green-500" : "text-red-500"
                                        )}
                                    >
                                        {Math.abs(stat.change)}
                                        {stat.isCurrency !== false && "%"}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {stat.description}
                                    </span>
                                </div>
                            </CardContent>
                            {/* Decorative gradient */}
                            <div
                                className={cn(
                                    "absolute bottom-0 left-0 right-0 h-1",
                                    isPositive
                                        ? "bg-gradient-to-r from-green-500/50 to-green-500/0"
                                        : "bg-gradient-to-r from-red-500/50 to-red-500/0"
                                )}
                            />
                        </Card>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Transactions */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Transactions</CardTitle>
                            <CardDescription>
                                Your latest financial activities
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                "h-10 w-10 rounded-full flex items-center justify-center",
                                                transaction.amount > 0
                                                    ? "bg-green-500/10"
                                                    : "bg-red-500/10"
                                            )}
                                        >
                                            {transaction.amount > 0 ? (
                                                <TrendingUp className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <TrendingDown className="h-5 w-5 text-red-500" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{transaction.vendor}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {transaction.category}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p
                                            className={cn(
                                                "font-semibold text-sm",
                                                transaction.amount > 0
                                                    ? "text-green-500"
                                                    : "text-foreground"
                                            )}
                                        >
                                            {transaction.amount > 0 ? "+" : ""}
                                            {formatCurrency(transaction.amount)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Pending Approvals */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Pending Approvals</CardTitle>
                            <CardDescription>Expenses awaiting review</CardDescription>
                        </div>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                            {pendingApprovals.length}
                        </span>
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
