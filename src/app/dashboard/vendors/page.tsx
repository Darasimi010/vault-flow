"use client";

import {
    Users,
    Clock,
    CheckCircle2,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Mail,
    Phone,
    DollarSign,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Button,
    Input,
    Avatar,
} from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";

// Demo data for vendors
const vendorStats = [
    {
        title: "Total Vendors",
        value: 48,
        icon: Users,
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
    },
    {
        title: "Active This Month",
        value: 24,
        icon: CheckCircle2,
        iconBg: "bg-green-500/10",
        iconColor: "text-green-500",
    },
    {
        title: "Pending Approval",
        value: 5,
        icon: Clock,
        iconBg: "bg-yellow-500/10",
        iconColor: "text-yellow-500",
    },
    {
        title: "Total Spend (MTD)",
        value: 78450,
        icon: DollarSign,
        isCurrency: true,
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-500",
    },
];

const vendors = [
    {
        id: "1",
        name: "Amazon Web Services",
        category: "Cloud Services",
        email: "billing@aws.amazon.com",
        phone: "+1 (888) 555-0123",
        totalSpend: 24500,
        status: "active",
        lastPayment: "2024-01-15",
    },
    {
        id: "2",
        name: "Stripe Inc",
        category: "Payment Processing",
        email: "support@stripe.com",
        phone: "+1 (888) 555-0124",
        totalSpend: 12800,
        status: "active",
        lastPayment: "2024-01-14",
    },
    {
        id: "3",
        name: "HubSpot",
        category: "Marketing Software",
        email: "billing@hubspot.com",
        phone: "+1 (888) 555-0125",
        totalSpend: 8400,
        status: "active",
        lastPayment: "2024-01-12",
    },
    {
        id: "4",
        name: "Acme Office Supplies",
        category: "Office Expenses",
        email: "orders@acme.com",
        phone: "+1 (888) 555-0126",
        totalSpend: 3250,
        status: "pending",
        lastPayment: null,
    },
    {
        id: "5",
        name: "Digital Marketing Pro",
        category: "Marketing",
        email: "info@dmpro.com",
        phone: "+1 (888) 555-0127",
        totalSpend: 15600,
        status: "active",
        lastPayment: "2024-01-10",
    },
    {
        id: "6",
        name: "Cloud Storage Plus",
        category: "Cloud Services",
        email: "support@cloudplus.io",
        phone: "+1 (888) 555-0128",
        totalSpend: 4800,
        status: "inactive",
        lastPayment: "2023-12-01",
    },
];

const statusConfig = {
    active: {
        label: "Active",
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    pending: {
        label: "Pending",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
    },
    inactive: {
        label: "Inactive",
        color: "text-gray-500",
        bg: "bg-gray-500/10",
    },
};

export default function VendorsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Vendors
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your vendor relationships and tracking.
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Vendor
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {vendorStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
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
                                    {stat.isCurrency
                                        ? formatCurrency(stat.value)
                                        : stat.value}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-2">
                    <div className="relative flex-1 md:w-[300px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search vendors..."
                            className="pl-8"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        All
                    </Button>
                    <Button variant="ghost" size="sm">
                        Active
                    </Button>
                    <Button variant="ghost" size="sm">
                        Pending
                    </Button>
                    <Button variant="ghost" size="sm">
                        Inactive
                    </Button>
                </div>
            </div>

            {/* Vendors Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {vendors.map((vendor) => {
                    const config = statusConfig[vendor.status as keyof typeof statusConfig];

                    return (
                        <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            size="default"
                                            fallback={vendor.name}
                                            alt={vendor.name}
                                        />
                                        <div>
                                            <CardTitle className="text-base">{vendor.name}</CardTitle>
                                            <CardDescription className="text-xs">
                                                {vendor.category}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <span
                                        className={cn(
                                            "text-xs px-2 py-1 rounded-full font-medium",
                                            config.bg,
                                            config.color
                                        )}
                                    >
                                        {config.label}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span className="truncate">{vendor.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>{vendor.phone}</span>
                                </div>
                                <div className="pt-3 border-t border-border flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Total Spend</p>
                                        <p className="font-semibold">
                                            {formatCurrency(vendor.totalSpend)}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Load More */}
            <div className="flex justify-center">
                <Button variant="outline">
                    Load More Vendors
                </Button>
            </div>
        </div>
    );
}
