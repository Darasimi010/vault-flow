"use client";

import {
    User,
    Building2,
    Bell,
    Shield,
    Link2,
    Mail,
    Key,
    Smartphone,
    ChevronRight,
    Save,
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
import { cn } from "@/lib/utils";

const settingsSections = [
    {
        id: "profile",
        title: "Profile Settings",
        icon: User,
        description: "Manage your personal information",
    },
    {
        id: "organization",
        title: "Organization",
        icon: Building2,
        description: "Company details and branding",
    },
    {
        id: "notifications",
        title: "Notifications",
        icon: Bell,
        description: "Email and push notification preferences",
    },
    {
        id: "security",
        title: "Security",
        icon: Shield,
        description: "Password and two-factor authentication",
    },
    {
        id: "integrations",
        title: "Integrations",
        icon: Link2,
        description: "Connected apps and services",
    },
];

const notificationSettings = [
    { id: "email_transactions", label: "Transaction alerts", enabled: true },
    { id: "email_reports", label: "Weekly reports", enabled: true },
    { id: "email_approvals", label: "Approval requests", enabled: true },
    { id: "email_marketing", label: "Product updates", enabled: false },
];

const integrations = [
    {
        name: "QuickBooks",
        description: "Sync accounting data",
        connected: true,
        icon: "📊",
    },
    {
        name: "Slack",
        description: "Get notifications in Slack",
        connected: true,
        icon: "💬",
    },
    {
        name: "Salesforce",
        description: "Sync customer data",
        connected: false,
        icon: "☁️",
    },
    {
        name: "Xero",
        description: "Alternative accounting sync",
        connected: false,
        icon: "📈",
    },
];

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Settings
                </h1>
                <p className="text-muted-foreground">
                    Manage your account and application preferences.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Navigation */}
                <Card className="lg:col-span-1 h-fit">
                    <CardContent className="p-3">
                        <nav className="space-y-1">
                            {settingsSections.map((section, index) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                                            index === 0
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        )}
                                    >
                                        <Icon className="h-5 w-5 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm">{section.title}</p>
                                            <p className={cn(
                                                "text-xs truncate",
                                                index === 0 ? "text-primary-foreground/70" : "text-muted-foreground"
                                            )}>
                                                {section.description}
                                            </p>
                                        </div>
                                        <ChevronRight className="h-4 w-4 shrink-0" />
                                    </button>
                                );
                            })}
                        </nav>
                    </CardContent>
                </Card>

                {/* Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Profile Settings
                            </CardTitle>
                            <CardDescription>
                                Update your personal information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar
                                    size="lg"
                                    fallback="John Doe"
                                    alt="John Doe"
                                />
                                <div>
                                    <Button variant="outline" size="sm">
                                        Change Photo
                                    </Button>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        JPG, PNG or GIF. Max 2MB.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input defaultValue="Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input type="email" defaultValue="john@vaultflow.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone</label>
                                    <Input type="tel" defaultValue="+1 (555) 123-4567" />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notification Preferences
                            </CardTitle>
                            <CardDescription>
                                Choose what notifications you receive
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {notificationSettings.map((setting) => (
                                    <div
                                        key={setting.id}
                                        className="flex items-center justify-between p-3 rounded-lg border border-border"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">{setting.label}</span>
                                        </div>
                                        <button
                                            className={cn(
                                                "relative h-6 w-11 rounded-full transition-colors",
                                                setting.enabled ? "bg-primary" : "bg-muted"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow-sm",
                                                    setting.enabled && "translate-x-5"
                                                )}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Security
                            </CardTitle>
                            <CardDescription>
                                Manage your security settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                                <div className="flex items-center gap-3">
                                    <Key className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Password</p>
                                        <p className="text-xs text-muted-foreground">
                                            Last changed 30 days ago
                                        </p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Change
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                                <div className="flex items-center gap-3">
                                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Two-Factor Authentication</p>
                                        <p className="text-xs text-muted-foreground">
                                            Add an extra layer of security
                                        </p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Enable
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Integrations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Link2 className="h-5 w-5" />
                                Integrations
                            </CardTitle>
                            <CardDescription>
                                Connect with your favorite tools
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {integrations.map((integration) => (
                                    <div
                                        key={integration.name}
                                        className="flex items-center justify-between p-3 rounded-lg border border-border"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{integration.icon}</span>
                                            <div>
                                                <p className="text-sm font-medium">{integration.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {integration.description}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant={integration.connected ? "outline" : "default"}
                                            size="sm"
                                        >
                                            {integration.connected ? "Connected" : "Connect"}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
