"use client";

import {
    Receipt,
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle2,
    XCircle,
    Filter,
    Plus,
    Search,
    MoreHorizontal,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Button,
    Input,
} from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";

// Demo data for expenses
const expenseStats = [
    {
        title: "Total Expenses (MTD)",
        value: 32180.0,
        change: -8.5,
        trend: "down" as const,
        description: "vs last month",
    },
    {
        title: "Pending Approval",
        value: 5550.0,
        count: 3,
        description: "3 requests",
    },
    {
        title: "Approved (MTD)",
        value: 26630.0,
        count: 12,
        description: "12 expenses",
    },
    {
        title: "Average per Day",
        value: 2145.33,
        change: 5.2,
        trend: "up" as const,
        description: "vs last month",
    },
];

const categories = [
    { name: "Cloud Services", amount: 8450, percentage: 26, color: "bg-blue-500" },
    { name: "Marketing", amount: 6200, percentage: 19, color: "bg-purple-500" },
    { name: "Office Expenses", amount: 5100, percentage: 16, color: "bg-green-500" },
    { name: "Travel", amount: 4800, percentage: 15, color: "bg-orange-500" },
    { name: "Software", amount: 4230, percentage: 13, color: "bg-pink-500" },
    { name: "Other", amount: 3400, percentage: 11, color: "bg-gray-500" },
];

const recentExpenses = [
    {
        id: "1",
        title: "AWS Monthly Bill",
        category: "Cloud Services",
        amount: 2450.0,
        date: "2024-01-15",
        status: "approved",
        submittedBy: "Mike Chen",
    },
    {
        id: "2",
        title: "Google Ads Campaign",
        category: "Marketing",
        amount: 3200.0,
        date: "2024-01-14",
        status: "pending",
        submittedBy: "Sarah Johnson",
    },
    {
        id: "3",
        title: "Office Furniture",
        category: "Office Expenses",
        amount: 850.0,
        date: "2024-01-13",
        status: "approved",
        submittedBy: "Lisa Park",
    },
    {
        id: "4",
        title: "Team Lunch",
        category: "Other",
        amount: 180.0,
        date: "2024-01-12",
        status: "rejected",
        submittedBy: "James Wilson",
    },
    {
        id: "5",
        title: "Flight - NYC Conference",
        category: "Travel",
        amount: 650.0,
        date: "2024-01-11",
        status: "pending",
        submittedBy: "Mike Chen",
    },
];

const statusConfig = {
    approved: {
        icon: CheckCircle2,
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    pending: {
        icon: Clock,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
    },
    rejected: {
        icon: XCircle,
        color: "text-red-500",
        bg: "bg-red-500/10",
    },
};

export default function ExpensesPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Expenses
                    </h1>
                    <p className="text-muted-foreground">
                        Track and manage company expenses.
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Expense
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {expenseStats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(stat.value)}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                {stat.trend && (
                                    <>
                                        {stat.trend === "up" ? (
                                            <TrendingUp className="h-4 w-4 text-red-500" />
                                        ) : (
                                            <TrendingDown className="h-4 w-4 text-green-500" />
                                        )}
                                        <span
                                            className={cn(
                                                "text-xs font-medium",
                                                stat.trend === "up" ? "text-red-500" : "text-green-500"
                                            )}
                                        >
                                            {Math.abs(stat.change!)}%
                                        </span>
                                    </>
                                )}
                                <span className="text-xs text-muted-foreground">
                                    {stat.description}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Expenses Table */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle>Recent Expenses</CardTitle>
                            <CardDescription>
                                All submitted expense reports
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search expenses..."
                                    className="pl-8 w-[200px]"
                                />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentExpenses.map((expense) => {
                                const config = statusConfig[expense.status as keyof typeof statusConfig];
                                const StatusIcon = config.icon;

                                return (
                                    <div
                                        key={expense.id}
                                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Receipt className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{expense.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {expense.category} • {expense.submittedBy}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <p className="font-semibold text-sm">
                                                    {formatCurrency(expense.amount)}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(expense.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div
                                                className={cn(
                                                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                                                    config.bg,
                                                    config.color
                                                )}
                                            >
                                                <StatusIcon className="h-3 w-3" />
                                                <span className="capitalize">{expense.status}</span>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                            View All Expenses
                        </Button>
                    </CardContent>
                </Card>

                {/* Categories Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>By Category</CardTitle>
                        <CardDescription>Expense distribution (MTD)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {categories.map((category) => (
                                <div key={category.name} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{category.name}</span>
                                        <span className="text-muted-foreground">
                                            {formatCurrency(category.amount)}
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                                        <div
                                            className={cn("h-full rounded-full", category.color)}
                                            style={{ width: `${category.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
