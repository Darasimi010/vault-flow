/**
 * TanStack Query hooks for transaction data
 * Provides caching, pagination, and optimistic updates
 */

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getTransactions,
    getTransaction,
    getTransactionStats,
    updateTransactionCategory,
    TransactionQueryParams,
    TransactionFilters,
} from "@/lib/api";

// Query keys
export const transactionKeys = {
    all: ["transactions"] as const,
    lists: () => [...transactionKeys.all, "list"] as const,
    list: (params: TransactionQueryParams) =>
        [...transactionKeys.lists(), params] as const,
    details: () => [...transactionKeys.all, "detail"] as const,
    detail: (id: string) => [...transactionKeys.details(), id] as const,
    stats: () => [...transactionKeys.all, "stats"] as const,
};

// Fetch paginated transactions
export function useTransactions(params: TransactionQueryParams = {}) {
    return useQuery({
        queryKey: transactionKeys.list(params),
        queryFn: () => getTransactions(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    });
}

// Fetch single transaction
export function useTransaction(id: string) {
    return useQuery({
        queryKey: transactionKeys.detail(id),
        queryFn: () => getTransaction(id),
        enabled: !!id,
    });
}

// Fetch transaction stats
export function useTransactionStats() {
    return useQuery({
        queryKey: transactionKeys.stats(),
        queryFn: getTransactionStats,
        staleTime: 60 * 1000, // 1 minute
    });
}

// Update transaction category with optimistic updates
export function useUpdateTransactionCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, category }: { id: string; category: string }) =>
            updateTransactionCategory(id, category),

        // Optimistic update
        onMutate: async ({ id, category }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: transactionKeys.lists() });

            // Snapshot previous value
            const previousQueries = queryClient.getQueriesData({
                queryKey: transactionKeys.lists(),
            });

            // Optimistically update all cached lists
            queryClient.setQueriesData(
                { queryKey: transactionKeys.lists() },
                (old: unknown) => {
                    if (!old || typeof old !== "object") return old;
                    const oldData = old as { data: { id: string; category: string }[] };
                    return {
                        ...oldData,
                        data: oldData.data?.map((t) =>
                            t.id === id ? { ...t, category } : t
                        ),
                    };
                }
            );

            return { previousQueries };
        },

        // Rollback on error
        onError: (_err, _variables, context) => {
            if (context?.previousQueries) {
                context.previousQueries.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },

        // Refetch after success or error
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
        },
    });
}

// Hook for managing transaction filters
export function useTransactionFilters(initialFilters: TransactionFilters = {}) {
    const [filters, setFilters] = React.useState<TransactionFilters>(initialFilters);

    const updateFilter = React.useCallback(
        <K extends keyof TransactionFilters>(
            key: K,
            value: TransactionFilters[K]
        ) => {
            setFilters((prev) => ({
                ...prev,
                [key]: value,
            }));
        },
        []
    );

    const clearFilters = React.useCallback(() => {
        setFilters({});
    }, []);

    return {
        filters,
        setFilters,
        updateFilter,
        clearFilters,
    };
}

import * as React from "react";
