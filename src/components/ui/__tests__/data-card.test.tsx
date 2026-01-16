import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataCard } from "@/components/ui";

describe("DataCard Component", () => {
    it("renders title and value", () => {
        render(<DataCard title="Revenue" value="$10,000" />);

        expect(screen.getByText("Revenue")).toBeInTheDocument();
        expect(screen.getByText("$10,000")).toBeInTheDocument();
    });

    it("renders with upward trend indicator", () => {
        render(
            <DataCard
                title="Revenue"
                value="$10,000"
                trend={{ value: 12.5, direction: "up" }}
            />
        );

        expect(screen.getByText("12.5%")).toBeInTheDocument();
        // Check for green color indicating positive trend
        const trendElement = screen.getByText("12.5%").parentElement;
        expect(trendElement).toHaveClass("text-green-500");
    });

    it("renders with downward trend indicator", () => {
        render(
            <DataCard
                title="Expenses"
                value="$5,000"
                trend={{ value: 3.1, direction: "down" }}
            />
        );

        expect(screen.getByText("3.1%")).toBeInTheDocument();
        // Check for red color indicating negative trend
        const trendElement = screen.getByText("3.1%").parentElement;
        expect(trendElement).toHaveClass("text-red-500");
    });

    it("renders description", () => {
        render(
            <DataCard
                title="Revenue"
                value="$10,000"
                description="vs last month"
            />
        );

        expect(screen.getByText("vs last month")).toBeInTheDocument();
    });

    it("renders icon when provided", () => {
        const TestIcon = () => <span data-testid="test-icon">📊</span>;
        render(
            <DataCard
                title="Revenue"
                value="$10,000"
                icon={<TestIcon />}
            />
        );

        expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("shows loading skeleton when loading is true", () => {
        render(<DataCard title="Revenue" value="$10,000" loading />);

        // Should show skeleton, not the actual value
        expect(screen.queryByText("$10,000")).not.toBeInTheDocument();
        // Check for skeleton animation class
        expect(document.querySelector(".animate-pulse")).toBeInTheDocument();
    });
});
