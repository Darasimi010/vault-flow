"use client";

import * as React from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table";
import {
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Search,
    MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input, Badge } from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";
import { Transaction } from "@/lib/api";

interface TransactionsTableProps {
    data: Transaction[];
    isLoading?: boolean;
    className?: string;
    onRowClick?: (transaction: Transaction) => void;
}

// Status badge config
const statusConfig = {
    completed: { label: "Completed", variant: "success" as const },
    pending: { label: "Pending", variant: "warning" as const },
    failed: { label: "Failed", variant: "error" as const },
};

// Type badge config
const typeConfig = {
    income: { label: "Income", className: "text-green-500" },
    expense: { label: "Expense", className: "text-red-500" },
};

export function TransactionsTable({
    data,
    isLoading = false,
    className,
    onRowClick,
}: TransactionsTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [globalFilter, setGlobalFilter] = React.useState("");

    // Column definitions
    const columns: ColumnDef<Transaction>[] = React.useMemo(
        () => [
            {
                accessorKey: "date",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="-ml-4"
                    >
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => {
                    const date = new Date(row.getValue("date"));
                    return (
                        <span className="text-sm">
                            {date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    );
                },
            },
            {
                accessorKey: "description",
                header: "Description",
                cell: ({ row }) => (
                    <div className="max-w-[300px]">
                        <p className="font-medium text-sm truncate">
                            {row.getValue("description")}
                        </p>
                        <p className="text-xs text-muted-foreground">{row.original.vendor}</p>
                    </div>
                ),
            },
            {
                accessorKey: "category",
                header: "Category",
                cell: ({ row }) => (
                    <Badge variant="outline" size="sm">
                        {row.getValue("category")}
                    </Badge>
                ),
            },
            {
                accessorKey: "amount",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="-ml-4"
                    >
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => {
                    const amount = row.getValue("amount") as number;
                    const type = row.original.type;
                    return (
                        <span
                            className={cn(
                                "font-semibold",
                                typeConfig[type].className
                            )}
                        >
                            {amount > 0 ? "+" : ""}
                            {formatCurrency(amount)}
                        </span>
                    );
                },
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.getValue("status") as keyof typeof statusConfig;
                    const config = statusConfig[status];
                    return <Badge variant={config.variant}>{config.label}</Badge>;
                },
            },
            {
                id: "actions",
                cell: ({ row }) => (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle action click
                        }}
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "includesString",
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    if (isLoading) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Loading...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-16 bg-muted/50 rounded-lg animate-pulse"
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={className}>
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                        {table.getFilteredRowModel().rows.length} transactions
                    </CardDescription>
                </div>
                <div className="relative w-full md:w-[300px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search transactions..."
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </CardHeader>
            <CardContent>
                {/* Table */}
                <div className="rounded-lg border border-border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className={cn(
                                            "border-t border-border hover:bg-accent/50 transition-colors",
                                            onRowClick && "cursor-pointer"
                                        )}
                                        onClick={() => onRowClick?.(row.original)}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-4 py-3">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
