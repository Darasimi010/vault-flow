"use client";

import * as React from "react";
import {
    Users,
    UserPlus,
    Shield,
    MoreHorizontal,
    Mail,
    Search,
    Filter,
    CheckCircle2,
    Clock,
    XCircle,
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
    Badge,
} from "@/components/ui";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalTrigger } from "@/components/ui";
import { useAuth, RequirePermission } from "@/features/auth";
import { TeamMember, UserRole, getRoleDisplayName } from "@/types/auth.types";
import { cn } from "@/lib/utils";

// Demo team members
const teamMembers: TeamMember[] = [
    {
        id: "user_001",
        email: "cfo@vaultflow.com",
        fullName: "Sarah Johnson",
        role: "admin",
        department: "Executive",
        status: "active",
        createdAt: "2023-01-15T00:00:00Z",
        updatedAt: "2024-01-15T00:00:00Z",
        lastLoginAt: "2024-01-16T09:30:00Z",
    },
    {
        id: "user_002",
        email: "accountant@vaultflow.com",
        fullName: "Mike Chen",
        role: "editor",
        department: "Finance",
        status: "active",
        createdAt: "2023-03-20T00:00:00Z",
        updatedAt: "2024-01-10T00:00:00Z",
        lastLoginAt: "2024-01-16T08:15:00Z",
    },
    {
        id: "user_003",
        email: "employee@vaultflow.com",
        fullName: "Lisa Park",
        role: "viewer",
        department: "Engineering",
        status: "active",
        createdAt: "2023-06-01T00:00:00Z",
        updatedAt: "2024-01-05T00:00:00Z",
        lastLoginAt: "2024-01-15T14:20:00Z",
    },
    {
        id: "user_004",
        email: "pending@vaultflow.com",
        fullName: "Alex Morgan",
        role: "viewer",
        department: "Sales",
        status: "invited",
        createdAt: "2024-01-14T00:00:00Z",
        updatedAt: "2024-01-14T00:00:00Z",
    },
    {
        id: "user_005",
        email: "disabled@vaultflow.com",
        fullName: "Jordan Lee",
        role: "editor",
        department: "Marketing",
        status: "disabled",
        createdAt: "2023-02-10T00:00:00Z",
        updatedAt: "2023-12-01T00:00:00Z",
        lastLoginAt: "2023-11-30T16:45:00Z",
    },
];

const roleColors: Record<UserRole, string> = {
    admin: "bg-red-500/10 text-red-500 border-red-500/20",
    editor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    viewer: "bg-green-500/10 text-green-500 border-green-500/20",
};

const statusConfig = {
    active: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
    invited: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    disabled: { icon: XCircle, color: "text-gray-500", bg: "bg-gray-500/10" },
};

export default function TeamPage() {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);

    // Filter team members by search
    const filteredMembers = React.useMemo(() => {
        if (!searchQuery) return teamMembers;
        const query = searchQuery.toLowerCase();
        return teamMembers.filter(
            (member) =>
                member.fullName.toLowerCase().includes(query) ||
                member.email.toLowerCase().includes(query) ||
                member.department?.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    // Stats
    const stats = {
        total: teamMembers.length,
        active: teamMembers.filter((m) => m.status === "active").length,
        pending: teamMembers.filter((m) => m.status === "invited").length,
        admins: teamMembers.filter((m) => m.role === "admin").length,
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Team Management
                    </h1>
                    <p className="text-muted-foreground">
                        Manage team members and their access permissions.
                    </p>
                </div>
                <Modal open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
                    <ModalTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Invite Member
                        </Button>
                    </ModalTrigger>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>Invite Team Member</ModalTitle>
                            <ModalDescription>
                                Send an invitation to join your organization.
                            </ModalDescription>
                        </ModalHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <Input type="email" placeholder="colleague@company.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(["admin", "editor", "viewer"] as UserRole[]).map((role) => (
                                        <button
                                            key={role}
                                            className={cn(
                                                "p-3 border border-border rounded-lg text-center hover:bg-accent transition-colors",
                                                roleColors[role]
                                            )}
                                        >
                                            <p className="font-medium capitalize">{role}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {role === "admin" && "Full access"}
                                                {role === "editor" && "View & Edit"}
                                                {role === "viewer" && "View only"}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Department</label>
                                <Input type="text" placeholder="e.g., Finance" />
                            </div>
                        </div>
                        <ModalFooter>
                            <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setIsInviteModalOpen(false)}>
                                Send Invitation
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Members
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active
                        </CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.active}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pending Invites
                        </CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pending}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Administrators
                        </CardTitle>
                        <Shield className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.admins}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="flex gap-2">
                <div className="relative flex-1 md:max-w-md">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            {/* Team Members List */}
            <Card>
                <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                        {filteredMembers.length} members found
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredMembers.map((member) => {
                            const StatusIcon = statusConfig[member.status].icon;
                            const isCurrentUser = user?.id === member.id;

                            return (
                                <div
                                    key={member.id}
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-lg border border-border",
                                        isCurrentUser && "bg-accent/30"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <Avatar
                                            size="default"
                                            fallback={member.fullName}
                                            alt={member.fullName}
                                        />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{member.fullName}</p>
                                                {isCurrentUser && (
                                                    <Badge variant="secondary" size="sm">You</Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Mail className="h-3 w-3" />
                                                <span>{member.email}</span>
                                            </div>
                                            {member.department && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {member.department}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {/* Role badge */}
                                        <Badge
                                            variant="outline"
                                            className={cn("capitalize", roleColors[member.role])}
                                        >
                                            {member.role}
                                        </Badge>

                                        {/* Status */}
                                        <div
                                            className={cn(
                                                "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                                                statusConfig[member.status].bg,
                                                statusConfig[member.status].color
                                            )}
                                        >
                                            <StatusIcon className="h-3 w-3" />
                                            <span className="capitalize">{member.status}</span>
                                        </div>

                                        {/* Actions (only for non-current users) */}
                                        {!isCurrentUser && (
                                            <RequirePermission permission="manage:users">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </RequirePermission>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
