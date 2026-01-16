/**
 * Mock data for VaultFlow dashboard
 * Provides realistic financial transaction and vendor data
 */

export interface Transaction {
    id: string;
    date: string;
    description: string;
    vendor: string;
    category: string;
    amount: number;
    type: "income" | "expense";
    status: "completed" | "pending" | "failed";
    paymentMethod: string;
}

export interface Vendor {
    id: string;
    name: string;
    category: string;
    email: string;
    phone: string;
    totalSpend: number;
    status: "active" | "pending" | "inactive";
    lastPayment: string | null;
    rating: number;
}

export interface CashFlowData {
    date: string;
    cashIn: number;
    cashOut: number;
    netFlow: number;
}

export interface ExpenseCategory {
    category: string;
    amount: number;
    percentage: number;
    color: string;
}

// Generate mock transactions
export const generateTransactions = (count: number = 50): Transaction[] => {
    const vendors = [
        "Amazon Web Services",
        "Stripe Inc",
        "Google Cloud",
        "Microsoft Azure",
        "Slack Technologies",
        "Zoom Video",
        "HubSpot",
        "Salesforce",
        "Adobe Inc",
        "Dropbox",
        "Office Depot",
        "Staples",
        "FedEx",
        "UPS",
        "Delta Airlines",
    ];

    const categories = [
        "Cloud Services",
        "Software",
        "Marketing",
        "Office Supplies",
        "Travel",
        "Utilities",
        "Consulting",
        "Equipment",
    ];

    const paymentMethods = [
        "Corporate Card",
        "ACH Transfer",
        "Wire Transfer",
        "Check",
    ];

    return Array.from({ length: count }, (_, i): Transaction => {
        const isExpense = Math.random() > 0.3;
        const amount = isExpense
            ? -(Math.random() * 5000 + 100)
            : Math.random() * 15000 + 500;

        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 90));

        const statusRandom = Math.random();
        const status: Transaction["status"] =
            statusRandom > 0.1 ? "completed" : statusRandom > 0.05 ? "pending" : "failed";

        return {
            id: `txn_${String(i + 1).padStart(6, "0")}`,
            date: date.toISOString(),
            description: isExpense
                ? `Payment to ${vendors[Math.floor(Math.random() * vendors.length)]}`
                : `Invoice payment received`,
            vendor: vendors[Math.floor(Math.random() * vendors.length)],
            category: categories[Math.floor(Math.random() * categories.length)],
            amount: Math.round(amount * 100) / 100,
            type: isExpense ? "expense" : "income",
            status,
            paymentMethod:
                paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate cash flow data for charts
export const generateCashFlowData = (days: number = 30): CashFlowData[] => {
    const data: CashFlowData[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const cashIn = Math.random() * 8000 + 2000;
        const cashOut = Math.random() * 6000 + 1500;

        data.push({
            date: date.toISOString().split("T")[0],
            cashIn: Math.round(cashIn * 100) / 100,
            cashOut: Math.round(cashOut * 100) / 100,
            netFlow: Math.round((cashIn - cashOut) * 100) / 100,
        });
    }

    return data;
};

// Generate expense categories
export const generateExpenseCategories = (): ExpenseCategory[] => {
    const categories = [
        { category: "Cloud Services", color: "#3b82f6" },
        { category: "Marketing", color: "#8b5cf6" },
        { category: "Office Expenses", color: "#22c55e" },
        { category: "Travel", color: "#f97316" },
        { category: "Software", color: "#ec4899" },
        { category: "Utilities", color: "#06b6d4" },
        { category: "Consulting", color: "#eab308" },
        { category: "Other", color: "#6b7280" },
    ];

    const amounts = categories.map(() => Math.random() * 10000 + 1000);
    const total = amounts.reduce((a, b) => a + b, 0);

    return categories.map((cat, i) => ({
        ...cat,
        amount: Math.round(amounts[i] * 100) / 100,
        percentage: Math.round((amounts[i] / total) * 100),
    }));
};

// Generate vendors
export const generateVendors = (count: number = 20): Vendor[] => {
    const vendorNames = [
        "Amazon Web Services",
        "Stripe Inc",
        "Google Cloud Platform",
        "Microsoft Azure",
        "Slack Technologies",
        "Zoom Video Communications",
        "HubSpot Inc",
        "Salesforce Inc",
        "Adobe Systems",
        "Dropbox Inc",
        "Atlassian",
        "Twilio",
        "SendGrid",
        "Mailchimp",
        "Intercom",
        "Zendesk",
        "Asana",
        "Monday.com",
        "Notion Labs",
        "Figma Inc",
    ];

    const categories = [
        "Cloud Services",
        "Payment Processing",
        "Marketing Software",
        "Collaboration",
        "Design Tools",
        "Communication",
    ];

    return vendorNames.slice(0, count).map((name, i) => {
        const status =
            Math.random() > 0.2
                ? "active"
                : Math.random() > 0.5
                    ? "pending"
                    : "inactive";

        const lastPayment =
            status === "active"
                ? new Date(
                    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
                ).toISOString()
                : null;

        return {
            id: `vendor_${String(i + 1).padStart(4, "0")}`,
            name,
            category: categories[Math.floor(Math.random() * categories.length)],
            email: `billing@${name.toLowerCase().replace(/\s+/g, "")}.com`,
            phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100
                }-${Math.floor(Math.random() * 9000) + 1000}`,
            totalSpend: Math.round(Math.random() * 50000 + 1000),
            status,
            lastPayment,
            rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
        };
    });
};

// Pre-generated data for consistent demo
export const mockTransactions = generateTransactions(100);
export const mockCashFlowData = generateCashFlowData(30);
export const mockExpenseCategories = generateExpenseCategories();
export const mockVendors = generateVendors(20);
