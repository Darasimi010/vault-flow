"use client";

import {
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    Building2,
    TrendingUp,
    TrendingDown,
    ArrowRightLeft,
    MoreHorizontal,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Button,
} from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";

// Demo data for cash flow
const cashFlowStats = [
    {
        title: "Cash In (MTD)",
        value: 125800.0,
        change: 15.3,
        trend: "up" as const,
        icon: ArrowUpRight,
        iconBg: "bg-green-500/10",
        iconColor: "text-green-500",
    },
    {
        title: "Cash Out (MTD)",
        value: 78450.0,
        change: -8.2,
        trend: "down" as const,
        icon: ArrowDownRight,
        iconBg: "bg-red-500/10",
        iconColor: "text-red-500",
    },
    {
        title: "Net Cash Flow",
        value: 47350.0,
        change: 24.1,
        trend: "up" as const,
        icon: TrendingUp,
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
    },
    {
        title: "Projected (30 days)",
        value: 312500.0,
        change: 12.8,
        trend: "up" as const,
        icon: Wallet,
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-500",
    },
];

const accounts = [
    {
        id: "1",
        name: "Operating Account",
        bank: "Chase Business",
        balance: 156240.5,
        type: "Checking",
        lastTransaction: "2024-01-15",
    },
    {
        id: "2",
        name: "Payroll Account",
        bank: "Bank of America",
        balance: 45680.0,
        type: "Checking",
        lastTransaction: "2024-01-14",
    },
    {
        id: "3",
        name: "Reserve Fund",
        bank: "Wells Fargo",
        balance: 82580.0,
        type: "Savings",
        lastTransaction: "2024-01-10",
    },
];

const recentTransfers = [
    {
        id: "1",
        from: "Operating Account",
        to: "Payroll Account",
        amount: 25000.0,
        date: "2024-01-15",
        status: "completed",
    },
    {
        id: "2",
        from: "Operating Account",
        to: "Reserve Fund",
        amount: 10000.0,
        date: "2024-01-12",
        status: "completed",
    },
    {
        id: "3",
        from: "Reserve Fund",
        to: "Operating Account",
        amount: 5000.0,
        date: "2024-01-08",
        status: "pending",
    },
];

export default function CashFlowPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Cash Flow
                    </h1>
                    <p className="text-muted-foreground">
                        Monitor your cash movements and account balances.
                    </p>
                </div>
                <Button>
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    New Transfer
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {cashFlowStats.map((stat) => {
                    const Icon = stat.icon;
                    const isPositive = stat.trend === "up";

                    return (
                        <Card key={stat.title} className="relative overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div
                                    className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center",
                                        stat.iconBg
                                    )}
                                >
                                    <Icon className={cn("h-4 w-4", stat.iconColor)} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(stat.value)}
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    {isPositive ? (
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4 text-red-500" />
                                    )}
                                    <span
                                        className={cn(
                                            "text-xs font-medium",
                                            isPositive ? "text-green-500" : "text-red-500"
                                        )}
                                    >
                                        {Math.abs(stat.change)}%
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        vs last month
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Account Balances */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Account Balances</CardTitle>
                            <CardDescription>
                                Your connected bank accounts
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            Manage Accounts
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {accounts.map((account) => (
                                <div
                                    key={account.id}
                                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Building2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{account.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {account.bank} • {account.type}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">
                                            {formatCurrency(account.balance)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Last: {new Date(account.lastTransaction).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Transfers */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Transfers</CardTitle>
                            <CardDescription>Inter-account movements</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentTransfers.map((transfer) => (
                                <div
                                    key={transfer.id}
                                    className="flex items-start justify-between p-3 rounded-lg border border-border"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                                            <ArrowRightLeft className="h-4 w-4 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{transfer.from}</p>
                                            <p className="text-xs text-muted-foreground">
                                                → {transfer.to}
                                            </p>
                                            <p className="text-sm font-semibold mt-1">
                                                {formatCurrency(transfer.amount)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={cn(
                                                "text-xs px-2 py-0.5 rounded-full",
                                                transfer.status === "completed"
                                                    ? "bg-green-500/10 text-green-500"
                                                    : "bg-yellow-500/10 text-yellow-500"
                                            )}
                                        >
                                            {transfer.status}
                                        </span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                            View All Transfers
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Cash Flow Chart Placeholder */}
            <Card>
                <CardHeader>
                    <CardTitle>Cash Flow Trends</CardTitle>
                    <CardDescription>
                        Monthly cash in vs cash out comparison
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50">
                        <div className="text-center">
                            <TrendingUp className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground font-medium">
                                Chart visualization coming soon
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Integration with charting library pending
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
