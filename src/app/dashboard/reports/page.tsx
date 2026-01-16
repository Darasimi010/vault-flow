"use client";

import {
    FileBarChart,
    TrendingUp,
    PieChart,
    BarChart3,
    Calendar,
    Download,
    FileText,
    ArrowRight,
    DollarSign,
    Receipt,
    Users,
    Wallet,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Button,
} from "@/components/ui";
import { cn } from "@/lib/utils";

const reportTypes = [
    {
        title: "Cash Flow Statement",
        description: "Monthly cash in/out analysis with projections",
        icon: Wallet,
        color: "from-blue-500 to-blue-600",
        lastGenerated: "2024-01-15",
    },
    {
        title: "Expense Report",
        description: "Detailed breakdown by category and vendor",
        icon: Receipt,
        color: "from-purple-500 to-purple-600",
        lastGenerated: "2024-01-14",
    },
    {
        title: "Vendor Analysis",
        description: "Spending patterns and vendor performance",
        icon: Users,
        color: "from-green-500 to-green-600",
        lastGenerated: "2024-01-12",
    },
    {
        title: "Budget vs Actual",
        description: "Compare planned budget against actual spending",
        icon: BarChart3,
        color: "from-orange-500 to-orange-600",
        lastGenerated: "2024-01-10",
    },
    {
        title: "Profit & Loss",
        description: "Revenue and expense summary for the period",
        icon: DollarSign,
        color: "from-pink-500 to-pink-600",
        lastGenerated: "2024-01-08",
    },
    {
        title: "Trend Analysis",
        description: "Historical trends and forecasting",
        icon: TrendingUp,
        color: "from-cyan-500 to-cyan-600",
        lastGenerated: "2024-01-05",
    },
];

const quickStats = [
    { label: "Reports Generated (MTD)", value: 24 },
    { label: "Scheduled Reports", value: 8 },
    { label: "Shared Reports", value: 12 },
    { label: "Saved Templates", value: 5 },
];

const recentReports = [
    {
        id: "1",
        name: "January Cash Flow Statement",
        type: "Cash Flow",
        generatedAt: "2024-01-15 09:30",
        size: "245 KB",
    },
    {
        id: "2",
        name: "Q4 2023 Expense Summary",
        type: "Expense Report",
        generatedAt: "2024-01-14 14:15",
        size: "1.2 MB",
    },
    {
        id: "3",
        name: "Top Vendors Analysis",
        type: "Vendor Analysis",
        generatedAt: "2024-01-12 11:00",
        size: "890 KB",
    },
];

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Reports
                    </h1>
                    <p className="text-muted-foreground">
                        Generate and manage financial reports.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule
                    </Button>
                    <Button>
                        <FileBarChart className="mr-2 h-4 w-4" />
                        New Report
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                {quickStats.map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Report Types Grid */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Generate Report</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {reportTypes.map((report) => {
                        const Icon = report.icon;
                        return (
                            <Card
                                key={report.title}
                                className="group cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div
                                            className={cn(
                                                "h-10 w-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white",
                                                report.color
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="text-base mb-1">
                                        {report.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        {report.description}
                                    </CardDescription>
                                    <p className="text-xs text-muted-foreground mt-3">
                                        Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Recent Reports */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Recent Reports</CardTitle>
                        <CardDescription>
                            Your recently generated reports
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                        View All
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {recentReports.map((report) => (
                            <div
                                key={report.id}
                                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{report.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {report.type} • {report.size}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground">
                                        {report.generatedAt}
                                    </span>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Chart Placeholder */}
            <Card>
                <CardHeader>
                    <CardTitle>Report Analytics</CardTitle>
                    <CardDescription>
                        Overview of report generation activity
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-48 flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50">
                        <div className="text-center">
                            <PieChart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground font-medium">
                                Analytics visualization coming soon
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
