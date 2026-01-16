/**
 * Mock API service for transactions
 * Simulates network requests with realistic delays
 */

import {
    mockTransactions,
    Transaction,
} from "./mock-data";

export interface TransactionFilters {
    search?: string;
    category?: string;
    type?: "income" | "expense";
    status?: "completed" | "pending" | "failed";
    startDate?: string;
    endDate?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface TransactionQueryParams {
    page?: number;
    pageSize?: number;
    sortBy?: keyof Transaction;
    sortOrder?: "asc" | "desc";
    filters?: TransactionFilters;
}

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Get paginated transactions
export async function getTransactions(
    params: TransactionQueryParams = {}
): Promise<PaginatedResponse<Transaction>> {
    const {
        page = 1,
        pageSize = 10,
        sortBy = "date",
        sortOrder = "desc",
        filters = {},
    } = params;

    // Simulate network delay
    await delay(300 + Math.random() * 500);

    // Filter transactions
    let filtered = [...mockTransactions];

    if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(
            (t) =>
                t.description.toLowerCase().includes(search) ||
                t.vendor.toLowerCase().includes(search) ||
                t.category.toLowerCase().includes(search)
        );
    }

    if (filters.category) {
        filtered = filtered.filter((t) => t.category === filters.category);
    }

    if (filters.type) {
        filtered = filtered.filter((t) => t.type === filters.type);
    }

    if (filters.status) {
        filtered = filtered.filter((t) => t.status === filters.status);
    }

    if (filters.startDate) {
        filtered = filtered.filter((t) => t.date >= filters.startDate!);
    }

    if (filters.endDate) {
        filtered = filtered.filter((t) => t.date <= filters.endDate!);
    }

    // Sort
    filtered.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];

        if (typeof aVal === "string" && typeof bVal === "string") {
            return sortOrder === "asc"
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
            return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        return 0;
    });

    // Paginate
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const data = filtered.slice(startIndex, startIndex + pageSize);

    return {
        data,
        total,
        page,
        pageSize,
        totalPages,
    };
}

// Get single transaction
export async function getTransaction(id: string): Promise<Transaction | null> {
    await delay(200 + Math.random() * 300);
    return mockTransactions.find((t) => t.id === id) || null;
}

// Update transaction category (for optimistic updates demo)
export async function updateTransactionCategory(
    id: string,
    category: string
): Promise<Transaction> {
    await delay(500 + Math.random() * 500);

    // Simulate occasional failure
    if (Math.random() < 0.1) {
        throw new Error("Failed to update transaction");
    }

    const transaction = mockTransactions.find((t) => t.id === id);
    if (!transaction) {
        throw new Error("Transaction not found");
    }

    transaction.category = category;
    return transaction;
}

// Get transaction stats
export async function getTransactionStats() {
    await delay(200 + Math.random() * 300);

    const income = mockTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = mockTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const pending = mockTransactions.filter((t) => t.status === "pending").length;

    return {
        totalIncome: Math.round(income * 100) / 100,
        totalExpenses: Math.round(expenses * 100) / 100,
        netFlow: Math.round((income - expenses) * 100) / 100,
        pendingCount: pending,
        transactionCount: mockTransactions.length,
    };
}
